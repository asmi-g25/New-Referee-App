import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2,
  BarChart3,
  Globe,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Network Latency', value: '14ms', icon: Zap, color: 'text-blue-500' },
  { label: 'Active Protocols', value: '1,284', icon: Activity, color: 'text-blue-400' },
  { label: 'Security Level', value: 'Lvl 4', icon: ShieldCheck, color: 'text-green-500' },
  { label: 'Uptime', value: '99.99%', icon: Globe, color: 'text-blue-600' },
];

const recentActivity = [
  { id: 'ACT-992', type: 'Protocol Init', time: '2m ago', status: 'Success' },
  { id: 'ACT-991', type: 'Evidence Hash', time: '14m ago', status: 'Verified' },
  { id: 'ACT-990', type: 'Ruling Issued', time: '1h ago', status: 'Finalized' },
  { id: 'ACT-989', type: 'Session Join', time: '3h ago', status: 'Success' },
];

export const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 block mb-2">
          System Overview
        </span>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h1 className="text-5xl font-bold text-navy mb-4">Analysis Dashboard</h1>
            <p className="text-ink/60 leading-relaxed max-w-2xl">
              Real-time monitoring of the AIReferee protocol. Track network health, 
              active arbitration sessions, and cryptographic verification status.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/session"
              className="bg-accent text-white px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-3 hover:bg-accent/90 transition-all shadow-xl shadow-accent/20"
            >
              <Plus size={20} />
              INITIALIZE ARBITRATION
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <motion.div 
            key={stat.label}
            whileHover={{ y: -4 }}
            className="bg-white p-8 rounded-xl border border-line shadow-sm transition-all hover:shadow-xl hover:shadow-navy/5"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 bg-navy/5 rounded-lg ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight size={16} className="text-ink/20" />
            </div>
            <div className="text-3xl font-bold text-navy mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold text-ink/40 uppercase tracking-[0.15em]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Area Placeholder */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-line shadow-sm p-8 min-h-[400px] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-navy">Network Throughput</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-navy text-white text-[10px] font-bold rounded uppercase">Real-time</span>
                <span className="px-3 py-1 bg-sidebar text-navy/40 text-[10px] font-bold rounded uppercase">History</span>
              </div>
            </div>
            
            {/* Visual Placeholder for Chart */}
            <div className="absolute inset-x-8 bottom-8 top-24 flex items-end gap-2">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 60 + 20}%` }}
                  transition={{ duration: 1, delay: i * 0.05, repeat: Infinity, repeatType: 'reverse' }}
                  className="flex-1 bg-navy/10 rounded-t-sm group-hover:bg-accent/20 transition-colors"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/40 backdrop-blur-[2px]">
              <button className="bg-navy text-white px-6 py-3 rounded-lg font-bold text-sm shadow-xl">
                View Detailed Analytics
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy rounded-xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <ShieldCheck size={32} className="mb-6 text-blue-400" />
                <h3 className="text-xl font-bold mb-3">Protocol Integrity</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  All arbitration data is hashed using SHA-256 and stored in immutable ledger blocks.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400">
                  <CheckCircle2 size={12} />
                  Verified by Node 0x4F
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </div>
            <div className="bg-white border border-line rounded-xl p-8 shadow-sm">
              <Clock size={32} className="mb-6 text-accent" />
              <h3 className="text-xl font-bold text-navy mb-3">Neutrality Engine</h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-6">
                AI decision models are isolated from external influence during active sessions.
              </p>
              <div className="w-full bg-sidebar h-1 rounded-full overflow-hidden">
                <div className="bg-accent w-3/4 h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-line shadow-sm overflow-hidden">
            <div className="p-6 border-b border-line bg-sidebar/30">
              <h2 className="text-sm font-bold text-navy uppercase tracking-widest">Recent Activity</h2>
            </div>
            <div className="divide-y divide-line">
              {recentActivity.map((act) => (
                <div key={act.id} className="p-6 flex items-center justify-between hover:bg-sidebar/20 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-navy mb-1">{act.type}</div>
                    <div className="text-[10px] text-ink/40 font-medium uppercase tracking-wider">{act.id} • {act.time}</div>
                  </div>
                  <span className="text-[9px] font-bold px-2 py-1 bg-green-500/10 text-green-600 rounded uppercase">
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 text-[10px] font-bold text-navy/40 uppercase tracking-widest hover:bg-sidebar/30 transition-colors border-t border-line">
              View Audit Log
            </button>
          </div>

          <div className="bg-sidebar rounded-xl p-8 border border-line">
            <TrendingUp size={24} className="mb-6 text-navy" />
            <h3 className="text-sm font-bold text-navy mb-3 uppercase tracking-widest">System Load</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-navy/60 mb-2 uppercase">
                  <span>CPU Usage</span>
                  <span>12%</span>
                </div>
                <div className="w-full bg-navy/10 h-1 rounded-full">
                  <div className="bg-navy w-[12%] h-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-bold text-navy/60 mb-2 uppercase">
                  <span>Memory</span>
                  <span>4.2 GB</span>
                </div>
                <div className="w-full bg-navy/10 h-1 rounded-full">
                  <div className="bg-navy w-[45%] h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
