import React, { useState, useEffect } from "react";

// Keyframe Timeline States (Always Front-Facing to Viewer)
// State 1: Closed Phone (zfold-step1.png) -> Hold 1s
// State 2: Smooth Unfold + Cover Display On (zfold-step2.png) -> Hold 1.5s
// State 3: Open Main Display On (zfold-step3.png) -> Hold 2s
// State 4: Fold Back Closed (zfold-step2.png -> zfold-step1.png)

const KEYFRAMES = [
  {
    id: "state1_closed",
    name: "State 1: Phone Closed",
    img: "/zfold-step1.png",
    duration: 1200, // 1.2s hold
    shadowWidth: "w-28",
  },
  {
    id: "state2_cover",
    name: "State 2: Unfold & Cover Display On",
    img: "/zfold-step2.png",
    duration: 1800, // 1.8s hold
    shadowWidth: "w-40",
  },
  {
    id: "state3_inner",
    name: "State 3: Open Main Display",
    img: "/zfold-step3.png",
    duration: 2500, // 2.5s hold
    shadowWidth: "w-52",
  },
  {
    id: "state4_reverse",
    name: "Reverse: Folding Back",
    img: "/zfold-step2.png",
    duration: 1400, // 1.4s closing morph
    shadowWidth: "w-40",
  },
];

export function Fold3D() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const currentFrame = KEYFRAMES[frameIndex];
    const timer = setTimeout(() => {
      setFrameIndex((prev) => (prev + 1) % KEYFRAMES.length);
    }, currentFrame.duration);

    return () => clearTimeout(timer);
  }, [frameIndex, isHovered]);

  const handleClick = () => {
    const elem = document.getElementById("samsung-section") || document.getElementById("featured-mobiles");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Determine active display frame index (0, 1, 2)
  const activeImageIdx = frameIndex === 3 ? 1 : frameIndex;

  return (
    <div
      className="fixed bottom-[30px] right-[30px] z-50 cursor-pointer select-none transition-transform duration-500 ease-out group"
      style={{
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Samsung Galaxy Z Fold — Click to explore Samsung smartphones"
    >
      <div className="relative flex flex-col items-center">
        {/* Front-Facing Stage Container (Fixed camera perspective, NO 3D spinning rotation) */}
        <div className="relative h-[160px] sm:h-[220px] lg:h-[270px] w-[200px] sm:w-[260px] lg:w-[310px] flex items-center justify-center overflow-hidden">
          
          {/* Keyframe 1: Phone Closed (zfold-step1.png) */}
          <img
            src="/zfold-step1.png"
            alt="State 1: Closed Phone"
            className={`absolute h-full w-auto object-contain transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.65)] ${
              activeImageIdx === 0
                ? "opacity-100 scale-100 z-10 translate-y-0"
                : "opacity-0 scale-95 z-0 translate-y-1"
            }`}
          />

          {/* Keyframe 2: Unfold & Cover Display On (zfold-step2.png) */}
          <img
            src="/zfold-step2.png"
            alt="State 2: Unfolding Cover Display"
            className={`absolute h-full w-auto object-contain transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.65)] ${
              activeImageIdx === 1
                ? "opacity-100 scale-100 z-10 translate-y-0"
                : "opacity-0 scale-95 z-0 translate-y-1"
            }`}
          />

          {/* Keyframe 3: Open Main Display (zfold-step3.png) */}
          <img
            src="/zfold-step3.png"
            alt="State 3: Fully Opened Main Display"
            className={`absolute h-full w-auto object-contain transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.65)] ${
              activeImageIdx === 2
                ? "opacity-100 scale-100 z-10 translate-y-0"
                : "opacity-0 scale-95 z-0 translate-y-1"
            }`}
          />
        </div>

        {/* Soft Realistic Under-Phone Ground Shadow (Expands naturally with unfold) */}
        <div
          className={`h-3 bg-black/60 blur-md rounded-full mt-1 transition-all duration-700 ${
            KEYFRAMES[frameIndex].shadowWidth
          }`}
        />
      </div>
    </div>
  );
}
