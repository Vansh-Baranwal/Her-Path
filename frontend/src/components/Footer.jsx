export default function Footer({ navigate = () => {} }) {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.07)] bg-[rgba(5,7,13,0.8)] py-10 md:py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 mb-8 md:mb-10">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#FF3E82] to-[#C41E5B] flex items-center justify-center text-white text-xs font-bold">
                ✦
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-[#FF3E82] to-[#FF9AC2] bg-clip-text text-transparent">
                HerPath
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#8A93A6] leading-relaxed mb-4 max-w-xs">
              Technology in service of safety. Built with care for every woman, everywhere.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-sm hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                𝕏
              </button>
              <button className="w-8 h-8 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-sm hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                in
              </button>
              <button className="w-8 h-8 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-xs hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                ▶
              </button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Product</h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#8A93A6]">
              <li><button onClick={() => navigate('how-it-works')} className="hover:text-white transition-colors">How It Works </button></li>
              <li><button className="hover:text-white transition-colors">Download App</button></li>
              <li><button onClick={() => navigate('map')} className="hover:text-white transition-colors">Emergency SOS </button></li>
              <li><button onClick={() => navigate('map')} className="hover:text-white transition-colors">Safety Map</button></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Support</h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#8A93A6]">
              <li><button className="hover:text-white transition-colors">Help Center</button></li>
              <li><button onClick={() => navigate('community')} className="hover:text-white transition-colors">Community</button></li>
              <li><button className="hover:text-white transition-colors">Contact Us</button></li>
              <li><button onClick={() => navigate('report')} className="hover:text-white transition-colors">Report Abuse</button></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#8A93A6]">
              <li><button onClick={() => navigate('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button className="hover:text-white transition-colors">Our Mission</button></li>
              <li><button className="hover:text-white transition-colors">Blog</button></li>
              <li><button className="hover:text-white transition-colors">Careers</button></li>
              <li><button className="hover:text-white transition-colors">Press</button></li>
            </ul>
          </div>
       

           {/* Safety Resources */}
           <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Safety Resources</h4>
              <ul className="space-y-2 text-xs md:text-sm text-[#8A93A6]">
                <li><button className="hover:text-white transition-colors">Women's Helpline</button></li>
                <li><button className="hover:text-white transition-colors">Police — 100</button></li>
                <li><button className="hover:text-white transition-colors">Emergency Contacts</button></li>
                <li><button className="hover:text-white transition-colors">Safety Tips</button></li>
                <li><button onClick={() => navigate('report')} className="hover:text-white transition-colors">Report Incident</button></li>
              </ul>
           </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[rgba(255,255,255,0.07)] pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#8A93A6]">
          <div>
            © 2025 HerPath. All rights reserved. Built with ♥ for safety.
          </div>
          <div className="flex gap-6 text-xs">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
