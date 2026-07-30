import React, { useState, useRef, useCallback } from "react";
import { 
  Camera, Sun, Moon, User, ZoomIn, Focus, Smile, Video, 
  Sparkles, SlidersHorizontal, ArrowLeftRight, Check, Info, Eye
} from "lucide-react";

export type CameraMode = "daylight" | "night" | "portrait" | "zoom" | "macro" | "selfie" | "video";

export interface CameraModeInfo {
  id: CameraMode;
  label: string;
  icon: React.ElementType;
  description: string;
  // Unified single master photo scene for comparing both phones on the exact same image
  masterImage: string;
}

export const CAMERA_MODES: CameraModeInfo[] = [
  { 
    id: "daylight", 
    label: "Daylight", 
    icon: Sun, 
    description: "Compare highlight recovery, sky rendition, and dynamic range on the exact same sunlit scene.",
    masterImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=90"
  },
  { 
    id: "night", 
    label: "Night", 
    icon: Moon, 
    description: "Compare dark noise handling, neon light flare control, and shadow illumination in pitch dark.",
    masterImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&q=90"
  },
  { 
    id: "portrait", 
    label: "Portrait", 
    icon: User, 
    description: "Compare edge detection blur, skin tone warmth, and facial detail accuracy.",
    masterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=90"
  },
  { 
    id: "zoom", 
    label: "Zoom (5x/10x)", 
    icon: ZoomIn, 
    description: "Compare distant text sharpness, periscope clarity, and optical edge compression.",
    masterImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=90"
  },
  { 
    id: "macro", 
    label: "Macro", 
    icon: Focus, 
    description: "Compare micro-texture detail, leaf vein sharpness, and minimum focus distance.",
    masterImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1600&q=90"
  },
  { 
    id: "selfie", 
    label: "Selfie", 
    icon: Smile, 
    description: "Compare front camera skin texture, backlight control, and facial highlights.",
    masterImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1600&q=90"
  },
  { 
    id: "video", 
    label: "Video Still", 
    icon: Video, 
    description: "Compare frame stabilization, cinematic contrast, and video HDR tone mapping.",
    masterImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1600&q=90"
  },
];

export interface PhoneCameraProfile {
  id: string;
  name: string;
  brand: string;
  mainSensor: string;
  ultrawide: string;
  telephoto: string;
  frontCamera: string;
  colorScience: string;
  // Specific CSS filter transformation to model the phone's unique ISP color signature & contrast curves
  filterStyle: string;
  samples: Record<CameraMode, {
    score: number;
    toneBadge: string;
    strengths: string[];
    summary: string;
  }>;
}

