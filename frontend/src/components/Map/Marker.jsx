import {
  MapPin,
  Shield,
  AlertTriangle,
  Lightbulb,
  Users,
  Building2,
  Home,
} from "lucide-react";

function Marker({ type, label, x, y, onClick, pulse = false, size = "md" }) {
  const TYPES = {
    start: {
      color: "bg-green-500",
      ring: "border-green-200",
      icon: Home,
      tail: "#22c55e",
    },
    end: {
      color: "bg-rose-500",
      ring: "border-rose-200",
      icon: MapPin,
      tail: "#f43f5e",
    },
    police: {
      color: "bg-blue-500",
      ring: "border-blue-200",
      icon: Building2,
      tail: "#3b82f6",
    },
    danger: {
      color: "bg-red-600",
      ring: "border-red-200",
      icon: AlertTriangle,
      tail: "#dc2626",
    },
    safe: {
      color: "bg-emerald-500",
      ring: "border-emerald-200",
      icon: Shield,
      tail: "#10b981",
    },
    light: {
      color: "bg-amber-400",
      ring: "border-amber-100",
      icon: Lightbulb,
      tail: "#fbbf24",
    },
    crowd: {
      color: "bg-purple-500",
      ring: "border-purple-200",
      icon: Users,
      tail: "#a855f7",
    },
  };

  const config = TYPES[type] || TYPES.end;
  const Icon = config.icon;
  const sizeMap = {
    sm: { box: "w-7 h-7", icon: "w-3.5 h-3.5" },
    md: { box: "w-10 h-10", icon: "w-5 h-5" },
    lg: { box: "w-12 h-12", icon: "w-6 h-6" },
  };
  const s = sizeMap[size];

  return (
    <button
      onClick={onClick}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label={label || type}
      className="absolute -translate-x-1/2 -translate-y-full group z-10"
    >
      {pulse && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 rounded-full ${config.color} opacity-30 animate-ping`}
          style={{ width: "44px", height: "44px", bottom: "8px" }}
        />
      )}

      {/* Pin body */}
      <div
        className={`relative ${s.box} rounded-full ${config.color} flex items-center justify-center shadow-xl ring-4 ring-white border-2 ${config.ring} active:scale-95 transition-transform`}
      >
        <Icon className={`${s.icon} text-white`} strokeWidth={2.5} />
      </div>

      {/* Pin tail */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-0 h-0"
        style={{
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: `8px solid ${config.tail}`,
        }}
      />

      {/* Label tooltip */}
      {label && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 bg-white rounded-md px-2 py-0.5 shadow-md text-[10px] font-bold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
          {label}
        </div>
      )}
    </button>
  );
}

export default Marker;