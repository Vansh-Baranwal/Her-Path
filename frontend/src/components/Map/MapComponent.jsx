function MapComponent({
  markers = [],
  heatmapZones = [],
  routes = [],
  showHeatmap = true,
  onMarkerClick,
}) {
  const Heatmap = ({ zones, visible = true }) => {
    if (!visible) return null;
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <radialGradient id="dangerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fca5a5" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="warnGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
        {zones.map((zone, i) => (
          <g key={i} filter="url(#blur)">
            <ellipse
              cx={zone.x}
              cy={zone.y}
              rx={zone.r || 8}
              ry={zone.r ? zone.r * 0.8 : 6}
              fill={zone.level === "high" ? "url(#dangerGrad)" : "url(#warnGrad)"}
            >
              <animate
                attributeName="opacity"
                values="0.7;1;0.7"
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
              />
            </ellipse>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 50%, #fef9c3 100%)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 30 Q 30 25, 50 35 T 100 40"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 0 70 Q 40 65, 60 75 T 100 65"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 25 0 L 28 100"
            stroke="#cbd5e1"
            strokeWidth="0.9"
            fill="none"
          />
          <path
            d="M 65 0 Q 60 50, 72 100"
            stroke="#cbd5e1"
            strokeWidth="0.9"
            fill="none"
          />
          <path
            d="M 10 50 L 90 55"
            stroke="#e2e8f0"
            strokeWidth="0.4"
            fill="none"
          />
          <path
            d="M 45 10 L 50 90"
            stroke="#e2e8f0"
            strokeWidth="0.4"
            fill="none"
          />
          <ellipse
            cx="80"
            cy="80"
            rx="10"
            ry="7"
            fill="#86efac"
            opacity="0.45"
          />
          <ellipse
            cx="15"
            cy="45"
            rx="7"
            ry="9"
            fill="#86efac"
            opacity="0.45"
          />
          {[
            [40, 50],
            [55, 55],
            [70, 35],
            [35, 75],
            [60, 20],
            [80, 50],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="4"
              height="5"
              fill="#94a3b8"
              opacity="0.35"
              rx="0.5"
            />
          ))}
        </svg>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Heatmap zones={heatmapZones} visible={showHeatmap} />

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[8]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {routes.map((route, i) => (
          <g key={i}>
            <path
              d={route.path}
              stroke={route.safe ? "#22c55e" : "#ef4444"}
              strokeWidth="3"
              fill="none"
              opacity="0.25"
              strokeLinecap="round"
            />
            <path
              d={route.path}
              stroke={route.safe ? "#16a34a" : "#dc2626"}
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={route.safe ? "0" : "2 1.5"}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-10"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            {route.safe && (
              <circle r="0.8" fill="white">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={route.path}
                />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {markers.map((m, i) => (
        <button
          key={i}
          onClick={() => onMarkerClick?.(m)}
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
          aria-label={m.label || m.type}
          className="absolute -translate-x-1/2 -translate-y-full group z-10"
        >
          {m.pulse && (
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full opacity-30 animate-ping"
              style={{
                background: m.color,
                width: "44px",
                height: "44px",
                bottom: "8px",
              }}
            />
          )}
          <div
            className={`relative rounded-full flex items-center justify-center shadow-xl ring-4 ring-white border-2 active:scale-95 transition-transform`}
            style={{
              width: m.size === "lg" ? "48px" : m.size === "sm" ? "28px" : "40px",
              height: m.size === "lg" ? "48px" : m.size === "sm" ? "28px" : "40px",
              background: m.color,
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            {m.icon && <span>{m.icon}</span>}
          </div>
          {m.label && (
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 bg-white rounded-md px-2 py-0.5 shadow-md text-[10px] font-bold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
              {m.label}
            </div>
          )}
        </button>
      ))}

      <div className="absolute bottom-1 right-2 text-[8px] text-gray-400 z-20">
        SafeRoute AI • Map data
      </div>
    </div>
  );
}

export default MapComponent;