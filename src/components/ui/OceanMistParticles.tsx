'use client';

import { useEffect, useRef } from 'react';

export function OceanMistParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseRate: number;
      pulseAngle: number;
      
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 3 + 1;
        // Drift slowly left/right and upwards
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * -0.5 - 0.1;
        this.opacity = Math.random() * 0.4;
        this.pulseRate = Math.random() * 0.02 + 0.01;
        this.pulseAngle = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulseAngle += this.pulseRate;
        
        // Wrap around screen
        if (this.y < 0) this.y = h;
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
      }
      
      draw() {
        if (!ctx) return;
        // Dynamic opacity pulsing
        const currentOpacity = this.opacity + Math.sin(this.pulseAngle) * 0.2;
        const safeOpacity = Math.max(0, Math.min(1, currentOpacity));
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Golden/Amber tint for particles matching the theme
        ctx.fillStyle = `rgba(226, 194, 117, ${safeOpacity * 0.8})`; 
        ctx.fill();
        
        // Add subtle glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(226, 194, 117, 0.5)';
      }
    }

    function init() {
      particlesArray = [];
      const numberOfParticles = Math.floor((w * h) / 10000); // Responsive density
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    let animationFrameId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none opacity-80 mix-blend-screen transition-opacity duration-1000"
    />
  );
}
