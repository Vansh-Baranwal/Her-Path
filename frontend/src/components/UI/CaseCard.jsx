export default function CaseCard({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#131620] border border-white/5 hover:border-[#FF3366]/30 hover:bg-[#181C2A] transition-all duration-300 group shadow-lg">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-[#1A1E2D] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-[#FF3366]" />
        </div>
      </div>
      <div>
        <h3 className="text-white font-semibold text-[16px] mb-2">{title}</h3>
        <p className="text-[#8A93A6] text-[13px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
