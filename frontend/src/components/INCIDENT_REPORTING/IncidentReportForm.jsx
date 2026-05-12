import { useState } from 'react';

const INCIDENT_TYPES = [
  'Harassment',
  'Following / Stalking',
  'Unsafe area',
  'Poor lighting',
  'No CCTV in area',
  'Other',
];

const TIME_OPTIONS = [
  { id: 'now',    label: 'Just now'   },
  { id: '30min',  label: '30 min ago' },
  { id: '1hr',    label: '1 hr ago'   },
  { id: 'custom', label: 'Custom'     },
];

export default function IncidentReportForm({ onSubmit }) {
  const [type, setType]           = useState('');
  const [location, setLocation]   = useState('');
  const [description, setDesc]    = useState('');
  const [timeTag, setTimeTag]     = useState('now');
  const [shareNGO, setShareNGO]   = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState('');

  const handleSubmit = () => {
    if (!type) { setError('Please select an incident type · घटना का प्रकार चुनें'); return; }
    setError('');
    onSubmit?.({ type, location, description, timeTag, shareNGO, timestamp: new Date().toISOString() });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setType(''); setLocation(''); setDesc(''); setTimeTag('now'); setShareNGO(true);
    }, 4000);
  };

  return (
    <div className="w-full bg-[#0f1018] border border-[#1e1c24] rounded-2xl overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1a1820]">
        <div className="w-10 h-10 rounded-xl bg-[rgba(220,20,60,0.1)] border border-[rgba(220,20,60,0.2)] flex items-center justify-center text-lg flex-shrink-0">
          📋
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">Anonymous Incident Report</p>
          <p className="text-xs text-[#52505a] mt-0.5">🔒 Your identity is never stored or shared</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[rgba(34,197,94,0.1)] text-green-400 border border-[rgba(34,197,94,0.2)] font-bold">
          Protected
        </span>
      </div>

      <div className="p-5">
        {/* Type */}
        <p className="text-xs font-bold text-[#52505a] tracking-widest uppercase mb-2">
          Type of incident · घटना का प्रकार
        </p>
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg bg-[#07080f] border border-[#1e1c24] text-white text-sm focus:outline-none focus:border-[rgba(220,20,60,0.5)] transition-colors mb-4"
        >
          <option value="">Select incident type</option>
          {INCIDENT_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>

        {/* Location */}
        <p className="text-xs font-bold text-[#52505a] tracking-widest uppercase mb-2">Location · जगह</p>
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">📍</span>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Auto-detected or type manually"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#07080f] border border-[#1e1c24] text-white text-sm placeholder:text-[#3a3840] focus:outline-none focus:border-[rgba(220,20,60,0.5)] transition-colors"
          />
        </div>

        {/* Description */}
        <p className="text-xs font-bold text-[#52505a] tracking-widest uppercase mb-2">
          What happened · क्या हुआ
          <span className="ml-2 text-[#3a3840] normal-case tracking-normal font-normal">(optional)</span>
        </p>
        <textarea
          value={description}
          onChange={e => setDesc(e.target.value)}
          rows={3}
          placeholder="Briefly describe — you can submit without this"
          className="w-full px-3 py-2.5 rounded-lg bg-[#07080f] border border-[#1e1c24] text-white text-sm placeholder:text-[#3a3840] focus:outline-none focus:border-[rgba(220,20,60,0.5)] transition-colors resize-none mb-4"
        />

        {/* Time */}
        <p className="text-xs font-bold text-[#52505a] tracking-widest uppercase mb-2">When · कब हुआ</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {TIME_OPTIONS.map(t => (
            <button
              key={t.id}
              onClick={() => setTimeTag(t.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                timeTag === t.id
                  ? 'border-[#DC143C] text-[#DC143C] bg-[rgba(220,20,60,0.08)]'
                  : 'border-[#1e1c24] text-[#8a8490] hover:border-[#3a3840]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* NGO toggle */}
        <div className="flex items-center gap-3 px-3 py-2.5 bg-[#07080f] border border-[#1e1c24] rounded-lg mb-5">
          <span className="text-base">🏢</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-white">Share with NGO partners</p>
            <p className="text-xs text-[#52505a]">Helps improve safety data in your city</p>
          </div>
          <input
            type="checkbox"
            checked={shareNGO}
            onChange={e => setShareNGO(e.target.checked)}
            className="w-4 h-4 accent-[#DC143C]"
          />
        </div>

        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-[#DC143C] hover:bg-[#b8102e] text-white text-sm font-bold tracking-wide transition-all active:scale-[.98]"
        >
          Submit Report · रिपोर्ट भेजें
        </button>

        {submitted && (
          <div className="mt-4 p-4 rounded-xl bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] text-center">
            <div className="text-2xl mb-2">✅</div>
            <p className="text-sm font-bold text-green-400">Report submitted anonymously</p>
            <p className="text-xs text-green-700 mt-1">Thank you for making your community safer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
