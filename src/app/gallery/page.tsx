'use client';

import Image from 'next/image';
import { FadeUp } from '@/components/ui/FadeUp';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// All available local assets, correctly mapped to their actual content
// author.jpg        = Andrew young, official USCG uniform portrait (1970s)
// authornow.jpg     = Andrew recent, officer's cap side-profile portrait
// family-ph.jpg     = Andrew recent, officer's cap (front-facing, slightly different)
// military-ph.jpg   = USCG HU-16 Albatross aircraft in flight (color)
// ocean-bg.jpg      = USCG seaplane No.1285 landing on water (B&W)
// life-journey-ph.jpg = Book cover painting (rescue at sea, by D.A. Wingert)
const galleryItems = [
  {
    src: '/images/author.jpg',
    alt: 'Andrew J. Key Jr. — Official U.S. Coast Guard Portrait',
    title: 'Lieutenant-Commander Key',
    year: 'c. 1970s',
    category: 'Service Portrait',
    span: 'col-span-1 row-span-2', // Tall portrait — spans full height
  },
  {
    src: '/images/military-ph.jpg',
    alt: 'U.S. Coast Guard HU-16 Albatross amphibious aircraft in flight',
    title: 'HU-16 Albatross, USCG No. 7250',
    year: 'c. 1960s',
    category: 'Military Aviation',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/images/ocean-bg.jpg',
    alt: 'U.S. Coast Guard seaplane No. 1285 landing on water',
    title: 'USCG Seaplane — Water Landing',
    year: 'c. 1950s',
    category: 'Coast Guard Operations',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/images/family-ph.jpg',
    alt: 'Andrew J. Key Jr. in officer\'s cap — recent years',
    title: 'Andrew J. Key Jr.',
    year: 'Recent',
    category: 'The Author Today',
    span: 'col-span-1 row-span-1',
  },
  {
    // authornow.jpg is a distinct side-profile portrait, different from family-ph.jpg
    src: '/images/authornow.jpg',
    alt: 'Andrew J. Key Jr. — reflective side portrait in officer\'s cap',
    title: 'Andrew — A Life of Service',
    year: 'Recent',
    category: 'The Author',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/life-journey-ph.jpg',
    alt: 'Adrift — cover artwork painting of rescue at sea, by D.A. Wingert',
    title: 'Cover Art by D.A. Wingert',
    year: '2024',
    category: 'Cover Artwork',
    span: 'col-span-1 row-span-1',
  },
];

export default function GalleryPage() {
  const [lightboxImg, setLightboxImg] = useState<(typeof galleryItems)[0] | null>(null);

  return (
    <>
      <SectionWrapper padding="xl" className="pt-32 pb-24 min-h-screen">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <FadeUp>
            <p className="font-sans text-xs tracking-[0.35em] text-site-accent/70 uppercase mb-4">
              Life through the lens
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-site-text tracking-wide drop-shadow-xl mb-6">
              The <span className="text-gradient">Gallery</span>
            </h1>
            <p className="font-sans text-lg text-site-secondary font-light max-w-xl mx-auto">
              A visual record of service, duty, and the journey that became <em>Adrift</em>.
            </p>
          </FadeUp>
        </div>

        {/* Divider */}
        <FadeUp>
          <div className="flex items-center gap-4 mx-auto max-w-6xl mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="font-sans text-xs tracking-[0.3em] text-site-accent/40 uppercase">
              {galleryItems.length} photographs
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </FadeUp>

        {/* Masonry-style grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {galleryItems.map((item, index) => (
            <FadeUp key={index} delay={index * 0.08} className={item.span}>
              <button
                onClick={() => setLightboxImg(item)}
                className="relative w-full h-full group overflow-hidden rounded-xl border border-white/[0.06] bg-site-surface cursor-zoom-in focus:outline-none"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 saturate-75 group-hover:saturate-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ZoomIn size={14} className="text-site-accent" />
                    </div>
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-site-accent/80 mb-1">
                      {item.category} · {item.year}
                    </span>
                    <span className="block font-serif text-base text-white leading-snug">
                      {item.title}
                    </span>
                  </div>
                </div>

                {/* Always-visible subtle bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
              </button>
            </FadeUp>
          ))}
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ paddingBottom: '66%' }}>
                <Image
                  src={lightboxImg.src}
                  alt={lightboxImg.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              {/* Lightbox caption bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent px-8 py-6">
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-site-accent/70 mb-1">
                  {lightboxImg.category} · {lightboxImg.year}
                </p>
                <p className="font-serif text-xl text-white">{lightboxImg.title}</p>
                <p className="font-sans text-sm text-site-secondary/70 mt-1">{lightboxImg.alt}</p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={16} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
