import React, { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';

const FlowBackground = () => {
  const { isDark, reduceMotion } = useTheme();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -2000, y: -2000, targetX: -2000, targetY: -2000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -2000;
      mouseRef.current.targetY = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let wavePhase = 0;
    const mouse = mouseRef.current;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth physics-based cursor position interpolation
      if (mouse.targetX !== -2000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        mouse.x += (-2000 - mouse.x) * 0.08;
        mouse.y += (-2000 - mouse.y) * 0.08;
      }

      // Slowly increment the phase to simulate gentle liquid flow (if motion is allowed)
      if (!reduceMotion) {
        wavePhase += 0.0025;
      }

      // Number of parallel topographic contour lines emanating from each corner
      const numLines = 22;
      const baseSpacing = 32; // Spacing in pixels
      const maxDistanceRatio = 0.95; // Fades out completely when sweeping across 95% of screen diagonal
      const diagonal = Math.sqrt(width * width + height * height);
      const fadeThreshold = diagonal * maxDistanceRatio;

      // --- 1. Top-Left Corner Contour System ---
      for (let i = 0; i < numLines; i++) {
        // Curve base radius from the top-left corner (0,0)
        // Adding dynamic incremental spacing to make the outer lines feel spaced apart like real topography
        const baseRadius = 80 + i * baseSpacing * (1 + i * 0.015);
        
        if (baseRadius > fadeThreshold) continue;

        // Opacity soft-fades as lines approach the middle of the screen
        const opacityFactor = Math.pow(Math.max(0, Math.min(1, (fadeThreshold - baseRadius) / (fadeThreshold - 80))), 1.2);
        
        ctx.beginPath();
        ctx.lineWidth = 1.0 + (i * 0.03); // Elegant ultra-thin stroke scaling
        
        ctx.strokeStyle = isDark
          ? `rgba(96, 165, 250, ${opacityFactor * 0.35})` // Subtle glowing royal blue (dark mode)
          : `rgba(212, 163, 115, ${opacityFactor * 0.35})`; // Sleek soft beige/cream (light mode)

        const angleStep = 0.015;
        let first = true;

        // Sweep theta from just off-screen left to just off-screen top
        for (let theta = -0.2; theta <= Math.PI / 2 + 0.2; theta += angleStep) {
          // Topographic generative wave modulation
          let r = baseRadius + 
                  Math.sin(theta * 3.5 + wavePhase) * 16 + 
                  Math.cos(theta * 1.8 - wavePhase * 0.7) * 8;

          // Coordinate calculation from top-left (0,0)
          let px = r * Math.cos(theta);
          let py = r * Math.sin(theta);

          // Physics-based cursor fluid displacement
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;

          if (dist < maxDist) {
            const force = Math.pow((maxDist - dist) / maxDist, 2.5); // Exponential push away
            px += (dx / (dist || 1)) * force * 45;
            py += (dy / (dist || 1)) * force * 45;
          }

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      // --- 2. Bottom-Right Corner Contour System ---
      for (let i = 0; i < numLines; i++) {
        // Curve base radius from the bottom-right corner (width, height)
        const baseRadius = 80 + i * baseSpacing * (1 + i * 0.015);
        
        if (baseRadius > fadeThreshold) continue;

        const opacityFactor = Math.pow(Math.max(0, Math.min(1, (fadeThreshold - baseRadius) / (fadeThreshold - 80))), 1.2);
        
        ctx.beginPath();
        ctx.lineWidth = 1.0 + (i * 0.03);
        
        ctx.strokeStyle = isDark
          ? `rgba(168, 85, 247, ${opacityFactor * 0.3})` // Subtle glowing lavender (dark mode)
          : `rgba(224, 180, 140, ${opacityFactor * 0.35})`; // Thin warm ivory/beige (light mode)

        const angleStep = 0.015;
        let first = true;

        // Sweep theta to draw diagonal lines from bottom edge to right edge
        for (let theta = -0.2; theta <= Math.PI / 2 + 0.2; theta += angleStep) {
          // Different frequency/phase to make bottom-right waves independent and natural
          let r = baseRadius + 
                  Math.sin(theta * 4.0 - wavePhase * 0.8) * 14 + 
                  Math.cos(theta * 2.2 + wavePhase * 0.5) * 7;

          // Coordinate calculation from bottom-right (width, height)
          let px = width - r * Math.cos(theta);
          let py = height - r * Math.sin(theta);

          // Physics-based cursor fluid displacement
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;

          if (dist < maxDist) {
            const force = Math.pow((maxDist - dist) / maxDist, 2.5);
            px += (dx / (dist || 1)) * force * 45;
            py += (dy / (dist || 1)) * force * 45;
          }

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark, reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none transition-all duration-1000 ${
        isDark 
          ? 'bg-[#071226] bg-gradient-to-b from-[#071226] via-[#0b1730] to-[#111827]' 
          : 'bg-[#FAF7F0] bg-gradient-to-b from-[#FAF7F0] via-[#F8F6F2] to-[#EEF4FF]'
      }`}
    >
      {/* Ambient Mesh Glows (Light Mode) */}
      {!isDark && (
        <>
          {/* Subtle Corner Peach Glow */}
          <div 
            className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#FFF1E6] filter blur-[120px] opacity-70 mix-blend-multiply animate-pulse" 
            style={{ animationDuration: '10s' }}
          />
          {/* Light Blue / Lavender Flow Ambient */}
          <div 
            className="absolute bottom-[-15%] right-[-15%] w-[65vw] h-[65vw] rounded-full bg-[#EEF4FF] filter blur-[140px] opacity-75 mix-blend-multiply animate-pulse"
            style={{ animationDuration: '16s', animationDelay: '2s' }}
          />
          {/* Center soft glow to enhance login card highlights */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-white filter blur-[100px] opacity-50 mix-blend-overlay"
          />
        </>
      )}

      {/* Ambient Mesh Glows (Dark Mode) */}
      {isDark && (
        <>
          {/* Deep Midnight Graphite Corner Glow */}
          <div 
            className="absolute top-[-25%] left-[-25%] w-[65vw] h-[65vw] rounded-full bg-[#0b1730] filter blur-[140px] opacity-95 animate-pulse"
            style={{ animationDuration: '11s' }}
          />
          {/* Royal Blue Ambient Lighting */}
          <div 
            className="absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#2563EB] filter blur-[150px] opacity-[0.12] animate-pulse"
            style={{ animationDuration: '14s', animationDelay: '1s' }}
          />
          {/* Deep Purple-Blue Gradient Accent */}
          <div 
            className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#7C3AED] filter blur-[130px] opacity-[0.08] animate-pulse"
            style={{ animationDuration: '18s', animationDelay: '3s' }}
          />
        </>
      )}

      {/* Interactive Topographic Flow Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default FlowBackground;
