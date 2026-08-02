import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Cpu, Zap, Camera, Brain, Battery, Video, Layers, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const PHONES = [
  {
    id: "iphone",
    name: "iPhone 17 Pro Max",
    scores: { antutu: "1,750,430", geekbenchSingle: "3,150", geekbenchMulti: "7,850" },
    metrics: {
      Gaming: 98,
      Camera: 95,
      AI: 92,
      Battery: 96,
      Editing: 99,
      Multitasking: 94,
    },
    fpsData: [
      { minute: "0m", fps: 120 }, { minute: "10m", fps: 120 }, { minute: "20m", fps: 118 },
      { minute: "30m", fps: 115 }, { minute: "40m", fps: 115 }, { minute: "50m", fps: 112 },
      { minute: "60m", fps: 110 }
    ],
    color: "from-blue-500 to-indigo-600",
    barColor: "bg-blue-500"
  },
  {
    id: "samsung",
    name: "Galaxy S26 Ultra",
    scores: { antutu: "1,820,110", geekbenchSingle: "2,980", geekbenchMulti: "7,950" },
    metrics: {
      Gaming: 95,
      Camera: 98,
      AI: 97,
      Battery: 92,
      Editing: 94,
      Multitasking: 97,
    },
    fpsData: [
      { minute: "0m", fps: 120 }, { minute: "10m", fps: 118 }, { minute: "20m", fps: 115 },
      { minute: "30m", fps: 110 }, { minute: "40m", fps: 105 }, { minute: "50m", fps: 102 },
      { minute: "60m", fps: 98 }
    ],
    color: "from-emerald-500 to-teal-600",
    barColor: "bg-emerald-500"
  },
  {
    id: "pixel",
    name: "Pixel 9 Pro XL",
    scores: { antutu: "1,450,220", geekbenchSingle: "2,450", geekbenchMulti: "6,800" },
    metrics: {
      Gaming: 85,
      Camera: 97,
      AI: 99,
      Battery: 88,
      Editing: 89,
      Multitasking: 92,
    },
    fpsData: [
      { minute: "0m", fps: 120 }, { minute: "10m", fps: 115 }, { minute: "20m", fps: 105 },
      { minute: "30m", fps: 95 }, { minute: "40m", fps: 90 }, { minute: "50m", fps: 88 },
      { minute: "60m", fps: 85 }
    ],
    color: "from-amber-500 to-orange-600",
    barColor: "bg-amber-500"
  }
];

const METRIC_ICONS = {
  Gaming: Zap,
  Camera: Camera,
  AI: Brain,
  Battery: Battery,
  Editing: Video,
  Multitasking: Layers,
};

export function BenchmarkCharts() {
  const [activePhone, setActivePhone] = useState(PHONES[0]);
  const [animate, setAnimate] = useState(false);

  // Trigger animation on mount and when phone changes
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, [activePhone]);

  return (
    <div className="w-full bg-[#0a0a0e] rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl overflow-hidden relative text-slate-200">
      
      {/* Background glow */}
      <div className={cn("absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl opacity-20 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000", activePhone.color)} />

      {/* Header & Selector */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white flex items-center gap-3">
            <Activity className="h-8 w-8 text-amber-500" />
            Performance Lab
          </h2>
          <p className="text-slate-400 mt-2">Real-time metrics and sustained FPS benchmarks.</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md self-start md:self-auto">
          {PHONES.map(phone => (
            <button
              key={phone.id}
              onClick={() => setActivePhone(phone)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                activePhone.id === phone.id ? "bg-white text-black shadow-md" : "text-slate-400 hover:text-white"
              )}
            >
              {phone.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Column: Scores & Bars */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Global Scores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">AnTuTu v10</p>
              <p className="text-2xl font-display font-bold text-white">{activePhone.scores.antutu}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Geekbench 6</p>
              <p className="text-2xl font-display font-bold text-white">{activePhone.scores.geekbenchMulti}</p>
            </div>
          </div>

          {/* Animated Metric Bars */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <h3 className="font-display font-bold text-white flex items-center gap-2 mb-2">
              <Cpu className="h-5 w-5 text-amber-500" /> Capability Scores
            </h3>
            
            {Object.entries(activePhone.metrics).map(([key, value]) => {
              const Icon = METRIC_ICONS[key as keyof typeof METRIC_ICONS];
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Icon className="h-4 w-4 opacity-70" /> {key}
                    </span>
                    <span className="text-white">{animate ? value : 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]", activePhone.barColor)}
                      style={{ width: animate ? `${value}%` : '0%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: FPS Line Chart */}
        <div className="lg:col-span-2 flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="mb-6">
            <h3 className="font-display font-bold text-white text-xl">Sustained Gaming FPS</h3>
            <p className="text-sm text-slate-400 mt-1">Genshin Impact (Max Settings) — 60 Min Test</p>
          </div>
          
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activePhone.fpsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activePhone.id === 'iphone' ? '#3b82f6' : activePhone.id === 'samsung' ? '#10b981' : '#f59e0b'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={activePhone.id === 'iphone' ? '#3b82f6' : activePhone.id === 'samsung' ? '#10b981' : '#f59e0b'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
                <XAxis 
                  dataKey="minute" 
                  stroke="#64748b" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  domain={[60, 130]} 
                  stroke="#64748b"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  cursor={{ stroke: '#ffffff33', strokeWidth: 2, strokeDasharray: '4 4' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fps" 
                  stroke={activePhone.id === 'iphone' ? '#3b82f6' : activePhone.id === 'samsung' ? '#10b981' : '#f59e0b'} 
                  strokeWidth={4}
                  dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
