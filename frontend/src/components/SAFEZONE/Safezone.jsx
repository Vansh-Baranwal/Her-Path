import { useState } from "react";
import { MapPin, AlertTriangle, Shield, Building2, X, ChevronLeft, Plus, Calendar, Users, Camera, Mic, Send, Check, Filter, Navigation, Layers, ThumbsUp, Flag, Heart, Sparkles, ArrowRight } from "lucide-react";
import FilterBar from "./Filterbar";
import MapPinMarker from "./MapPinMarker";
import IncidentPinPopup from "./IncidentPinPopup";
import ReportAreaModal from "./ReportAreaModal";

const INCIDENTS = [
  { id: 1, type: "danger", title: "Eve-teasing reported", description: "Group of men harassing women near bus stop after 8 PM. Avoid this area at night.", date: "2 days ago", reports: 12, x: 30, y: 35 },
  { id: 2, type: "safe", title: "Well-lit market area", description: "Busy market with shops open till 11 PM. Many women report feeling safe here.", date: "1 week ago", reports: 28, x: 60, y: 45 },
  { id: 3, type: "police", title: "Sector 5 Police Station", description: "24/7 police station with women's help desk. Hindi & English support available.", date: "Always open", reports: 0, x: 75, y: 25 },
  { id: 4, type: "danger", title: "Dark alley - poor lighting", description: "Street lights broken for past month. Multiple snatching incidents reported.", date: "5 days ago", reports: 8, x: 20, y: 65 },
  { id: 5, type: "safe", title: "Metro station exit", description: "CCTV monitored, security guards present. Safe pickup point.", date: "3 days ago", reports: 15, x: 50, y: 70 },
  { id: 6, type: "police", title: "Women's Help Center", description: "Free legal aid and counseling. Helpline: 1091", date: "Always open", reports: 0, x: 85, y: 60 },
  { id: 7, type: "danger", title: "Stalker reported", description: "Man on motorcycle following women. Be alert in this lane.", date: "Yesterday", reports: 5, x: 40, y: 20 },
];

export const PIN_TYPES = {
  danger: { label: "Danger", color: "bg-red-500", ring: "ring-red-200", text: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle, emoji: "⚠️" },
  safe: { label: "Safe", color: "bg-green-500", ring: "ring-green-200", text: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: Shield, emoji: "✅" },
  police: { label: "Police", color: "bg-blue-500", ring: "ring-blue-200", text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: Building2, emoji: "👮" },
};

