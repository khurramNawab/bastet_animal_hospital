import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3.5 h-3.5 rounded-full bg-gold animate-bounce [animation-delay:-0.3s]" />
        <div className="w-3.5 h-3.5 rounded-full bg-gold animate-bounce [animation-delay:-0.15s]" />
        <div className="w-3.5 h-3.5 rounded-full bg-gold animate-bounce" />
      </div>

      <span className="font-display font-bold text-sm tracking-widest uppercase text-teal dark:text-gold">
        Preparing Bastet Sanctuary...
      </span>
    </div>
  );
}
