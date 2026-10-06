import React from 'react';
import { getDoctors } from '@/lib/data';

export default function DoctorsPage() {
  const doctors = getDoctors();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">
          Medical Faculty
        </span>
        <h1 className="font-display text-4xl text-teal font-bold mt-2">
          Expert Veterinary Doctors
        </h1>
        <p className="mt-3 text-ink/80 text-sm">
          Distinguished veterinary physicians and surgeons committed to royal pet care.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="glass-card p-6 border border-gold/20 flex flex-col">
            <h2 className="font-display text-2xl font-bold text-teal">{doctor.name}</h2>
            <p className="text-xs uppercase tracking-wider text-gold-dark font-semibold mt-1">
              {doctor.role} • {doctor.yearsOfExperience} yrs exp
            </p>
            <p className="mt-4 text-sm text-ink/80 whitespace-pre-line leading-relaxed">
              {doctor.bio}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
