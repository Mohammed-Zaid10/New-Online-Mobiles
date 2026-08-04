import { useState, useEffect } from "react";

interface KeynoteLoaderProps {
  onComplete?: () => void;
}

const LOADING_TEXTS = [
  "Initializing...",
  "Loading Products...",
  "Optimizing Experience...",
  "Almost Ready...",
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 5.1 + 3) % 100,
  top: (i * 11.3 + 7) % 100,
  size: i % 3 === 0 ? 3 : 2,
  duration: 3 + (i % 5),
  delay: (i * 0.35) % 3,
}));

export function KeynoteLoader({ onComplete }: KeynoteLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<"loading" | "flash" | "done">("loading");

  useEffect(() => {
    const duration = 3500;
    const intervalMs = 40;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += (intervalMs / duration) * 100;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setPhase("flash");
        setTimeout(() => {
          setPhase("done");
          if (onComplete) onComplete();
        }, 800);
      }
      setProgress(currentProgress);
      const newIndex = Math.min(
        LOADING_TEXTS.length - 1,
        Math.floor((currentProgress / 100) * LOADING_TEXTS.length)
      );
      setTextIndex(newIndex);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        color: "#fff",
        overflow: "hidden",
        userSelect: "none",
        opacity: phase === "flash" ? 0 : 1,
        transition: "opacity 0.8s ease-in-out",
        fontFamily: "'Poppins', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        @keyframes particle-rise {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          15%  { opacity: 0.6; }
          85%  { opacity: 0.6; }
          100% { transform: translateY(-120px) scale(0); opacity: 0; }
        }
        @keyframes glow-breathe {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50%       { opacity: 0.18; transform: scale(1.1); }
        }
        @keyframes logo-appear {
          0%   { opacity: 0; transform: translateY(18px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes flash-white {
          0%   { opacity: 0; }
          40%  { opacity: 0.95; }
          100% { opacity: 0; }
        }
        @keyframes bar-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(255,255,255,0.6); }
          50%       { box-shadow: 0 0 18px rgba(255,255,255,1); }
        }
      `}</style>

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 35%, #000 100%)",
      }} />

      {/* Central radial glow */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{
          width: 600, height: 600, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          filter: "blur(100px)",
          animation: "glow-breathe 5s ease-in-out infinite",
        }} />
      </div>

      {/* Ambient particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
              boxShadow: "0 0 6px 2px rgba(255,255,255,0.4)",
              animation: `particle-rise ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* White flash on complete */}
      {phase === "flash" && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 50,
          background: "#fff", pointerEvents: "none",
          animation: "flash-white 0.8s ease-out forwards",
        }} />
      )}

      {/* Branding & progress */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center",
        animation: "logo-appear 1s cubic-bezier(0.22,1,0.36,1) forwards",
      }}>
        {/* Logo / Brand name */}
        <div style={{ marginBottom: 12, opacity: 0.15 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="white" strokeWidth="1.2" />
            <path d="M13 28V12h4l3 8 3-8h4v16h-3V18l-4 10-4-10v10z" fill="white" />
          </svg>
        </div>

        <h1 style={{
          fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
          fontWeight: 600,
          letterSpacing: "10px",
          color: "#fff",
          margin: 0,
          textTransform: "uppercase",
        }}>
          Online Mobiles
        </h1>

        <p style={{
          marginTop: 10,
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "4px",
          fontWeight: 400,
          textTransform: "uppercase",
        }}>
          Premium Mobile Experience
        </p>

        {/* Thin horizontal line divider */}
        <div style={{
          marginTop: 32,
          width: 40,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }} />

        {/* Progress bar */}
        <div style={{
          marginTop: 28,
          width: "min(300px, 70vw)",
          height: 2,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99,
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "#fff",
            borderRadius: 99,
            animation: "bar-glow 1.5s ease-in-out infinite",
            transition: "width 40ms linear",
          }} />
        </div>

        {/* Status text */}
        <p style={{
          marginTop: 14,
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          fontWeight: 500,
          transition: "opacity 0.4s",
          minHeight: "1em",
        }}>
          {LOADING_TEXTS[textIndex]}
        </p>
      </div>
    </div>
  );
}
