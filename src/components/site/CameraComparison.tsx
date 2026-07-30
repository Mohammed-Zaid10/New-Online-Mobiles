import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Camera, Sun, Moon, User, ZoomIn, Focus, Smile, Video, 
  Sparkles, SlidersHorizontal, ArrowLeftRight, Check, Info, ShieldCheck, Zap
} from "lucide-react";
import { mobiles, type Mobile } from "@/data/mobiles";
import { inr } from "@/lib/shop";

export type CameraMode = "daylight" | "night" | "portrait" | "zoom" | "macro" | "selfie" | "video";

export interface CameraModeInfo {
  id: CameraMode;
  label: string;
  icon: React.ElementType;
  description: string;
}

export const CAMERA_MODES: CameraModeInfo[] = [
  { id: "daylight", label: "Daylight", icon: Sun, description: "Dynamic range, color accuracy, and highlight control under direct sunlight." },
  { id: "night", label: "Night", icon: Moon, description: "Low-light exposure, noise reduction, and dark detail preservation." },
  { id: "portrait", label: "Portrait", icon: User, description: "Edge detection, realistic bokeh blur, and skin tone rendition." },
  { id: "zoom", label: "Zoom (5x/10x)", icon: ZoomIn, description: "Telephoto clarity, optical sharpness, and text legibility at distance." },
  { id: "macro", label: "Macro", icon: Focus, description: "Ultra close-up focus, texture detail, and minimum focal distance." },
  { id: "selfie", label: "Selfie", icon: Smile, description: "Front camera detail, HDR exposure, and facial texture." },
  { id: "video", label: "Video (4K/8K)", icon: Video, description: "OIS stabilization, frame rate stability, and dynamic range during motion." },
];

export interface PhoneCameraProfile {
  id: string;
  name: string;
  brand: string;
  mainSensor: string;
  ultrawide: string;
  telephoto: string;
  frontCamera: string;
  videoCaps: string;
  aiEngine: string;
  highlights: string[];
  samples: Record<CameraMode, {
    image: string;
    score: number;
    strengths: string[];
    weaknesses: string[];
    summary: string;
  }>;
}

