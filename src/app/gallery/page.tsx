'use client';

import Image from 'next/image';
import { FadeUp } from '@/components/ui/FadeUp';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Gallery items: original site assets + full life_album collection
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
    // authornow.jpg is a distinct side-profile portrait, different from family-ph.jpg
    src: '/images/authornow.jpg',
    alt: 'Andrew J. Key Jr. — reflective side portrait in officer\'s cap',
    title: 'Andrew — A Life of Service',
    year: 'Recent',
    category: 'The Author',
    span: 'col-span-1 row-span-1',
  },

  // ── Album ─────────────────────────────────────────────
  {
    src: '/album/02.jpg',
    alt: 'Author archive photograph',
    title: ' Leona M. Key holding Jeffery Key',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/03.jpg',
    alt: 'Author archive photograph',
    title: 'Music and memory',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/1714491009852.jpg',
    alt: 'Andrew Jackson Key, Sr.',
    title: 'Andrew Jackson Key, Sr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/1714491013120.jpg',
    alt: 'Author archive photograph',
    title: 'Andrew Jackson Key, Jr., Violet Eloise Smith Key',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/1714491028475_edited.jpg',
    alt: 'Author archive photograph',
    title: 'PAST moments',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/1714491031459.jpg',
    alt: 'Author archive photograph',
    title: 'Jeffery Allen Key age 1 year old',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/1714491048334.jpg',
    alt: 'Author archive photograph',
    title: ' Seaman Andrew J. Key III, USN',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/1714491054800.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 9',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/1714491057460.jpg',
    alt: 'Author archive photograph',
    title: 'L-R, Leona Marie Key, Rosalee and Steve McClure, and Andrew J. Key, Jr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/1714491060570.jpg',
    alt: 'Author archive photograph',
    title: 'From Left to Right: Linda Saiz Key and Andrew J. Key III on their wedding day.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/1714491066576.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 12',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/1714491070030.jpg',
    alt: 'Author archive photograph',
    title: 'Couple on the right, from left to right: Beatrice Lavonne Bales Key, Andrew J. Key, Jr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/1714491074358.jpg',
    alt: 'Author archive photograph',
    title: 'From left to right: Violet E. Key, Leona M. Key, Andrew J. Key, Jr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/A-14.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Debra D. Key and Andrew J. Key, Jr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/A-17.png',
    alt: 'Author archive photograph',
    title: 'Andrew J. Key III, Beatrice L. Bales Key,Debra D. Key',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/A-20.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 17',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/A-22.png',
    alt: 'Author archive photograph',
    title: 'Members of the Marcus Island Japanese weathermen and Coast Guard softball teams. Andrew Key, Jr. standing on the extreme right.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/A-23.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'CWO-3 Andrew J. Key, Jr. attending OCS',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/A-29.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'L-R, Leona Marie Key, Rosalee and Steve McClure, and Andrew J. Key, Jr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/A-3.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 22',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/A-30.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 23',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/A-4.png',
    alt: 'Author archive photograph',
    title: 'Gerald Avenue Elementary 2nd grade, First Row,2nd from right - Andrew J. Key, Jr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/A-5.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Left to right – Virginia Lee Key, Johnny Louis Key, Andrew J. Key, Jr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/A-6.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Andrew J. Key, Jr – Age 12',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/A-7.png',
    alt: 'Author archive photograph',
    title: 'Back row, 3rd from left- Andrew J. Key, Sr.,4th from left – Andrew F. Key, Front row, 1st from left – Orville Key',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/A-8.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Andrew J. Key, Jr. – Erect Holding M-1 rifle, Mi- chael Blakeny Kneeling',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/A-9.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 29',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/A15.remini-enhanced.jpg',
    alt: 'Author archive photograph',
    title: ' Beatrice Lavonne Bales holding Andrew J. Key, III with Debra Diane Key',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/adn.webp',
    alt: 'Author archive photograph',
    title: 'Archive Journey 31',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/Adrew.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 32',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Andrew_ Debra and Jeff circa 1971-72_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 33',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/Barbara an Larry.JPG',
    alt: 'Author archive photograph',
    title: 'Archive Journey 34',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Brent_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 35',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/Bry and Luke at Phoenix Open_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 36',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/bryan and boys circa 2019_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 37',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Bryan and family Easter 2020_edited_edited_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 38',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/Bryan and Luke - 2 years  circa 2002.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 39',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/Bryan, Luke and Brent June 2011_edited_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 40',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Bryan, Luke and Brent-2011.JPG',
    alt: 'Author archive photograph',
    title: 'Archive Journey 41',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Bryan_Tara_Luke and Brent circa 2023_edited_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 42',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/circa 1965.jpg',
    alt: 'Author archive photograph',
    title: 'Form left to right: Debra D Key, Andrew J.Key, Jr., and Andrew J. Key III',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/cop.webp',
    alt: 'Author archive photograph',
    title: 'Archive Journey 44',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/currentenhanced.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 45',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/Debbie&Andy1_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 46',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Don Geigle circa 1992.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 47',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/Family gathering at Andrew\'s 2024.jpeg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 48',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/Family gathering at Andrew\'s 2024_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 49',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/family together.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 50',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/fishing 099.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 51',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/Great Grandpa\'s family photo - East TX circa 1943_inPixio (2).jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 52',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/HH-52A 5x7 300dpI.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 53',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/HH-65-hover-20.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 54',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/HO4S_new_paint-phycxd1ifil684wgasa56fo0j69c73qixay7986lyw.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 55',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/Holiday dinner at Bryan\'s circa 2022.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 56',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/IMAG0015-Mom, Dad, Marie, Rosalee, Jeff and Klint.jpg',
    alt: 'Author archive photograph',
    title: 'From left to right: Rosalee Johnson, Leona Marie Key, Andrew J. Key, Sr., Klint Fritz, Jeffery A. Key, and Violet E. Key',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/James-2015.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 58',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/Jeanetta, Marie and Jeff_inPixio.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 59',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/Jeff Key Age - 3.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 60',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/Jennifer and boy friends_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 61',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Lamar graduation_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 62',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Larry and Lissa Key in their wedding day_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 64',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/Marie and Me circa 2000_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 66',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Marilyn and Lolly carter.png',
    alt: 'Author archive photograph',
    title: 'Archive Journey 68',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/Marilyns daughter and granddaughter 20 May 2024.png',
    alt: 'Author archive photograph',
    title: 'Archive Journey 69',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/Mom and Dad circa 1937_edited.jpg',
    alt: 'Author archive photograph',
    title: 'From left to right: Violet Eloise Smith Key Andrew Jackson Key, Sr.',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/Painting-P5M 7x4.9 300dpi.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 72',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/San Antonio Mother\'s day group-1.png',
    alt: 'Author archive photograph',
    title: 'Archive Journey 73',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/UF2G (HU-16E)300dpi_inPixio.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 74',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/VC-20B 6.9x3.5 300dpi.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 75',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/album/VC-20B 6.9x3_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 76',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/album/VC-4A-gulfstream_1_300-e1497479988901-500x254.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 77',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/album/VC_11A_2.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 78',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/album/VC_11A_2_edited.jpg',
    alt: 'Author archive photograph',
    title: 'Archive Journey 79',
    year: 'Archive',
    category: 'Life Event',
    span: 'col-span-2 row-span-1',
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

        {/* True Masonry-style grid */}
        <div className="mx-auto max-w-7xl columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, index) => (
            <FadeUp key={index} delay={(index % 10) * 0.05} className="break-inside-avoid">
              <button
                onClick={() => setLightboxImg(item)}
                className="relative w-full block group overflow-hidden rounded-xl bg-site-surface cursor-zoom-in focus:outline-none"
              >
                {/* Standard img tag allows natural aspect ratio for true masonry */}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-[1.03] saturate-75 group-hover:saturate-100"
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
