import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  RotateCw, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2,
  Play, Pause, Compass, Move
} from "lucide-react";

export type Product360Item = {
  id: string;
  name: string;
  brand: string;
  price: string;
  frontImage: string;   // path served from /public/phones/
  accentColor: string;
  frameColor: string;   // CSS color for metallic edge
  backColor: string;    // dominant back-panel color
  cameraCount: number;  // lenses to draw on back
  colors: { name: string; hex: string }[];
  specs: { display: string; camera: string; chipset: string };
};

export const SAMPLE_360_PRODUCTS: Product360Item[] = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    price: "₹1,49,900",
    frontImage: "/phones/iphone17-pro-max.jpg",
    accentColor: "#D4AF37",
    frameColor: "#B4A882",
    backColor: "#C8BFA6",
    cameraCount: 3,
    colors: [
      { name: "Desert Titanium", hex: "#C8BFA6" },
      { name: "Natural Titanium", hex: "#8E8B82" },
      { name: "Space Black", hex: "#1C1C1E" },
      { name: "White Titanium", hex: "#F5F0E8" },
    ],
    specs: {
      display: "6.9\" Super Retina XDR OLED, 120Hz",
      camera: "48MP Triple Fusion Camera",
      chipset: "Apple A19 Pro (3nm)",
    },
  },
  {
    id: "galaxy-s26-ultra",
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    price: "₹1,34,999",
    frontImage: "/phones/samsung-s26-ultra.jpg",
    accentColor: "#3B82F6",
    frameColor: "#5E6368",
    backColor: "#22252A",
    cameraCount: 4,
    colors: [
      { name: "Titanium Black", hex: "#22252A" },
      { name: "Titanium Gray", hex: "#5E6368" },
      { name: "Titanium Violet", hex: "#4B3F72" },
      { name: "Titanium Blue", hex: "#2A3F5F" },
    ],
    specs: {
      display: "6.9\" Dynamic AMOLED 2X, 120Hz",
      camera: "200MP Quad Telephoto",
      chipset: "Snapdragon 8 Elite",
    },
  },
  {
    id: "pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL",
    brand: "Google",
    price: "₹1,09,999",
    frontImage: "/phones/pixel9-pro-xl.jpg",
    accentColor: "#10B981",
    frameColor: "#6B7280",
    backColor: "#545C52",
    cameraCount: 3,
    colors: [
      { name: "Hazel", hex: "#545C52" },
      { name: "Porcelain", hex: "#E3E1DB" },
      { name: "Obsidian", hex: "#292A2D" },
      { name: "Rose Quartz", hex: "#C9A8B8" },
    ],
    specs: {
      display: "6.8\" Super Actua OLED, 120Hz",
      camera: "50MP Triple AI Camera",
      chipset: "Google Tensor G4",
    },
  },
  {
    id: "nothing-phone-2a-plus",
    name: "Nothing Phone (2a) Plus",
    brand: "Nothing",
    price: "₹27,999",
    frontImage: "/phones/nothing-phone-2a-plus.jpg",
    accentColor: "#EF4444",
    frameColor: "#2C2C2C",
    backColor: "#111111",
    cameraCount: 2,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F0F0F0" },
    ],
    specs: {
      display: "6.7\" Flexible AMOLED, 120Hz",
      camera: "50MP Dual OIS Camera",
      chipset: "MediaTek Dimensity 7350 Pro",
    },
  },
];

const TOTAL_FRAMES = 60; // higher count = smoother rotation

interface ProductViewer360Props {
  product?: Product360Item;
  className?: string;
}

