import React, { useEffect, useRef } from "react";

/**
 * Samsung Galaxy Z Fold Animation
 *
 * Built with 3 SEPARATE LAYERS — never rotates / never bends a PNG.
 *
 * Structure:
 *   .fold-phone
 *     ├── .layer-back    (Image 1 — closed rear panel)
 *     ├── .layer-cover   (Image 2 — cover display open)
 *     └── .layer-inner   (Image 3 — inner main display)
 *
 * Timeline (8 s loop):
 *   0 – 20%   Back panel visible, others hidden
 *   20 – 45%  Back → Cover (fade + subtle scale)
 *   45 – 75%  Cover → Inner (fade + width expand)
 *   75 – 100% Inner → Cover → Back (reverse)
 *
 * ❌ NO rotateY  ❌ NO perspective  ❌ NO transform-origin:left
 * ✅ Only: opacity · scale · width
 */
export function Fold3D() {
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Scroll-to-Samsung on click */
  const handleClick = () => {
    const el =
      document.getElementById("samsung-section") ||
      document.getElementById("featured-mobiles");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── CSS keyframes injected once via <style> ─────────────────── */}
      <style>{`
        .fold-phone {
          position: fixed;
          right: 30px;
          bottom: 30px;
          z-index: 999;
          pointer-events: auto;
          cursor: pointer;
          background: transparent !important;
          filter: drop-shadow(0 18px 22px rgba(0,0,0,0.45));
        }

        /* Each layer sits on top of each other, same origin */
        .fold-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: transparent !important;
          will-change: opacity, transform;
          backface-visibility: hidden;
        }

        /* ─── Sizing wrapper (responsive) ─── */
        .fold-stage {
          position: relative;
          width: 130px;
          height: 200px;
          background: transparent !important;
        }
        @media (min-width: 640px) {
          .fold-stage { width: 170px; height: 260px; }
        }
        @media (min-width: 1024px) {
          .fold-stage { width: 200px; height: 300px; }
        }

        /* ─── Layer 1: Back Panel ─── */
        .layer-back {
          animation: anim-back 8s ease-in-out infinite;
        }
        @keyframes anim-back {
          /* 0–20%: fully visible */
          0%   { opacity: 1;  transform: scale(1); }
          20%  { opacity: 1;  transform: scale(1); }
          /* 20–35%: fade OUT */
          35%  { opacity: 0;  transform: scale(0.97); }
          /* Hidden while cover & inner shown */
          74%  { opacity: 0;  transform: scale(0.97); }
          /* 75–85%: fade back IN (reverse step) */
          88%  { opacity: 1;  transform: scale(1); }
          100% { opacity: 1;  transform: scale(1); }
        }

        /* ─── Layer 2: Cover Display ─── */
        .layer-cover {
          opacity: 0;
          animation: anim-cover 8s ease-in-out infinite;
        }
        @keyframes anim-cover {
          /* Hidden initially */
          0%   { opacity: 0; transform: scale(0.97); }
          20%  { opacity: 0; transform: scale(0.97); }
          /* 20–35%: fade IN */
          35%  { opacity: 1; transform: scale(1); }
          /* Hold */
          48%  { opacity: 1; transform: scale(1); }
          /* 48–62%: fade OUT as inner comes in */
          62%  { opacity: 0; transform: scale(0.97); }
          /* Stay hidden while inner is showing */
          72%  { opacity: 0; transform: scale(0.97); }
          /* 72–85%: fade back IN (reverse) */
          85%  { opacity: 1; transform: scale(1); }
          /* 85–100%: fade OUT again as back panel returns */
          100% { opacity: 0; transform: scale(0.97); }
        }

        /* ─── Layer 3: Inner Main Display ─── */
        .layer-inner {
          opacity: 0;
          /* Starts narrow, expands to simulate the fold opening */
          transform: scale(0.92);
          clip-path: inset(0 25% 0 25%);
          animation: anim-inner 8s ease-in-out infinite;
        }
        @keyframes anim-inner {
          0%   { opacity: 0; transform: scale(0.92); clip-path: inset(0 25% 0 25%); }
          48%  { opacity: 0; transform: scale(0.92); clip-path: inset(0 25% 0 25%); }
          /* 48–65%: expand in — width grows by releasing clip-path, scale 0.92→1 */
          65%  { opacity: 1; transform: scale(1);    clip-path: inset(0 0% 0 0%); }
          /* Hold fully open */
          72%  { opacity: 1; transform: scale(1);    clip-path: inset(0 0% 0 0%); }
          /* 72–82%: fold back out */
          82%  { opacity: 0; transform: scale(0.92); clip-path: inset(0 25% 0 25%); }
          100% { opacity: 0; transform: scale(0.92); clip-path: inset(0 25% 0 25%); }
        }

        /* Hover: very slight scale up (premium feel) */
        .fold-phone:hover .fold-stage {
          transform: scale(1.04);
          transition: transform 0.4s ease;
        }
      `}</style>

      {/* ── Phone DOM Structure ──────────────────────────────────────── */}
      <div
        className="fold-phone"
        ref={wrapRef}
        onClick={handleClick}
        title="Samsung Galaxy Z Fold — click to explore Samsung phones"
      >
        <div className="fold-stage">
          {/* Layer 1 — Closed Back Panel */}
          <img
            className="fold-layer layer-back"
            src="/fold-back.png"
            alt="Samsung Galaxy Z Fold — closed back"
            loading="eager"
            draggable={false}
          />

          {/* Layer 2 — Cover Display Open */}
          <img
            className="fold-layer layer-cover"
            src="/fold-cover.png"
            alt="Samsung Galaxy Z Fold — cover display"
            loading="eager"
            draggable={false}
          />

          {/* Layer 3 — Inner Main Display */}
          <img
            className="fold-layer layer-inner"
            src="/fold-inner.png"
            alt="Samsung Galaxy Z Fold — inner display open"
            loading="eager"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}
