import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MapPage from './pages/MapPage';

// ✅ Added Sharing Components
import TriggerView from "./components/SHARING/Triggerview";

// ✅ Added SafeZone Component
import SafeZoneMap from "./components/SAFEZONE/Safezone";

// ✅ Added Trusted Contact Network Component
import TrustedContactsPage from "./components/TRUST_CIRCLE/TrustedContactsPage";

// ✅ Added Incident Reporting Component
import ReportPage from "./components/INCIDENT_REPORTING/ReportPage";

// ✅ Added About Page
import About from "./pages/About";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  // ✅ Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':         return <Home navigate={navigate} />;
      case 'login':        return <Login navigate={navigate} />;
      case 'signup':       return <Signup navigate={navigate} />;
      case 'map':          return <MapPage onBack={() => navigate('home')} />;
      case 'sharing':      return <TriggerView onBack={() => navigate('home')} />;
      case 'safezone':     return <SafeZoneMap onBack={() => navigate('home')} />;
      case 'contacts':     return <TrustedContactsPage onBack={() => navigate('home')} />;
      case 'report':       return <ReportPage navigate={navigate} />;
      case 'about':        return <About navigate={navigate} />;
      case 'features':     return <Home navigate={navigate} />; // Scrolls to features section
      case 'how-it-works': return <Home navigate={navigate} />; // Scrolls to how-it-works section
      case 'community':    return <Home navigate={navigate} />; // Scrolls to community section
      default:             return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080A10] font-sans flex flex-col overflow-x-hidden selection:bg-[#FF3366]/30 text-white">

      {/* Global styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', system-ui, sans-serif; background-color: #080A10; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #080A10; }
        ::-webkit-scrollbar-thumb { background: #1A1F35; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #FF3366; }
      `}} />

      <Navbar currentPage={currentPage} navigate={navigate} />

      <div className="flex-1 flex flex-col">
        {renderPage()}
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}