export function ProductViewer360({ product = SAMPLE_360_PRODUCTS[0], className = "" }: ProductViewer360Props) {
  const [currentProduct, setCurrentProduct] = useState<Product360Item>(product);
  const [selectedColor, setSelectedColor] = useState(0);

  const [frameIndex, setFrameIndex] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTapTimeRef = useRef(0);
  const cachedFramesRef = useRef<HTMLCanvasElement[]>([]);
  const frontImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentProduct(product);
    setSelectedColor(0);
  }, [product]);

  // ── Load front-face image then pre-bake all 60 frames ──────────────────
  const bakeFrames = useCallback((prod: Product360Item, colorHex: string) => {
    setIsLoading(true);
    setLoadedCount(0);
    cachedFramesRef.current = [];

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = prod.frontImage;

    img.onload = () => {
      frontImgRef.current = img;
      const W = 600, H = 600;
      const frames: HTMLCanvasElement[] = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const oc = document.createElement("canvas");
        oc.width = W; oc.height = H;
        const ctx = oc.getContext("2d")!;

        // angle goes 0 → 2π
        const angle = (i / TOTAL_FRAMES) * Math.PI * 2;
        const cosA = Math.cos(angle);

        const cx = W / 2, cy = H / 2;
        // phone outer dimensions (portrait)
        const PH = 400, PW_MAX = 185;
        const PW = Math.max(6, PW_MAX * Math.abs(cosA));
        const radius = 26;

        // ── Drop shadow ──────────────────────────────────────
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy + PH / 2 + 18, PW * 0.55, 14, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.filter = "blur(12px)";
        ctx.fill();
        ctx.restore();

        // ── Metal frame ──────────────────────────────────────
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.35)";
        ctx.shadowBlur = 28;
        ctx.shadowOffsetY = 12;
        ctx.beginPath();
        ctx.roundRect(cx - PW / 2, cy - PH / 2, PW, PH, radius);

        const frameGrad = ctx.createLinearGradient(cx - PW / 2, cy, cx + PW / 2, cy);
        if (cosA >= 0) {
          // front side – lighter titanium/metallic edge
          frameGrad.addColorStop(0,   shiftBrightness(colorHex, -30));
          frameGrad.addColorStop(0.4, shiftBrightness(colorHex,  20));
          frameGrad.addColorStop(0.6, "#FFFFFF");
          frameGrad.addColorStop(1,   shiftBrightness(colorHex, -20));
        } else {
          // back side – darker edge
          frameGrad.addColorStop(0, "#080808");
          frameGrad.addColorStop(0.5, shiftBrightness(colorHex, -10));
          frameGrad.addColorStop(1, "#000000");
        }
        ctx.fillStyle = frameGrad;
        ctx.fill();
        ctx.restore();

        // ── Inner face ───────────────────────────────────────
        const IW = Math.max(2, PW - 14);
        const IH = PH - 14;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(cx - IW / 2, cy - IH / 2, IW, IH, radius - 5);
        ctx.clip();

        if (cosA >= 0) {
          // ── FRONT: draw real phone image ──
          // Scale image to fill the clipped region proportionally
          const aspect = img.naturalWidth / img.naturalHeight;
          let dw = IW, dh = IW / aspect;
          if (dh < IH) { dh = IH; dw = IH * aspect; }
          const dx = cx - dw / 2, dy = cy - dh / 2;
          ctx.drawImage(img, dx, dy, dw, dh);

          // subtle glass shine overlay
          const shine = ctx.createLinearGradient(cx - IW / 2, cy - IH / 2, cx + IW / 2, cy + IH / 2);
          shine.addColorStop(0, "rgba(255,255,255,0.18)");
          shine.addColorStop(0.35, "rgba(255,255,255,0.05)");
          shine.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = shine;
          ctx.fill();
        } else {
          // ── BACK: procedural back panel ──
          const backGrad = ctx.createLinearGradient(cx - IW / 2, cy, cx + IW / 2, cy);
          backGrad.addColorStop(0,   shiftBrightness(colorHex, 15));
          backGrad.addColorStop(0.6, colorHex);
          backGrad.addColorStop(1,   shiftBrightness(colorHex, -25));
          ctx.fillStyle = backGrad;
          ctx.fillRect(cx - IW / 2, cy - IH / 2, IW, IH);

          // Camera bump
          const bW = Math.max(4, 62 * Math.abs(cosA));
          const bH = prod.cameraCount === 4 ? 80 : 70;
          const bX = cx - IW / 2 + 16 * Math.abs(cosA);
          const bY = cy - IH / 2 + 22;

          ctx.beginPath();
          ctx.roundRect(bX, bY, bW, bH, 14);
          ctx.fillStyle = "rgba(0,0,0,0.35)";
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();

          // Camera lenses
          if (bW > 12) {
            const lensR = Math.max(1.5, 10 * Math.abs(cosA));
            const lensPositions = prod.cameraCount === 4
              ? [{ x: bX + bW / 2, y: bY + 14 }, { x: bX + bW / 2, y: bY + 36 }, { x: bX + bW / 2, y: bY + 58 }, { x: bX + bW / 2, y: bY + 68 }]
              : [{ x: bX + bW / 2, y: bY + 18 }, { x: bX + bW / 2, y: bY + 46 }, { x: bX + bW / 2, y: bY + 63 }];

            lensPositions.slice(0, prod.cameraCount).forEach((lp, li) => {
              ctx.beginPath();
              ctx.arc(lp.x, lp.y, lensR, 0, Math.PI * 2);
              const lensGrad = ctx.createRadialGradient(lp.x - lensR * 0.3, lp.y - lensR * 0.3, 0, lp.x, lp.y, lensR);
              lensGrad.addColorStop(0, "#334155");
              lensGrad.addColorStop(0.5, "#1e293b");
              lensGrad.addColorStop(1, "#0f172a");
              ctx.fillStyle = lensGrad;
              ctx.fill();
              // lens ring
              ctx.strokeStyle = "rgba(255,255,255,0.25)";
              ctx.lineWidth = 1;
              ctx.stroke();
              // lens glint
              ctx.beginPath();
              ctx.arc(lp.x - lensR * 0.28, lp.y - lensR * 0.28, lensR * 0.25, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(255,255,255,0.55)";
              ctx.fill();
            });
          }

          // Apple logo / brand mark on back center
          ctx.save();
          ctx.globalAlpha = Math.abs(cosA) * 0.3;
          ctx.fillStyle = "rgba(255,255,255,0.5)";
          ctx.font = `bold ${Math.floor(20 * Math.abs(cosA))}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(prod.brand === "Apple" ? "" : prod.brand.charAt(0), cx, cy + IH / 4);
          ctx.restore();
        }

        ctx.restore(); // clip

        frames.push(oc);
        setLoadedCount(i + 1);
      }

      cachedFramesRef.current = frames;
      setIsLoading(false);
    };

    img.onerror = () => {
      // fallback: bake with no image
      frontImgRef.current = null;
      const W = 600, H = 600;
      const frames: HTMLCanvasElement[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const oc = document.createElement("canvas");
        oc.width = W; oc.height = H;
        frames.push(oc);
        setLoadedCount(i + 1);
      }
      cachedFramesRef.current = frames;
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    const hex = currentProduct.colors[selectedColor]?.hex || currentProduct.backColor;
    bakeFrames(currentProduct, hex);
    setFrameIndex(0);
  }, [currentProduct, selectedColor, bakeFrames]);

  // ── Render selected frame to the visible canvas ──────────────────────────
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buf = cachedFramesRef.current[frameIndex];
    if (!buf) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2 + panOffset.x, canvas.height / 2 + panOffset.y);
    ctx.scale(zoomLevel, zoomLevel);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.drawImage(buf, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  }, [frameIndex, zoomLevel, panOffset]);

  useEffect(() => { renderFrame(); }, [renderFrame]);

  // ── Auto-spin loop ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isAutoSpin) return;
    const id = setInterval(() => setFrameIndex(p => (p + 1) % TOTAL_FRAMES), 30);
    return () => clearInterval(id);
  }, [isAutoSpin]);

  // ── Pointer handlers (drag + inertia + double-tap zoom) ──────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (animFrameRef.current) { cancelAnimationFrame(animFrameRef.current); animFrameRef.current = null; }
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    const now = Date.now();
    if (now - lastTapTimeRef.current < 300) {
      if (zoomLevel > 1) {
        setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); setFrameIndex(0); setIsAutoSpin(false);
      } else {
        setZoomLevel(2.5);
      }
    }
    lastTapTimeRef.current = now;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = dx;

    if (zoomLevel > 1) {
      setPanOffset(prev => ({ x: prev.x + dx * 0.9, y: prev.y + (e.clientY - startYRef.current) * 0.3 }));
    } else {
      const sensitivity = 6;
      const step = Math.round(dx / sensitivity);
      if (step !== 0) setFrameIndex(p => { let n = (p - step) % TOTAL_FRAMES; return n < 0 ? n + TOTAL_FRAMES : n; });
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (zoomLevel === 1 && Math.abs(velocityRef.current) > 2) {
      let vel = velocityRef.current;
      const decay = () => {
        if (Math.abs(vel) < 0.4 || isDraggingRef.current) return;
        setFrameIndex(p => { let n = (p + (vel > 0 ? -1 : 1)) % TOTAL_FRAMES; return n < 0 ? n + TOTAL_FRAMES : n; });
        vel *= 0.90;
        animFrameRef.current = requestAnimationFrame(decay);
      };
      animFrameRef.current = requestAnimationFrame(decay);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoomLevel(p => Math.min(Math.max(1, p - e.deltaY * 0.002), 3.5));
  };

  const handleResetView = () => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); setFrameIndex(0); setIsAutoSpin(false); };
  const handleZoomIn  = () => setZoomLevel(p => Math.min(p + 0.5, 3.5));
  const handleZoomOut = () => setZoomLevel(p => Math.max(p - 0.5, 1));
  const handleRotateLeft  = () => setFrameIndex(p => (p - 1 + TOTAL_FRAMES) % TOTAL_FRAMES);
  const handleRotateRight = () => setFrameIndex(p => (p + 1) % TOTAL_FRAMES);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    else document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
  };

  const currentAngle = Math.round((frameIndex / TOTAL_FRAMES) * 360);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-luxe backdrop-blur-md transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none bg-background p-4" : ""
      } ${className}`}
    >
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{currentProduct.brand}</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">360° Live View</span>
            </div>
            <h2 className="font-display text-lg font-bold leading-tight">{currentProduct.name}</h2>
          </div>
        </div>

        {/* Product Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {SAMPLE_360_PRODUCTS.map(p => (
            <button
              key={p.id}
              onClick={() => { setCurrentProduct(p); setSelectedColor(0); handleResetView(); }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                currentProduct.id === p.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {p.brand}
            </button>
          ))}
        </div>
      </div>

      {/* ── 360 Stage ── */}
      <div className="relative flex min-h-[450px] md:min-h-[560px] flex-col items-center justify-center p-4 bg-gradient-to-b from-muted/20 to-background/40">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-card/95 backdrop-blur-sm rounded-none">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <div className="absolute inset-2 animate-spin rounded-full border-2 border-primary/40 border-b-transparent" style={{ animationDirection: "reverse" }} />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground mb-1">Rendering 360° Model</div>
              <div className="text-xs text-muted-foreground">{loadedCount} / {TOTAL_FRAMES} frames ready</div>
              <div className="mt-2 h-1.5 w-48 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-150"
                  style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Drag hint */}
        {!isLoading && (
          <div className="pointer-events-none absolute top-4 z-10 flex items-center gap-2 rounded-full bg-background/90 px-4 py-1.5 text-xs font-medium text-foreground/70 shadow-sm backdrop-blur border border-border/50">
            <Move className="h-3.5 w-3.5 text-primary" />
            Drag to rotate · Double-tap to zoom · Scroll to zoom
          </div>
        )}

        {/* Angle Badge */}
        <div className="absolute top-4 right-4 z-10 rounded-full bg-card/95 px-3 py-1 text-xs font-mono font-bold border border-border/70 shadow-sm backdrop-blur">
          {currentAngle}°
        </div>

        {/* Canvas */}
        <div
          className="relative cursor-grab active:cursor-grabbing touch-none select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onWheel={handleWheel}
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="h-[380px] w-[380px] md:h-[500px] md:w-[500px] object-contain"
            style={{ imageRendering: "auto" }}
          />
        </div>

        {/* Color Picker */}
        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-card/80 border border-border/50 px-4 py-2.5 shadow-sm backdrop-blur">
          <span className="text-xs font-medium text-muted-foreground mr-1">Finish:</span>
          {currentProduct.colors.map((col, idx) => (
            <button
              key={col.name}
              onClick={() => setSelectedColor(idx)}
              title={col.name}
              className={`h-7 w-7 rounded-full border-2 transition-all duration-200 ${
                selectedColor === idx ? "scale-125 border-primary shadow-md ring-2 ring-primary/30" : "border-white/40 opacity-75 hover:scale-110 hover:opacity-100"
              }`}
              style={{ backgroundColor: col.hex }}
            />
          ))}
          <span className="ml-1 text-xs font-semibold text-foreground/90">{currentProduct.colors[selectedColor]?.name}</span>
        </div>
      </div>

      {/* ── Frame Scrubber ── */}
      <div className="px-6 py-2.5 border-t border-border/40 bg-muted/10">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-semibold text-muted-foreground w-6">0°</span>
          <input
            type="range"
            min={0}
            max={TOTAL_FRAMES - 1}
            value={frameIndex}
            onChange={e => setFrameIndex(parseInt(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
          />
          <span className="text-[11px] font-mono font-semibold text-muted-foreground w-8">360°</span>
        </div>
      </div>

      {/* ── Control Bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-t border-border/60 bg-card">
        {/* Spin + Step */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoSpin(v => !v)}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              isAutoSpin ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {isAutoSpin ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isAutoSpin ? "Pause" : "Auto-Spin"}
          </button>
          <button onClick={handleRotateLeft} className="grid h-9 w-9 place-items-center rounded-xl bg-muted hover:bg-muted/80">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button onClick={handleRotateRight} className="grid h-9 w-9 place-items-center rounded-xl bg-muted hover:bg-muted/80">
            <RotateCw className="h-4 w-4" />
          </button>
        </div>

        {/* Specs */}
        <div className="hidden xl:flex items-center gap-4 text-xs text-muted-foreground">
          <span>🖥 {currentProduct.specs.display}</span>
          <span>📷 {currentProduct.specs.camera}</span>
          <span>⚡ {currentProduct.specs.chipset}</span>
        </div>

        {/* Zoom + Fullscreen */}
        <div className="flex items-center gap-2">
          <button onClick={handleZoomOut} disabled={zoomLevel <= 1} className="grid h-9 w-9 place-items-center rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-40">
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-mono text-xs font-bold">{Math.round(zoomLevel * 100)}%</span>
          <button onClick={handleZoomIn} disabled={zoomLevel >= 3.5} className="grid h-9 w-9 place-items-center rounded-xl bg-muted hover:bg-muted/80 disabled:opacity-40">
            <ZoomIn className="h-4 w-4" />
          </button>
          <div className="h-5 w-px bg-border/60 mx-1" />
          <button onClick={handleResetView} className="rounded-xl border border-border/70 px-3 py-2 text-xs font-semibold text-foreground/80 hover:bg-muted hover:text-foreground">
            Reset
          </button>
          <button onClick={toggleFullscreen} className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Helper: lighten / darken a hex colour ──────────────────────────────────
function shiftBrightness(hex: string, delta: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, n));
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const toHex = (n: number) => clamp(n + delta).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
