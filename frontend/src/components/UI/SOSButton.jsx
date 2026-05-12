export default function SOSButton({ onClick, size = "default", className = "" }) {
  const sizeClasses = {
    small: "w-10 h-10 text-xs md:w-12 md:h-12 md:text-sm",
    default: "px-4 py-2 text-sm md:px-5 md:py-2.5 font-semibold rounded-md",
    large: "w-20 h-20 text-xl md:w-24 md:h-24 md:text-2xl rounded-full"
  };

  const isRound = size === 'large' || size === 'small';

  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center justify-center
        bg-gradient-to-r from-[#FF3366] to-[#FF5577] text-white
        shadow-[0_0_20px_rgba(255,51,102,0.4)] hover:shadow-[0_0_30px_rgba(255,51,102,0.6)]
        transition-all duration-300 hover:scale-105 z-10
        ${sizeClasses[size]} ${className} ${isRound ? 'rounded-full' : ''}
      `}
    >
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
        {!isRound && <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded text-white font-bold hidden sm:inline-block">SOS</span>}
        {isRound ? 'SOS' : 'Emergency SOS'}
      </span>
      {isRound && (
        <>
          <div className="absolute inset-0 rounded-full animate-ping bg-[#FF3366] opacity-30"></div>
          <div className="absolute -inset-2 md:-inset-4 rounded-full border border-[#FF3366]/20"></div>
        </>
      )}
    </button>
  );
}
