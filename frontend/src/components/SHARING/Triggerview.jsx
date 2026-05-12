import React, { useState } from 'react';
import { Shield, ChevronLeft, Sparkles, ArrowRight } from "lucide-react";
import LocationDrawer from "./LocationDrawer";

export default function TriggerView({ onBack }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerClose = () => {
    setShowDrawer(false);
    onBack(); // Go back to home when closing drawer
  };

  // Show intro screen first
  if (!showDrawer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
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
            <Shield className="w-12 h-12 text-blue-600" strokeWidth={2} />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stay Safe, Stay Strong</h1>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-8">Share your live location with people you trust</p>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-8 max-w-xs mx-auto">
            Enable real-time location sharing with trusted contacts during travel. Set auto-expiry for privacy control.
          </p>

          {/* Open button */}
          <button
            onClick={() => setShowDrawer(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg active:scale-95 hover:shadow-xl transition flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            <span>Open Live Location</span>
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    );
  }

  // Show Location Drawer when drawer is open
  return (
    <LocationDrawer 
      isOpen={showDrawer} 
      onClose={handleDrawerClose}
    />
  );
}