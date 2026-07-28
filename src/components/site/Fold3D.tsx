import React, { useRef } from "react";

/**
 * Samsung Galaxy Z Fold — 3-Layer CSS Animation
 *
 * ❌ NO rotateY  ❌ NO perspective  ❌ NO transform-origin
 * ✅ Only: opacity · scale · clip-path
 * ✅ mix-blend-mode: multiply  →  white backgrounds become invisible
 *
 * Layers:
 *   layer-back   → phone closed, back panel
 *   layer-cover  → phone half-open with cover display
 *   layer-inner  → phone fully open, inner display
 */
export function Fold3D() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const el =
      document.getElementById("samsung-section") ||
      document.getElementById("featured-mobiles");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        /* ── Outer fixed wrapper ── */
        .fold-phone {
          position: fixed;
          right: 30px;
          bottom: 30px;
          z-index: 999;
          pointer-events: auto;
          cursor: pointer;
          /* mix-blend-mode on images handles background removal */
          background: transparent;
        }

        /* ── Responsive stage (just a size box, no background) ── */
        .fold-stage {
          position: relative;
          width: 120px;
          height: 220px;
          background: transparent;
        }
        @media (min-width: 640px) {
          .fold-stage { width: 150px; height: 270px; }
        }
        @media (min-width: 1024px) {
          .fold-stage { width: 185px; height: 330px; }
        }

        /* ── Shared layer styles ── */
        .fold-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: transparent;
          /* KEY: multiply blending makes pure-white pixels completely invisible */
          mix-blend-mode: multiply;
          backface-visibility: hidden;
          will-change: opacity, transform;
          user-select: none;
          pointer-events: none;
          -webkit-user-drag: none;
        }

        /* ── Animation: Back Panel (0-20%, returns 80-100%) ── */
        .layer-back {
          opacity: 1;
          animation: anim-back 9s ease-in-out infinite;
        }
        @keyframes anim-back {
          0%   { opacity: 1; transform: scale(1); }
          18%  { opacity: 1; transform: scale(1); }
          32%  { opacity: 0; transform: scale(0.96); }
          76%  { opacity: 0; transform: scale(0.96); }
          90%  { opacity: 1; transform: scale(1); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* ── Animation: Cover/Half-open (20-45%, returns 65-80%) ── */
        .layer-cover {
          opacity: 0;
          animation: anim-cover 9s ease-in-out infinite;
        }
        @keyframes anim-cover {
          0%   { opacity: 0; transform: scale(0.96); }
          18%  { opacity: 0; transform: scale(0.96); }
          32%  { opacity: 1; transform: scale(1); }
          46%  { opacity: 1; transform: scale(1); }
          60%  { opacity: 0; transform: scale(0.96); }
          74%  { opacity: 0; transform: scale(0.96); }
          86%  { opacity: 1; transform: scale(1); }
          94%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.96); }
        }

        /* ── Animation: Inner display fully open (45-65%) ── */
        .layer-inner {
          opacity: 0;
          transform: scale(0.9);
          clip-path: inset(0 20% 0 20%);
          animation: anim-inner 9s ease-in-out infinite;
        }
        @keyframes anim-inner {
          0%   { opacity: 0; transform: scale(0.9);  clip-path: inset(0 20% 0 20%); }
          46%  { opacity: 0; transform: scale(0.9);  clip-path: inset(0 20% 0 20%); }
          62%  { opacity: 1; transform: scale(1);    clip-path: inset(0 0%  0 0%);  }
          72%  { opacity: 1; transform: scale(1);    clip-path: inset(0 0%  0 0%);  }
          80%  { opacity: 0; transform: scale(0.9);  clip-path: inset(0 20% 0 20%); }
          100% { opacity: 0; transform: scale(0.9);  clip-path: inset(0 20% 0 20%); }
        }

        /* ── Hover: slight float up ── */
        .fold-phone:hover .fold-stage {
          transform: translateY(-6px);
          transition: transform 0.35s ease;
        }
        .fold-phone .fold-stage {
          transition: transform 0.35s ease;
        }
      `}</style>

      <div
        className="fold-phone"
        ref={wrapRef}
        onClick={handleClick}
        title="Samsung Galaxy Z Fold — tap to explore"
        role="button"
        aria-label="Samsung Galaxy Z Fold animation"
      >
        <div className="fold-stage">
          {/* Layer 1 — Closed back panel */}
          <img
            className="fold-layer layer-back"
            src="/phone-closed.jpg"
            alt="Samsung Galaxy Z Fold closed"
            loading="eager"
            decoding="async"
          />

          {/* Layer 2 — Half-open with cover display */}
          <img
            className="fold-layer layer-cover"
            src="/phone-cover.jpg"
            alt="Samsung Galaxy Z Fold cover display"
            loading="eager"
            decoding="async"
          />

          {/* Layer 3 — Fully open inner display */}
          <img
            className="fold-layer layer-inner"
            src="/phone-inner.jpg"
            alt="Samsung Galaxy Z Fold fully open"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </>
  );
}
