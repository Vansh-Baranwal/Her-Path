import React from "react";
import { X, Calendar, Users, ThumbsUp, Navigation } from "lucide-react";
import { PIN_TYPES } from "./Safezone";

export default function IncidentPinPopup({ incident, onClose, onConfirm }) {
  if (!incident) return null;
  const config = PIN_TYPES[incident.type];
  const Icon = config.icon;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-30 z-40" />

      {/* Popup card */}
      <div className="fixed left-4 right-4 bottom-24 z-50 animate-slide-up">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Colored header */}
          <div className={`${config.color} px-5 py-4 flex items-center gap-3`}>
            <div className="w-12 h-12 rounded-full bg-white bg-opacity-25 flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <p className="text-white text-opacity-90 text-xs font-bold uppercase tracking-wider">
                {config.label} {config.emoji}
              </p>
              <h3 className="text-white font-bold text-base leading-tight">
                {incident.title}
              </h3>
            </div>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full bg-white bg-opacity-25 flex items-center justify-center active:scale-90">
              <X className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {incident.description}
            </p>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 font-medium">
                  {incident.date}
                </span>
              </div>
              {incident.reports > 0 && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 font-medium">
                    {incident.reports} reports
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => onConfirm(incident.id)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl active:scale-95 transition flex items-center justify-center gap-2"
              >
                <ThumbsUp className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-sm">Confirm</span>
              </button>
              <button className="bg-rose-500 text-white font-bold py-3 rounded-xl active:scale-95 transition flex items-center justify-center gap-2 shadow-md">
                <Navigation className="w-4 h-4" strokeWidth={2.5} />
                <span className="text-sm">Directions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}