import React from 'react';
import type { Metadata } from 'next';
import { Doctors } from '@/components/sections/Doctors';
import { getDoctors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Veterinary Doctors & Surgeons in Kolkata | Bastet Small Animal Hospital',
  description:
    'Meet the expert team of veterinary surgeons, dog dermatologists, and diagnostic imaging consultants at Bastet Small Animal Hospital in Park Street, Kolkata.',
};

export default function DoctorsIndexPage() {
  const doctors = getDoctors();

  return (
    <main className="min-h-screen py-6">
      <Doctors doctors={doctors} />
    </main>
  );
}
