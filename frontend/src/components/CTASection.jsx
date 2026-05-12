export default function CTASection() {
  return (
    <section className="px-6 pb-12 md:pb-16">
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden border border-[rgba(255,62,130,0.2)]"
          style={{
            background: "linear-gradient(135deg, rgba(255,62,130,0.12), rgba(0,224,255,0.06))"
          }}
        >
          {/* Background Glow */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(255,62,130,0.08), transparent)"
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-block mb-4 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FF3E82]">
              Available on iOS & Android
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              Start your journey safely today.
            </h2>

            {/* Description */}
            <p className="text-xs md:text-sm text-[#8A93A6] max-w-lg mx-auto mb-8 md:mb-10 leading-relaxed">
              Join 50,000+ women who already trust HerPath for their daily safety. Free to download, always on.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #1616d5, #1616d3)",
                  
                }}
              >
                📱 Download for iOS
              </button>
              <button
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-bold text-white border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.06)] transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)]"
              >
                🤖 Download for Android
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
