import { useEffect, useState } from "react";
import { COUNTDOWN_SECONDS } from "../utils/constants";

/**
 * CountdownTimer
 * Props:
 *   isActive  (bool)   — starts/stops the countdown
 *   onExpire  (fn)     — called when timer hits 0
 *   onCancel  (fn)     — called when user taps Cancel
 */
export default function CountdownTimer({ isActive, onExpire, onCancel }) {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  // Reset whenever modal opens
  useEffect(() => {
    setSeconds(COUNTDOWN_SECONDS);
  }, [isActive]);

  // Tick every second
  useEffect(() => {
    if (!isActive) return;
    if (seconds === 0) {
      onExpire?.();
      return;
    }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [isActive, seconds, onExpire]);

  const progress = ((COUNTDOWN_SECONDS - seconds) / COUNTDOWN_SECONDS) * 100;

  return (
    <div className="w-full">
      {/* Timer display */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-sm text-gray-400">
          Cancelling in · रुकने के लिए
        </span>
        <span className="text-2xl font-black text-red-500 tabular-nums">
          {seconds}s
        </span>
      </div>

      {/* Progress bar — fills left to right as time runs out */}
      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-red-500 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Cancel button — large, always visible, easy to tap */}
      <button
        onClick={onCancel}
        className="
          mt-4 w-full py-3 rounded-xl
          border border-zinc-700 text-zinc-300
          text-sm font-semibold tracking-wide
          hover:bg-zinc-800 active:scale-95
          transition-all duration-150
        "
      >
        Cancel SOS · रद्द करें
      </button>
    </div>
  );
}