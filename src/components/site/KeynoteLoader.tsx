import { useState, useEffect, useRef } from "react";

interface KeynoteLoaderProps {
  onComplete?: () => void;
}

export function KeynoteLoader({ onComplete }: KeynoteLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(".");
  const [phase, setPhase] = useState<"loading" | "welcome" | "fadeout" | "done">("loading");
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animated loading dots
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "." : prev + "."));
    }, 450);
    return () => clearInterval(interval);
  }, [phase]);

  // Ensure video starts directly at 2.0s mark (the frame shown in user image)
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.currentTime = 2.0;
    video.play().catch(() => {});
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 2.0 && !isVideoReady) {
      setIsVideoReady(true);
    }
  };

  // Synchronized loading progress (0% -> 100%)
  useEffect(() => {
    const duration = 3400; // 3.4 seconds fallback duration
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      
      // Calculate from 2.0s offset onwards
      if (videoRef.current && videoRef.current.duration) {
        const startOffset = 2.0;
        const totalPlayable = Math.max(0.1, videoRef.current.duration - startOffset);
        const currentPlayable = Math.max(0, videoRef.current.currentTime - startOffset);
        const videoRatio = Math.min(1, Math.max(0, currentPlayable / totalPlayable));
        currentProgress = Math.min(100, Math.round(videoRatio * 100));
      }

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setPhase("welcome");
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // Phase 2 -> Phase 3 Transition Timeline
  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setPhase("fadeout");
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === "fadeout") {
      const timer = setTimeout(() => {
        setPhase("done");
        if (onComplete) onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Fallback video ended handler
  const handleVideoEnded = () => {
    setProgress(100);
    if (phase === "loading") {
      setPhase("welcome");
    }
  };

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden select-none transition-opacity duration-800 ease-out ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        width: "100vw",
        height: "100vh",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* 1. Pure Matte Black Background with Soft Radial Pulsing Spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Soft Radial Spotlight pulsing between 15% & 25% opacity */}
        <div className="w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full bg-white/20 blur-[120px] animate-pulse-ring" />
        
        {/* Subtle Ambient Particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-float-slow" />
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-white/80 rounded-full animate-float-slower" />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-float-slow" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/50 rounded-full animate-float-slower" />
        </div>
      </div>

      {/* Main Full-Screen Video Box */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4">
        {/* Full-Screen Video Element */}
        <div
          className={`relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            phase === "welcome" ? "scale-95 opacity-90" : isVideoReady ? "scale-100 opacity-100" : "opacity-0"
          }`}
        >
          <video
            ref={videoRef}
            src="/phone-loading.mp4#t=2.0"
            autoPlay
            muted
            playsInline
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain filter brightness-105 contrast-110 shadow-[0_0_80px_rgba(255,255,255,0.08)]"
          />
        </div>
      </div>

      {/* Keyframes for emerging text */}
      <style>{`
        @keyframes emerge-text {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
