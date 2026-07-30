import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  RotateCw, ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, 
  Play, Pause, Compass, Sparkles, Smartphone, Layers, Move
} from "lucide-react";

export type Product360Item = {
  id: string;
  name: string;
  brand: string;
  price: string;
  colors: { name: string; hex: string }[];
  accentColor: string;
  specs: {
    display: string;
    camera: string;
    chipset: string;
  };
};

export const SAMPLE_360_PRODUCTS: Product360Item[] = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    price: "₹1,49,900",
    colors: [
      { name: "Titanium Gold", hex: "#D4AF37" },
      { name: "Natural Titanium", hex: "#8E8B82" },
      { name: "Space Black", hex: "#1C1C1E" }
    ],
    accentColor: "#D4AF37",
    specs: {
      display: "6.9\" Super Retina XDR OLED, 120Hz",
      camera: "48MP Triple Fusion Camera",
      chipset: "Apple A19 Pro (3nm)"
    }
  },
  {
    id: "galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: "₹1,29,999",
    colors: [
      { name: "Titanium Gray", hex: "#5E6368" },
      { name: "Titanium Black", hex: "#22252A" },
      { name: "Titanium Violet", hex: "#4B3F72" }
    ],
    accentColor: "#3B82F6",
    specs: {
      display: "6.8\" Dynamic AMOLED 2X, 120Hz",
      camera: "200MP Quad Telephoto",
      chipset: "Snapdragon 8 Elite"
    }
  },
  {
    id: "pixel-9-pro",
    name: "Google Pixel 9 Pro XL",
    brand: "Google",
    price: "₹1,09,999",
    colors: [
      { name: "Hazel", hex: "#545C52" },
      { name: "Porcelain", hex: "#E3E1DB" },
      { name: "Obsidian", hex: "#292A2D" }
    ],
    accentColor: "#10B981",
    specs: {
      display: "6.8\" Super Actua OLED, 120Hz",
      camera: "50MP Triple AI Camera",
      chipset: "Google Tensor G4"
    }
  },
  {
    id: "nothing-phone-2",
    name: "Nothing Phone (2a) Plus",
    brand: "Nothing",
    price: "₹27,999",
    colors: [
      { name: "Dark Grey", hex: "#2C2C2C" },
      { name: "White", hex: "#F5F5F5" }
    ],
    accentColor: "#EF4444",
    specs: {
      display: "6.7\" Flexible AMOLED, 120Hz",
      camera: "50MP Dual OIS Camera",
      chipset: "MediaTek Dimensity 7350 Pro"
    }
  }
];

const TOTAL_FRAMES = 36; // 36 frames = 10 degrees per frame for 360 degree rotation

interface ProductViewer360Props {
  product?: Product360Item;
  className?: string;
}

