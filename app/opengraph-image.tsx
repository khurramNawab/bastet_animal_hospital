import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Bastet Small Animal Hospital Kolkata';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#062527',
          backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(201, 162, 75, 0.18) 0%, rgba(6, 37, 39, 0.95) 75%)',
          border: '12px solid #C9A24B',
          padding: '40px 60px',
          textAlign: 'center',
          fontFamily: 'serif',
          color: '#FAF5E9',
        }}
      >
        {/* Brand Crest Icon Motif */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            backgroundColor: '#0B3C3F',
            border: '3px solid #C9A24B',
            marginBottom: '28px',
            boxShadow: '0 0 35px rgba(201, 162, 75, 0.4)',
          }}
        >
          <span style={{ fontSize: '46px', color: '#C9A24B', fontWeight: 'bold' }}>B</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            letterSpacing: '0.04em',
            color: '#C9A24B',
            marginBottom: '16px',
            textTransform: 'uppercase',
          }}
        >
          Bastet Small Animal Hospital
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#FAF5E9',
            maxWidth: '900px',
            lineHeight: 1.35,
            fontFamily: 'sans-serif',
            fontWeight: 300,
            marginBottom: '28px',
          }}
        >
          Where Every Paw Gets Royal Care
        </div>

        {/* Badges Band */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            fontSize: '18px',
            color: '#C9A24B',
            fontFamily: 'sans-serif',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span>24x7 Emergency Care</span>
          <span>•</span>
          <span>Advanced Surgery</span>
          <span>•</span>
          <span>Rash Behari Avenue, Kolkata</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
