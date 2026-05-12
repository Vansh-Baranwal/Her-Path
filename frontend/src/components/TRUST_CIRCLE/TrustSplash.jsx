import { Users } from "lucide-react";
import { Sparkles } from "lucide-react";

function TrustSplash({ onOpen }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center mx-auto mb-6">
          <Users className="w-12 h-12 text-rose-500" strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trust Circle</h1>
        <p className="text-gray-600 mb-8">Your safety network</p>
        <button
          onClick={onOpen}
          className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition flex items-center justify-center gap-2 mx-auto"
        >
          <Sparkles className="w-5 h-5" strokeWidth={2.5} />
          <span>Open Trust Circle</span>
        </button>
      </div>
    </div>
  );
}

export default TrustSplash;
