import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, FileText, Shield, Lock, Eye, Download, HardDrive, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const evidenceItems = [
  {
    id: 'DOC-9921-A',
    name: 'Service_Level_Agreement_v2.pdf',
    type: 'PDF',
    size: '2.4 MB',
    date: 'Oct 12, 2023',
    hash: '0x7f3...a92b',
    status: 'Verified',
  },
  {
    id: 'DOC-9921-B',
    name: 'Project_Timeline_Final.xlsx',
    type: 'XLSX',
    size: '1.1 MB',
    date: 'Oct 12, 2023',
    hash: '0x3a1...f82c',
    status: 'Verified',
  },
  {
    id: 'DOC-9945-C',
    name: 'Communication_Log_Q3.txt',
    type: 'TXT',
    size: '450 KB',
    date: 'Sep 28, 2023',
    hash: '0x9d2...e11f',
    status: 'Encrypted',
  },
  {
    id: 'DOC-8821-D',
    name: 'Initial_Proposal_Signed.pdf',
    type: 'PDF',
    size: '3.8 MB',
    date: 'Aug 05, 2023',
    hash: '0x1b4...c55d',
    status: 'Verified',
  }
];

export const EvidenceVault = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 block mb-2">
          Secure Storage
        </span>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-navy mb-6">Evidence Vault</h1>
            <p className="text-ink/60 leading-relaxed">
              A tamper-proof repository for all arbitration evidence. Every document is 
              cryptographically hashed and stored in isolated digital vaults.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={18} />
              <input 
                type="text" 
                placeholder="Search documents..." 
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

      {/* Storage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-navy rounded-xl p-8 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="relative z-10">
            <HardDrive size={24} className="mb-4 text-blue-400" />
            <div className="text-3xl font-bold mb-1">12.4 GB</div>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Storage Used</div>
          </div>
        </div>
        <div className="bg-white border border-line rounded-xl p-8 shadow-sm">
          <Shield size={24} className="mb-4 text-green-500" />
          <div className="text-3xl font-bold text-navy mb-1">100%</div>
          <div className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Integrity Verified</div>
        </div>
        <div className="bg-white border border-line rounded-xl p-8 shadow-sm">
          <Lock size={24} className="mb-4 text-accent" />
          <div className="text-3xl font-bold text-navy mb-1">AES-256</div>
          <div className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Encryption Protocol</div>
        </div>
      </div>

      {/* Document Table */}
      <div className="bg-white rounded-xl shadow-sm border border-line overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] bg-sidebar/50 px-8 py-4 border-b border-line">
          <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Document Name</span>
          <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Size</span>
          <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Date Added</span>
          <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Hash</span>
          <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest">Status</span>
          <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest text-right">Actions</span>
        </div>

        <div className="divide-y divide-line">
          {evidenceItems.map((doc) => (
            <motion.div 
              key={doc.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] px-8 py-6 items-center hover:bg-sidebar/20 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center text-navy/40">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="font-bold text-navy mb-0.5">{doc.name}</div>
                  <div className="text-[10px] text-ink/40 font-medium uppercase tracking-wider">{doc.id} • {doc.type}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-navy/60">{doc.size}</div>
              <div className="text-sm font-medium text-navy/60">{doc.date}</div>
              <div className="font-mono text-[10px] text-navy/40 bg-navy/5 px-2 py-1 rounded w-fit">
                {doc.hash}
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  doc.status === 'Verified' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'
                }`}>
                  {doc.status}
                </span>
              </div>
              <div className="flex justify-end gap-2">
                <button className="p-2 text-navy/30 hover:text-navy transition-colors">
                  <Eye size={18} />
                </button>
                <button className="p-2 text-navy/30 hover:text-navy transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-8 bg-sidebar/30 border-t border-line">
          <div className="flex items-center justify-between">
            <div className="text-xs text-navy/40 font-medium">
              Showing 4 of 1,284 documents
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-line rounded text-xs font-bold text-navy/40 cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 bg-white border border-line rounded text-xs font-bold text-navy hover:bg-sidebar transition-all">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceVault;
