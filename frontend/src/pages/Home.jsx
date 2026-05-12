import { Icons } from '../utils/icons.jsx';
import PhoneMockup from '../components/PhoneMockup';
import StatsBar from '../components/StatsBar';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

export default function Home({ navigate }) {
  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">

      {/* Background with city buildings silhouette and gradient glow */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        {/* Main gradient glow */}
        <div className="absolute -right-48 top-20 w-[1200px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(255,51,102,0.12)_0%,rgba(139,69,180,0.06)_35%,transparent_65%)]"></div>

        {/* Building silhouettes */}
        <svg className="absolute right-0 bottom-0 w-full h-3/4 opacity-15 text-gray-800" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M 0 400 L 80 250 L 120 260 L 140 180 L 200 200 L 220 100 L 280 130 L 300 50 L 360 80 L 380 20 L 420 40 L 440 0 L 500 30 L 520 100 L 580 80 L 600 200 L 660 150 L 680 300 L 740 250 L 760 350 L 820 300 L 840 400 L 900 350 L 920 450 L 980 400 L 1000 500 L 1060 450 L 1080 550 L 1140 500 L 1160 600 L 1200 550 L 1200 800 L 0 800 Z" fill="currentColor"/>
        </svg>

        {/* Secondary glow effect */}
        <div className="absolute right-0 bottom-0 w-[800px] h-[600px] bg-[radial-gradient(circle_at_bottom_right,rgba(139,69,180,0.04)_0%,transparent_60%)]"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-4 md:mt-12">
        {/* Left Content */}
        <div className="w-full lg:w-[55%] text-left">

          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF3366] animate-pulse shadow-[0_0_8px_#FF3366]"></div>
            <span className="text-[12px] text-[#8A93A6] tracking-wide">Real-time Protection • 200+ Cities</span>
          </div>

          <h1 className="text-[42px] sm:text-[56px] lg:text-[72px] font-bold text-white leading-[1.05] tracking-tight mb-6">
            Your Safety.<br />
            <span className="text-[#FF3366]">Powered</span>
            {' '}
            <span className="text-blue-400">by</span><br />
            Technology.
          </h1>

          <p className="text-[15px] md:text-[17px] text-[#8A93A6] mb-10 leading-relaxed max-w-md">
            HerPath empowers women with real time location sharing,
            one-tap SOS alerts, AI-powered safe route planning,
            and a trusted community,so you're never truly alone.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button
              onClick={() => navigate('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-[#FF3366] text-white font-semibold rounded-lg hover:bg-[#FF4477] transition-all flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(255,51,102,0.25)]"
            >
              Get Started Free
              <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              <Icons.Play className="w-4 h-4" /> Watch Demo
            </button>
          </div>

          {/* Reviews section matching mockup */}
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-[#080A10]" alt="User" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-[#080A10]" alt="User" />
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" className="w-10 h-10 rounded-full border-2 border-[#080A10]" alt="User" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">50,000+ Women</div>
              <div className="text-[12px] text-[#8A93A6]">Already Protected</div>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block mx-2"></div>
            <div className="hidden sm:block">
              <div className="flex text-[#FFD700] gap-0.5 mb-1">
                <Icons.Star className="w-3.5 h-3.5" /><Icons.Star className="w-3.5 h-3.5" /><Icons.Star className="w-3.5 h-3.5" /><Icons.Star className="w-3.5 h-3.5" /><Icons.Star className="w-3.5 h-3.5" />
              </div>
              <div className="text-[12px] text-[#8A93A6]">3.9 / 5.0</div>
            </div>
          </div>
        </div>

        {/* Right Content - Phone Mockup */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative mt-10 lg:mt-0">
          <PhoneMockup />
        </div>
      </div>
    </main>

    <StatsBar />
    <div id="features">
      <FeaturesSection navigate={navigate} />
    </div>
    <div id="how-it-works">
      <HowItWorks />
    </div>
    <div id="community">
      <Testimonials />
    </div>
    <CTASection />
  </>
  );
}
