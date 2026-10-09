'use client';

import React, { useEffect, useRef, useState } from 'react';

export function PawCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Guard against touch devices and reduced-motion
    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Track interactive element hover
    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement | null;
      if (
        targetEl &&
        (targetEl.tagName === 'A' ||
          targetEl.tagName === 'BUTTON' ||
          targetEl.tagName === 'INPUT' ||
          targetEl.tagName === 'SELECT' ||
          targetEl.tagName === 'TEXTAREA' ||
          targetEl.closest('a') ||
          targetEl.closest('button') ||
          targetEl.getAttribute('role') === 'button' ||
          targetEl.classList.contains('cursor-pointer'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Smooth animation loop
    const render = () => {
      // Lerp smoothing (18% interpolation speed)
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    // Handle tab visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafId.current) cancelAnimationFrame(rafId.current);
      } else {
        rafId.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform -translate-x-1/2 -translate-y-1/2 select-none"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      {/* Outer Warm Orange Ring */}
      <div
        className={`relative -top-3 -left-3 rounded-full border border-orange/60 transition-all duration-200 ease-out flex items-center justify-center ${
          isMouseDown
            ? 'w-6 h-6 scale-90 bg-orange/40 shadow-warm-glow'
            : isHovering
            ? 'w-10 h-10 scale-125 bg-orange/15 shadow-warm-glow-lg border-orange'
            : 'w-6 h-6 scale-100 bg-orange/10'
        }`}
      >
        {/* Warm Orange Paw Center Dot */}
        <div
          className={`rounded-full bg-orange transition-all duration-150 ${
            isHovering ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'
          }`}
        />
      </div>
    </div>
  );
}
