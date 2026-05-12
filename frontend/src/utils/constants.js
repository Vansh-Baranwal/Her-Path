// ─────────────────────────────────────────────
// src/utils/constants.js
// All repeated values live here.
// Import from this file — never hardcode in components.
// ─────────────────────────────────────────────

// ── App info ──────────────────────────────────
export const APP_NAME = "HerPath";
export const APP_TAGLINE = "Your Safety. Powered by Technology.";
export const EMERGENCY_NUMBER = "100"; // India police

// ── SOS settings ──────────────────────────────
export const SOS_HOLD_DURATION = 2000;   // ms — hold time before SOS fires
export const COUNTDOWN_SECONDS = 5;      // seconds to cancel after SOS starts

// ── Routes ────────────────────────────────────
export const ROUTES = {
  HOME:   "/",
  LOGIN:  "/login",
  SIGNUP: "/signup",
  MAP:    "/map",
};

// ── Nav links ─────────────────────────────────
export const NAV_LINKS = [
  { id: 'home',         label: 'Home',         href: '#',             type: 'page'   },
  { id: 'features',     label: 'Features',     href: '#features',     type: 'scroll' },
  { id: 'how-it-works', label: 'How It Works', href: '#how-it-works', type: 'scroll' },
  { id: 'community',    label: 'Community',    href: '#community',    type: 'scroll' },
  { id: 'about',        label: 'About',        href: '#about',        type: 'page'   },
];

// ── Demo contacts (replace with real API/db data) ──
export const DEMO_CONTACTS = [
  { id: 1, name: "Maa",          relation: "Mom",    phone: "+91 98765 43210" },
  { id: 2, name: "Didi",         relation: "Sister", phone: "+91 91234 56789" },
  { id: 3, name: "Rohit Bhaiya", relation: "Brother",phone: "+91 99887 76655" },
];

// ── Homepage feature cards ────────────────────
export const FEATURES = [
  {
    id: "sos",
    icon: "🆘",
    title: "One-Tap SOS Alert",
    subtitle: "Hold 2s → instant alert to contacts + police",
    tags: ["GPS", "1.2s"],
    color: "red",
  },
  {
    id: "route",
    icon: "🗺",
    title: "AI Safe Route Planner",
    subtitle: "Analyzes lighting, crowd density & past incidents",
    tags: ["AI", "Live"],
    color: "blue",
  },
  {
    id: "location",
    icon: "📍",
    title: "Live Location Sharing",
    subtitle: "Share encrypted location with trusted contacts",
    tags: ["E2E", "AES-256"],
    color: "green",
  },
  {
    id: "fakecall",
    icon: "📞",
    title: "Fake Call Trigger",
    subtitle: "Get a fake incoming call to escape any situation",
    tags: ["Instant"],
    color: "amber",
  },
  {
    id: "safezone",
    icon: "🛡",
    title: "SafeZone Community Map",
    subtitle: "Crowdsourced safe/unsafe zone map by real women",
    tags: ["Verified", "Live"],
    color: "purple",
  },
  {
    id: "audio",
    icon: "🎙",
    title: "Background Audio Recording",
    subtitle: "Silent recording uploaded to your encrypted vault",
    tags: ["Silent", "Encrypted"],
    color: "pink",
  },
];

// ── Map defaults ──────────────────────────────
export const MAP_DEFAULT_CENTER = [28.6139, 77.2090]; // New Delhi
export const MAP_DEFAULT_ZOOM   = 14;

// ── Auth field constraints ─────────────────────
export const AUTH = {
  MIN_PASSWORD_LENGTH: 8,
  PHONE_REGEX: /^[6-9]\d{9}$/,  // Indian mobile numbers
};
