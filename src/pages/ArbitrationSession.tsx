import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Users, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Upload, 
  ArrowRight, 
  Gavel,
  Loader2,
  Download,
  Plus,
  Scale
} from 'lucide-react';
import { SessionState, User, Document, Dispute, AIResult } from '../types';
import { cn } from '../lib/utils';

const socket: Socket = io();

export const ArbitrationSession = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const [session, setSession] = useState<SessionState | null>(null);
  const [role, setRole] = useState<'client' | 'provider' | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [disputeText, setDisputeText] = useState('');

  useEffect(() => {
    socket.on('session-update', (updatedSession: SessionState) => {
      setSession(updatedSession);
    });

    socket.on('assigned-role', (assignedRole: 'client' | 'provider' | null) => {
      setRole(assignedRole);
    });

    return () => {
      socket.off('session-update');
      socket.off('assigned-role');
    };
  }, []);

  const [joinId, setJoinId] = useState('');

  const createSession = () => {
    const id = Math.random().toString(36).substr(2, 6).toUpperCase();
    setSessionId(id);
    socket.emit('join-session', id);
    setIsJoining(true);
  };

  const joinSession = (id: string) => {
    if (!id.trim()) return;
    setSessionId(id.toUpperCase());
    socket.emit('join-session', id.toUpperCase());
    setIsJoining(true);
  };

  const handleAgreement = (agreed: boolean) => {
    socket.emit('update-agreement', { sessionId, agreed });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      socket.emit('add-document', {
        sessionId,
        doc: {
          name: file.name,
          content: data.text,
        }
      });
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const approveDocument = (docId: string, approved: boolean) => {
    socket.emit('approve-document', { sessionId, docId, approved });
  };

  const submitDispute = () => {
    if (!disputeText.trim()) return;
    socket.emit('submit-dispute', { sessionId, text: disputeText });
    setDisputeText('');
  };

  const approveDispute = (approved: boolean) => {
    socket.emit('approve-dispute', { sessionId, approved });
  };

  if (!isJoining) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 pt-32 bg-[radial-gradient(circle_at_50%_0%,rgba(242,125,38,0.05)_0%,transparent_50%)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8 glass-card p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-navy text-white mb-6 rounded-sm border border-accent/20 shadow-[0_0_20px_rgba(242,125,38,0.1)]">
              <Gavel size={32} />
            </div>
            <h1 className="text-4xl font-serif italic mb-2 tracking-tight">New <span className="not-italic font-sans font-black text-accent uppercase tracking-tighter">Session</span></h1>
            <p className="micro-label opacity-40">Neutral Grounds for Complex Disputes</p>
          </div>

          <div className="space-y-6 pt-4">
            <button onClick={createSession} className="w-full bg-navy text-white px-6 py-4 rounded-lg font-bold text-sm flex items-center justify-center gap-3 hover:bg-navy/90 transition-all shadow-lg shadow-navy/10 group">
              Start New Session <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            </button>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-line/20"></span></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]"><span className="bg-[#E4E3E0] px-4 opacity-40 font-mono">or join existing</span></div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={joinId}
                onChange={(e) => setJoinId(e.target.value.toUpperCase())}
                placeholder="SESSION CODE" 
                className="flex-1 bg-white/20 border border-line/30 p-4 font-mono uppercase text-center focus:outline-none focus:border-accent transition-all placeholder:opacity-30 rounded-sm"
              />
              <button 
                onClick={() => joinSession(joinId)}
                className="bg-sidebar border border-line px-8 py-4 rounded-lg font-bold text-sm hover:bg-sidebar/50 transition-all"
              >
                Join
              </button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-line/10 flex justify-center gap-6 opacity-30">
            <div className="flex items-center gap-2">
              <Shield size={12} />
              <span className="text-[9px] uppercase tracking-widest font-mono">Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={12} />
              <span className="text-[9px] uppercase tracking-widest font-mono">P2P Shared</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!session) return <div className="min-h-screen flex items-center justify-center font-mono uppercase tracking-widest opacity-40">Connecting...</div>;

  const currentUser = session.users.find(u => u.id === socket.id);
  const otherUser = session.users.find(u => u.id !== socket.id);
  const bothAgreed = session.users.length >= 2 && session.users.every(u => u.agreed);

  return (
    <div className="min-h-screen flex flex-col pt-20">
      {/* Sub-Header */}
      <div className="border-b border-line bg-white/40 backdrop-blur-sm px-6 py-4 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="micro-label opacity-40 mb-1">Session ID</span>
              <span className="font-mono text-accent tracking-[0.2em] font-bold text-sm">{session.sessionId}</span>
            </div>
            <div className="h-8 w-[1px] bg-line/10" />
            <div className="flex flex-col">
              <span className="micro-label opacity-40 mb-1">Status</span>
              <span className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Connection
              </span>
            </div>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className={cn("w-2 h-2 rounded-full", currentUser?.agreed ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500")} />
              <div className="flex flex-col">
                <span className="micro-label opacity-40 mb-0.5">Your Role</span>
                <span className="text-[11px] font-mono uppercase tracking-wider">{role || 'Spectator'}</span>
              </div>
            </div>
            {otherUser && (
              <div className="flex items-center gap-4">
                <div className={cn("w-2 h-2 rounded-full", otherUser.agreed ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500")} />
                <div className="flex flex-col">
                  <span className="micro-label opacity-40 mb-0.5">Counterparty</span>
                  <span className="text-[11px] font-mono uppercase tracking-wider">{otherUser.role || 'Partner'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        <AnimatePresence mode="wait">
          {!bothAgreed ? (
            <motion.div 
              key="agreement"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-2xl mx-auto space-y-8 glass-card p-12 mt-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent/20" />
              <div className="flex items-center gap-6">
                <div className="p-4 bg-ink text-bg rounded-sm shadow-xl">
                  <Shield size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-serif italic tracking-tight">Usage Agreement</h2>
                  <p className="micro-label opacity-40 mt-1">Protocol Authorization Required</p>
                </div>
              </div>
              <div className="space-y-6 text-sm leading-relaxed opacity-70 font-sans border-y border-line/10 py-8">
                <p className="font-medium text-ink">By proceeding, both parties acknowledge and agree to the following protocols:</p>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <span className="text-accent font-mono font-bold">01.</span>
                    <span>This tool uses Artificial Intelligence to provide neutral guidance on project scope disputes.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accent font-mono font-bold">02.</span>
                    <span>The AI output is based <strong className="text-ink underline decoration-accent/30">EXCLUSIVELY</strong> on documents mutually approved by both parties within this session.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accent font-mono font-bold">03.</span>
                    <span>The AI decision is advisory and does not constitute legal advice.</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-accent font-mono font-bold">04.</span>
                    <span>All actions are tracked and visible to both parties in real-time.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => handleAgreement(true)}
                  className={cn(
                    "flex-1 btn-primary py-5 text-base transition-all",
                    currentUser?.agreed && "bg-green-600 hover:bg-green-700"
                  )}
                >
                  {currentUser?.agreed ? "Agreement Confirmed" : "Accept Terms & Initialize"}
                </button>
                <button 
                  onClick={() => handleAgreement(false)}
                  className="btn-secondary py-5 px-10"
                >
                  Decline
                </button>
              </div>
              {session.users.length < 2 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  <Loader2 size={14} className="animate-spin opacity-40" />
                  <p className="micro-label opacity-40 animate-pulse">Waiting for second party to join...</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="main-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Column: Document Vault */}
              <div className="lg:col-span-2 space-y-8">
                <section className="glass-card overflow-hidden border-line/20 shadow-xl">
                  <div className="p-6 border-b border-line/10 flex justify-between items-center bg-white/20">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-ink text-bg rounded-sm">
                        <FileText size={18} />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif italic tracking-tight">Evidence Vault</h3>
                        <p className="micro-label opacity-40">Approved Documentation Only</p>
                      </div>
                    </div>
                    <label className="cursor-pointer btn-secondary py-2.5 px-6 flex items-center gap-3 text-xs">
                      {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                      Upload Artifact
                      <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                  </div>
                  
                  <div className="divide-y divide-line/10">
                    {session.documents.length === 0 ? (
                      <div className="p-24 text-center">
                        <FileText size={48} className="mx-auto mb-4 opacity-5" />
                        <p className="micro-label opacity-30">No artifacts uploaded to session</p>
                      </div>
                    ) : (
                      session.documents.map(doc => (
                        <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-white/30 transition-colors group">
                          <div className="flex items-center gap-6">
                            <div className={cn(
                              "p-4 rounded-sm transition-all duration-300",
                              doc.status === 'approved' ? "text-green-600 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]" : 
                              doc.status === 'rejected' ? "text-red-600 bg-red-500/10" : "text-ink/40 bg-white/40 border border-line/5"
                            )}>
                              <FileText size={24} />
                            </div>
                            <div>
                              <p className="text-lg font-serif italic mb-1.5 group-hover:text-accent transition-colors">{doc.name}</p>
                              <div className="flex gap-6 items-center">
                                <span className={cn(
                                  "micro-label px-2.5 py-1 border rounded-sm font-bold",
                                  doc.status === 'approved' ? "border-green-500/30 text-green-600 bg-green-500/5" :
                                  doc.status === 'rejected' ? "border-red-500/30 text-red-600 bg-red-500/5" : "border-line/10 opacity-50"
                                )}>
                                  {doc.status}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Users size={12} className="opacity-30" />
                                  <span className="micro-label opacity-40">
                                    Consensus: <span className="font-mono font-bold text-ink">{doc.approvals.length}/2</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            {!doc.approvals.includes(socket.id) && doc.status === 'pending' && (
                              <button 
                                onClick={() => approveDocument(doc.id, true)}
                                className="p-3 text-green-600 hover:bg-green-500/20 border border-green-500/20 rounded-sm transition-all hover:scale-105"
                                title="Approve"
                              >
                                <CheckCircle2 size={20} />
                              </button>
                            )}
                            {!doc.rejections.includes(socket.id) && doc.status === 'pending' && (
                              <button 
                                onClick={() => approveDocument(doc.id, false)}
                                className="p-3 text-red-600 hover:bg-red-500/20 border border-red-500/20 rounded-sm transition-all hover:scale-105"
                                title="Reject"
                              >
                                <XCircle size={20} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>

                {/* Dispute Section */}
                <section className="glass-card overflow-hidden border-line/20 shadow-xl">
                  <div className="p-6 border-b border-line/10 flex items-center gap-4 bg-white/20">
                    <div className="p-2 bg-ink text-bg rounded-sm">
                      <AlertCircle size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif italic tracking-tight">Dispute Submission</h3>
                      <p className="micro-label opacity-40">Define the core conflict</p>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-8">
                    {!session.dispute ? (
                      <div className="space-y-6">
                        <div className="relative">
                          <textarea 
                            placeholder="Describe the dispute clearly (e.g., 'Was the mobile app login screen included in the initial phase 1 scope?')"
                            className="w-full bg-white/40 border border-line/20 p-8 font-mono text-sm focus:outline-none focus:border-accent min-h-[200px] rounded-sm transition-all placeholder:opacity-30"
                            value={disputeText}
                            onChange={(e) => setDisputeText(e.target.value)}
                          />
                          <div className="absolute bottom-4 right-4 micro-label opacity-20 font-mono">
                            {disputeText.length} chars
                          </div>
                        </div>
                        <button 
                          onClick={submitDispute}
                          disabled={!disputeText.trim()}
                          className="w-full btn-primary flex items-center justify-center gap-3 py-5 disabled:opacity-30 disabled:grayscale transition-all"
                        >
                          Submit Dispute for Review <ArrowRight size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="p-8 bg-white/40 border-l-4 border-accent shadow-inner relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-2 opacity-5">
                            <AlertCircle size={64} />
                          </div>
                          <p className="font-serif italic text-2xl text-ink leading-relaxed relative z-10">"{session.dispute.text}"</p>
                        </div>
                        
                        <div className="flex items-center justify-between border-t border-line/10 pt-8">
                          <div className="flex items-center gap-8">
                            <div className="flex flex-col">
                              <span className="micro-label opacity-40 mb-1">Status</span>
                              <span className={cn(
                                "text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 border rounded-sm",
                                session.dispute.status === 'accepted' ? "bg-green-500/10 border-green-500/30 text-green-600" :
                                session.dispute.status === 'rejected' ? "bg-red-500/10 border-red-500/30 text-red-600" : "bg-white/40 border-line/10 opacity-60"
                              )}>
                                {session.dispute.status}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="micro-label opacity-40 mb-1">Mutual Consent</span>
                              <span className="text-xs font-mono font-bold">{session.dispute.approvals.length}/2 Parties</span>
                            </div>
                          </div>
                          
                          {session.dispute.status === 'pending' && !session.dispute.approvals.includes(socket.id) && (
                            <div className="flex gap-4">
                              <button 
                                onClick={() => approveDispute(true)}
                                className="btn-primary py-3 px-8 text-xs"
                              >
                                Accept Dispute
                              </button>
                              <button 
                                onClick={() => approveDispute(false)}
                                className="btn-secondary py-3 px-8 text-xs"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Column: AI Arbitrator */}
              <div className="space-y-8">
                <section className="glass-card overflow-hidden sticky top-28 shadow-2xl border-accent/20">
                  <div className="p-6 border-b border-line/10 flex items-center justify-between bg-ink text-bg">
                    <div className="flex items-center gap-3">
                      <Gavel size={18} className="text-accent" />
                      <h3 className="micro-label text-bg tracking-[0.3em]">AI Arbitrator</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">Active</span>
                    </div>
                  </div>
                  
                  <div className="p-8 min-h-[500px] flex flex-col bg-white/10">
                    {session.isProcessing ? (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-accent/30 blur-3xl rounded-full animate-pulse" />
                          <Loader2 className="animate-spin text-accent relative" size={72} strokeWidth={1.5} />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="micro-label animate-pulse tracking-[0.4em]">Analyzing Evidence</p>
                          <p className="text-[10px] font-mono opacity-30">Cross-referencing approved artifacts...</p>
                        </div>
                      </div>
                    ) : session.aiResult ? (
                      <div className="space-y-10 animate-slam">
                        <div className="space-y-4">
                          <span className="micro-label text-accent font-bold">Official Ruling</span>
                          <div className="p-6 bg-ink text-bg rounded-sm shadow-xl border-l-4 border-accent">
                            <h4 className="text-4xl font-serif italic tracking-tight">{session.aiResult.ruling}</h4>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <span className="micro-label border-b border-line/10 pb-1 w-full block">Reasoning</span>
                          <p className="text-sm text-ink/80 leading-relaxed font-sans">{session.aiResult.explanation}</p>
                        </div>

                        <div className="space-y-4">
                          <span className="micro-label border-b border-line/10 pb-1 w-full block">Evidence References</span>
                          <div className="space-y-4">
                            {session.aiResult.references.map((ref, i) => (
                              <div key={i} className="text-[11px] font-mono p-5 bg-white/40 border-l-2 border-accent/30 italic text-ink/70 relative">
                                <span className="absolute top-2 left-2 text-[8px] opacity-20 font-bold">REF_0{i+1}</span>
                                "{ref}"
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <span className="micro-label border-b border-line/10 pb-1 w-full block">Actionable Next Steps</span>
                          <ul className="space-y-4">
                            {session.aiResult.nextSteps.map((step, i) => (
                              <li key={i} className="text-xs flex items-start gap-4 group">
                                <span className="text-accent font-mono font-black text-sm group-hover:scale-110 transition-transform">0{i+1}.</span>
                                <span className="text-ink/70 leading-relaxed pt-0.5">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button className="w-full btn-primary mt-8 flex items-center justify-center gap-3 py-5 shadow-lg hover:shadow-accent/20">
                          <Download size={18} /> Export Official Ruling
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 opacity-10">
                        <Scale size={120} strokeWidth={0.5} />
                        <div className="space-y-2">
                          <p className="micro-label tracking-[0.5em]">Awaiting Consensus</p>
                          <p className="text-[10px] font-mono max-w-[200px] mx-auto">
                            Both parties must approve artifacts and the dispute description to proceed.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
