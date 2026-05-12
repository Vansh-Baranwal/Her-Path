import { Power } from "lucide-react";

export default function ShareToggle({ isSharing, onToggle }) {
  return (
    <div className="w-full">
      <button
        onClick={onToggle}
        className={`w-full rounded-3xl p-6 transition-all duration-300 shadow-lg active:scale-95 ${
          isSharing
            ? "bg-gradient-to-br from-green-500 to-emerald-600"
            : "bg-gradient-to-br from-rose-500 to-pink-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-white bg-opacity-25 ${isSharing ? "animate-pulse" : ""}`}>
              <Power className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <p className="text-white text-2xl font-bold">{isSharing ? "Sharing ON" : "Sharing OFF"}</p>
              <p className="text-white text-sm opacity-90">{isSharing ? "Tap to stop" : "Tap to start"}</p>
            </div>
          </div>
          <div className={`w-16 h-9 rounded-full p-1 transition-all ${isSharing ? "bg-white bg-opacity-40" : "bg-black bg-opacity-20"}`}>
            <div className={`w-7 h-7 rounded-full bg-white shadow-md transition-all ${isSharing ? "translate-x-7" : "translate-x-0"}`} />
          </div>
        </div>
      </button>
    </div>
  );
}