// Sample realistic camera comparison dataset for top flagship phones
export const CAMERA_PROFILES: Record<string, PhoneCameraProfile> = {
  "iphone-16-pro-max": {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    mainSensor: "48MP Fusion (f/1.78, 2nd Gen Sensor-Shift OIS)",
    ultrawide: "48MP Ultra Wide (f/2.2, Hybrid Focus Pixels)",
    telephoto: "12MP 5x Tetraprism Telephoto (120mm, 3D OIS)",
    frontCamera: "12MP TrueDepth (f/1.9, Autofocus)",
    videoCaps: "4K Dolby Vision HDR at 120 fps, ProRes Log",
    aiEngine: "Photographic Styles & Apple Intelligence ISP",
    highlights: ["Industry-leading 4K 120fps Dolby Vision", "Zero shutter lag & precise natural skin tones", "48MP Macro detail with autofocus"],
    samples: {
      daylight: {
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&q=85",
        score: 96,
        strengths: ["True-to-life color calibration", "Phenomenal highlight recovery in bright skies", "Zero edge distortion"],
        weaknesses: ["Slightly conservative saturation"],
        summary: "The iPhone 16 Pro Max produces exceptionally realistic daylight imagery with subtle shadows and natural skin tones, avoiding harsh over-sharpening."
      },
      night: {
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1400&q=85",
        score: 94,
        strengths: ["Instant night mode capture (1-2s)", "Minimal lens flare flare-reduction coating", "Deep shadow contrast"],
        weaknesses: ["Occasional warm color cast on streetlights"],
        summary: "Photonic Engine maintains realistic dark skies without artificial brightened noise, preserving genuine nighttime atmosphere."
      },
      portrait: {
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&q=85",
        score: 97,
        strengths: ["Flawless hair strand edge isolation", "Adjustable focal point after shot", "Warm natural skin tones"],
        weaknesses: ["Background blur can occasionally feel aggressive at f/1.4 default"],
        summary: "Best-in-class depth mapping with realistic optical drop-off that mimics a full-frame 85mm prime lens."
      },
      zoom: {
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
        score: 92,
        strengths: ["5x optical sharpness is crisp", "3D sensor-shift stabilization keeps 25x zoom steady", "Color match across lenses"],
        weaknesses: ["Beyond 15x digital crop loses fine detail compared to 200MP periscopes"],
        summary: "The 120mm tetraprism optic provides clean, noise-free shots up to 10x hybrid zoom with identical color temperature to the main lens."
      },
      macro: {
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1400&q=85",
        score: 95,
        strengths: ["48MP sensor crop yields staggering detail", "2cm focus distance", "Automatic macro auto-switch"],
        weaknesses: ["Requires good lighting for 48MP full sharpness"],
        summary: "The new 48MP ultra-wide sensor renders minute textures like leaf veins and water droplets with zero fringe blur."
      },
      selfie: {
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1400&q=85",
        score: 95,
        strengths: ["Autofocus keeps face sharp at any arm length", "4K 60fps front video with HDR", "Natural texture without skin smoothing"],
        weaknesses: ["Reveals skin imperfections candidly"],
        summary: "TrueDepth front camera offers accurate depth detection, realistic skin rendering, and sharp focus from close-up to selfie stick distances."
      },
      video: {
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1400&q=85",
        score: 99,
        strengths: ["4K 120fps Dolby Vision continuous recording", "Studio-quality 4-mic Spatial Audio setup", "Action Mode gimbal-grade stabilization"],
        weaknesses: ["ProRes files consume heavy storage space"],
        summary: "Undisputed champion in mobile video. Dynamic range in 4K 120fps HDR is unrivaled with cinema-ready color grading."
      }
    }
  },
  "samsung-galaxy-s25-ultra": {
    id: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    mainSensor: "200MP ISOCELL HP2 (f/1.7, OIS)",
    ultrawide: "50MP Ultra Wide (f/1.9, 120° FOV)",
    telephoto: "50MP 5x Periscope (f/3.4, OIS) + 10MP 3x Telephoto",
    frontCamera: "12MP High-Speed AF (f/2.2)",
    videoCaps: "8K at 30 fps, 4K at 120 fps, 10-bit HDR10+",
    aiEngine: "ProVisual Engine & Galaxy AI Detail Enhancer",
    highlights: ["200MP detail crop capability", "100x Space Zoom with AI super resolution", "Dual telephoto optics (3x & 5x)"],
    samples: {
      daylight: {
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&q=85",
        score: 95,
        strengths: ["Vibrant contrast & punchy greens/blues", "Massive 200MP resolution mode", "Exceptional landscape sharpness"],
        weaknesses: ["Can slightly over-sharpen fine foliage"],
        summary: "Produces striking, Instagram-ready daylight photos with bright exposures and incredibly detailed landscape textures."
      },
      night: {
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1400&q=85",
        score: 96,
        strengths: ["Brightest low-light shots with 16-in-1 binning", "Nightography AI preserves shadow details", "Ultra-wide handles night lighting well"],
        weaknesses: ["Takes 2-3s longer to process AI noise reduction"],
        summary: "Turns pitch dark scenes into clear, illuminated photos with crisp highlights and impressive noise reduction."
      },
      portrait: {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=85",
        score: 94,
        strengths: ["Dedicated 3x and 5x optical portrait angles", "Rich background separation", "ProVisual AI smooths lighting"],
        weaknesses: ["Skin tones lean slightly warmer/yellow"],
        summary: "Dual telephoto lenses offer versatile 70mm and 115mm portrait compression, perfect for headshots and full-body portraits."
      },
      zoom: {
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=85",
        score: 98,
        strengths: ["50MP 5x periscope maintains optical clarity to 10x", "100x Space Zoom AI zoom lock", "Superior distant text reading"],
        weaknesses: ["100x requires stable hands or tripod"],
        summary: "The undisputed king of zoom distance. 10x to 30x digital zoom remains remarkably clear thanks to multi-frame AI fusion."
      },
      macro: {
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=85",
        score: 93,
        strengths: ["50MP ultra-wide captures intricate texture", "Wide depth of field", "Vibrant macro colors"],
        weaknesses: ["Requires manually holding distance at 2.5cm"],
        summary: "Ultra-wide auto-focus creates ultra-crisp close-ups with vivid colors and sharp detail across the frame."
      },
      selfie: {
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&q=85",
        score: 93,
        strengths: ["Dual-pixel AF for quick subject lock", "Warm flattering skin tone option", "4K 60fps video"],
        weaknesses: ["Slightly softer hair edge separation"],
        summary: "Delivers bright, flattering selfies with custom color tone filters (Warm or Natural) and rapid auto-focus."
      },
      video: {
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=85",
        score: 95,
        strengths: ["8K 30fps high-resolution recording", "Super Steady OIS mode", "HDR10+ vivid colors"],
        weaknesses: ["Slight low-light noise in 8K mode"],
        summary: "Offers versatile 8K capture and rock-solid stabilization with Super Steady mode for action dynamic shots."
      }
    }
  },
  "google-pixel-9-pro-xl": {
    id: "google-pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL",
    brand: "Google",
    mainSensor: "50MP Octa PD (f/1.68, OIS)",
    ultrawide: "48MP Quad PD (f/1.7, 123° FOV)",
    telephoto: "48MP Quad PD 5x Telephoto (f/2.8, OIS)",
    frontCamera: "42MP Dual PD (f/2.2, Autofocus)",
    videoCaps: "8K Video Boost AI, 4K at 60 fps Night Sight Video",
    aiEngine: "Tensor G4 ISP & Cloud Video Boost AI",
    highlights: ["Cloud-powered Video Boost with Night Sight", "HDR+ computational photography algorithm", "Best skin tone accuracy (Real Tone)"],
    samples: {
      daylight: {
        image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1400&q=85",
        score: 97,
        strengths: ["Unmatched contrast & shadow detail", "Real Tone skin accuracy", "Zero blown-out highlights"],
        weaknesses: ["Cooler white balance signature"],
        summary: "Google's legendary HDR+ algorithm balances harsh sunlight and deep shadows better than any smartphone camera."
      },
      night: {
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1400&q=85",
        score: 98,
        strengths: ["Night Sight with Astrophotography mode", "Cleanest dark sky noise handling", "Accurate neon sign exposure"],
        weaknesses: ["Processing takes 3-4s per shot"],
        summary: "Night Sight renders night scenes with stunning clarity, pinpoint star capture in Astrophotography, and zero noise artifacts."
      },
      portrait: {
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&q=85",
        score: 96,
        strengths: ["Real Tone accurately captures all skin tones", "Natural segmentation blur", "42MP front selfie portrait mode"],
        weaknesses: ["Less control over manual aperture simulation"],
        summary: "Real Tone guarantees authentic skin colors for every complexion, paired with soft, convincing bokeh."
      },
      zoom: {
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=85",
        score: 94,
        strengths: ["Super Res Zoom 30x with AI reconstruction", "48MP 5x optical telephoto detail", "High contrast at distance"],
        weaknesses: ["30x digital zoom can look painterly in low light"],
        summary: "Super Res Zoom uses AI diffusion models to recreate crisp text and fine geometry up to 30x magnification."
      },
      macro: {
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1400&q=85",
        score: 94,
        strengths: ["48MP ultra-wide close focus at 2cm", "Sharp edge-to-edge detail", "Natural lighting correction"],
        weaknesses: ["Requires steady hands for extreme closeups"],
        summary: "Macro Focus snaps precise micro details, from insect wings to fabric weaves with zero distortion."
      },
      selfie: {
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1400&q=85",
        score: 96,
        strengths: ["42MP high-res front sensor with 103° ultra-wide field", "Autofocus with Real Tone", "Sharp group selfie focus"],
        weaknesses: ["Strong contrast can emphasize shadows around eyes"],
        summary: "Massive 42MP front camera with ultra-wide angle captures detailed group selfies with true skin tones."
      },
      video: {
        image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=1400&q=85",
        score: 94,
        strengths: ["Video Boost upgrades footage to 8K in cloud", "Night Sight Video removes grain in darkness", "Audio Magic Eraser"],
        weaknesses: ["Video Boost requires cloud upload time"],
        summary: "Video Boost uses Google server-side AI processing to enhance exposure, dynamic range, and stabilization after shooting."
      }
    }
  },
  "vivo-x100-pro": {
    id: "vivo-x100-pro",
    name: "Vivo X100 Pro",
    brand: "Vivo",
    mainSensor: "50MP 1-inch Sony IMX989 (f/1.75, OIS)",
    ultrawide: "50MP Ultra Wide (f/2.0, 119° FOV)",
    telephoto: "50MP ZEISS APO Floating Periscope (f/2.5, OIS)",
    frontCamera: "32MP HD Selfie (f/2.0)",
    videoCaps: "4K Cinematic Portrait Video at 60 fps",
    aiEngine: "ZEISS T* Coating & V3 Imaging Chip",
    highlights: ["Massive 1-inch Sony main sensor", "ZEISS APO Floating Telephoto macro", "ZEISS Style Bokeh simulations"],
    samples: {
      daylight: {
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&q=85",
        score: 96,
        strengths: ["1-inch sensor optical background blur", "ZEISS Natural Color mode", "Zero flare with T* coating"],
        weaknesses: ["Default mode can be punchy"],
        summary: "The 1-inch Sony sensor provides genuine optical depth-of-field and rich dynamic range even without AI tricks."
      },
      night: {
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1400&q=85",
        score: 97,
        strengths: ["1-inch sensor collects maximum light", "ZEISS T* anti-glare coating", "Rich shadow gradations"],
        weaknesses: ["Night processing can brighten dark alleys heavily"],
        summary: "Exceptional light gathering capability thanks to the massive 1-inch main sensor and custom V3 imaging chip."
      },
      portrait: {
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&q=85",
        score: 98,
        strengths: ["Classic ZEISS Bokeh styles (Biotar, Sonnar, Planar)", "APO 100mm portrait focal length", "Silky smooth skin tones"],
        weaknesses: ["Lots of filter choices can feel overwhelming"],
        summary: "Widely regarded as the ultimate portrait smartphone camera, replicating iconic legendary ZEISS camera lenses."
      },
      zoom: {
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
        score: 95,
        strengths: ["ZEISS APO certified telephoto optics", "Sunset mode tele-photo enhancement", "100x digital clarity"],
        weaknesses: ["Slight color shift between main and telephoto"],
        summary: "Floating periscope optics deliver aberration-free 4.3x optical zoom with unmatched color purity."
      },
      macro: {
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1400&q=85",
        score: 97,
        strengths: ["Telephoto macro at 100mm equivalent", "Extreme 100x microscopic focus", "Zero distortion"],
        weaknesses: ["Requires standing 15cm back"],
        summary: "Unique telephoto macro lets you photograph insects and small textures from a comfortable distance without casting shadows."
      },
      selfie: {
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1400&q=85",
        score: 91,
        strengths: ["High 32MP detail", "Smooth beauty mode customization", "Good backlight compensation"],
        weaknesses: ["Fixed focus front camera"],
        summary: "Delivers crisp, flattering selfies with customizable ZEISS soft focus and skin refinement modes."
      },
      video: {
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1400&q=85",
        score: 93,
        strengths: ["4K 60fps ZEISS Cinematic Portrait video", "Custom V3 chip real-time blur", "Good night video clarity"],
        weaknesses: ["Stabilization at 4K 60fps is slightly below iPhone"],
        summary: "4K Cinematic Portrait video adds cinema-style rack focus and lens flare effects in real time."
      }
    }
  }
};

