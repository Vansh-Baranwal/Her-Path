import { useState } from "react";
import {
  Users,
  Shield,
  Heart,
  Star,
  ShieldCheck,
  Search,
  X,
  Check,
  ChevronLeft,
  Plus,
  Phone,
  Sparkles,
  Crown,
} from "lucide-react";
import { ROLES, INITIAL_CONTACTS } from "./constants";
import TrustContactCard from "./TrustContactCard";
import AddContactModal from "./AddContactModal";
import ContactDetailsSheet from "./ContactDetailsSheet";
import TrustSplash from "./TrustSplash";

function TrustedContactsPage({ onBack }) {
  const [showSplash, setShowSplash] = useState(true);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailsContact, setDetailsContact] = useState(null);
  const [toast, setToast] = useState(null);

  // If splash screen is active, show it
  if (showSplash) {
    return <TrustSplash onOpen={() => setShowSplash(false)} />;
  }

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchFilter = filter === "all" || c.role === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: contacts.length,
    family: contacts.filter((c) => c.role === "family").length,
    friend: contacts.filter((c) => c.role === "friend").length,
    guardian: contacts.filter((c) => c.role === "guardian").length,
  };

  const onlineCount = contacts.filter((c) => c.online).length;
  const verifiedCount = contacts.filter((c) => c.verified).length;
  const primaryContact = contacts.find((c) => c.primary);

  const handleAdd = (data) => {
    const newContact = {
      id: Date.now(),
      name: data.name,
      phone: data.phone,
      role: data.role,
      verified: false,
      primary: data.primary,
      online: false,
      canSeeLocation: true,
      notify: true,
      avatar: data.name.charAt(0).toUpperCase(),
      color: ["bg-pink-500", "bg-purple-500", "bg-blue-500", "bg-orange-500", "bg-teal-500"][Math.floor(Math.random() * 5)],
      relation: ROLES[data.role].label,
      lastActive: "Pending verification",
    };
    setContacts((prev) =>
      data.primary
        ? [newContact, ...prev.map((c) => ({ ...c, primary: false }))]
        : [...prev, newContact]
    );
    setShowAddModal(false);
    showToast("Invitation sent ✓");
  };

  const handleTogglePerm = (id, key) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [key]: !c[key] } : c))
    );
    showToast("Permission updated");
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setDetailsContact(null);
    showToast("Contact removed");
  };

  const handleMakePrimary = (id) => {
    setContacts((prev) =>
      prev.map((c) => ({ ...c, primary: c.id === id }))
    );
    setDetailsContact(null);
    showToast("Primary contact updated 👑");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 pt-20">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-purple-600 px-5 pt-6 pb-12 rounded-b-3xl shadow-lg relative">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-10" />
        <div className="absolute top-20 -left-12 w-32 h-32 rounded-full bg-white opacity-5" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              aria-label="Back"
              className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center active:scale-90 transition"
            >
              <ChevronLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
            </button>
            <div className="flex-1">
              <h1 className="text-white text-xl font-bold">My Trust Circle</h1>
              <p className="text-white text-opacity-90 text-xs">
                People who keep you safe 💖
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-white bg-opacity-15 backdrop-blur rounded-2xl p-3 flex items-center justify-around">
            <div className="text-center">
              <p className="text-white text-2xl font-bold">{contacts.length}</p>
              <p className="text-white text-opacity-90 text-[10px] font-bold uppercase tracking-wide">
                Total
              </p>
            </div>
            <div className="w-px h-8 bg-white bg-opacity-30" />
            <div className="text-center">
              <p className="text-white text-2xl font-bold flex items-center gap-1 justify-center">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {onlineCount}
              </p>
              <p className="text-white text-opacity-90 text-[10px] font-bold uppercase tracking-wide">
                Online
              </p>
            </div>
            <div className="w-px h-8 bg-white bg-opacity-30" />
            <div className="text-center">
              <p className="text-white text-2xl font-bold">{verifiedCount}</p>
              <p className="text-white text-opacity-90 text-[10px] font-bold uppercase tracking-wide">
                Verified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PRIMARY CONTACT CARD */}
      {primaryContact && (
        <div className="px-5 -mt-4 mb-4 relative z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 shadow-xl flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className={`w-14 h-14 rounded-full ${primaryContact.color} flex items-center justify-center text-white font-bold text-xl ring-4 ring-white shadow-md`}>
                {primaryContact.avatar}
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 ring-2 ring-white flex items-center justify-center">
                <Crown className="w-4 h-4 text-white"
                  fill="white"
                  strokeWidth={2.5}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-opacity-90 text-[10px] font-bold uppercase tracking-wide">
                Primary Contact
              </p>
              <p className="text-white font-bold text-base truncate">
                {primaryContact.name}
              </p>
              <p className="text-white text-opacity-90 text-xs">
                Called first in emergencies
              </p>
            </div>
            <button
              onClick={() => {
                showToast(`Calling ${primaryContact.name}...`);
              }}
              aria-label="Quick call"
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center active:scale-90 transition shadow-md"
            >
              <Phone
                className="w-5 h-5 text-orange-600"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="px-5 mb-3">
        <div className="bg-white rounded-2xl shadow-sm flex items-center gap-2 px-4 py-3 border border-gray-100">
          <Search className="w-5 h-5 text-gray-400" strokeWidth={2.5} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="flex-1 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <X className="w-3 h-3 text-gray-600" strokeWidth={3} />
            </button>
          )}
        </div>
      </div>

      {/* FILTER CHIPS */}
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All", icon: Users, color: "bg-gray-700" },
          { id: "family", label: "Family", icon: Heart, color: "bg-pink-500" },
          { id: "friend", label: "Friends", icon: Star, color: "bg-purple-500" },
          { id: "guardian", label: "Guardians", icon: ShieldCheck, color: "bg-blue-600" },
        ].map((f) => {
          const isActive = filter === f.id;
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition active:scale-95 flex-shrink-0 ${
                isActive
                  ? `${f.color} text-white shadow-md`
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>{f.label}</span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white bg-opacity-25" : "bg-gray-100"
                }`}
              >
                {counts[f.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTACT LIST */}
      <div className="px-5 space-y-2.5">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-bold text-gray-900 text-sm">No contacts found</p>
            <p className="text-xs text-gray-500 mt-1">
              Try a different search or add new
            </p>
          </div>
        ) : (
          filtered.map((c) => (
            <TrustContactCard
              key={c.id}
              contact={c}
              onCall={(c) => showToast(`Calling ${c.name}...`)}
              onMessage={(c) => showToast(`Opening chat with ${c.name}`)}
              onMore={(c) => setDetailsContact(c)}
            />
          ))
        )}
      </div>

      {/* SAFETY TIP */}
      <div className="px-5 mt-4">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl p-4 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-bold text-rose-900 text-sm mb-1">
              Add at least 3 trusted people
            </p>
            <p className="text-xs text-rose-800 leading-relaxed">
              More people in your circle = faster help when you need it. Add
              mom, a friend, and a neighbor.
            </p>
          </div>
        </div>
      </div>

      {/* FLOATING ADD BUTTON */}
      <button
        onClick={() => setShowAddModal(true)}
        aria-label="Add contact"
        className="fixed bottom-6 right-5 z-30 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold px-5 py-3.5 rounded-full shadow-2xl active:scale-95 transition flex items-center gap-2"
      >
        <div className="w-7 h-7 rounded-full bg-white bg-opacity-25 flex items-center justify-center">
          <Plus className="w-4 h-4" strokeWidth={3} />
        </div>
        <span className="text-sm">Add Contact</span>
      </button>

      {/* MODALS */}
      <AddContactModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAdd}
      />
      <ContactDetailsSheet
        contact={detailsContact}
        onClose={() => setDetailsContact(null)}
        onTogglePerm={handleTogglePerm}
        onDelete={handleDelete}
        onMakePrimary={handleMakePrimary}
      />

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-green-400" strokeWidth={3} />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-up { animation: slide-up 0.35s cubic-bezier(0.16,1,0.3,1); }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}

export default TrustedContactsPage;
