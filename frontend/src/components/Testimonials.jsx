export default function Testimonials() {
  const testimonials = [
    {
      stars: 5,
      quote: "The SOS feature saved me when I was followed at night. My contacts knew exactly where I was within seconds.",
      author: "Priya Sharma",
      role: "Delhi, Student",
      initials: "P",
      gradientFrom: "#FF3E82",
      gradientTo: "#C41E5B",
      featured: false
    },
    {
      stars: 5,
      quote: "As a nurse working night shifts, HerPath gives me and my family peace of mind every single day.",
      author: "Anjali Mehta",
      role: "Mumbai, Healthcare",
      initials: "A",
      gradientFrom: "#00E0FF",
      gradientTo: "#0097B2",
      featured: true
    },
    {
      stars: 5,
      quote: "The AI safe route feature is incredible. I no longer avoid going out late — I just let HerPath guide me.",
      author: "Riya Kapoor",
      role: "Bangalore, Tech",
      initials: "R",
      gradientFrom: "#7B2FF7",
      gradientTo: "#4A1AC4",
      featured: false
    }
  ];

  return (
    <section className="py-14 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Trusted by women across India
          </h2>
          <p className="text-sm md:text-base text-[#8A93A6]">
            Real stories. Real impact.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-5 md:p-6 border transition-all duration-300 hover:scale-105 ${
                testimonial.featured
                  ? "border-[rgba(255,62,130,0.2)] md:col-span-1"
                  : "border-[rgba(255,255,255,0.07)]"
              }`}
              style={{
                background: "linear-gradient(160deg, #0D1325, #0A0E1A)"
              }}
            >
              {/* Featured Top Border */}
              {testimonial.featured && (
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#FF3E82] to-[#00E0FF]"></div>
              )}

              {/* Stars */}
              <div className="flex gap-1 mb-3 text-[#FFBC00] text-sm">
                {"★".repeat(testimonial.stars)}
              </div>

              {/* Quote */}
              <p className="text-xs md:text-sm text-[#C5CDE0] leading-relaxed mb-4 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`
                  }}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-xs md:text-sm font-bold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-[#8A93A6]">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
