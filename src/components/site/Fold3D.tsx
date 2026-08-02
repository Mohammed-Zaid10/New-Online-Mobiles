import React from "react";

/**
 * Samsung Galaxy Z Fold — 3-Layer Animated Stage Showcase
 * Uses transparent high-resolution PNG assets for 100% crisp visibility
 * on both Dark Keynote & Light backgrounds.
 */
export function Fold3D() {
  return (
    <>
      <style>{`
        .fold-phone {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          border-radius: 20px;
          padding: 12px;
        }

        .fold-stage {
          position: relative;
          width: 160px;
          height: 260px;
          background: #000;
          flex-shrink: 0;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 640px) {
          .fold-stage { width: 190px; height: 300px; }
        }
        @media (min-width: 1024px) {
          .fold-stage { width: 230px; height: 360px; }
        }

        .fold-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          background: #000;
          mix-blend-mode: normal;
          border-radius: 12px;
          backface-visibility: hidden;
          will-change: opacity, transform;
          user-select: none;
          pointer-events: none;
        }

        /* ── Layer 1: Closed back panel ── */
        .layer-back {
          opacity: 1;
          animation: fold-back 9s ease-in-out infinite;
        }
        @keyframes fold-back {
          0%, 22% { opacity: 1; transform: scale(1); }
          34% { opacity: 0; transform: scale(0.96); }
          76% { opacity: 0; transform: scale(0.96); }
          88%, 100% { opacity: 1; transform: scale(1); }
        }

        /* ── Layer 2: Half-open cover display ── */
        .layer-cover {
          opacity: 0;
          animation: fold-cover 9s ease-in-out infinite;
        }
        @keyframes fold-cover {
          0%, 22% { opacity: 0; transform: scale(0.96); }
          34%, 48% { opacity: 1; transform: scale(1); }
          60% { opacity: 0; transform: scale(0.96); }
          74% { opacity: 0; transform: scale(0.96); }
          86%, 94% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.96); }
        }

        /* ── Layer 3: Fully open inner display ── */
        .layer-inner {
          opacity: 0;
          transform: scale(0.94);
          animation: fold-inner 9s ease-in-out infinite;
        }
        @keyframes fold-inner {
          0%, 48% { opacity: 0; transform: scale(0.94); }
          62%, 74% { opacity: 1; transform: scale(1); }
          84%, 100% { opacity: 0; transform: scale(0.94); }
        }

        .fold-phone:hover .fold-stage {
          transform: translateY(-8px) scale(1.03);
        }
      `}</style>

      <div className="fold-phone" aria-label="Samsung Galaxy Z Fold showcase">
        <div className="fold-stage">
          {/* Layer 1 — Closed back panel */}
          <img
            className="fold-layer layer-back"
            src="/new-fold-back.png"
            alt="Samsung Galaxy Z Fold closed"
            loading="eager"
          />

          {/* Layer 2 — Half-open cover display */}
          <img
            className="fold-layer layer-cover"
            src="/new-fold-cover.png"
            alt="Samsung Galaxy Z Fold cover display"
            loading="eager"
          />

          {/* Layer 3 — Fully open inner display */}
          <img
            className="fold-layer layer-inner"
            src="/new-fold-inner.png"
            alt="Samsung Galaxy Z Fold fully open"
            loading="eager"
          />
        </div>
      </div>
    </>
  );
}
