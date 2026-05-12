import SafetyScoreBadge from './SafetyScoreBadge';
import { Clock, Footprints, Sparkles, Shield, AlertTriangle } from 'lucide-react';

function RouteCard({ route, isSelected, onSelect }) {
  const reasons = route.reasons || [];

  return (
    <button
      onClick={() => onSelect(route.id)}
      className={`w-full text-left rounded-2xl p-4 border-2 transition-all active:scale-[0.98] ${
        isSelected
          ? route.safe
            ? "bg-green-50 border-green-400 shadow-lg"
            : "bg-red-50 border-red-300 shadow-lg"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              route.safe
                ? "bg-gradient-to-br from-green-500 to-emerald-600"
                : "bg-gradient-to-br from-red-500 to-rose-600"
            } shadow-md`}
          >
            {route.safe ? (
              <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
            ) : (
              <AlertTriangle
                className="w-5 h-5 text-white"
                strokeWidth={2.5}
              />
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">{route.name}</p>
            <p className="text-[11px] text-gray-500">
              via {route.via}
            </p>
          </div>
        </div>
        <SafetyScoreBadge score={route.score} size="sm" />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-gray-600 mb-2.5">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-semibold">{route.time}</span>
        </span>
        <span className="text-gray-300">•</span>
        <span className="flex items-center gap-1">
          <Footprints className="w-3.5 h-3.5" />
          <span className="font-semibold">{route.distance}</span>
        </span>
        {route.recommended && (
          <>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1 text-rose-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-bold">AI Pick</span>
            </span>
          </>
        )}
      </div>

      {/* Reason chips */}
      <div className="flex flex-wrap gap-1.5">
        {reasons.map((r, i) => (
          <span
            key={i}
            className={`text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
              r.good
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span>{r.icon}</span>
            {r.text}
          </span>
        ))}
      </div>
    </button>
  );
}

export default RouteCard;