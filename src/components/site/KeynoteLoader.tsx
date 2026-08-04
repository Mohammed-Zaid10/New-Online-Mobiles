import { useState, useEffect } from "react";

interface KeynoteLoaderProps {
  onComplete?: () => void;
}

const LOADING_TEXTS = [
  "Initializing...",
  "Loading Products...",
  "Optimizing Experience...",
  "Almost Ready..."
];

export function KeynoteLoader({ onComplete }: KeynoteLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<"loading" | "flash" | "done">("loading");

  useEffect(() => {
    const duration = 4000; // 4 seconds total loading time
    const interval = 40; // 40ms interval for smooth progress
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += (interval / duration) * 100;
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
      
      // Update text index based on progress
      const newIndex = Math.min(
        LOADING_TEXTS.length - 1, 
        Math.floor((currentProgress / 100) * LOADING_TEXTS.length)
      );
      if (newIndex !== textIndex) {
        setTextIndex(newIndex);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [textIndex, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] text-white overflow-hidden select-none transition-opacity duration-800 ease-in-out ${
        phase === "flash" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        fontFamily: "'Poppins', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <style>{`
        @keyframes float-phone {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        @keyframes unfold-back {
          0% { opacity: 1; transform: scale(0.9); }
          20% { opacity: 1; transform: scale(0.9); }
          40% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(0.95); }
        }
        @keyframes unfold-cover {
          0% { opacity: 0; transform: scale(0.9); }
          20% { opacity: 0; transform: scale(0.9); }
          30% { opacity: 1; transform: scale(0.95); }
          45% { opacity: 0; transform: scale(1); }
          100% { opacity: 0; transform: scale(1); }
        }
        @keyframes unfold-inner {
          0% { opacity: 0; transform: scale(0.9); }
          40% { opacity: 0; transform: scale(0.95); }
          55% { opacity: 1; transform: scale(1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes particles {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        @keyframes edge-reflection {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(200%) rotate(45deg); }
        }
        @keyframes flash-out {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .premium-loader-stage {
          position: relative;
          width: 280px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float-phone 4s ease-in-out infinite;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .premium-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 12px;
          backface-visibility: hidden;
          will-change: opacity, transform;
        }
        
        .p-layer-back { animation: unfold-back 4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .p-layer-cover { animation: unfold-cover 4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .p-layer-inner { animation: unfold-inner 4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        
        .chrome-edge {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          overflow: hidden;
          pointer-events: none;
        }
        
        .chrome-edge::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 50%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: edge-reflection 3s infinite ease-in-out;
        }

        .phone-reflection {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 20px;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: float-phone 4s ease-in-out infinite reverse;
        }

        .text-fade-enter {
          opacity: 0;
          transform: translateY(5px);
        }
        .text-fade-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>

      {/* Cinematic Flash Transition */}
      {phase === "flash" && (
        <div className="absolute inset-0 z-50 bg-white pointer-events-none animate-[flash-out_0.8s_ease-out_forwards]" />
      )}

      {/* Radial Spotlight & Fog */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-white blur-[150px] animate-[glow-pulse_5s_ease-in-out_infinite]" />
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
            style={{
              left: \`\${Math.random() * 100}%\`,
              top: \`\${Math.random() * 100}%\`,
              animation: \`particles \${3 + Math.random() * 4}s linear infinite\`,
              animationDelay: \`\${Math.random() * 2}s\`,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* 3D Floating Phone Animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="premium-loader-stage">
            <img src="/new-fold-back.png" alt="Fold Back" className="premium-layer p-layer-back" />
            <img src="/new-fold-cover.png" alt="Fold Cover" className="premium-layer p-layer-cover" />
            
            <div className="premium-layer p-layer-inner relative">
              <img src="/new-fold-inner.png" alt="Fold Inner" className="w-full h-full object-contain" />
              <div className="chrome-edge" />
            </div>
          </div>
          <div className="phone-reflection" />
        </div>

        {/* Branding & Typography */}
        <div className="mt-16 text-center z-20">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-[8px] text-white">ONLINE MOBILES</h1>
          <p className="mt-2 text-sm text-gray-400 font-medium">Premium Mobile Experience</p>
          
          {/* Progress Indicator */}
          <div className="mt-8 w-64 md:w-80 h-[3px] bg-white/10 rounded-full overflow-hidden mx-auto shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <div 
              className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all ease-linear"
              style={{ width: \`\${progress}%\`, transitionDuration: '40ms' }}
            />
          </div>
          
          {/* Fading Status Text */}
          <div className="mt-3 h-5 relative overflow-hidden">
            <div className="absolute inset-0 flex justify-center text-xs text-gray-400 font-medium tracking-widest uppercase transition-opacity duration-300">
              {LOADING_TEXTS[textIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
