import { useState, useEffect, useRef } from 'react';

const DEMO_VAULT = [
  { id: 1, label: 'SOS Recording',    date: 'May 9, 2026',  duration: '2m 34s', trigger: 'Auto (SOS)', shared: true  },
  { id: 2, label: 'Manual Recording', date: 'May 7, 2026',  duration: '1m 12s', trigger: 'Manual',     shared: false },
  { id: 3, label: 'Manual Recording', date: 'May 3, 2026',  duration: '0m 48s', trigger: 'Manual',     shared: false },
];

function WaveBar({ active }) {
  const [height, setHeight] = useState(6);
  useEffect(() => {
    if (!active) { setHeight(6); return; }
    const id = setInterval(() => setHeight(Math.round(6 + Math.random() * 36)), 110);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div
      style={{ height }}
      className={`w-[3px] rounded-full transition-all duration-100 ${active ? 'bg-[#DC143C]' : 'bg-[#1e1c24]'}`}
    />
  );
}

export default function AudioRecorder({ autoStart = false, onSave }) {
  const [tab, setTab]           = useState('record');
  const [recording, setRec]     = useState(false);
  const [seconds, setSeconds]   = useState(0);
  const [vault, setVault]       = useState(DEMO_VAULT);
  const [savedMsg, setSavedMsg] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (autoStart) startRec();
    return () => clearInterval(timerRef.current);
  }, [autoStart]);

  const startRec = () => {
    setRec(true); setSeconds(0);
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stopRec = () => {
    clearInterval(timerRef.current);
    setRec(false);
    const mins = Math.floor(seconds / 60);
    const secs = String(seconds % 60).padStart(2, '0');
    const entry = {
      id: Date.now(),
      label: 'Manual Recording',
      date: 'Just now',
      duration: `${mins}m ${secs}s`,
      trigger: 'Manual',
      shared: false,
    };
    setVault(prev => [entry, ...prev]);
    onSave?.(entry);
    setSeconds(0);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
    setTab('vault');
  };

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Tab bar */}
      <div className="flex gap-3">
        {[
          { id:'record', icon:'🎙', label:'Record Audio',   sub:'Silent · background' },
          { id:'vault',  icon:'🔒', label:'Evidence Vault', sub:`${vault.length} recordings` },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-4 py-3 rounded-xl border text-left transition-all ${
              tab === t.id
                ? 'border-[rgba(220,20,60,0.5)] bg-[rgba(220,20,60,0.06)]'
                : 'border-[#1e1c24] bg-[#0f1018] hover:border-[#3a3840]'
            }`}
          >
            <span className="text-base block mb-1">{t.icon}</span>
            <span className={`text-sm font-bold block ${tab===t.id?'text-[#DC143C]':'text-white'}`}>{t.label}</span>
            <span className="text-xs text-[#52505a]">{t.sub}</span>
          </button>
        ))}
      </div>

      {/* ── RECORD ── */}
      {tab === 'record' && (
        <div className="bg-[#0f1018] border border-[#1e1c24] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1a1820]">
            <div className="w-10 h-10 rounded-xl bg-[rgba(220,20,60,0.1)] border border-[rgba(220,20,60,0.2)] flex items-center justify-center text-lg flex-shrink-0">
              🎙
            </div>
            <div>
              <p className="text-sm font-bold text-white">Background Audio Recording</p>
              <p className="text-xs text-[#52505a] mt-0.5">Silent · screen looks normal to others</p>
            </div>
          </div>

          <div className="p-5 text-center">
            <p className={`text-sm font-semibold mb-1 ${recording ? 'text-[#DC143C]' : 'text-[#52505a]'}`}>
              {savedMsg ? 'Saved to vault ✓' : recording ? 'Recording in background...' : 'Ready to record · रिकॉर्ड करें'}
            </p>

            {/* Waveform */}
            <div className="flex items-center justify-center gap-[3px] h-11 my-4">
              {Array.from({ length: 20 }).map((_, i) => <WaveBar key={i} active={recording} />)}
            </div>

            {/* Timer */}
            <p className="text-5xl font-black text-white mb-6 tabular-nums tracking-tight">
              {fmt(seconds)}
            </p>

            {/* Record button */}
            <button
              onClick={recording ? stopRec : startRec}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl transition-all active:scale-95 ${
                recording
                  ? 'bg-[#7a0a1a] ring-4 ring-[rgba(220,20,60,0.2)]'
                  : 'bg-[#DC143C] hover:bg-[#b8102e]'
              }`}
            >
              {recording ? '⏹' : '🎙'}
            </button>

            <p className="text-xs text-[#3a3840]">
              {recording ? 'Tap to stop & save' : 'Tap to start recording'}
            </p>
          </div>

          {/* Encryption row */}
          <div className="mx-5 mb-5 flex items-center gap-3 px-3 py-2.5 bg-[#07080f] border border-[#1e1c24] rounded-lg">
            <span>🔒</span>
            <div className="flex-1">
              <p className="text-xs font-bold text-white">Auto-upload to encrypted vault</p>
              <p className="text-xs text-[#52505a]">AES-256 · shared with contacts on SOS</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#DC143C]" />
          </div>
        </div>
      )}

      {/* ── VAULT ── */}
      {tab === 'vault' && (
        <div className="bg-[#0f1018] border border-[#1e1c24] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1820]">
            <div>
              <p className="text-sm font-bold text-white">Evidence Vault</p>
              <p className="text-xs text-[#52505a]">{vault.length} recordings · end-to-end encrypted</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[rgba(34,197,94,0.08)] text-green-400 border border-[rgba(34,197,94,0.2)] font-bold">
              🔒 Secure
            </span>
          </div>

          <div className="p-4 flex flex-col gap-2">
            {vault.length === 0 && (
              <p className="text-center text-xs text-[#3a3840] py-8">No recordings yet. Record audio evidence above.</p>
            )}
            {vault.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3 bg-[#07080f] border border-[#1e1c24] rounded-xl">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.trigger === 'Auto (SOS)' ? 'bg-[#DC143C]' : 'bg-[#3a3840]'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{item.label}</p>
                  <p className="text-xs text-[#52505a]">
                    {item.date} · {item.duration} · {item.trigger}
                    {item.shared && <span className="ml-1 text-green-400">· Shared ✓</span>}
                  </p>
                </div>
                <button className="text-[#52505a] hover:text-white transition-colors text-lg px-1">⬇</button>
              </div>
            ))}

            <div className="flex gap-3 mt-2">
              <button className="flex-1 py-2.5 rounded-xl bg-[#DC143C] hover:bg-[#b8102e] text-white text-xs font-bold transition-all active:scale-[.98]">
                Share as evidence
              </button>
              <button
                onClick={() => setVault([])}
                className="px-4 py-2.5 rounded-xl border border-[#1e1c24] text-[#8a8490] text-xs font-semibold hover:border-[#DC143C] hover:text-[#DC143C] transition-all"
              >
                Delete all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