export function ProductViewer360({ product = SAMPLE_360_PRODUCTS[0], className = "" }: ProductViewer360Props) {
  const [currentProduct, setCurrentProduct] = useState<Product360Item>(product);
  const [selectedColor, setSelectedColor] = useState(0);
  
  // Interactive State
  const [frameIndex, setFrameIndex] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  // References
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTapTimeRef = useRef(0);
  const cachedImagesRef = useRef<HTMLCanvasElement[]>([]);

  // Update selected product if prop changes
  useEffect(() => {
    setCurrentProduct(product);
    setSelectedColor(0);
  }, [product]);

  // Pre-generate 360 frames procedurally onto canvas offscreen buffers for ultra 60FPS performance
  const generateFrameCanvases = useCallback((prod: Product360Item, colorHex: string) => {
    setIsLoading(true);
    setLoadedCount(0);
    const frameBuffers: HTMLCanvasElement[] = [];

    const width = 600;
    const height = 600;

    let count = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = width;
      offCanvas.height = height;
      const ctx = offCanvas.getContext("2d");

      if (ctx) {
        const angle = (i / TOTAL_FRAMES) * Math.PI * 2;
        
        // Clear background
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        
        // 3D perspective rotation simulation
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        // Phone dimensions
        const phoneW = 160 * Math.max(0.08, Math.abs(cosA));
        const phoneH = 320;
        const radius = 24;

        // Shadow under phone
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 175, 120 * Math.max(0.3, Math.abs(cosA)), 25, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        ctx.filter = "blur(10px)";
        ctx.fill();
        ctx.restore();

        // Phone body shadow/glow
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 15;

        // Draw Phone Outer Frame (Metallic finish)
        ctx.beginPath();
        ctx.roundRect(centerX - phoneW / 2, centerY - phoneH / 2, Math.max(8, phoneW), phoneH, radius);
        
        // Metallic Gradient based on rotation angle
        const frameGrad = ctx.createLinearGradient(centerX - phoneW / 2, centerY - phoneH / 2, centerX + phoneW / 2, centerY + phoneH / 2);
        if (cosA >= 0) {
          frameGrad.addColorStop(0, colorHex);
          frameGrad.addColorStop(0.5, "#FFFFFF");
          frameGrad.addColorStop(1, colorHex);
        } else {
          frameGrad.addColorStop(0, "#111111");
          frameGrad.addColorStop(0.5, colorHex);
          frameGrad.addColorStop(1, "#222222");
        }
        ctx.fillStyle = frameGrad;
        ctx.fill();
        ctx.restore();

        // Phone Screen or Back Panel depending on view angle (Front vs Back)
        const innerW = Math.max(2, phoneW - 12);
        const innerH = phoneH - 12;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(centerX - innerW / 2, centerY - innerH / 2, innerW, innerH, radius - 4);

        if (cosA >= 0) {
          // FRONT SCREEN DISPLAY
          const screenGrad = ctx.createLinearGradient(centerX, centerY - innerH / 2, centerX, centerY + innerH / 2);
          screenGrad.addColorStop(0, "#0F172A");
          screenGrad.addColorStop(0.5, "#1E293B");
          screenGrad.addColorStop(1, "#020617");
          ctx.fillStyle = screenGrad;
          ctx.fill();

          // Wallpaper graphics on front screen
          if (innerW > 25) {
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(centerX - innerW / 2, centerY - innerH / 2, innerW, innerH, radius - 4);
            ctx.clip();

            // Dynamic wallpaper glow
            const wallGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 120);
            wallGrad.addColorStop(0, prod.accentColor);
            wallGrad.addColorStop(1, "transparent");
            ctx.fillStyle = wallGrad;
            ctx.fill();

            // Notch / Dynamic Island at top
            if (innerW > 35) {
              ctx.fillStyle = "#000000";
              ctx.beginPath();
              ctx.roundRect(centerX - 18 * (innerW / 148), centerY - innerH / 2 + 10, 36 * (innerW / 148), 12, 6);
              ctx.fill();
            }

            // Glass Reflection Line
            const reflectGrad = ctx.createLinearGradient(centerX - innerW, centerY - innerH, centerX + innerW, centerY + innerH);
            reflectGrad.addColorStop(0, "rgba(255, 255, 255, 0.25)");
            reflectGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.05)");
            reflectGrad.addColorStop(1, "transparent");
            ctx.fillStyle = reflectGrad;
            ctx.fill();
            ctx.restore();
          }
        } else {
          // BACK PANEL & CAMERA BUMP
          const backGrad = ctx.createLinearGradient(centerX - innerW / 2, centerY, centerX + innerW / 2, centerY);
          backGrad.addColorStop(0, colorHex);
          backGrad.addColorStop(0.7, colorHex);
          backGrad.addColorStop(1, "#000000");
          ctx.fillStyle = backGrad;
          ctx.fill();

          // Camera Module Bump
          if (innerW > 20) {
            ctx.save();
            const bumpW = 55 * Math.abs(cosA);
            const bumpH = 65;
            const bumpX = centerX - innerW / 2 + 15 * Math.abs(cosA);
            const bumpY = centerY - innerH / 2 + 20;

            ctx.beginPath();
            ctx.roundRect(bumpX, bumpY, bumpW, bumpH, 12);
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fill();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Camera Lenses
            if (bumpW > 15) {
              const lensR = 8 * Math.abs(cosA);
              ctx.fillStyle = "#09090B";
              ctx.beginPath();
              ctx.arc(bumpX + bumpW / 2, bumpY + 18, Math.max(1, lensR), 0, Math.PI * 2);
              ctx.arc(bumpX + bumpW / 2, bumpY + 46, Math.max(1, lensR), 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = "#64748B";
              ctx.beginPath();
              ctx.arc(bumpX + bumpW / 2, bumpY + 18, Math.max(0.5, lensR * 0.5), 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
        }
        ctx.restore();
      }

      frameBuffers.push(offCanvas);
      count++;
      setLoadedCount(count);
    }

    cachedImagesRef.current = frameBuffers;
    setIsLoading(false);
  }, []);

  // Initialize frame generator on color or product change
  useEffect(() => {
    const hex = currentProduct.colors[selectedColor]?.hex || "#333333";
    generateFrameCanvases(currentProduct, hex);
  }, [currentProduct, selectedColor, generateFrameCanvases]);

  // Render current frame to visible canvas
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentBuffer = cachedImagesRef.current[frameIndex];
    if (!currentBuffer) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Apply Zoom & Pan transform
    ctx.translate(canvas.width / 2 + panOffset.x, canvas.height / 2 + panOffset.y);
    ctx.scale(zoomLevel, zoomLevel);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.drawImage(currentBuffer, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  }, [frameIndex, zoomLevel, panOffset]);

  useEffect(() => {
    renderFrame();
  }, [renderFrame]);

  // Auto-Spin Loop
  useEffect(() => {
    if (!isAutoSpin) return;

    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % TOTAL_FRAMES);
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoSpin]);

  // Drag & Swipe Handlers for 60FPS rotation and panning
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;

    // Double Tap detection
    const now = Date.now();
    if (now - lastTapTimeRef.current < 300) {
      // Toggle Zoom on Double Tap / Click
      if (zoomLevel > 1) {
        handleResetView();
      } else {
        setZoomLevel(2.2);
      }
    }
    lastTapTimeRef.current = now;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = deltaX;

    if (zoomLevel > 1) {
      // Pan mode when zoomed
      setPanOffset(prev => ({
        x: prev.x + (e.clientX - startXRef.current) * 0.1,
        y: prev.y + (e.clientY - startYRef.current) * 0.1
      }));
    } else {
      // Rotate mode when standard view
      const sensitivity = 8; // Pixels per frame step
      const stepChange = Math.round(deltaX / sensitivity);

      if (stepChange !== 0) {
        setFrameIndex(prev => {
          let next = (prev - stepChange) % TOTAL_FRAMES;
          if (next < 0) next += TOTAL_FRAMES;
          return next;
        });
      }
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Smooth inertia / momentum spin after drag release
    if (zoomLevel === 1 && Math.abs(velocityRef.current) > 3) {
      let vel = velocityRef.current;
      const decay = () => {
        if (Math.abs(vel) < 0.5 || isDraggingRef.current) return;
        setFrameIndex(prev => {
          let next = (prev - (vel > 0 ? 1 : -1)) % TOTAL_FRAMES;
          if (next < 0) next += TOTAL_FRAMES;
          return next;
        });
        vel *= 0.88; // Friction deceleration
        animFrameRef.current = requestAnimationFrame(decay);
      };
      animFrameRef.current = requestAnimationFrame(decay);
    }
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoomLevel(prev => {
      const next = prev - e.deltaY * 0.002;
      return Math.min(Math.max(1, next), 3);
    });
  };

  // View Control Actions
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.4, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.4, 1));
  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setFrameIndex(0);
    setIsAutoSpin(false);
  };

  const handleRotateLeft = () => setFrameIndex(prev => (prev - 1 + TOTAL_FRAMES) % TOTAL_FRAMES);
  const handleRotateRight = () => setFrameIndex(prev => (prev + 1) % TOTAL_FRAMES);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Current angle indicator (0° - 360°)
  const currentAngle = Math.round((frameIndex / TOTAL_FRAMES) * 360);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-3xl border border-border/70 bg-card/80 shadow-luxe backdrop-blur-md transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none bg-background p-6" : ""
      } ${className}`}
    >
      {/* Top Bar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-6 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Compass className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{currentProduct.brand}</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">360° Interactive</span>
            </div>
            <h2 className="font-display text-lg font-bold leading-tight">{currentProduct.name}</h2>
          </div>
        </div>

        {/* Product Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {SAMPLE_360_PRODUCTS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setCurrentProduct(p);
                setSelectedColor(0);
                handleResetView();
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                currentProduct.id === p.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {p.name.split(" ")[1] || p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main 360 Canvas Stage */}
      <div className="relative flex min-h-[420px] md:min-h-[500px] flex-col items-center justify-center p-4">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-card/90 backdrop-blur-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <div className="text-sm font-medium text-muted-foreground">
              Generating 360° View... ({loadedCount}/{TOTAL_FRAMES})
            </div>
          </div>
        )}

        {/* Drag Hint overlay */}
        <div className="pointer-events-none absolute top-6 z-10 flex items-center gap-2 rounded-full bg-background/80 px-3.5 py-1.5 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur border border-border/50 animate-bounce">
          <Move className="h-3.5 w-3.5 text-primary" />
          <span>Drag left or right to rotate • Double-click to zoom</span>
        </div>

        {/* Angle Badge */}
        <div className="absolute top-6 right-6 z-10 rounded-full bg-card/90 px-3 py-1 text-xs font-mono font-bold border border-border/70 shadow-sm">
          {currentAngle}°
        </div>

        {/* Interactive Canvas */}
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
            className="h-[360px] w-[360px] md:h-[480px] md:w-[480px] object-contain transition-transform"
          />
        </div>

        {/* Color Palette Selector */}
        <div className="mt-4 flex items-center gap-3 rounded-full bg-muted/60 p-1.5 border border-border/40">
          <span className="ml-2 text-xs font-medium text-muted-foreground">Colors:</span>
          {currentProduct.colors.map((col, idx) => (
            <button
              key={col.name}
              onClick={() => setSelectedColor(idx)}
              title={col.name}
              className={`h-7 w-7 rounded-full border-2 transition-transform ${
                selectedColor === idx ? "scale-115 border-primary shadow-sm" : "border-transparent opacity-80 hover:opacity-100"
              }`}
              style={{ backgroundColor: col.hex }}
            />
          ))}
          <span className="mr-2 text-xs font-semibold text-foreground">{currentProduct.colors[selectedColor]?.name}</span>
        </div>
      </div>

      {/* Frame Scrubber Range Slider */}
      <div className="px-6 py-2 border-t border-border/40 bg-muted/20">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-semibold text-muted-foreground">0°</span>
          <input
            type="range"
            min={0}
            max={TOTAL_FRAMES - 1}
            value={frameIndex}
            onChange={(e) => setFrameIndex(parseInt(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
          />
          <span className="text-[11px] font-mono font-semibold text-muted-foreground">360°</span>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-t border-border/60 bg-card">
        {/* Play & Rotate Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              isAutoSpin ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {isAutoSpin ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isAutoSpin ? "Pause Auto-Spin" : "Auto 360° Spin"}</span>
          </button>

          <button
            onClick={handleRotateLeft}
            aria-label="Rotate Left"
            className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground hover:bg-muted/80"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleRotateRight}
            aria-label="Rotate Right"
            className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground hover:bg-muted/80"
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </div>

        {/* Specs Pill */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
          <span>🖥️ {currentProduct.specs.display}</span>
          <span>📷 {currentProduct.specs.camera}</span>
          <span>⚡ {currentProduct.specs.chipset}</span>
        </div>

        {/* Zoom & Screen Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            aria-label="Zoom Out"
            className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground hover:bg-muted/80 disabled:opacity-40"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-mono text-xs font-bold text-foreground">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 3}
            aria-label="Zoom In"
            className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground hover:bg-muted/80 disabled:opacity-40"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <div className="h-5 w-px bg-border/60 mx-1" />

          <button
            onClick={handleResetView}
            className="rounded-xl border border-border/70 px-3 py-2 text-xs font-semibold text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            Reset View
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
