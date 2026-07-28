import React, { useState, useEffect } from "react";

const STEPS = [
  {
    id: "closed",
    name: "Step 1: Closed Phone",
    img: "/zfold-step1.png",
    duration: 1400, // Closed hold state
  },
  {
    id: "unfolding",
    name: "Step 2: Unfold & Cover Display On",
    img: "/zfold-step2.png",
    duration: 1800, // Unfolding cover display state
  },
  {
    id: "opened",
    name: "Step 3: Open Main Display",
    img: "/zfold-step3.png",
    duration: 2400, // Main display open state
  },
  {
    id: "folding_back",
    name: "Folding Back",
    img: "/zfold-step2.png",
    duration: 1200, // Closing back transition
  },
];

export function Fold3D() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const currentStep = STEPS[stepIndex];
    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % STEPS.length);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [stepIndex, isHovered]);

  const handleClick = () => {
    const elem = document.getElementById("samsung-section") || document.getElementById("featured-mobiles");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed bottom-[30px] right-[30px] z-50 cursor-pointer select-none transition-transform duration-500 ease-out group"
      style={{
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="Samsung Galaxy Z Fold — Click to view Samsung smartphones"
    >
      {/* Phone Stage Wrapper with Soft Under-Phone Shadow */}
      <div className="relative flex flex-col items-center">
        {/* Main Phone Image Container with Smooth 600ms Cross-fade */}
        <div className="relative h-[150px] sm:h-[220px] lg:h-[270px] w-auto aspect-[3/4] flex items-center justify-center">
          {STEPS.slice(0, 3).map((step, idx) => {
            // Determine active image frame
            const isCurrent =
              idx === stepIndex || (stepIndex === 3 && idx === 1); // stepIndex 3 uses step 2 image for closing

            return (
              <img
                key={step.id}
                src={step.img}
                alt={step.name}
                loading="eager"
                className={`absolute h-full w-auto object-contain transition-all duration-700 ease-in-out filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.65)] ${
                  isCurrent
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-95 z-0"
                }`}
              />
            );
          })}
        </div>

        {/* Soft Oval Ground Shadow under the phone */}
        <div
          className="w-3/4 h-3 bg-black/60 blur-md rounded-full mt-1 transition-transform duration-500"
          style={{
            transform: stepIndex === 2 ? "scaleX(1.3)" : "scaleX(1)",
          }}
        />
      </div>
    </div>
  );
}
