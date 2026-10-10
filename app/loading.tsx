import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3.5 h-3.5 rounded-full bg-orange animate-bounce [animation-delay:-0.3s]" />
        <div className="w-3.5 h-3.5 rounded-full bg-orange animate-bounce [animation-delay:-0.15s]" />
        <div className="w-3.5 h-3.5 rounded-full bg-orange animate-bounce" />
      </div>

      <span className="font-display font-bold text-sm tracking-widest uppercase text-olive-deep dark:text-sand">
        Preparing Bastet Hospital...
      </span>
    </div>
  );
}
