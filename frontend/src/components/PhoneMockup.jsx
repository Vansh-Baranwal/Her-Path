import { Icons } from '../utils/icons.jsx';
import SOSButton from './UI/SOSButton';

export default function PhoneMockup() {
  return (
    <div className="relative w-[290px] md:w-[340px] h-[600px] md:h-[680px] rounded-[45px] bg-[#0A0D14] border-[10px] border-[#1A2A3A] shadow-2xl overflow-hidden flex flex-col"
      style={{
        boxShadow: '0 0 50px rgba(255, 51, 102, 0.25), 0 0 80px rgba(100, 50, 150, 0.15), inset 0 0 30px rgba(255, 51, 102, 0.05)'
      }}>

      {/* Top Status Bar Area */}
      <div className="bg-black px-6 py-3 flex justify-between items-center text-white text-xs font-semibold">
        <span>9:41</span>
        <div className="flex gap-1.5 items-center">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-[#0F1419] to-[#0A0D14] overflow-hidden relative">

        {/* Header Section */}
        <div className="px-5 pt-4 pb-3 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-white font-bold text-base flex items-center gap-1">
              You're Safe
              <span className="ml-1">
                <Icons.Check className="w-3.5 h-3.5 text-green-400" />
              </span>
            </h2>
            <p className="text-green-400 text-[9px] mt-1 font-medium">Live location is being shared</p>
          </div>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <Icons.Bell className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Map/Grid Area */}
        <div className="flex-1 relative overflow-hidden bg-[#0a0d14]">
          {/* Grid background pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 300 400">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a2a3a" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="300" height="400" fill="url(#grid)" />
          </svg>

          {/* SVG Overlay for route and markers */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 400" preserveAspectRatio="xMidYMid slice">
            {/* Radar circles for depth */}
            <circle cx="140" cy="200" r="100" fill="none" stroke="#1a3a4a" strokeWidth="0.8" opacity="0.3"/>
            <circle cx="140" cy="200" r="70" fill="none" stroke="#1a3a4a" strokeWidth="0.8" opacity="0.3"/>
            <circle cx="140" cy="200" r="40" fill="none" stroke="#FF3366" strokeWidth="1" opacity="0.25"/>

            {/* Pink curved route line */}
            <defs>
              <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3366" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#FF3366" stopOpacity="0.5"/>
              </linearGradient>
            </defs>
            <path d="M 140 320 Q 145 260, 155 200 Q 165 140, 185 80"
              stroke="url(#routeLine)" strokeWidth="2.5" fill="none"
              strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>

            {/* Current location - pulsing circle at bottom center */}
            <circle cx="140" cy="320" r="6" fill="#FF3366" opacity="0.3"/>
            <circle cx="140" cy="320" r="4" fill="#FF3366"/>
            <circle cx="140" cy="320" r="8" fill="none" stroke="#FF3366" strokeWidth="1" opacity="0.4"/>

            {/* Destination - Home marker at top */}
            <g transform="translate(185, 80)">
              <path d="M 0 -8 L 6 -2 L 6 6 L -6 6 L -6 -2 Z" fill="#FF3366"/>
              <circle cx="0" cy="0" r="1" fill="white"/>
            </g>

            {/* Blue user indicator on right side */}
            <circle cx="220" cy="140" r="5" fill="#3B82F6" opacity="0.3"/>
            <circle cx="220" cy="140" r="3" fill="#3B82F6"/>
          </svg>

          {/* Home Label */}
          <div className="absolute top-16 right-8 bg-[#0a0d14]/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 z-10">
            <Icons.MapPin className="w-3 h-3 text-[#FF3366]" />
            <span className="text-[8px] text-white font-semibold">Home</span>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="px-4 pb-4 pt-3 flex justify-between items-end gap-3">
          {/* Share Location Button */}
          <div className="flex flex-col items-center gap-1 cursor-pointer group flex-1">
            <Icons.Users className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
            <span className="text-[7px] text-white/40 text-center font-medium leading-tight">Share<br/>Location</span>
          </div>

          {/* SOS Button - Large Circle */}
          <div className="mb-1">
            <SOSButton size="large" className="shadow-[0_0_40px_rgba(255,51,102,0.4)]" />
          </div>

          {/* Record Audio Button */}
          <div className="flex flex-col items-center gap-1 cursor-pointer group flex-1">
            <Icons.Mic className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" />
            <span className="text-[7px] text-white/40 text-center font-medium leading-tight">Record<br/>Audio</span>
          </div>
        </div>

        {/* Trusted Contacts Section */}
        <div className="px-4 pb-4 border-t border-white/10 pt-3">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs text-white font-bold">Trusted Contacts</span>
            <span className="text-[8px] text-[#FF3366] cursor-pointer hover:underline font-semibold">View all</span>
          </div>

          {/* Contact Card */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
                alt="Ananya Sharma"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white text-xs font-bold leading-tight">Ananya Sharma</h4>
                <p className="text-[#8A93A6] text-[8px] flex items-center gap-1 mt-0.5">
                  <span className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0"></span>
                  <span className="truncate">Live • 2.4 km away</span>
                </p>
              </div>
            </div>
            <button className="w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-all flex-shrink-0">
              <Icons.Phone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
