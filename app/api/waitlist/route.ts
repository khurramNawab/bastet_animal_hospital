import { NextRequest, NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/schemas/waitlist';
import { getSupabaseServerClient } from '@/lib/supabase';

// In-memory rate limiter (Token Bucket / Sliding Window)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const result = waitlistSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form input', details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { email, name, phone, animal, hp } = result.data;

    // Reject bot submissions if honeypot was populated
    if (hp && hp.length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    // Graceful fallback if Supabase is not yet configured in .env
    if (!supabase) {
      return NextResponse.json(
        {
          success: true,
          message: `Thank you for joining our waitlist! We will notify you as soon as ${animal} care opens in Kolkata.`,
          stored: false,
        },
        { status: 200 },
      );
    }

    const { error } = await supabase.from('waitlist').insert({
      email,
      name: name || null,
      phone: phone || null,
      animal,
    });

    if (error) {
      // Handle Postgres unique constraint violation (duplicate signup)
      if (error.code === '23505') {
        return NextResponse.json(
          {
            success: true,
            message: `You are already registered on our priority waitlist for ${animal} care!`,
            stored: true,
          },
          { status: 200 },
        );
      }

      return NextResponse.json(
        { error: 'Unable to register at this moment. Please try again later.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Welcome to the Bastet family! You are now on our VIP launch list for ${animal} care.`,
        stored: true,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