export const CAMERA_PROFILES: Record<string, PhoneCameraProfile> = {
  "iphone-16-pro-max": {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    mainSensor: "48MP Fusion (f/1.78, 2nd Gen Sensor-Shift OIS)",
    ultrawide: "48MP Ultra Wide (f/2.2, Hybrid Focus Pixels)",
    telephoto: "12MP 5x Tetraprism (120mm, 3D OIS)",
    frontCamera: "12MP TrueDepth AF (f/1.9)",
    colorScience: "Natural Warm / Photographic Styles ISP",
    filterStyle: "contrast(1.02) saturate(1.05) sepia(0.04) brightness(1.01)",
    samples: {
      daylight: {
        score: 96,
        toneBadge: "Natural Warmth & Soft Sky Highlights",
        strengths: ["True-to-life color calibration", "Subtle highlight roll-off without harsh clipping", "Natural shadow gradations"],
        summary: "Photonic Engine applies minimal artificial saturation, giving photos an organic, camera-like warmth with smooth highlight roll-off."
      },
      night: {
        score: 94,
        toneBadge: "Authentic Night Contrast & Reduced Lens Flare",
        strengths: ["Instant night mode capture", "Anti-reflective lens coating eliminates ghosting", "Preserves deep natural darkness"],
        summary: "Night mode keeps dark skies genuinely dark rather than turning night scenes into artificial daytime."
      },
      portrait: {
        score: 97,
        toneBadge: "Warm Realistic Skin Tones & Hair Detail",
        strengths: ["Flawless hair edge segmentation", "Natural skin warm tones", "Optical f/1.4 depth drop-off"],
        summary: "Delivers portrait studio lighting with accurate depth mapping and realistic bokeh transition around subtle hair strands."
      },
      zoom: {
        score: 92,
        toneBadge: "Clean 5x Optical Sharpness",
        strengths: ["Zero noise up to 10x hybrid zoom", "Color matches main sensor exactly", "3D sensor-shift stabilization"],
        summary: "120mm tetraprism lens retains exact color temperature and shadow detail matching the main 48MP camera."
      },
      macro: {
        score: 95,
        toneBadge: "48MP Ultra-Wide Fine Detail",
        strengths: ["Subtle micro-textures", "Natural color spectrum", "Autofocus subject tracking"],
        summary: "The 48MP ultra-wide sensor renders minute details like water droplets and leaf veins without edge halos."
      },
      selfie: {
        score: 95,
        toneBadge: "TrueDepth Realistic Texture",
        strengths: ["Autofocus at any distance", "No skin smoothing filters", "Accurate facial geometry"],
        summary: "Captures natural skin texture, freckles, and pore detail without aggressive cosmetic smoothing."
      },
      video: {
        score: 99,
        toneBadge: "4K 120fps Dolby Vision HDR",
        strengths: ["Industry-leading stabilization", "Smooth exposure transitions", "ProRes Log color flexibility"],
        summary: "Undisputed benchmark for video with cinema-grade dynamic range, 4K 120fps HDR, and rock-solid OIS."
      }
    }
  },
  "samsung-galaxy-s25-ultra": {
    id: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    mainSensor: "200MP ISOCELL HP2 (f/1.7, OIS)",
    ultrawide: "50MP Ultra Wide (f/1.9, 120° FOV)",
    telephoto: "50MP 5x Periscope + 10MP 3x Telephoto",
    frontCamera: "12MP High-Speed AF (f/2.2)",
    colorScience: "Vibrant Punch / ProVisual Engine",
    filterStyle: "contrast(1.12) saturate(1.24) brightness(1.04) hue-rotate(-2deg)",
    samples: {
      daylight: {
        score: 95,
        toneBadge: "Vibrant Colors & High Saturation",
        strengths: ["Vibrant punchy greens and sky blues", "200MP detail crop resolution", "Ultra-sharp fine foliage"],
        summary: "ProVisual Engine enhances blues and greens, producing punchy, vibrant daylight photos with sharp detail."
      },
      night: {
        score: 96,
        toneBadge: "Bright Nightography & Shadow Boost",
        strengths: ["16-in-1 pixel binning yields bright low light", "Multi-frame AI noise reduction", "Brightened shadow areas"],
        summary: "Nightography turns dark scenes visibly brighter, illuminating hidden shadow details in dim environments."
      },
      portrait: {
        score: 94,
        toneBadge: "Vivid Portrait Compression (3x & 5x)",
        strengths: ["Dual telephoto 70mm & 115mm angles", "Rich contrast subject pop", "Smooth background blur"],
        summary: "Offers versatile 3x and 5x optical focal lengths for compressed background portrait shots with punchy contrast."
      },
      zoom: {
        score: 98,
        toneBadge: "100x Space Zoom & AI Detail Reconstruction",
        strengths: ["50MP 5x periscope clarity", "AI text enhancement at 30x+", "Zoom lock stabilization"],
        summary: "The periscope optic combined with AI resolution reconstruction provides superior distant text reading beyond 10x."
      },
      macro: {
        score: 93,
        toneBadge: "High-Contrast 50MP Macro",
        strengths: ["Vibrant macro color pop", "Edge-to-edge sharpness", "Ultra-wide macro auto-switch"],
        summary: "Macro mode accentuates micro contrast and color saturation for eye-popping close-ups."
      },
      selfie: {
        score: 93,
        toneBadge: "Bright Flattering Selfie Tone",
        strengths: ["Dual-pixel fast autofocus", "Flattering warm lighting", "Clear 4K front video"],
        summary: "Renders bright, polished selfies with slight skin smoothing and vivid facial highlights."
      },
      video: {
        score: 95,
        toneBadge: "8K 30fps & Super Steady OIS",
        strengths: ["8K ultra high resolution mode", "Super Steady video mode", "Vivid HDR10+ color"],
        summary: "Records 8K high-detail video and uses Super Steady OIS to eliminate camera shake during movement."
      }
    }
  },
  "google-pixel-9-pro-xl": {
    id: "google-pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL",
    brand: "Google",
    mainSensor: "50MP Octa PD (f/1.68, OIS)",
    ultrawide: "48MP Quad PD (f/1.7, 123° FOV)",
    telephoto: "48MP 5x Telephoto (f/2.8, OIS)",
    frontCamera: "42MP Dual PD Ultra-Wide (f/2.2)",
    colorScience: "Real Tone / Cool HDR+ Algorithm",
    filterStyle: "contrast(1.14) saturate(0.98) brightness(1.05) hue-rotate(3deg)",
    samples: {
      daylight: {
        score: 97,
        toneBadge: "Cool Crisp Tones & Lifted HDR Shadows",
        strengths: ["HDR+ lifts shadow detail cleanly", "Cooler accurate white balance", "Real Tone skin accuracy"],
        summary: "Google's computational HDR+ lifts dark shadow areas while maintaining cool, accurate sky tones."
      },
      night: {
        score: 98,
        toneBadge: "Astrophotography & Clean Night Sight",
        strengths: ["Astrophotography star pinpoint capture", "Cleanest night sky noise handling", "No blown-out neon light flares"],
        summary: "Night Sight balances neon signs and pitch dark skies with minimal noise and pinpoint astrophotography."
      },
      portrait: {
        score: 96,
        toneBadge: "Real Tone & Precise Segmentation",
        strengths: ["Authentic skin tones for all complexions", "Natural optical bokeh blur", "42MP front portrait detail"],
        summary: "Real Tone technology preserves genuine skin shades with realistic micro-contrast and accurate edge separation."
      },
      zoom: {
        score: 94,
        toneBadge: "Super Res Zoom AI Processing",
        strengths: ["Super Res Zoom AI 30x", "Clean high-contrast text", "Color consistency with main lens"],
        summary: "Super Res Zoom leverages AI diffusion algorithms to reconstruct sharp geometric edges at high digital zoom."
      },
      macro: {
        score: 94,
        toneBadge: "Macro Focus Sharp Edge Contrast",
        strengths: ["Close 2cm focus distance", "Sharp micro contrast", "Clean white balance"],
        summary: "Captures crisp micro textures with high contrast and neutral white balance."
      },
      selfie: {
        score: 96,
        toneBadge: "42MP Ultra-Wide Group Selfie",
        strengths: ["103° wide field of view", "High 42MP facial detail", "Real Tone accurate skin color"],
        summary: "42MP front camera with ultra-wide angle captures detailed group selfies with accurate skin tones."
      },
      video: {
        score: 94,
        toneBadge: "Cloud Video Boost & Night Sight Video",
        strengths: ["Video Boost 8K AI enhancement", "Night Sight video noise removal", "Audio Magic Eraser"],
        summary: "Cloud Video Boost enhances low-light footage and dynamic range with server-side AI processing."
      }
    }
  },
  "vivo-x100-pro": {
    id: "vivo-x100-pro",
    name: "Vivo X100 Pro",
    brand: "Vivo",
    mainSensor: "50MP 1-inch Sony IMX989 (f/1.75, OIS)",
    ultrawide: "50MP Ultra Wide (f/2.0, 119° FOV)",
    telephoto: "50MP ZEISS APO Periscope (f/2.5, OIS)",
    frontCamera: "32MP HD Selfie (f/2.0)",
    colorScience: "ZEISS Natural Color & V3 Imaging Chip",
    filterStyle: "contrast(1.18) saturate(1.10) brightness(0.98) sepia(0.02)",
    samples: {
      daylight: {
        score: 96,
        toneBadge: "ZEISS 1-Inch Sensor Optical Depth",
        strengths: ["Genuine 1-inch optical depth of field", "ZEISS T* anti-glare coating", "Rich cinematic contrast"],
        summary: "The 1-inch Sony sensor provides natural optical background blur and rich cinematic contrast."
      },
      night: {
        score: 97,
        toneBadge: "1-Inch Light Gathering & ZEISS T* Anti-Flare",
        strengths: ["Massive 1-inch light gathering", "Zero streetlight lens flare", "V3 ISP noise reduction"],
        summary: "1-inch hardware sensor combined with ZEISS T* anti-reflection coating yields flare-free, ultra-clean night photos."
      },
      portrait: {
        score: 98,
        toneBadge: "ZEISS Classic Lens Bokeh Styles",
        strengths: ["Iconic ZEISS Bokeh (Biotar, Sonnar, Planar)", "100mm portrait compression", "Silky smooth skin rendering"],
        summary: "Simulates iconic ZEISS anamorphic and prime lenses with silky bokeh and flattering portrait compression."
      },
      zoom: {
        score: 95,
        toneBadge: "ZEISS APO Floating Telephoto",
        strengths: ["Apochromatic color-fringe correction", "Sunset telephoto mode", "Crisp 4.3x to 10x optical clarity"],
        summary: "APO certified floating telephoto optics correct chromatic aberration for pure, color-accurate zoom shots."
      },
      macro: {
        score: 97,
        toneBadge: "Telephoto 100mm Micro Macro",
        strengths: ["100mm telephoto macro from 15cm distance", "Zero perspective distortion", "Extreme magnification"],
        summary: "Telephoto macro lets you capture tiny details from a distance without blocking light or casting phone shadows."
      },
      selfie: {
        score: 91,
        toneBadge: "ZEISS Soft Portrait Glow",
        strengths: ["32MP facial detail", "Flattering portrait lighting", "Custom beauty refinement"],
        summary: "Renders crisp selfies with customizable ZEISS portrait lighting styles."
      },
      video: {
        score: 93,
        toneBadge: "4K ZEISS Cinematic Portrait Video",
        strengths: ["Real-time 4K cinematic rack focus", "V3 imaging chip processing", "Low light video clarity"],
        summary: "4K Cinematic Portrait video adds cinema-style rack focus and lens blur in real time."
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
      {/* Header & Phone Selection Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/80 p-6 rounded-3xl border border-border/70 shadow-luxe backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
            <Camera className="h-4 w-4" /> Real-Time Image Quality Comparison
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Same Photo · ISP Color & Quality Test</h2>
          <p className="text-sm text-muted-foreground mt-1">Drag the slider across the <strong>exact same test scene</strong> to reveal color science, shadow lift, contrast, and sharpening differences between Phone A and Phone B.</p>
        </div>

        {/* Phone Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground block">Phone A (Left Side)</label>
            <select
              value={phoneAId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === phoneBId) setPhoneBId(phoneAId);
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
            <label className="text-xs font-semibold text-muted-foreground block">Phone B (Right Side)</label>
            <select
              value={phoneBId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === phoneAId) setPhoneAId(phoneBId);
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
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Info className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-xs text-foreground/80 font-medium">
            <strong className="text-primary font-bold">{activeModeObj.label} Scene:</strong> {activeModeObj.description}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border/50">
          <Eye className="h-3.5 w-3.5 text-primary" /> Single Unified Test Photo
        </div>
      </div>

      {/* Split Screen Slider Stage (Using SAME Master Scene Image with Phone Filter Tuning) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[380px] sm:h-[480px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-border/70 select-none cursor-ew-resize touch-none"
      >
        {/* Phone B (Right Side - Exact Same Master Image with Phone B Filter Profile) */}
        <div className="absolute inset-0 w-full h-full bg-black">
          <img
            src={activeModeObj.masterImage}
            alt={`${phoneB.name} ${activeModeObj.label}`}
            className="w-full h-full object-cover transition-all duration-300"
            style={{ filter: phoneB.filterStyle }}
          />
          {/* Label Right */}
          <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold shadow-lg">
              <span>{phoneB.name}</span>
              <span className="bg-primary px-2 py-0.5 rounded-full text-[10px] font-black">{sampleB.score}%</span>
            </div>
            <span className="text-[10px] font-semibold bg-white/90 text-black px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur">
              {sampleB.toneBadge}
            </span>
          </div>
        </div>

        {/* Phone A (Left Side - Exact Same Master Image with Phone A Filter Profile & Clipped) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden bg-black"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={activeModeObj.masterImage}
            alt={`${phoneA.name} ${activeModeObj.label}`}
            className="w-full h-full object-cover transition-all duration-300"
            style={{ filter: phoneA.filterStyle }}
          />
          {/* Label Left */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold shadow-lg">
              <span>{phoneA.name}</span>
              <span className="bg-primary px-2 py-0.5 rounded-full text-[10px] font-black">{sampleA.score}%</span>
            </div>
            <span className="text-[10px] font-semibold bg-white/90 text-black px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur">
              {sampleA.toneBadge}
            </span>
          </div>
        </div>

        {/* Slider Handle Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.6)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-white text-black shadow-2xl flex items-center justify-center border-2 border-primary">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Drag Hint Footer Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-xs font-medium border border-white/15 pointer-events-none shadow-md">
          Drag slider to compare photo color & quality tuning
        </div>
      </div>

      {/* Camera Tuning & Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phone A Camera Profile Card */}
        <div className="bg-card border border-border/70 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{phoneA.brand} Color Profile</span>
              <h3 className="text-xl font-bold text-foreground">{phoneA.name}</h3>
              <span className="text-xs font-medium text-muted-foreground">{phoneA.colorScience}</span>
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
              <Sparkles className="h-4 w-4 text-primary" /> {activeModeObj.label} Tuning Characteristic
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{sampleA.summary}</p>
            
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">Key Highlights:</span>
              {sampleA.strengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-foreground/90">
                  <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phone B Camera Profile Card */}
        <div className="bg-card border border-border/70 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{phoneB.brand} Color Profile</span>
              <h3 className="text-xl font-bold text-foreground">{phoneB.name}</h3>
              <span className="text-xs font-medium text-muted-foreground">{phoneB.colorScience}</span>
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
              <Sparkles className="h-4 w-4 text-primary" /> {activeModeObj.label} Tuning Characteristic
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{sampleB.summary}</p>
            
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">Key Highlights:</span>
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
            <span className="text-xs font-bold uppercase tracking-wider text-primary">ISP Quality Comparison Summary</span>
            <h4 className="text-lg font-bold text-foreground">Understanding the Photo Difference on {activeModeObj.label}</h4>
          </div>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed pt-1">
          When comparing the exact same photo, <strong>{phoneA.name}</strong> renders with a <em>{sampleA.toneBadge.toLowerCase()}</em> profile, whereas <strong>{phoneB.name}</strong> tunes the scene with <em>{sampleB.toneBadge.toLowerCase()}</em>. 
          {sampleA.score > sampleB.score ? (
            <> <strong>{phoneA.name}</strong> scores higher in {activeModeObj.label.toLowerCase()} ({sampleA.score} vs {sampleB.score}) due to better balance between highlights and shadow detail.</>
          ) : sampleB.score > sampleA.score ? (
            <> <strong>{phoneB.name}</strong> leads in {activeModeObj.label.toLowerCase()} ({sampleB.score} vs {sampleA.score}) thanks to richer contrast and sharper fine edge retention.</>
          ) : (
            <> Both smartphones achieve equal scores ({sampleA.score}/100) in {activeModeObj.label.toLowerCase()} mode with distinct artistic signatures.</>
          )}
        </p>
      </div>
    </div>
  );
}
