import { useState } from "react";
import {
  ChevronLeft,
  Sparkles,
  Home,
  MapPin,
  X,
  TrendingUp,
  Search,
  AlertTriangle,
  Navigation,
  Clock,
  Footprints,
  Bike,
  Car,
  Phone,
  ArrowRight,
  Check,
} from "lucide-react";
import MapComponent from "../components/Map/MapComponent";
import RouteCard from "../components/RouteCard";
import SafetyScoreBadge from "../components/SafetyScoreBadge";

function MapPage({ onBack }) {
  const [from, setFrom] = useState("My Location");
  const [to, setTo] = useState("");
  const [searched, setSearched] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(1);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [toast, setToast] = useState(null);  const [showMap, setShowMap] = useState(false);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const QUICK_DESTINATIONS = [
    { icon: Home, label: "Home", color: "bg-pink-500" },
    { icon: Phone, label: "Work", color: "bg-blue-500" },
    { icon: MapPin, label: "Mom's", color: "bg-rose-500" },
  ];

  const ROUTES = [
    {
      id: 1,
      name: "Safe Route",
      via: "Main Road & Market",
      score: 87,
      safe: true,
      time: "18 min",
      distance: "1.4 km",
      recommended: true,
      path: "M 25,90 Q 35,75 45,55 T 70,15",
      reasons: [
        { icon: "💡", text: "Well lit", good: true },
        { icon: "👮", text: "Police nearby", good: true },
        { icon: "👥", text: "Crowded", good: true },
      ],
    },
    {
      id: 2,
      name: "Avoid Route",
      via: "Back Lane",
      score: 42,
      safe: false,
      time: "12 min",
      distance: "0.9 km",
      recommended: false,
      path: "M 25,90 Q 30,70 40,60 T 70,15",
      reasons: [
        { icon: "🌑", text: "Dark areas", good: false },
        { icon: "⚠️", text: "Reports here", good: false },
      ],
    },
  ];

  const HEATMAP_ZONES = [
    { x: 35, y: 60, r: 9, level: "high" },
    { x: 18, y: 75, r: 7, level: "medium" },
    { x: 55, y: 35, r: 6, level: "medium" },
  ];

  const buildMarkers = () => {
    if (!searched) {
      return [
        {
          type: "start",
          x: 50,
          y: 50,
          label: "You are here",
          pulse: true,
          size: "lg",
          color: "#22c55e",
        },
        { type: "police", x: 75, y: 25, label: "Police Station", color: "#3b82f6" },
        { type: "police", x: 20, y: 30, label: "Help Center", color: "#3b82f6" },
        { type: "safe", x: 60, y: 75, label: "Safe Zone", color: "#10b981" },
        { type: "light", x: 40, y: 25, label: "Lit Area", color: "#fbbf24" },
      ];
    }

    const activeRoute = ROUTES.find((r) => r.id === selectedRoute);
    return [
      { type: "start", x: 25, y: 90, label: "From", size: "md", color: "#22c55e" },
      { type: "end", x: 70, y: 15, label: "To", size: "md", pulse: true, color: "#f43f5e" },
      ...(activeRoute?.safe
        ? [
            { type: "police", x: 50, y: 45, label: "Police", color: "#3b82f6" },
            { type: "light", x: 38, y: 65, label: "Lit area", color: "#fbbf24" },
            { type: "crowd", x: 60, y: 30, label: "Busy market", color: "#a855f7" },
          ]
        : [
            { type: "danger", x: 40, y: 60, label: "Danger zone", color: "#dc2626" },
            { type: "danger", x: 35, y: 70, label: "Reports", color: "#dc2626" },
          ]),
    ];
  };

  const handleSearch = () => {
    if (!to.trim()) {
      showToast("Please enter destination");
      return;
    }
    setSearched(true);
    showToast("Routes found ✓");
  };

  const swapInputs = () => {
    setFrom(to);
    setTo(from);
  };

  const activeRoute = ROUTES.find((r) => r.id === selectedRoute);
  
  // Show intro screen first
  if (!showMap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center p-6">
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
            <Navigation className="w-12 h-12 text-rose-500" strokeWidth={2} />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safe Route AI</h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-8">Walk safe, every time</p>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-8 max-w-xs mx-auto">
            Get AI-powered route recommendations based on real-time safety data, lighting, crowds, and more.
          </p>

          {/* Open button */}
          <button
            onClick={() => setShowMap(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg active:scale-95 hover:shadow-xl transition flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            <span>Open Route Map</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* MAP layer */}
      <div className="absolute inset-0 pt-20">
        <MapComponent
          markers={buildMarkers()}
          heatmapZones={HEATMAP_ZONES}
          routes={searched ? ROUTES : []}
          showHeatmap={showHeatmap}
          onMarkerClick={(m) => showToast(m.label)}
        />
      </div>

      {/* TOP SEARCH PANEL */}
      <div className="absolute top-24 left-0 right-0 z-30 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center active:scale-90 hover:bg-white transition"
          >
            <ChevronLeft
              className="w-6 h-6 text-gray-800"
              strokeWidth={2.5}
            />
          </button>
          <div className="flex-1 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <p className="font-bold text-gray-900 text-sm">
              AI Safe Route
            </p>
            <span className="ml-auto text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
              SMART
            </span>
          </div>
        </div>

        {/* From / To inputs */}
        <div className="bg-white rounded-2xl shadow-lg p-3 space-y-2">
          {/* From */}
          <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <Home className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
              className="flex-1 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Swap line */}
          <div className="relative h-2 flex items-center">
            <div className="absolute left-7 right-0 border-t border-dashed border-gray-200" />
            <button
              onClick={swapInputs}
              aria-label="Swap"
              className="absolute right-2 -top-3 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center active:scale-90 shadow-sm"
            >
              <TrendingUp
                className="w-3 h-3 text-gray-600 rotate-90"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* To */}
          <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Where do you want to go?"
              className="flex-1 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            {to && (
              <button
                onClick={() => setTo("")}
                aria-label="Clear"
                className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
              >
                <X className="w-3 h-3 text-gray-600" strokeWidth={3} />
              </button>
            )}
          </div>

          {/* Quick destinations */}
          {!searched && (
            <div className="flex gap-2 pt-1">
              {QUICK_DESTINATIONS.map((q, i) => {
                const Icon = q.icon;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setTo(q.label);
                      showToast(`Set to ${q.label}`);
                    }}
                    className="flex-1 bg-gray-50 rounded-xl py-2 flex flex-col items-center gap-1 active:scale-95 transition"
                  >
                    <div
                      className={`w-7 h-7 rounded-full ${q.color} flex items-center justify-center`}
                    >
                      <Icon
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">
                      {q.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-3 rounded-xl active:scale-95 transition flex items-center justify-center gap-2 shadow-md"
          >
            <Search className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-sm">Find Safe Route</span>
          </button>
        </div>
      </div>

      {/* RIGHT-SIDE CONTROLS */}
      <div className="absolute right-4 z-20 flex flex-col gap-2" style={{top: '50%', transform: 'translateY(-50%)'}}>
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          aria-label="Toggle heatmap"
          className={`w-11 h-11 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition ${
            showHeatmap ? "bg-red-500 text-white" : "bg-white text-gray-700"
          }`}
        >
          <AlertTriangle className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <button
          aria-label="My location"
          className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center active:scale-90"
        >
          <Navigation
            className="w-5 h-5 text-blue-600"
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* LEGEND */}
      <div className="absolute left-4 z-20 bg-white rounded-2xl shadow-lg p-2.5 space-y-1.5" style={{top: '50%', transform: 'translateY(-50%)'}}>
        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">
          Routes
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-1 rounded-full bg-green-500" />
          <span className="text-[10px] font-semibold text-gray-700">
            Safe
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-1 rounded-full bg-red-500" />
          <span className="text-[10px] font-semibold text-gray-700">
            Avoid
          </span>
        </div>
      </div>

      {/* BOTTOM ROUTE PANEL */}
      {searched && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-2xl animate-slide-up">
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          <div className="px-4 pb-4 max-h-[55vh] overflow-y-auto">
            {/* Active route header */}
            {activeRoute && (
              <div
                className={`rounded-2xl p-3.5 mb-3 ${
                  activeRoute.safe
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-red-500 to-rose-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-bold text-sm">
                    {activeRoute.safe ? "Safe Route Selected" : "Risky Route"}
                  </p>
                  <SafetyScoreBadge score={activeRoute.score} size="sm" />
                </div>
                <div className="flex items-center gap-3 text-white text-opacity-95 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeRoute.time}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Footprints className="w-3.5 h-3.5" />
                    {activeRoute.distance}
                  </span>
                </div>
              </div>
            )}

            {/* Travel mode picker */}
            <div className="flex gap-2 mb-3">
              {[
                { icon: Footprints, label: "Walk", active: true },
                { icon: Bike, label: "Auto", active: false },
                { icon: Car, label: "Cab", active: false },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <button
                    key={i}
                    className={`flex-1 rounded-xl py-2.5 flex flex-col items-center gap-1 transition ${
                      m.active
                        ? "bg-rose-50 border-2 border-rose-300"
                        : "bg-gray-50 border-2 border-transparent"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        m.active ? "text-rose-600" : "text-gray-500"
                      }`}
                      strokeWidth={2.5}
                    />
                    <span
                      className={`text-[10px] font-bold ${
                        m.active ? "text-rose-700" : "text-gray-600"
                      }`}
                    >
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Route options */}
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
              Choose a route
            </p>
            <div className="space-y-2 mb-3">
              {ROUTES.map((r) => (
                <RouteCard
                  key={r.id}
                  route={r}
                  isSelected={selectedRoute === r.id}
                  onSelect={setSelectedRoute}
                />
              ))}
            </div>

            {/* Start navigation button */}
            <div className="flex gap-2">
              <button
                aria-label="Call companion"
                className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center active:scale-95"
              >
                <Phone
                  className="w-5 h-5 text-blue-600"
                  strokeWidth={2.5}
                />
              </button>
              <button
                onClick={() => showToast("Starting navigation 🧭")}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" strokeWidth={2.5} />
                <span className="text-base">Start Navigation</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-44 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-green-400" strokeWidth={3} />
          <span className="text-xs font-medium">{toast}</span>
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
        .animate-slide-up { animation: slide-up 0.35s cubic-bezier(0.16,1,0.3,1); }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}

export default MapPage;