import React from 'react';
import { motion } from 'motion/react';
import { Search, Plus, ChevronRight, FileText, Shield, Gavel, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const activeSessions = [
  {
    id: 'CASE-2023-9921',
    title: 'Global Logistics vs. Prime Ship',
    subtitle: 'Contractual Dispute / Latency Clause',
    status: 'IN PROGRESS',
    statusColor: 'text-blue-500',
    borderColor: 'border-blue-500',
  },
  {
    id: 'CASE-2023-9945',
    title: 'NexGen AI vs. CloudScale',
    subtitle: 'SLA Infringement / Q3 2023',
    status: 'AWAITING PROOF',
    statusColor: 'text-blue-400',
    borderColor: 'border-blue-400',
  }
];

const resolvedCases = [
  {
    id: '#R-8821',
    date: 'Oct 12, 2023',
    parties: ['GL', 'PS'],
    description: 'FinTech Ltd vs SecureGate',
    outcome: 'RULING ISSUED',
    outcomeColor: 'text-green-500',
    outcomeBg: 'bg-green-500/10',
  },
  {
    id: '#R-8740',
    date: 'Sep 28, 2023',
    parties: ['A', 'B'],
    description: 'Alpha Media vs Beta Ads',
    outcome: 'RULING ISSUED',
    outcomeColor: 'text-green-500',
    outcomeBg: 'bg-green-500/10',
  },
  {
    id: '#R-8612',
    date: 'Aug 05, 2023',
    parties: ['X', 'Z'],
    description: 'Terraform Corp vs Orbit X',
    outcome: 'DISMISSED',
    outcomeColor: 'text-gray-500',
    outcomeBg: 'bg-gray-500/10',
  }
];

export const CaseVault = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 block mb-2">
          Archive & Records
        </span>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-navy mb-6">Case Vault</h1>
            <p className="text-ink/60 leading-relaxed">
              Access historical rulings, evidence repositories, and active dispute sessions. 
              All data is encrypted and logged within the institutional blockchain.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
              <input 
                type="text" 
                placeholder="Filter rulings or IDs..." 
                className="bg-sidebar border border-line pl-12 pr-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all w-72 text-sm"
              />
            </div>
            <Link 
              to="/session"
              className="bg-navy text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-navy/90 transition-all shadow-lg shadow-navy/10"
            >
              <Plus size={18} />
              NEW SESSION
            </Link>
          </div>
        </div>
      </div>

      {/* Active Sessions Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl font-bold text-navy">Active Sessions</h2>
          <span className="bg-navy text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            3 Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeSessions.map((session) => (
            <motion.div 
              key={session.id}
              whileHover={{ y: -4 }}
              className={`bg-white border-l-4 ${session.borderColor} rounded-r-xl p-8 shadow-sm border-y border-r border-line flex flex-col justify-between min-h-[280px] transition-all hover:shadow-xl hover:shadow-navy/5`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold text-ink/30 tracking-widest uppercase">
                    {session.id}
                  </span>
                  <div className={`flex items-center gap-1.5 ${session.statusColor} text-[10px] font-bold uppercase tracking-wider`}>
                    <Activity size={12} />
                    {session.status}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2 leading-tight">
                  {session.title}
                </h3>
                <p className="text-sm text-ink/40 font-medium">
                  {session.subtitle}
                </p>
              </div>

              <div className="pt-8 border-t border-line mt-auto flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-navy/40" />
                  <span className="text-xs font-bold text-navy">Evidence Vault</span>
                </div>
                <ChevronRight size={16} className="text-navy/40 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}

          {/* Security Card */}
          <div className="bg-navy rounded-xl p-8 text-white flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Shield size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Institutional Security</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Your case data is stored in air-gapped vaults with multi-sig decryption protocols.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resolved Cases Section */}
      <div>
        <h2 className="text-xl font-bold text-navy mb-8">Resolved Cases</h2>
        <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
          <div className="grid grid-cols-[1.5fr_2fr_1.5fr_0.5fr] bg-sidebar/50 px-8 py-4 border-b border-line">
            <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Reference</span>
            <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Disputing Parties</span>
            <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Outcome</span>
            <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest text-right">Actions</span>
          </div>

          <div className="divide-y divide-line">
            {resolvedCases.map((item) => (
              <div key={item.id} className="grid grid-cols-[1.5fr_2fr_1.5fr_0.5fr] px-8 py-6 items-center hover:bg-sidebar/20 transition-colors group">
                <div>
                  <div className="font-bold text-navy mb-1">{item.id}</div>
                  <div className="text-[10px] text-ink/40 font-medium uppercase tracking-wider">{item.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {item.parties.map((p, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-sidebar border-2 border-white flex items-center justify-center text-[10px] font-bold text-navy">
                        {p}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-navy/70">{item.description}</span>
                </div>
                <div>
                  <div className={`inline-flex items-center gap-1.5 ${item.outcomeBg} ${item.outcomeColor} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                    {item.outcome === 'RULING ISSUED' ? <Gavel size={12} /> : <XCircle size={12} />}
                    {item.outcome}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="p-2 text-navy/30 hover:text-navy transition-colors">
                    <FileText size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-6 text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em] hover:bg-sidebar/30 transition-colors border-t border-line">
            View Full Archive (142 Cases)
          </button>
        </div>
      </div>
    </div>
  );
};

const Activity = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default CaseVault;
