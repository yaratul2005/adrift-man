"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export function ScrollPlane() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  const planeWidth = windowWidth < 768 ? 150 : 300; // Smaller on mobile

  // Path nodes
  const offLeft = -planeWidth;
  const offRight = windowWidth > 0 ? windowWidth + planeWidth : 1000;
  const centerLeft = windowWidth > 0 ? windowWidth * 0.2 : 200;
  const centerRight = windowWidth > 0 ? windowWidth * 0.8 : 800;

  // X Path: Fly across the screen back and forth
  const x = useTransform(smoothProgress,
    [0, 0.1,  0.2,  0.4,   0.5,  0.7,   0.8,  1],
    [offLeft, centerRight, offRight, offLeft, centerLeft, offRight, offLeft, centerRight]
  );

  // Y Path: Moves down relative to the viewport height to create a parallax float effect
  // We constrain it within the viewport height so it's always visible as you scroll
  const yStart = 0;
  const yMax = windowHeight > 0 ? windowHeight - 150 : 600;

  const y = useTransform(smoothProgress,
    [0, 0.5, 1],
    [yStart, yMax / 2, yMax]
  );

  // Rotation: Bank towards direction of travel.
  // Left to right -> bank right (positive rot)
  // Right to left -> bank left (negative rot)
  const rotate = useTransform(smoothProgress,
    [0, 0.1, 0.2, 0.4, 0.5, 0.7, 0.8, 1],
    [15, -10, -25, 25, 10, -25, 25, -10]
  );

  // Scale: Simulate depth
  const scale = useTransform(smoothProgress,
    [0, 0.15, 0.3, 0.5, 0.75, 1],
    [0.7, 1.1, 0.8, 1.2, 0.85, 1]
  );

  // Opacity: Hidden at very top (Hero section), then visible
  const opacity = useTransform(smoothProgress,
    [0, 0.05, 0.08, 0.98, 1],
    [0, 0, 1, 1, 0]
  );

  // Direction: flip horizontally when moving right to left
  const scaleX = useTransform(smoothProgress,
     [0, 0.2, 0.21, 0.4, 0.41, 0.7, 0.71, 1],
     [-1, -1, 1,    1,   -1,   -1,   1,    1] // -1 = facing right, 1 = facing left.
  );

  if (windowWidth === 0) return null; // Avoid hydration mismatch

  return (
    <motion.div
      style={{
        position: "fixed",
        top: "10vh",
        left: 0,
        x,
        y,
        rotate,
        scale,
        opacity,
        zIndex: 40,
        pointerEvents: "none",
        width: planeWidth,
      }}
      className="aspect-[1883/853]" // Based on actual image size approx 2.2 ratio
    >
      <motion.div style={{ scaleX, width: '100%', height: '100%', position: 'relative' }}>
         <Image
            src="/images/3DPlane.png"
            alt="Coast Guard Plane"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
      </motion.div>
    </motion.div>
  );
}
