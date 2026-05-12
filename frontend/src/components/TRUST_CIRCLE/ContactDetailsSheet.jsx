import {
  ChevronRight,
  Phone,
  MessageCircle,
  Video,
  MapPin,
  Bell,
  Crown,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { ROLES } from "./constants";

function ContactDetailsSheet({ contact, onClose, onTogglePerm, onDelete, onMakePrimary }) {
  if (!contact) return null;
  const role = ROLES[contact.role];

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[85vh] overflow-y-auto">
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Profile header */}
        <div className={`px-5 py-5 ${role.light} mb-1`}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-full ${contact.color} flex items-center justify-center text-white font-bold text-3xl shadow-lg`}
              >
                {contact.avatar}
              </div>
              {contact.online && (
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl font-bold text-gray-900 truncate">
                  {contact.name}
                </h2>
                {contact.verified && (
                  <CheckCircle2
                    className="w-5 h-5 text-blue-500"
                    fill="#3b82f6"
                    stroke="white"
                    strokeWidth={2.5}
                  />
                )}
              </div>
              <p className="text-sm text-gray-700">{contact.phone}</p>
              <span
                className={`inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${role.color} text-white`}
              >
                {role.emoji} {role.label}
              </span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-5 py-4 grid grid-cols-3 gap-2">
          <button className="bg-green-50 rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-bold text-green-700">Call</span>
          </button>
          <button className="bg-blue-50 rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-bold text-blue-700">Message</span>
          </button>
          <button className="bg-purple-50 rounded-2xl p-3 flex flex-col items-center gap-1.5 active:scale-95">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-bold text-purple-700">Video</span>
          </button>
        </div>

        {/* Permissions */}
        <div className="px-5 pb-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
            Permissions
          </p>
          <div className="bg-white border-2 border-gray-100 rounded-2xl divide-y divide-gray-100">
            {[
              {
                key: "canSeeLocation",
                icon: MapPin,
                label: "Can see my location",
                desc: "Live location sharing",
                color: "bg-green-500",
              },
              {
                key: "notify",
                icon: Bell,
                label: "Send instant alerts",
                desc: "Gets SOS notifications",
                color: "bg-blue-500",
              },
            ].map((perm) => {
              const Icon = perm.icon;
              const isOn = contact[perm.key];
              return (
                <button
                  key={perm.key}
                  onClick={() => onTogglePerm(contact.id, perm.key)}
                  className="w-full p-3.5 flex items-center gap-3 active:bg-gray-50"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${perm.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-900 text-sm">
                      {perm.label}
                    </p>
                    <p className="text-[11px] text-gray-500">{perm.desc}</p>
                  </div>
                  <div
                    className={`w-12 h-7 rounded-full p-0.5 transition flex-shrink-0 ${
                      isOn ? perm.color : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                        isOn ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Other actions */}
        <div className="px-5 pb-5 space-y-2">
          {!contact.primary && (
            <button
              onClick={() => onMakePrimary(contact.id)}
              className="w-full bg-amber-50 border-2 border-amber-200 rounded-xl p-3 flex items-center gap-3 active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center">
                <Crown
                  className="w-5 h-5 text-white"
                  fill="white"
                  strokeWidth={2.5}
                />
              </div>
              <span className="font-bold text-amber-900 text-sm flex-1 text-left">
                Make Primary Contact
              </span>
              <ChevronRight
                className="w-5 h-5 text-amber-700"
                strokeWidth={2.5}
              />
            </button>
          )}

          <button
            onClick={() => onDelete(contact.id)}
            className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-center gap-3 active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-red-700 text-sm flex-1 text-left">
              Remove from circle
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default ContactDetailsSheet;
