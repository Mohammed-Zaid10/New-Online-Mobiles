import React from "react";

/**
 * Samsung Galaxy Z Fold — 3-Layer CSS Animation
 *
 * ❌ NO position:fixed  — renders inline beside the brands section
 * ❌ NO rotateY / perspective / transform-origin
 * ✅ Only: opacity · scale · clip-path
 * ✅ mix-blend-mode: multiply  → white pixel backgrounds disappear
 */
export function Fold3D() {
  return (
    <>
      <style>{`
        /* ── Wrapper: inline block, no fixed positioning ── */
        .fold-phone {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          /* No position:fixed — sits naturally in the grid column */
        }

        /* ── Responsive stage ── */
        .fold-stage {
          position: relative;
          width: 140px;
          height: 240px;
          background: transparent;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .fold-stage { width: 165px; height: 285px; }
        }
        @media (min-width: 1024px) {
          .fold-stage { width: 200px; height: 340px; }
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
          /*
           * multiply: white (255,255,255) × page-bg = page-bg → invisible
           * phone body stays visible because it's dark
           */
          mix-blend-mode: multiply;
          backface-visibility: hidden;
          will-change: opacity, transform;
          -webkit-user-drag: none;
          user-select: none;
          pointer-events: none;
        }

        /* ── Layer 1: Closed back panel ── */
        .layer-back {
          opacity: 1;
          animation: fold-back 9s ease-in-out infinite;
        }
        @keyframes fold-back {
          0%,  18% { opacity: 1; transform: scale(1);    }
          32%       { opacity: 0; transform: scale(0.96); }
          76%       { opacity: 0; transform: scale(0.96); }
          90%, 100% { opacity: 1; transform: scale(1);    }
        }

        /* ── Layer 2: Half-open cover display ── */
        .layer-cover {
          opacity: 0;
          animation: fold-cover 9s ease-in-out infinite;
        }
        @keyframes fold-cover {
          0%,  18% { opacity: 0; transform: scale(0.96); }
          32%,  46% { opacity: 1; transform: scale(1);   }
          60%       { opacity: 0; transform: scale(0.96); }
          74%       { opacity: 0; transform: scale(0.96); }
          86%,  94% { opacity: 1; transform: scale(1);   }
          100%      { opacity: 0; transform: scale(0.96); }
        }

        /* ── Layer 3: Fully open inner display ── */
        .layer-inner {
          opacity: 0;
          transform: scale(0.9);
          clip-path: inset(0 20% 0 20%);
          animation: fold-inner 9s ease-in-out infinite;
        }
        @keyframes fold-inner {
          0%,  46% { opacity: 0; transform: scale(0.9); clip-path: inset(0 20% 0 20%); }
          62%       { opacity: 1; transform: scale(1);   clip-path: inset(0 0%  0 0%);  }
          72%       { opacity: 1; transform: scale(1);   clip-path: inset(0 0%  0 0%);  }
          80%, 100% { opacity: 0; transform: scale(0.9); clip-path: inset(0 20% 0 20%); }
        }

        /* ── Hover: gentle float ── */
        .fold-phone:hover .fold-stage {
          transform: translateY(-6px);
        }
        .fold-phone .fold-stage {
          transition: transform 0.35s ease;
        }
      `}</style>

      <div className="fold-phone" aria-label="Samsung Galaxy Z Fold animation">
        <div className="fold-stage">
          {/* Layer 1 — Closed back panel */}
          <img
            className="fold-layer layer-back"
            src="/phone-closed.jpg"
            alt="Samsung Galaxy Z Fold closed"
            loading="eager"
            decoding="async"
          />

          {/* Layer 2 — Half-open cover display */}
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