export function CameraComparison() {
  const [phoneAId, setPhoneAId] = useState<string>("iphone-16-pro-max");
  const [phoneBId, setPhoneBId] = useState<string>("samsung-galaxy-s25-ultra");
  const [activeMode, setActiveMode] = useState<CameraMode>("daylight");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const phoneA = CAMERA_PROFILES[phoneAId] || CAMERA_PROFILES["iphone-16-pro-max"];
  const phoneB = CAMERA_PROFILES[phoneBId] || CAMERA_PROFILES["samsung-galaxy-s25-ultra"];

  const sampleA = phoneA.samples[activeMode];
  const sampleB = phoneB.samples[activeMode];
  const activeModeObj = CAMERA_MODES.find(m => m.id === activeMode) || CAMERA_MODES[0];

  // Drag logic for split screen slider
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/80 p-6 rounded-3xl border border-border/70 shadow-luxe backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Camera className="h-4 w-4" /> Interactive Camera Simulator
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Side-by-Side Camera Test</h2>
          <p className="text-sm text-muted-foreground mt-1">Drag the slider to compare real photo quality across daylight, night, zoom, macro, and video specs.</p>
        </div>

        {/* Phone Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground block">Phone A (Left)</label>
            <select
              value={phoneAId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === phoneBId) {
                  setPhoneBId(phoneAId);
                }
                setPhoneAId(val);
              }}
              className="bg-background border border-border/80 rounded-xl px-3 py-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.values(CAMERA_PROFILES).map(p => (
                <option key={p.id} value={p.id}>{p.brand} {p.name}</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground self-end mb-0.5">
            <ArrowLeftRight className="h-4 w-4" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground block">Phone B (Right)</label>
            <select
              value={phoneBId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === phoneAId) {
                  setPhoneAId(phoneBId);
                }
                setPhoneBId(val);
              }}
              className="bg-background border border-border/80 rounded-xl px-3 py-2 text-sm font-semibold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Object.values(CAMERA_PROFILES).map(p => (
                <option key={p.id} value={p.id}>{p.brand} {p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CAMERA_MODES.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                  : "bg-card border border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mode Description Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
        <Info className="h-5 w-5 text-primary flex-shrink-0" />
        <p className="text-xs text-foreground/80 font-medium">
          <strong className="text-primary font-bold">{activeModeObj.label} Mode Test:</strong> {activeModeObj.description}
        </p>
      </div>

      {/* Split Screen Slider Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[380px] sm:h-[480px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-border/70 select-none cursor-ew-resize touch-none"
      >
        {/* Phone B Image (Background / Right Side) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={sampleB.image}
            alt={`${phoneB.name} ${activeModeObj.label}`}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          {/* Label Right */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold shadow-lg">
            <span>{phoneB.name}</span>
            <span className="bg-primary px-2 py-0.5 rounded-full text-[10px] font-black">{sampleB.score}%</span>
          </div>
        </div>

        {/* Phone A Image (Foreground / Left Side with Clip Path) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={sampleA.image}
            alt={`${phoneA.name} ${activeModeObj.label}`}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          {/* Label Left */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold shadow-lg">
            <span>{phoneA.name}</span>
            <span className="bg-primary px-2 py-0.5 rounded-full text-[10px] font-black">{sampleA.score}%</span>
          </div>
        </div>

        {/* Slider Handle Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-white text-black shadow-2xl flex items-center justify-center border-2 border-primary">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Drag Hint Footer Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 pointer-events-none">
          Drag left/right to compare details
        </div>
      </div>

      {/* AI Camera Analysis & Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phone A Camera Card */}
        <div className="bg-card border border-border/70 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{phoneA.brand}</span>
              <h3 className="text-xl font-bold text-foreground">{phoneA.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">Mode Score</span>
              <span className="text-2xl font-black text-primary">{sampleA.score}<span className="text-xs text-muted-foreground">/100</span></span>
            </div>
          </div>

          {/* Key Specs */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Main Sensor:</span>
              <span className="font-semibold text-foreground text-right">{phoneA.mainSensor}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Telephoto:</span>
              <span className="font-semibold text-foreground text-right">{phoneA.telephoto}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Ultra Wide:</span>
              <span className="font-semibold text-foreground text-right">{phoneA.ultrawide}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground font-medium">Front Camera:</span>
              <span className="font-semibold text-foreground text-right">{phoneA.frontCamera}</span>
            </div>
          </div>

          {/* Mode Specific Analysis */}
          <div className="bg-muted/40 rounded-2xl p-4 space-y-3 border border-border/40">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> {activeModeObj.label} Performance Analysis
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{sampleA.summary}</p>
            
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">Strengths:</span>
              {sampleA.strengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-foreground/90">
                  <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phone B Camera Card */}
        <div className="bg-card border border-border/70 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{phoneB.brand}</span>
              <h3 className="text-xl font-bold text-foreground">{phoneB.name}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">Mode Score</span>
              <span className="text-2xl font-black text-primary">{sampleB.score}<span className="text-xs text-muted-foreground">/100</span></span>
            </div>
          </div>

          {/* Key Specs */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Main Sensor:</span>
              <span className="font-semibold text-foreground text-right">{phoneB.mainSensor}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Telephoto:</span>
              <span className="font-semibold text-foreground text-right">{phoneB.telephoto}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/30">
              <span className="text-muted-foreground font-medium">Ultra Wide:</span>
              <span className="font-semibold text-foreground text-right">{phoneB.ultrawide}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground font-medium">Front Camera:</span>
              <span className="font-semibold text-foreground text-right">{phoneB.frontCamera}</span>
            </div>
          </div>

          {/* Mode Specific Analysis */}
          <div className="bg-muted/40 rounded-2xl p-4 space-y-3 border border-border/40">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> {activeModeObj.label} Performance Analysis
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{sampleB.summary}</p>
            
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">Strengths:</span>
              {sampleB.strengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-foreground/90">
                  <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Camera Verdict Banner */}
      <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-background border border-primary/20 rounded-3xl p-6 sm:p-8 space-y-3 shadow-luxe">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">AI Camera Verdict</span>
            <h4 className="text-lg font-bold text-foreground">Which phone takes better {activeModeObj.label.toLowerCase()} photos?</h4>
          </div>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed pt-1">
          {sampleA.score > sampleB.score ? (
            <>
              <strong>{phoneA.name}</strong> leads in <strong>{activeModeObj.label}</strong> with a score of <strong>{sampleA.score}/100</strong>. It excels in {sampleA.strengths[0].toLowerCase()} and provides superior exposure stability. However, <strong>{phoneB.name}</strong> remains close with strengths in {sampleB.strengths[0].toLowerCase()}.
            </>
          ) : sampleB.score > sampleA.score ? (
            <>
              <strong>{phoneB.name}</strong> edges out in <strong>{activeModeObj.label}</strong> with a score of <strong>{sampleB.score}/100</strong>, delivering outstanding performance in {sampleB.strengths[0].toLowerCase()}. <strong>{phoneA.name}</strong> counters with {sampleA.strengths[0].toLowerCase()}.
            </>
          ) : (
            <>
              Both <strong>{phoneA.name}</strong> and <strong>{phoneB.name}</strong> perform equally strong in <strong>{activeModeObj.label}</strong> with a score of <strong>{sampleA.score}/100</strong>. Choose based on color preference ({phoneA.brand}'s natural profile vs {phoneB.brand}'s vibrant tone).
            </>
          )}
        </p>
      </div>
    </div>
  );
}
