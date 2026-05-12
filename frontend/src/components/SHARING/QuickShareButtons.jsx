import { MessageCircle, Send, Phone } from "lucide-react";

export default function QuickShareButtons({ onShareWhatsApp, onShareSMS, onCallEmergency }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">Quick Share</p>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={onShareWhatsApp} className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all rounded-2xl p-4 shadow-md flex flex-col items-center gap-2">
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
          <span className="text-white font-bold text-sm">WhatsApp</span>
        </button>
        <button onClick={onShareSMS} className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all rounded-2xl p-4 shadow-md flex flex-col items-center gap-2">
          <Send className="w-6 h-6 text-white" strokeWidth={2.5} />
          <span className="text-white font-bold text-sm">SMS</span>
        </button>
      </div>
      <button onClick={onCallEmergency} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-95 transition-all rounded-2xl p-4 shadow-lg flex items-center justify-center gap-3">
        <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
        <span className="text-white font-bold text-lg">Call Emergency 112</span>
      </button>
    </div>
  );
}