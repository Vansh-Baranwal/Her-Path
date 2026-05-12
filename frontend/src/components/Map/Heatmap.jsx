function Heatmap({ zones, visible = true }) {
  if (!visible) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        {/* Radial gradient for danger blobs */}
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
        {/* Soft blur filter */}
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
            fill={
              zone.level === "high" ? "url(#dangerGrad)" : "url(#warnGrad)"
            }
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
}

export default Heatmap;