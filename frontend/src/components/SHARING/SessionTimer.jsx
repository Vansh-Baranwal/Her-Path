import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function SessionTimer({ isSharing, startTime }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isSharing) {
      setElapsed(0);
      return;
    }
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSharing, startTime]);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  if (!isSharing) return null;

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
        <Clock className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-blue-700 font-medium">Sharing Time</p>
        <p className="text-3xl font-bold text-blue-900 tabular-nums">{formatTime(elapsed)}</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <p className="text-xs text-green-700 font-bold mt-1">LIVE</p>
      </div>
    </div>
  );
}