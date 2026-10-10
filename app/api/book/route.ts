import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/schemas/booking';
import { getSupabaseServerClient } from '@/lib/supabase';
import { getSiteConfig } from '@/lib/data';

// In-memory rate limiting map for booking requests (IP + Phone)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_BOOKINGS_PER_WINDOW = 5;

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= MAX_BOOKINGS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

function generateRequestCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BST-${code}`;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many appointment requests from this connection. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await req.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const {
      ownerName,
      phone,
      email,
      animal,
      petName,
      breed,
      petAge,
      service,
      doctor,
      date,
      time,
      message,
      consent,
      hp,
    } = result.data;

    // Silent defense against automated bots (honeypot populated)
    if (hp && hp.length > 0) {
      return NextResponse.json(
        { ok: true, requestCode: generateRequestCode(), message: 'Request received' },
        { status: 200 },
      );
    }

    if (isRateLimited(phone)) {
      return NextResponse.json(
        { error: 'Too many booking requests for this mobile number. Please contact the clinic directly.' },
        { status: 429 },
      );
    }

    const requestCode = generateRequestCode();
    const supabase = getSupabaseServerClient();
    const siteConfig = getSiteConfig();
    const maxPerSlot = siteConfig.slotsConfig?.maxPerSlot || 2;

    // Graceful fallback if Supabase credentials are not configured in environment
    if (!supabase) {
      return NextResponse.json(
        {
          ok: true,
          requestCode,
          message: 'Appointment request received. Our clinical coordinator will call to confirm.',
        },
        { status: 200 },
      );
    }

    // 1. Slot Capacity & Conflict Check
    const { count, error: countError } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('appointment_date', date)
      .eq('appointment_time', `${time}:00`)
      .in('status', ['pending', 'confirmed']);

    if (!countError && typeof count === 'number' && count >= maxPerSlot) {
      return NextResponse.json(
        { error: 'This time slot is now fully booked. Please select another slot.' },
        { status: 409 },
      );
    }

    // 2. Insert into Supabase appointments table
    const { error: insertError } = await supabase.from('appointments').insert({
      request_code: requestCode,
      owner_name: ownerName,
      phone,
      email: email || null,
      animal,
      pet_name: petName,
      breed: breed || null,
      pet_age: petAge || null,
      service,
      doctor: doctor || 'no-preference',
      appointment_date: date,
      appointment_time: `${time}:00`,
      message: message || null,
      consent,
      status: 'pending',
    });

    if (insertError) {
      return NextResponse.json(
        { error: 'Unable to register appointment request at this moment. Please call the clinic directly.' },
        { status: 500 },
      );
    }

    // Return sanitized response (No PII returned)
    return NextResponse.json(
      {
        ok: true,
        requestCode,
        message: 'Appointment request received successfully.',
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error processing booking request' },
      { status: 500 },
    );
  }
}