export default function SafeZoneMap({ onBack }) {
  const [filter, setFilter] = useState("all");
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const filteredIncidents = filter === "all" ? INCIDENTS : INCIDENTS.filter((i) => i.type === filter);
  const counts = {
    all: INCIDENTS.length,
    danger: INCIDENTS.filter((i) => i.type === "danger").length,
    safe: INCIDENTS.filter((i) => i.type === "safe").length,
    police: INCIDENTS.filter((i) => i.type === "police").length,
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleReport = (data) => {
    setShowReportModal(false);
    showToast("Report sent! Thank you 💖");
  };

  const handleConfirm = (id) => {
    setSelectedIncident(null);
    showToast("Thanks for confirming!");
  };

  // Show intro screen first
  if (!showMap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center p-6">
        <div className="text-center mt-20">
          {/* Back button */}
          <button
            onClick={onBack}
            aria-label="Back"
            className="absolute top-24 left-4 md:left-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center active:scale-90 hover:bg-white transition z-[60]"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
          </button>

          {/* Icon */}
          <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-green-600" strokeWidth={2} />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SafeZone Community</h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-8">Report unsafe areas, see verified alerts</p>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-8 max-w-xs mx-auto">
            Crowdsourced safety data. Report incidents and access verified community alerts on the map. Strength in numbers.
          </p>

          {/* Open button */}
          <button
            onClick={() => setShowMap(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg active:scale-95 hover:shadow-xl transition flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            <span>View Safety Map</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* MAP BACKGROUND - Stylized */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 50%, #fef3c7 100%)`,
          }}
        >
          {/* Fake roads */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M 0 30 Q 30 25, 50 35 T 100 40" stroke="#cbd5e1" strokeWidth="0.8" fill="none" />
            <path d="M 0 70 Q 40 65, 60 75 T 100 65" stroke="#cbd5e1" strokeWidth="0.8" fill="none" />
            <path d="M 25 0 L 30 100" stroke="#cbd5e1" strokeWidth="0.6" fill="none" />
            <path d="M 65 0 Q 60 50, 70 100" stroke="#cbd5e1" strokeWidth="0.6" fill="none" />
            {/* Park/green areas */}
            <ellipse cx="80" cy="80" rx="12" ry="8" fill="#86efac" opacity="0.4" />
            <ellipse cx="15" cy="50" rx="8" ry="10" fill="#86efac" opacity="0.4" />
            {/* Buildings */}
            <rect x="40" y="50" width="6" height="6" fill="#94a3b8" opacity="0.3" />
            <rect x="55" y="55" width="5" height="7" fill="#94a3b8" opacity="0.3" />
            <rect x="70" y="35" width="7" height="5" fill="#94a3b8" opacity="0.3" />
          </svg>

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        {/* User location */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "50%", top: "50%" }}>
          <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-blue-500 opacity-20 animate-ping" />
          <div className="relative w-5 h-5 rounded-full bg-blue-500 ring-4 ring-white shadow-lg" />
        </div>

        {/* Map pins */}
        {filteredIncidents.map((incident) => (
          <MapPinMarker key={incident.id} incident={incident} onClick={setSelectedIncident} isSelected={selectedIncident?.id === incident.id} />
        ))}
      </div>

      {/* TOP BAR */}
      <div className="absolute top-24 left-0 right-0 z-30 p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={onBack} aria-label="Back" className="w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center active:scale-90 hover:bg-white transition z-[60]">
            <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
          </button>
          <div className="flex-1 bg-white rounded-2xl shadow-lg px-4 py-2.5 flex items-center gap-2">
            <Shield className="w-5 h-5 text-rose-500 flex-shrink-0" strokeWidth={2.5} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm leading-tight">SafeZone Map</p>
              <p className="text-[10px] text-gray-500 truncate">Community-powered safety</p>
            </div>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
        </div>

        {/* Filter bar */}
        <FilterBar activeFilter={filter} onFilterChange={setFilter} counts={counts} />
      </div>

      {/* LEGEND - Bottom left mini card */}
      <div className="absolute bottom-28 left-4 z-20 bg-white rounded-2xl shadow-lg p-3 space-y-1.5">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">Map Key</p>
        {Object.entries(PIN_TYPES).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${config.color} ring-2 ring-white shadow`} />
            <span className="text-xs font-medium text-gray-700">{config.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
          <div className="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-white shadow" />
          <span className="text-xs font-medium text-gray-700">You</span>
        </div>
      </div>

      {/* MY LOCATION BUTTON */}
      <button aria-label="Center on my location" className="absolute bottom-28 right-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center active:scale-90 transition">
        <Navigation className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
      </button>

      {/* FLOATING REPORT BUTTON */}
      <button onClick={() => setShowReportModal(true)} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl active:scale-95 transition flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-white bg-opacity-25 flex items-center justify-center">
          <Plus className="w-5 h-5" strokeWidth={3} />
        </div>
        <span className="text-base">Report This Area</span>
      </button>

      {/* Stats bar */}
      <div className="absolute bottom-6 right-4 z-20 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-500" />
        <span className="text-xs font-bold text-gray-700">{filteredIncidents.length} pins</span>
      </div>

      {/* Incident popup */}
      {selectedIncident && <IncidentPinPopup incident={selectedIncident} onClose={() => setSelectedIncident(null)} onConfirm={handleConfirm} />}

      {/* Report modal */}
      <ReportAreaModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} onSubmit={handleReport} />

      {/* Toast */}
      {toast && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-green-400" strokeWidth={3} />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}