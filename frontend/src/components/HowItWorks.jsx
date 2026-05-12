export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      emoji: "📲",
      title: "Download & Setup",
      desc: "Create your profile and add trusted emergency contacts in under 2 minutes.",
      gradientFrom: "#FF3E82",
      gradientTo: "#C41E5B",
      labelColor: "#FF3E82",
      labelBg: "rgba(255, 62, 130, 0.1)"
    },
    {
      number: "02",
      emoji: "🗺",
      title: "Plan Your Journey",
      desc: "Enable live location sharing and let AI plan the safest route to your destination.",
      gradientFrom: "#00E0FF",
      gradientTo: "#0097B2",
      labelColor: "#00E0FF",
      labelBg: "rgba(0, 224, 255, 0.08)"
    },
    {
      number: "03",
      emoji: "🛡",
      title: "Travel Confidently",
      desc: "HerPath monitors your journey. SOS is always one tap away, day or night.",
      gradientFrom: "#7B2FF7",
      gradientTo: "#4A1AC4",
      labelColor: "#9F5FFF",
      labelBg: "rgba(123, 47, 247, 0.1)"
    }
  ];

  return (
    <section className="py-14 md:py-20 px-6 bg-[rgba(13,19,37,0.5)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-4 py-1.5 rounded-full border border-[rgba(0,224,255,0.15)] bg-[rgba(0,224,255,0.08)]">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00E0FF]">How It Works</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Safe in
            <span className="ml-2 ext-2xl md:text-3xl font-bold text-white ">
              3 simple steps
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-3xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex-1 text-center">
              {/* Circle with Icon */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl md:text-3xl shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`
                }}
              >
                {step.emoji}
              </div>

              {/* Step Number */}
              <div
                className="inline-block px-2.5 py-1 rounded-md mb-3 text-xs font-bold uppercase tracking-wide"
                style={{
                  background: step.labelBg,
                  color: step.labelColor
                }}
              >
                STEP {step.number}
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-white mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-[#8A93A6] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
