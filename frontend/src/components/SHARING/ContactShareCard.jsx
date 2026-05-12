import { Check, X, Send } from "lucide-react";

export default function ContactShareCard({ contact, isSharing, onToggleContact }) {
  const isShared = isSharing && contact.shared;

  return (
    <div className={`rounded-2xl p-4 border-2 transition-all ${isShared ? "bg-green-50 border-green-300" : "bg-white border-gray-200"}`}>
      <div className="flex items-center gap-3">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-lg ${contact.color}`}>
          {contact.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-base truncate">{contact.name}</p>
          <p className="text-sm text-gray-500 truncate">{contact.phone}</p>
          <div className="flex items-center gap-1 mt-1">
            {isShared ? (
              <><Check className="w-3 h-3 text-green-500" /> <span className="text-xs font-semibold text-green-700">Location shared</span></>
            ) : (
              <><X className="w-3 h-3 text-gray-400" /> <span className="text-xs font-semibold text-gray-500">Not sharing</span></>
            )}
          </div>
        </div>
        <button
          onClick={() => onToggleContact(contact.id)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90 ${isShared ? "bg-red-100 text-red-600" : "bg-rose-500 text-white shadow-md"}`}
        >
          {isShared ? <X className="w-5 h-5" strokeWidth={3} /> : <Send className="w-5 h-5" strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}