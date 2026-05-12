import { useState } from 'react';
import { Icons } from '../utils/icons.jsx';
import { NAV_LINKS } from '../utils/constants';
import SOSButton from './UI/SOSButton';

export default function Navbar({ currentPage, navigate }) {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ updated — handles both scroll and page navigation
  const handleNavClick = (id, type) => {
    setIsOpen(false);

    if (type === 'scroll') {
      if (currentPage !== 'home') {
        navigate('home');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#080A10]/95 backdrop-blur-md border-b border-white/5 z-50">
      <div className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">

        {/* Logo — untouched */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home', 'page')}>
          <div className="w-8 h-8 rounded-full bg-[#FF3366] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(255,51,102,0.4)]">
            <Icons.Shield className="text-white w-full h-full" />
          </div>
          <span className="text-white font-bold text-xl tracking-wide hidden sm:block">HerPath</span>
        </div>

        {/* Desktop Links — ✅ added link.type to handleNavClick */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id, link.type)}
              className={`text-[13px] font-medium transition-colors hover:text-white relative py-2 ${
                currentPage === link.id ? 'text-white' : 'text-[#8A93A6]'
              }`}
            >
              {link.label}
              {currentPage === link.id && (
                <span className="absolute -bottom-[21px] left-0 w-full h-0.5 bg-[#FF3366] rounded-t-full shadow-[0_0_10px_rgba(255,51,102,0.8)]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Actions Desktop — untouched */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('login', 'page')}
            className="text-white text-sm font-medium px-5 py-2 rounded-md border border-white/10 hover:bg-white/5 transition-all"
          >
            Sign In
          </button>
          <SOSButton onClick={() => handleNavClick('map', 'page')} />
        </div>

        {/* Mobile Menu Toggle — untouched */}
        <div className="flex items-center gap-4 md:hidden">
          <SOSButton onClick={() => handleNavClick('map', 'page')} size="small" />
          <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
            {isOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown — ✅ added link.type to handleNavClick */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#080A10] border-b border-white/10 shadow-2xl pb-6 px-6 py-4 flex flex-col gap-4 z-40">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id, link.type)}
              className={`text-left text-lg font-medium py-2 ${
                currentPage === link.id ? 'text-[#FF3366]' : 'text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <hr className="border-white/5 my-2" />
          <button
            onClick={() => handleNavClick('login', 'page')}
            className="w-full text-center text-white font-medium px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all"
          >
            Sign In to Dashboard
          </button>
        </div>
      )}
    </nav>
  );
}