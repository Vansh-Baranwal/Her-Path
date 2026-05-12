import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import ContactAlertList from "./ContactAlertList";
import { SOS_HOLD_DURATION, DEMO_CONTACTS } from "../utils/constants";

/**
 * SOSModal
 *
 * States:
 *   "idle"       → User sees the hold-button UI
 *   "countdown"  → User held for 2s — countdown + contacts alerting
 *   "sent"       → SOS fully sent
 *   "cancelled"  → User cancelled in time
 *
 * Props:
 *   isOpen   (bool)  — controls visibility
 *   onClose  (fn)    — called to close the modal
 */

// Simulate contacts getting alerts over time
function useAlertSimulation(phase) {
  const [contacts, setContacts] = useState(
    DEMO_CONTACTS.map((c) => ({ ...c, status: "pending" }))
  );

  useEffect(() => {
    if (phase !== "countdown") {
      setContacts(DEMO_CONTACTS.map((c) => ({ ...c, status: "pending" })));
      return;
    }

    // Staggered: each contact gets "sending" then "sent" with delays
    const timers = [];
    DEMO_CONTACTS.forEach((c, i) => {
      timers.push(
        setTimeout(() => {
          setContacts((prev) =>
            prev.map((x) => (x.id === c.id ? { ...x, status: "sending" } : x))
          );
        }, i * 600)
      );
      timers.push(
        setTimeout(() => {
          setContacts((prev) =>
            prev.map((x) => (x.id === c.id ? { ...x, status: "sent" } : x))
          );
        }, i * 600 + 1200)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  return contacts;
}

export default function SOSModal({ isOpen, onClose, onBack }) {
  const [phase, setPhase] = useState("idle"); // idle | countdown | sent | cancelled
  const [holdProgress, setHoldProgress] = useState(0); // 0-100 for the hold arc
  const holdRef = useRef(null);
  const holdStartRef = useRef(null);

  const contacts = useAlertSimulation(phase);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) setPhase("idle");
  }, [isOpen]);

  // ── Hold-to-activate logic ──────────────────────────────────────────────────
  const startHold = useCallback(() => {
    if (phase !== "idle") return;
    holdStartRef.current = Date.now();

    holdRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      const pct = Math.min((elapsed / SOS_HOLD_DURATION) * 100, 100);
      setHoldProgress(pct);

      if (pct >= 100) {
        clearInterval(holdRef.current);
        setHoldProgress(0);
        setPhase("countdown");
      }
    }, 30);
  }, [phase]);

  const endHold = useCallback(() => {
    clearInterval(holdRef.current);
    setHoldProgress(0);
  }, []);

  // ── Timer callbacks ─────────────────────────────────────────────────────────
  const handleExpire = () => setPhase("sent");
  const handleCancel = () => setPhase("cancelled");

  // Prevent scroll on body when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Arc SVG for hold progress ───────────────────────────────────────────────
  const R = 68;
  const C = 2 * Math.PI * R;
  const dash = (holdProgress / 100) * C;

  return (
    /* Full-screen overlay */
    <div className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-95 overflow-y-auto">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b border-zinc-900">
        {phase === "idle" && onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-full bg-red-900/20 flex items-center justify-center hover:bg-red-900/40 transition"
          >
            <ChevronLeft className="w-6 h-6 text-red-500" strokeWidth={2.5} />
          </button>
        )}
        {(!onBack || phase !== "idle") && <div className="w-10" />}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-red-500 uppercase">
            Emergency SOS
          </span>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex flex-col items-center px-5 pt-8 pb-10 gap-6 max-w-sm mx-auto w-full">

        {/* ── PHASE: idle — hold button ── */}
        {phase === "idle" && (
          <>
            <div className="text-center">
              <p className="text-base font-semibold text-zinc-200">
                Hold the button for 2 seconds
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                बटन को 2 सेकंड दबाएं
              </p>
            </div>

            {/* Pulsing rings + SOS button with arc progress */}
            <div className="relative w-44 h-44 flex items-center justify-center select-none">
              {/* Outer decorative rings */}
              <div className="absolute inset-0 rounded-full border border-red-900 opacity-30" />
              <div className="absolute inset-4 rounded-full border border-red-800 opacity-40" />
              <div className="absolute inset-8 rounded-full border border-red-700 opacity-50" />

              {/* SVG arc showing hold progress */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r={R} fill="none" stroke="#27272a" strokeWidth="4" />
                <circle
                  cx="80" cy="80" r={R}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${C}`}
                  className="transition-all duration-75"
                />
              </svg>

              {/* Hold button */}
              <button
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className="
                  relative z-10 w-24 h-24 rounded-full
                  bg-red-700 active:bg-red-600
                  flex items-center justify-center
                  text-white text-2xl font-black tracking-wide
                  shadow-[0_0_40px_rgba(220,38,38,0.5)]
                  select-none cursor-pointer
                  transition-transform active:scale-95
                "
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                SOS
              </button>
            </div>

            <p className="text-xs text-zinc-600 text-center">
              This will alert your trusted contacts and share your live location.
              <br />
              <span className="text-zinc-700">
                यह आपके संपर्कों को आपकी लाइव लोकेशन भेजेगा।
              </span>
            </p>
          </>
        )}

        {/* ── PHASE: countdown — alerting in progress ── */}
        {phase === "countdown" && (
          <>
            <div className="text-center">
              <p className="text-base font-semibold text-red-400">
                Sending alerts...
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                सूचना भेजी जा रही है
              </p>
            </div>

            <CountdownTimer
              isActive={phase === "countdown"}
              onExpire={handleExpire}
              onCancel={handleCancel}
            />

            <ContactAlertList contacts={contacts} />
          </>
        )}

        {/* ── PHASE: sent — all done ── */}
        {phase === "sent" && (
          <div className="text-center flex flex-col items-center gap-5 py-6">
            <div className="w-20 h-20 rounded-full bg-green-950 border-2 border-green-700 flex items-center justify-center text-4xl">
              ✓
            </div>
            <div>
              <p className="text-xl font-black text-green-400">
                Help is on the way
              </p>
              <p className="text-sm text-zinc-400 mt-1">
                मदद आ रही है
              </p>
            </div>

            <ContactAlertList contacts={contacts} />

            <p className="text-xs text-zinc-500 text-center">
              Your live location is being shared until you turn it off.
              <br />
              <span className="text-zinc-600">
                आपकी लाइव लोकेशन शेयर की जा रही है।
              </span>
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-zinc-800 text-zinc-300 text-sm font-semibold hover:bg-zinc-700 transition"
            >
              I'm Safe Now · मैं सुरक्षित हूं
            </button>
          </div>
        )}

        {/* ── PHASE: cancelled ── */}
        {phase === "cancelled" && (
          <div className="text-center flex flex-col items-center gap-5 py-6">
            <div className="w-20 h-20 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-4xl">
              ✕
            </div>
            <div>
              <p className="text-xl font-black text-zinc-200">
                SOS Cancelled
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                SOS रद्द किया गया
              </p>
            </div>
            <p className="text-xs text-zinc-600 text-center">
              No alerts were sent. Stay safe!
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-zinc-800 text-zinc-300 text-sm font-semibold hover:bg-zinc-700 transition"
            >
              Close · बंद करें
            </button>
          </div>
        )}

      </div>
    </div>
  );
}