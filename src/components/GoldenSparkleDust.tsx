import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  targetAlpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
  swaySpeed: number;
  swayOffset: number;
}

export const GoldenSparkleDust: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm golden palette for champagne celebration
    const goldPalette = [
      '#fef08a', // pale gold
      '#fde047', // bright gold
      '#fbbf24', // amber gold
      '#f59e0b', // deep amber
      '#ffffff', // diamond star sparkle
    ];

    const particleCount = Math.min(Math.floor(width / 24), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() < 0.2 ? Math.random() * 5 + 4 : Math.random() * 2.5 + 1, // bokeh vs sparkle
        color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
        alpha: Math.random() * 0.7 + 0.15,
        targetAlpha: Math.random() * 0.8 + 0.2,
        alphaSpeed: Math.random() * 0.015 + 0.005,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.45 + 0.15), // drifting upward
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Sway motion
        p.x += p.vx + Math.sin(time * p.swaySpeed + p.swayOffset) * 0.3;
        p.y += p.vy;

        // Twinkle / Pulse opacity
        if (p.alpha < p.targetAlpha) {
          p.alpha += p.alphaSpeed;
          if (p.alpha >= p.targetAlpha) {
            p.targetAlpha = Math.random() * 0.7 + 0.1;
          }
        } else {
          p.alpha -= p.alphaSpeed;
          if (p.alpha <= p.targetAlpha) {
            p.targetAlpha = Math.random() * 0.85 + 0.2;
          }
        }

        // Wrap around edges
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Draw glowing particle
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 2.5
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.4, p.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Extra diamond twinkle core for small sparkles
        if (p.radius < 2.5) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 w-full h-full mix-blend-screen"
    />
  );
};
