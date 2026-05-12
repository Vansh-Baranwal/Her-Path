import { useState } from "react";
import { MapPin, X, Shield, Plus, Check, ChevronLeft } from "lucide-react";
import ShareToggle from "./ShareToggle";
import SessionTimer from "./SessionTimer";
import ContactShareCard from "./ContactShareCard";
import QuickShareButtons from "./QuickShareButtons";

export default function LocationDrawer({ isOpen, onClose }) {
  const [isSharing, setIsSharing] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [toast, setToast] = useState(null);

  const [contacts, setContacts] = useState([
    { id: 1, name: "Mom", phone: "+91 98765 43210", color: "bg-pink-500", shared: true },
    { id: 2, name: "Sister Priya", phone: "+91 98765 11122", color: "bg-purple-500", shared: true },
    { id: 3, name: "Best Friend Anjali", phone: "+91 98765 33344", color: "bg-orange-500", shared: false },
    { id: 4, name: "Dad", phone: "+91 98765 55566", color: "bg-blue-500", shared: true },
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleMainToggle = () => {
    if (isSharing) {
      setIsSharing(false);
      setStartTime(null);
      showToast("Location sharing stopped");
    } else {
      setIsSharing(true);
      setStartTime(Date.now());
      showToast("Sharing your location now");
    }
  };

  const handleToggleContact = (id) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, shared: !c.shared } : c)));
    if (!isSharing) {
      setIsSharing(true);
      setStartTime(Date.now());
    }
    showToast("Contact updated");
  };

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col transition-transform duration-300 transform translate-y-0">
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose} 
              aria-label="Back"
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-1"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
            </button>
            <MapPin className="w-6 h-6 text-rose-600" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">Live Location</h2>
              <p className="text-xs text-gray-500">Stay safe, stay connected</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          <ShareToggle isSharing={isSharing} onToggle={handleMainToggle} />
          <SessionTimer isSharing={isSharing} startTime={startTime} />
          {!isSharing && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex gap-3">
              <Shield className="w-6 h-6 text-amber-600" />
              <p className="text-xs text-amber-800">Turn on sharing so trusted people know where you are.</p>
            </div>
          )}
          <div className="space-y-2.5">
            {contacts.map((contact) => (
              <ContactShareCard key={contact.id} contact={contact} isSharing={isSharing} onToggleContact={handleToggleContact} />
            ))}
          </div>
          <QuickShareButtons 
            onShareWhatsApp={() => showToast("Opening WhatsApp...")} 
            onShareSMS={() => showToast("Opening SMS...")} 
            onCallEmergency={() => showToast("Calling 112...")} 
          />
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white px-5 py-3 rounded-full flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" /> <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </>
  );
}