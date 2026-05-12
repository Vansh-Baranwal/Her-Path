/**
 * ContactAlertList
 *
 * Shows each trusted contact with a live status badge:
 *   "pending"  → grey  — not yet reached
 *   "sending"  → amber — SMS/call in progress
 *   "sent"     → green — alert delivered
 *
 * Props:
 *   contacts  (array) — [{ id, name, phone, relation, status }]
 */

const STATUS_CONFIG = {
  pending: {
    dot: "bg-zinc-700",
    label: "Waiting... · प्रतीक्षा",
    labelClass: "text-zinc-500",
    icon: "–",
    iconBg: "bg-zinc-800 border-zinc-700",
    iconColor: "text-zinc-500",
  },
  sending: {
    dot: "bg-amber-500 animate-pulse",
    label: "Sending alert... · भेजा जा रहा है",
    labelClass: "text-amber-400",
    icon: "⋯",
    iconBg: "bg-amber-950 border-amber-800",
    iconColor: "text-amber-400",
  },
  sent: {
    dot: "bg-green-500",
    label: "Alert sent · भेज दिया",
    labelClass: "text-green-400",
    icon: "✓",
    iconBg: "bg-green-950 border-green-800",
    iconColor: "text-green-400",
  },
};

function ContactRow({ contact }) {
  const config = STATUS_CONFIG[contact.status] || STATUS_CONFIG.pending;
  const initials = contact.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 py-3 border-b border-zinc-800 last:border-b-0">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-red-400">
          {initials}
        </div>
        {/* Live status dot */}
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-zinc-900 ${config.dot}`}
        />
      </div>

      {/* Name + status */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-zinc-100 truncate">
          {contact.name}
          {contact.relation && (
            <span className="ml-1.5 text-xs text-zinc-500 font-normal">
              ({contact.relation})
            </span>
          )}
        </p>
        <p className={`text-xs mt-0.5 ${config.labelClass}`}>
          {config.label}
        </p>
      </div>

      {/* Status icon badge */}
      <div
        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${config.iconBg} ${config.iconColor}`}
      >
        {config.icon}
      </div>
    </div>
  );
}

export default function ContactAlertList({ contacts = [] }) {
  if (contacts.length === 0) {
    return (
      <p className="text-xs text-zinc-500 text-center py-4">
        No contacts added. Go to Settings to add trusted contacts.
        <br />
        <span className="text-zinc-600">
          Settings में जाकर contacts जोड़ें।
        </span>
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* Section heading */}
      <p className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">
        Alerting contacts · संपर्क
      </p>

      {/* Contact rows */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 px-4">
        {contacts.map((c) => (
          <ContactRow key={c.id} contact={c} />
        ))}
      </div>

      {/* Police always at bottom */}
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-zinc-900 border border-blue-950 px-4 py-3">
        <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-900 flex items-center justify-center text-base">
          🚨
        </div>
        <div>
          <p className="text-sm font-bold text-blue-400">
            Police Control Room
          </p>
          <p className="text-xs text-zinc-500">
            100 · Location shared automatically · स्वतः भेजा गया
          </p>
        </div>
      </div>
    </div>
  );
}