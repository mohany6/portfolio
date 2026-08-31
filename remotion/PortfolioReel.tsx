/**
 * ==============================================================================
 * Mohamed Hany Fathy — 15s Cinematic Developer Showreel (Remotion Composition)
 * ==============================================================================
 * 
 * Composition Specs:
 * - Resolution: 1920x1080 (16:9 Full HD)
 * - Frame Rate: 60 fps
 * - Duration: 900 frames (15.0 seconds)
 * 
 * How to Render:
 * 1. Scaffold Remotion project (if not already done):
 *    npx create-video@latest --yes --blank --no-tailwind portfolio-reel
 * 2. Copy this file into `src/PortfolioReel.tsx`
 * 3. Preview in Studio:
 *    npx remotion studio
 * 4. Render to MP4:
 *    npx remotion render src/PortfolioReel.tsx PortfolioReel out/portfolio-reel.mp4
 * ==============================================================================
 */

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Composition,
} from 'remotion';

export const PortfolioReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#050811', fontFamily: 'Inter, sans-serif' }}>
      {/* Scene 1: Hero Identity & Thesis (0s - 4s / frames 0 - 240) */}
      <Sequence from={0} durationInFrames={240}>
        <HeroScene />
      </Sequence>

      {/* Scene 2: Flagship MyHealthAI Deep-Dive (4s - 9s / frames 240 - 540) */}
      <Sequence from={240} durationInFrames={300}>
        <MyHealthAIScene />
      </Sequence>

      {/* Scene 3: High-Concurrency FC26 Engine (9s - 13s / frames 540 - 780) */}
      <Sequence from={540} durationInFrames={240}>
        <ConcurrencyScene />
      </Sequence>

      {/* Scene 4: Call to Action & Contact (13s - 15s / frames 780 - 900) */}
      <Sequence from={780} durationInFrames={120}>
        <CallToActionScene />
      </Sequence>
    </AbsoluteFill>
  );
};

// ============================================================================
// Scene 1: Hero Identity
// ============================================================================
const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const subtitleOpacity = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: 'clamp' });
  const glowPulse = Math.sin(frame * 0.08) * 15 + 25;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
          filter: `blur(${glowPulse}px)`,
        }}
      />
      <div style={{ transform: `scale(${titleScale})`, textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#06b6d4',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Software Developer • Full-Stack • AI Agents
        </div>
        <h1
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: '#f8fafc',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #38bdf8 0%, #06b6d4 35%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}
        >
          Mohamed Hany Fathy
        </h1>
        <p
          style={{
            opacity: subtitleOpacity,
            fontSize: 32,
            color: '#94a3b8',
            marginTop: 24,
            maxWidth: 1000,
          }}
        >
          Architecting High-Throughput Pipelines & Secured AI Systems
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// Scene 2: Flagship MyHealthAI
// ============================================================================
const MyHealthAIScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSlide = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const stat1 = Math.min(85, Math.floor(interpolate(frame, [15, 60], [0, 85])));
  const stat2 = Math.min(95, Math.floor(interpolate(frame, [30, 75], [0, 95])));
  const stat3 = Math.min(30, Math.floor(interpolate(frame, [45, 90], [0, 30])));

  return (
    <AbsoluteFill style={{ padding: '80px 120px', justifyContent: 'center' }}>
      <div style={{ transform: `translateY(${(1 - cardSlide) * 60}px)`, opacity: cardSlide }}>
        <div style={{ fontSize: 22, color: '#10b981', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          ⭐ Flagship Architecture
        </div>
        <h2 style={{ fontSize: 64, fontWeight: 800, color: '#f8fafc', margin: '12px 0 36px 0' }}>
          MyHealthAI Telemedicine Platform
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          <StatCard number={`${stat1}+`} label="Production REST Endpoints" color="#06b6d4" />
          <StatCard number={`${stat2}%`} label="AI Pneumonia Diagnostic Accuracy" color="#10b981" />
          <StatCard number={`-${stat3}%`} label="API Latency Optimization" color="#8b5cf6" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// Scene 3: High-Concurrency FC26 Engine
// ============================================================================
const ConcurrencyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, config: { damping: 15, stiffness: 110 } });

  return (
    <AbsoluteFill style={{ padding: '80px 120px', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${entrance})`, opacity: entrance }}>
        <div style={{ fontSize: 22, color: '#38bdf8', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          ⚡ Concurrency & Protocol Automation
        </div>
        <h2 style={{ fontSize: 64, fontWeight: 800, color: '#f8fafc', margin: '12px 0 36px 0' }}>
          FC26 High-Throughput Suite
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          <StatCard number="100" label="Concurrent Worker Threads" color="#38bdf8" />
          <StatCard number="48" label="Live Scraper Sources" color="#f59e0b" />
          <StatCard number="3,800+" label="Lines of Resilient Python" color="#10b981" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// Scene 4: Call To Action
// ============================================================================
const CallToActionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 130 } });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ transform: `scale(${scale})` }}>
        <h2 style={{ fontSize: 72, fontWeight: 900, color: '#f8fafc', margin: 0 }}>
          Let{"'"}s Build Something Exceptional
        </h2>
        <p style={{ fontSize: 30, color: '#06b6d4', marginTop: 20, fontFamily: 'monospace' }}>
          mahamedhany8@gmail.com • github.com/mohany6
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Reusable Stat Card
const StatCard: React.FC<{ number: string; label: string; color: string }> = ({ number, label, color }) => (
  <div
    style={{
      background: 'rgba(12, 20, 38, 0.85)',
      border: `1px solid ${color}44`,
      borderTop: `2px solid ${color}`,
      borderRadius: 20,
      padding: '36px 28px',
      boxShadow: `0 16px 36px -8px rgba(0,0,0,0.5)`,
    }}
  >
    <div style={{ fontSize: 60, fontWeight: 900, color, fontFamily: 'JetBrains Mono, monospace' }}>
      {number}
    </div>
    <div style={{ fontSize: 20, color: '#94a3b8', marginTop: 10, fontWeight: 500 }}>
      {label}
    </div>
  </div>
);

// Self-contained Remotion Root Entry
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PortfolioReel"
      component={PortfolioReel}
      durationInFrames={900}
      fps={60}
      width={1920}
      height={1080}
    />
  );
};
