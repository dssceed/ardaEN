'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

const partnerImages = [
  '/partnership/1.jpg',
  '/partnership/2.png',
  '/partnership/3.jpg',
  '/partnership/4.jpg',
  '/partnership/5.png',
  '/partnership/6.png',
  '/partnership/7.png',
  '/partnership/8.jpg',
  '/partnership/9.jpg',
  '/partnership/10.png',
];

export default function PartnershipSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl px-4 md:px-8 py-10 md:py-16 flex flex-col items-center mb-10 overflow-hidden relative">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <h2 className="text-[28px] md:text-[36px] font-bold text-black mb-10 text-center font-sans">
        Contact for Partnership
      </h2>
      
      {/* Slider Container with Arrows */}
      <div className="w-full relative max-w-6xl mx-auto flex items-center justify-center">
        
        {/* Left Arrow Button */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 md:-left-4 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-[#cbbfe0] hover:text-[#bdafd7] hover:scale-110 active:scale-95 transition-all focus:outline-none bg-white/70 backdrop-blur-sm rounded-full shadow-sm md:bg-transparent md:shadow-none"
          aria-label="Scroll Left"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 md:w-16 md:h-16">
            <path d="M12 5l-7 7 7 7V5zm7 0l-7 7 7 7V5z" />
          </svg>
        </button>

        <div className="w-full relative max-w-5xl mx-auto px-4 md:px-8">
          {/* Fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrollable track */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-12 pb-8 pt-4 px-4 no-scrollbar scroll-smooth" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {partnerImages.map((src, index) => (
              <div
                key={src}
                className="shrink-0 snap-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-sm border-[4px] border-white relative"
              >
                <Image
                  src={src}
                  alt={`Partner ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={scrollRight}
          className="absolute right-0 md:-right-4 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-[#cbbfe0] hover:text-[#bdafd7] hover:scale-110 active:scale-95 transition-all focus:outline-none bg-white/70 backdrop-blur-sm rounded-full shadow-sm md:bg-transparent md:shadow-none"
          aria-label="Scroll Right"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 md:w-16 md:h-16">
            <path d="M12 5l7 7-7 7V5zm-7 0l7 7-7 7V5z" />
          </svg>
        </button>
      </div>

      {/* <p className="text-center text-gray-500 mt-2 font-medium">sliding</p> */}
    </section>
  );
}
