import React, { useEffect, useRef } from 'react';

export const HeroBackground: React.FC = () => {
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

    // Particle nodes for cybernetic network
    const particleCount = Math.min(width > 768 ? 45 : 25, 60);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.75),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    let step = 0;

    const render = () => {
      step += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle horizon glow
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.35,
        50,
        width / 2,
        height * 0.4,
        width * 0.7
      );
      gradient.addColorStop(0, 'rgba(34, 211, 238, 0.09)');
      gradient.addColorStop(0.5, 'rgba(138, 235, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(5, 20, 36, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw particles and connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height * 0.75;
        if (p.y > height * 0.75) p.y = 0;

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.15;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 235, 255, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#22d3ee';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
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
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Dynamic MP4 Video Background with Drone Aerial View */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transform"
        style={{
          filter: 'brightness(0.65) contrast(1.25) hue-rotate(185deg) saturate(1.1)',
        }}
        poster="/manus-storage/tnssys-hero-sydney_4adba2cd.jpg"
      >
        <source src="/background.mp4" type="video/mp4" />
        <source src="/sydney.mp4" type="video/mp4" />
        <source src="/sydney-aerial.webm" type="video/webm" />
      </video>

      {/* Fallback Image Layer if video is loading or unsupported */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen -z-10"
        style={{
          backgroundImage: "url('/manus-storage/tnssys-hero-sydney_4adba2cd.jpg')",
          filter: 'brightness(0.65) contrast(1.3) hue-rotate(190deg)',
          backgroundPosition: 'center 35%',
        }}
      />

      {/* Cybernetic Dark Vignette Gradient Overlays for High-Contrast Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#051424]/75 via-[#051424]/80 to-[#051424]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#051424]/50 to-[#051424]" />
      
      {/* Subtle Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Dynamic Glowing Particle Nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Ambient Central Cyan Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#22d3ee]/15 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
