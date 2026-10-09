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
          backgroundColor: '#2B3318',
          backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(255, 117, 27, 0.15) 0%, rgba(43, 51, 24, 0.98) 80%)',
          border: '12px solid #FF751B',
          padding: '40px 60px',
          textAlign: 'center',
          fontFamily: 'sans-serif',
          color: '#FFF6E5',
        }}
      >
        {/* Brand Orange Cross Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            backgroundColor: '#FF751B',
            marginBottom: '28px',
            boxShadow: '0 0 35px rgba(255, 117, 27, 0.4)',
          }}
        >
          <span style={{ fontSize: '46px', color: '#241E10', fontWeight: 'bold' }}>+</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            letterSpacing: '0.04em',
            color: '#FFF6E5',
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
            color: '#F7DAA7',
            maxWidth: '900px',
            lineHeight: 1.35,
            fontWeight: 400,
            marginBottom: '28px',
          }}
        >
          Compassionate, Advanced Veterinary Medicine in Kolkata
        </div>

        {/* Badges Band */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            fontSize: '18px',
            color: '#FFB27A',
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
