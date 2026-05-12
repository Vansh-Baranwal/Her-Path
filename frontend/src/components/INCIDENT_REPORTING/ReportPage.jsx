import { useState } from 'react';
import IncidentReportForm from './IncidentReportForm';
import AudioRecorder from './AudioRecorder';

export default function ReportPage({ navigate }) {
  const [tab, setTab] = useState('report');

  return (
    <div className="min-h-screen bg-[#07080f] pt-24 pb-16 px-5">
      <div className="max-w-lg mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-sm text-[#52505a] hover:text-white transition-colors mb-8"
        >
          ← Back to Home
        </button>

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(220,20,60,0.25)] bg-[rgba(220,20,60,0.08)] mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse" />
            <span className="text-xs font-bold text-[#DC143C] tracking-widest uppercase">Feature 6 · Report & Record</span>
          </div>

          <h1 className="text-4xl font-black text-white leading-tight tracking-tight mb-3">
            Your voice<br />
            <span className="text-[#DC143C]">is evidence.</span>
          </h1>
          <p className="text-sm text-[#8a8490] leading-relaxed">
            Anonymously report incidents or silently record audio proof — both encrypted, both powerful, both built for you.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { num: '12K+',    lbl: 'Reports filed'  },
            { num: '100%',    lbl: 'Anonymous'       },
            { num: 'AES-256', lbl: 'Encryption'      },
          ].map(s => (
            <div key={s.lbl} className="bg-[#0f1018] border border-[#1e1c24] rounded-xl p-3 text-center">
              <div className="text-xl font-black text-[#DC143C] tracking-tight">{s.num}</div>
              <div className="text-xs text-[#52505a] uppercase tracking-widest mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Tab selector */}
        <div className="flex gap-3 mb-6">
          {[
            { id: 'report', icon: '📋', label: 'Incident Report',  sub: 'Anonymous · NGO-linked'   },
            { id: 'audio',  icon: '🎙', label: 'Audio Recording',  sub: 'Silent · Encrypted vault' },
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
              <span className="text-lg block mb-1">{t.icon}</span>
              <span className={`text-sm font-bold block ${tab===t.id?'text-[#DC143C]':'text-white'}`}>
                {t.label}
              </span>
              <span className="text-xs text-[#52505a]">{t.sub}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'report' && (
          <IncidentReportForm onSubmit={data => {}} />
        )}
        {tab === 'audio' && (
          <AudioRecorder onSave={rec => {}} />
        )}

      </div>
    </div>
  );
}
