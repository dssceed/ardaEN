'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

const grantImages = [
  { src: '/grant/RU.png', alt: 'RU' },
  { src: '/grant/SF.png', alt: 'SF' },
  { src: '/grant/PM2_5.png', alt: 'PM 2.5' },
  { src: '/grant/boosting_farm.png', alt: 'Boosting Farm' },
  { src: '/grant/water.png', alt: 'Water' },
];

const AUTO_SLIDE_MS = 3500;

export default function GrantSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => {
      setIndex((prev) => (prev + dir + grantImages.length) % grantImages.length);
    },
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [paused, go]);

  return (
    <div
      className="w-full max-w-2xl px-4 flex flex-col items-center mb-16 relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="w-full flex items-center justify-center gap-4 md:gap-8">
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous grant"
          className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white shadow-md text-[#ff5b5b] hover:bg-[#ff5b5b] hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Single card */}
        <div className="w-80 md:w-96 shrink-0 bg-white rounded-2xl p-3 md:p-4 shadow-lg border border-gray-100">
          {/* Matches the poster's native 1414x2000 ratio so nothing is cropped */}
          <div className="relative w-full aspect-[1414/2000] rounded-xl overflow-hidden bg-gray-50">
            {grantImages.map((image, i) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                fill
                sizes="384px"
                priority={i === 0}
                className={`object-cover transition-opacity duration-500 ${
                  i === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          aria-label="Next grant"
          className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white shadow-md text-[#ff5b5b] hover:bg-[#ff5b5b] hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {grantImages.map((image, dot) => (
          <button
            key={image.src}
            onClick={() => setIndex(dot)}
            aria-label={`Show ${image.alt}`}
            className={`h-2.5 rounded-full transition-all ${
              dot === index ? 'w-8 bg-[#ff5b5b]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
