export default function StatsBar() {
  const stats = [
    { number: "10K+", label: "Women Protected", gradient: "from-[#00B7EB] to-[#00CCFF]" },
    { number: "200+", label: "Cities Covered", gradient: "from-[#00B7EB] to-[#00CCFF]" },
    { number: "24/7", label: "Live Monitoring", gradient: "from-[#00FF7F] to-[#00FF7F]" },
    { number: "1.2s", label: "Avg Alert Speed", gradient: "from-[#00FF7F] to-[#00FF7F]" },
    { number: "99.9%", label: "Uptime", gradient: "from-[#00B7EB] to-[#00B7EB]" },
  ];

  return (
    <section className="bg-[rgba(255,62,130,0.05)] border-t border-b border-[rgba(255,62,130,0.1)] py-7 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-around items-center gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                {stat.number}
              </div>
              <div className="text-xs md:text-sm text-[#8A93A6] font-medium uppercase tracking-wide">
                {stat.label}
              </div>
              {idx < stats.length - 1 && (
                <div className="hidden sm:block absolute right-0 w-px h-10 bg-white/10 transform -translate-y-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
