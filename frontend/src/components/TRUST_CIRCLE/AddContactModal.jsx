import { useState } from "react";
import {
  Users,
  UserPlus,
  X,
  Check,
  ChevronRight,
  Send,
  Bell,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { ROLES } from "./constants";

function AddContactModal({ isOpen, onClose, onAdd }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(null);
  const [makePrimary, setMakePrimary] = useState(false);

  if (!isOpen) return null;

  const reset = () => {
    setStep(1);
    setName("");
    setPhone("");
    setRole(null);
    setMakePrimary(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    onAdd({ name, phone, role, primary: makePrimary });
    reset();
  };

  const canProceed1 = name.trim() && phone.trim();
  const canProceed2 = role !== null;

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[92vh] flex flex-col">
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Add Trusted Contact
              </h2>
              <p className="text-xs text-gray-500">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90"
          >
            <X className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 px-5 pt-3 flex-shrink-0">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                step >= n ? "bg-rose-500" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* STEP 1: Name + Phone */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  Who do you want to add?
                </h3>
                <p className="text-sm text-gray-500">
                  Add someone you trust completely
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mom, Sister Priya"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-base font-medium text-gray-900 focus:border-rose-500 focus:outline-none focus:bg-white transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 block">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-3 py-3.5 font-bold text-gray-700">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 text-base font-medium text-gray-900 focus:border-rose-500 focus:outline-none focus:bg-white transition"
                  />
                </div>
              </div>

              <button className="w-full bg-blue-50 border-2 border-blue-200 rounded-xl p-3 flex items-center gap-3 active:scale-95 transition">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-blue-900 text-sm">
                    Pick from contacts
                  </p>
                  <p className="text-[11px] text-blue-700">
                    Choose from your phone book
                  </p>
                </div>
                <ChevronRight
                  className="w-5 h-5 text-blue-600"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          )}

          {/* STEP 2: Role selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  Who is {name}?
                </h3>
                <p className="text-sm text-gray-500">
                  Pick one — helps us organize your circle
                </p>
              </div>

              <div className="space-y-3">
                {Object.entries(ROLES).map(([key, config]) => {
                  const Icon = config.icon;
                  const isActive = role === key;
                  const desc = {
                    family: "Parents, siblings, relatives",
                    friend: "Best friends, classmates, colleagues",
                    guardian: "Verified neighbor, mentor, helper",
                  };
                  return (
                    <button
                      key={key}
                      onClick={() => setRole(key)}
                      className={`w-full rounded-2xl p-4 border-2 flex items-center gap-3 transition-all active:scale-95 ${
                        isActive
                          ? `${config.light} ${config.border} shadow-md`
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-full ${config.color} flex items-center justify-center flex-shrink-0 shadow-md text-2xl`}
                      >
                        {config.emoji}
                      </div>
                      <div className="text-left flex-1">
                        <p
                          className={`font-bold text-base ${
                            isActive ? config.text : "text-gray-900"
                          }`}
                        >
                          {config.label}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {desc[key]}
                        </p>
                      </div>
                      {isActive && (
                        <div
                          className={`w-7 h-7 rounded-full ${config.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <Check
                            className="w-4 h-4 text-white"
                            strokeWidth={3}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Permissions */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  Set permissions
                </h3>
                <p className="text-sm text-gray-500">
                  What can {name} do for you?
                </p>
              </div>

              {/* Make primary */}
              <button
                onClick={() => setMakePrimary(!makePrimary)}
                className={`w-full rounded-2xl p-4 border-2 flex items-center gap-3 transition active:scale-95 ${
                  makePrimary
                    ? "bg-amber-50 border-amber-300"
                    : "bg-white border-gray-200"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    makePrimary ? "bg-amber-400" : "bg-gray-100"
                  }`}
                >
                  <Users className={`w-6 h-6 ${
                      makePrimary ? "text-white" : "text-gray-400"
                    }`}
                    strokeWidth={2.5}
                    fill={makePrimary ? "white" : "none"}
                  />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-gray-900 text-sm">
                    Primary Contact
                  </p>
                  <p className="text-[11px] text-gray-600">
                    First person to call in emergencies
                  </p>
                </div>
                <div
                  className={`w-12 h-7 rounded-full p-0.5 transition ${
                    makePrimary ? "bg-amber-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                      makePrimary ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>

              {/* Auto-enabled permissions display */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl p-4 space-y-2.5">
                <p className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                  Auto-enabled for trusted contacts
                </p>
                {[
                  { icon: Bell, text: "Get instant SOS alerts", color: "text-blue-600", bg: "bg-blue-100" },
                  { icon: MapPin, text: "See your live location", color: "text-green-600", bg: "bg-green-100" },
                  { icon: Phone, text: "Quick call & message", color: "text-purple-600", bg: "bg-purple-100" },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${p.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${p.color}`} strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {p.text}
                      </span>
                      <Check className="w-4 h-4 text-green-500 ml-auto" strokeWidth={3} />
                    </div>
                  );
                })}
              </div>

              {/* Verification info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex gap-3">
                <ShieldCheck
                  className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <div>
                  <p className="font-bold text-blue-900 text-sm">
                    Verification SMS will be sent
                  </p>
                  <p className="text-[11px] text-blue-800 mt-0.5 leading-relaxed">
                    {name} will get a code to confirm. Once verified, the blue
                    tick appears.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 flex gap-3 flex-shrink-0">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="bg-gray-100 text-gray-700 font-bold px-5 rounded-2xl active:scale-95"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={(step === 1 && !canProceed1) || (step === 2 && !canProceed2)}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <span className="text-base">Next</span>
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-base">Send Invite</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default AddContactModal;
