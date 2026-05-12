import React, { useState } from "react";
import { X, Flag, Shield, Camera, Mic, Send, Sparkles, Check, AlertTriangle } from "lucide-react";
import { PIN_TYPES } from "./Safezone";

export default function ReportAreaModal({ isOpen, onClose, onSubmit }) {
  const [type, setType] = useState(null);
  const [description, setDescription] = useState("");
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ type, description });
    // Reset
    setType(null);
    setDescription("");
    setStep(1);
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-rose-100 flex items-center justify-center">
              <Flag className="w-6 h-6 text-rose-600" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Report Area</h2>
              <p className="text-xs text-gray-500">Step {step} of 2</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90">
            <X className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 px-5 pt-4 flex-shrink-0">
          <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? "bg-rose-500" : "bg-gray-200"}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? "bg-rose-500" : "bg-gray-200"}`} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  What kind of place is this?
                </h3>
                <p className="text-sm text-gray-500">Tap one to choose</p>
              </div>

              <div className="space-y-3">
                {Object.entries(PIN_TYPES).map(([key, config]) => {
                  const Icon = config.icon;
                  const isActive = type === key;
                  const labels = {
                    danger: "Unsafe place — I felt scared or saw something bad",
                    safe: "Safe place — Good lighting, people around",
                    police: "Police / Help center nearby",
                  };
                  return (
                    <button
                      key={key}
                      onClick={() => setType(key)}
                      className={`w-full rounded-2xl p-4 border-2 flex items-center gap-3 transition-all active:scale-95 ${
                        isActive
                          ? `${config.bg} ${config.border} shadow-md`
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-full ${config.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                      >
                        <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="text-left flex-1">
                        <p
                          className={`font-bold text-base ${
                            isActive ? config.text : "text-gray-900"
                          }`}
                        >
                          {config.emoji} {config.label}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {labels[key]}
                        </p>
                      </div>
                      {isActive && (
                        <div
                          className={`w-7 h-7 rounded-full ${config.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  Tell us what happened
                </h3>
                <p className="text-sm text-gray-500">
                  Help other women stay safe
                </p>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write what you saw or felt..."
                rows={4}
                maxLength={250}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl p-4 text-base text-gray-900 focus:border-rose-500 focus:outline-none focus:bg-white transition resize-none"
              />
              <p className="text-xs text-gray-400 text-right">
                {description.length}/250
              </p>

              {/* Optional add */}
              <div>
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Optional
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex items-center gap-2 active:scale-95 transition">
                    <Camera className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                    <span className="text-sm font-bold text-blue-700">
                      Add Photo
                    </span>
                  </button>
                  <button className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-3 flex items-center gap-2 active:scale-95 transition">
                    <Mic className="w-5 h-5 text-purple-600" strokeWidth={2.5} />
                    <span className="text-sm font-bold text-purple-700">
                      Voice Note
                    </span>
                  </button>
                </div>
              </div>

              {/* Privacy note */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 flex gap-3">
                <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Your report is{" "}
                  <span className="font-bold">100% anonymous</span>. No one will
                  know it was you.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div className="border-t border-gray-100 p-4 flex gap-3 flex-shrink-0">
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              disabled={!type}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:active:scale-100"
            >
              <span className="text-base">Next</span>
              <Sparkles className="w-5 h-5" />
            </button>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="bg-gray-100 text-gray-700 font-bold px-5 rounded-2xl active:scale-95"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!description.trim()}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:active:scale-100"
              >
                <Send className="w-5 h-5" strokeWidth={2.5} />
                <span className="text-base">Submit Report</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}