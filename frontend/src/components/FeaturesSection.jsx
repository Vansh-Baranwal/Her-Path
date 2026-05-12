import { useState } from 'react';           // ✅ added
import SOSModal from './SOSModal';           // ✅ added

export default function FeaturesSection({ navigate }) {  // ✅ added navigate prop

  const [sosOpen, setSosOpen] = useState(false);  // ✅ added — controls SOS modal

  const handleSosClose = () => {
    setSosOpen(false);
  };

  const handleSosBack = () => {
    setSosOpen(false);
    navigate('home');
  };

  const features = [
    {
      icon: "🆘",
      title: "One-Tap SOS Alert",
      desc: "Send emergency alerts with your exact GPS location to trusted contacts and nearby authorities instantly.",
      tags: ["GPS", "Real-time"],
      borderColor: "border-[rgba(255,62,130,0.15)]",
      tagBg: "bg-[rgba(255,62,130,0.1)]",
      tagText: "text-[#FF9AC2]",
      popular: false,
      onClick: () => setSosOpen(true),           // ✅ opens SOS modal
    },
    {
      icon: "🗺",
      title: "AI Safe Route Planner",
      desc: "Our AI analyzes crowd density, lighting, and incident reports to recommend the safest path for your journey.",
      tags: ["AI-Powered", "Live Data"],
      borderColor: "border-[rgba(0,224,255,0.15)]",
      tagBg: "bg-[rgba(0,224,255,0.1)]",
      tagText: "text-[#00E0FF]",
      popular: false,
      onClick: () => navigate('map'),            // ✅ goes to MapPage
    },
    {
      icon: "📍",
      title: "Live Location Sharing",
      desc: "Share your real-time location with trusted contacts during travel. Set auto-expiry for privacy control.",
      tags: ["Private", "Encrypted"],
      borderColor: "border-[rgba(123,143,255,0.15)]",
      tagBg: "bg-[rgba(123,143,255,0.1)]",
      tagText: "text-[#9FAEFF]",
      popular: false,
      onClick: () => navigate('sharing'),       // ✅ goes to TriggerView first
    },
    {
      icon: "👥",
      title: "Trusted Contact Network",
      desc: "Add family, friends, and verified guardians. They receive instant notifications and can see your live status.",
      tags: ["Up to 10", "SMS + App"],
      borderColor: "border-[rgba(0,224,255,0.15)]",
      tagBg: "bg-[rgba(0,224,255,0.1)]",
      tagText: "text-[#00E0FF]",
      popular: false,
      onClick: () => navigate('contacts'),       // ✅ goes to TrustedContactsPage
    },
    {
      icon: "🛡",
      title: "SafeZone Community",
      desc: "Report unsafe areas and see verified community alerts on the map. Strength in numbers, safety in community.",
      tags: ["Crowdsourced", "Verified"],
      borderColor: "border-[rgba(255,62,130,0.3)]",
      tagBg: "bg-[rgba(255,62,130,0.1)]",
      tagText: "text-[#FF9AC2]",
      popular: true,
      onClick: () => navigate('safezone'),            // ✅ goes to SafeZone Community Map
    },
    {
      icon: "📋",
      title: "Incident Reporting",
      desc: "Anonymously report incidents to help build safer communities. Data shared with NGOs and authorities with consent.",
      tags: ["Anonymous", "NGO-linked"],
      borderColor: "border-[rgba(255,188,0,0.15)]",
      tagBg: "bg-[rgba(255,188,0,0.1)]",
      tagText: "text-[#FFBC00]",
      popular: false,
      onClick: () => navigate('report'),         // ✅ goes to Report page (build later)
    }
  ];

  return (
    <>
      {/* ✅ SOS Modal — sits here, opens when SOS card is tapped */}
      <SOSModal isOpen={sosOpen} onClose={handleSosClose} onBack={handleSosBack} />

      <section className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header — untouched */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[rgba(255,62,130,0.2)] bg-[rgba(255,62,130,0.1)]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF3E82]">Core Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Everything you need to<br/>
              <span className="text-3xl md:text-4xl font-bold text-white mb-3">
                stay safe & empowered
              </span>
            </h2>
            <p className="text-sm md:text-base text-[#8A93A6] max-w-xl mx-auto leading-relaxed">
              Built for real-world situations. Every feature designed with your safety and privacy as the top priority.
            </p>
          </div>

          {/* Features Grid — only added onClick + cursor-pointer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onClick={feature.onClick}                    // ✅ added
                className={`relative overflow-hidden rounded-2xl p-6 md:p-7 border transition-all duration-300 hover:scale-105 cursor-pointer ${feature.borderColor}`}  // ✅ cursor-pointer added
                style={{ background: "linear-gradient(160deg, #0D1325, #0A0E1A)" }}
              >
                {/* Popular Badge — untouched */}
                {feature.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-gradient-to-r from-[#FF3E82] to-[#C41E5B] text-white text-xs font-bold">
                    POPULAR
                  </div>
                )}

                {/* Glow — untouched */}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top right, ${feature.tagText}, transparent)` }}>
                </div>

                {/* Icon — untouched */}
                <div className="text-3xl md:text-4xl mb-4">{feature.icon}</div>

                {/* Content — untouched */}
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-xs md:text-sm text-[#8A93A6] leading-relaxed mb-4">{feature.desc}</p>

                {/* Tags — untouched */}
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIdx) => (
                    <span key={tagIdx}
                      className={`text-xs px-2.5 py-1 rounded-full border ${feature.tagBg} ${feature.tagText} font-medium`}
                      style={{ borderColor: `${feature.tagText}33` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* ✅ Arrow hint — shows card is tappable */}
                <div className="absolute bottom-4 right-5 text-sm opacity-30 text-white">→</div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}