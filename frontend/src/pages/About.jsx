export default function About({ navigate = () => {} }) {
  return (
    <div className="min-h-screen bg-[#07080f] pt-24 pb-16 px-5 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        {/* Background gradient glow */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,51,102,0.08)_0%,transparent_65%)]"></div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,51,102,0.25)] bg-[rgba(255,51,102,0.08)] mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF3366] animate-pulse" />
          <span className="text-xs font-bold text-[#FF3366] tracking-widest uppercase">About Us</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
          Our Mission
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-[#8A93A6] leading-relaxed mb-12">
          At HerPath, we believe every woman deserves to feel safe, empowered, and connected. 
          <br />
          <br />
          <span className="text-[#FF3366] font-semibold">Content coming soon.</span>
          <br />
          Check back to learn more about our story, values, and vision.
        </p>

        {/* CTA Button */}
        <button onClick={() => navigate('home')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF3366] hover:bg-[#E63A5A] text-white font-bold text-sm transition-all active:scale-[.98]">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
