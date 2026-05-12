import {
  Phone,
  MessageCircle,
  CheckCircle2,
  MoreVertical,
  Eye,
  EyeOff,
  Bell,
  BellOff,
  Crown,
} from "lucide-react";
import { ROLES } from "./constants";

function TrustContactCard({ contact, onCall, onMessage, onMore }) {
  const role = ROLES[contact.role];

  return (
    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        {/* Avatar with online indicator */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-14 h-14 rounded-full ${contact.color} flex items-center justify-center text-white font-bold text-xl shadow-md`}
          >
            {contact.avatar}
          </div>
          {contact.online && (
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
          )}
          {contact.primary && (
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
              <Crown className="w-3 h-3 text-white" strokeWidth={3} fill="white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <p className="font-bold text-gray-900 text-sm truncate">
              {contact.name}
            </p>
            {contact.verified && (
              <CheckCircle2
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                fill="#3b82f6"
                strokeWidth={2.5}
                stroke="white"
              />
            )}
          </div>
          <p className="text-[11px] text-gray-500 truncate">
            {contact.relation}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${role.light} ${role.text} flex items-center gap-1`}
            >
              {role.emoji} {role.label}
            </span>
            <span
              className={`text-[10px] flex items-center gap-1 ${
                contact.online ? "text-green-600" : "text-gray-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  contact.online ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              {contact.lastActive}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <div className="flex gap-1.5">
            <button
              onClick={() => onCall(contact)}
              aria-label={`Call ${contact.name}`}
              className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center active:scale-90 transition shadow-sm"
            >
              <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => onMessage(contact)}
              aria-label={`Message ${contact.name}`}
              className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center active:scale-90 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
          </div>
          <button
            onClick={() => onMore(contact)}
            aria-label="More options"
            className="w-9 h-7 rounded-full bg-gray-100 flex items-center justify-center active:scale-90"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Permissions row */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {contact.canSeeLocation ? (
            <>
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <Eye className="w-3 h-3 text-green-600" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-semibold text-green-700">
                Can see location
              </span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                <EyeOff className="w-3 h-3 text-gray-500" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-semibold text-gray-500">
                Location hidden
              </span>
            </>
          )}
        </div>
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          {contact.notify ? (
            <>
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <Bell className="w-3 h-3 text-blue-600" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-semibold text-blue-700">
                Gets alerts
              </span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                <BellOff className="w-3 h-3 text-gray-500" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-semibold text-gray-500">
                Muted
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrustContactCard;
