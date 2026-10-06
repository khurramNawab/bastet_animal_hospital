import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bastet Small Animal Hospital | Kolkata',
  description: 'Premier veterinary care and hospital services in Kolkata.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
