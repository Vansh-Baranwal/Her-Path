import React from 'react';
import { AlertTriangle } from "lucide-react";
import { PIN_TYPES } from './Safezone';

export default function MapPinMarker({ incident, onClick, isSelected }) {
  const config = PIN_TYPES[incident.type];
  const Icon = config.icon || AlertTriangle;

  return (
    <button
      onClick={() => onClick(incident)}
      style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
      aria-label={`${config.label}: ${incident.title}`}
      className="absolute -translate-x-1/2 -translate-y-full group"
    >
      {/* Pulse ring */}
      <div
        className={`absolute inset-0 rounded-full ${config.color} opacity-30 animate-ping`}
        style={{ width: "44px", height: "44px", bottom: "8px" }}
      />

      {/* Pin shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-black opacity-30 rounded-full blur-sm" />

      {/* Pin body */}
      <div
        className={`relative w-11 h-11 rounded-full ${config.color} flex items-center justify-center shadow-xl ring-4 ring-white transition-transform ${
          isSelected ? "scale-125" : "group-active:scale-110"
        }`}
      >
        <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>

      {/* Pin tail */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0`}
        style={{
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: `8px solid ${
            incident.type === "danger"
              ? "#ef4444"
              : incident.type === "safe"
              ? "#22c55e"
              : "#3b82f6"
          }`,
        }}
      />
    </button>
  );
}