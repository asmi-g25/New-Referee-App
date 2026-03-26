import React from 'react';
import { motion } from 'motion/react';
import { User, Shield, Bell, CreditCard, Globe, Zap, ChevronRight } from 'lucide-react';

const settingsSections = [
  { id: 'profile', label: 'Profile Information', icon: User, description: 'Manage your personal identity and contact details.' },
  { id: 'security', label: 'Security & Access', icon: Shield, description: 'Configure multi-factor authentication and access logs.' },
  { id: 'notifications', label: 'Communication', icon: Bell, description: 'Set preferences for system alerts and session updates.' },
  { id: 'billing', label: 'Financials', icon: CreditCard, description: 'Manage institutional subscriptions and billing history.' },
  { id: 'network', label: 'Network & API', icon: Globe, description: 'Configure endpoint connections and API integrations.' },
];

export const Settings = () => {
  const [activeSection, setActiveSection] = React.useState('profile');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 block mb-2">
          System Configuration
        </span>
        <h1 className="text-5xl font-bold text-navy mb-6">Settings</h1>
        <p className="text-ink/60 leading-relaxed max-w-2xl">
          Configure your institutional profile and security parameters. All changes are 
          logged and cryptographically signed for audit purposes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left group ${
                activeSection === section.id 
                  ? 'bg-navy text-white shadow-lg shadow-navy/20' 
                  : 'hover:bg-sidebar text-navy/60'
              }`}
            >
              <section.icon size={20} className={activeSection === section.id ? 'text-blue-400' : 'text-navy/40'} />
              <div className="flex-1">
                <div className="font-bold text-sm">{section.label}</div>
              </div>
              <ChevronRight size={16} className={`transition-transform ${activeSection === section.id ? 'translate-x-1' : 'opacity-0'}`} />
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="bg-white border border-line rounded-2xl p-10 shadow-sm">
          {activeSection === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-2xl font-bold text-navy mb-2">Profile Information</h2>
                <p className="text-sm text-ink/40">Update your institutional identity and contact details.</p>
              </div>

              <div className="flex items-center gap-8 pb-10 border-b border-line">
                <div className="w-24 h-24 rounded-2xl bg-sidebar flex items-center justify-center text-navy/20 border border-line">
                  <User size={48} />
                </div>
                <div>
                  <button className="bg-navy text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-navy/90 transition-all mb-2">
                    UPLOAD PHOTO
                  </button>
                  <p className="text-[10px] text-ink/40 uppercase font-bold tracking-wider">JPG, PNG or GIF. Max 5MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-ink/40">Full Legal Name</label>
                  <input type="text" defaultValue="Alexander Smith" className="w-full bg-sidebar border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-ink/40">Institutional Email</label>
                  <input type="email" defaultValue="asmig025@gmail.com" className="w-full bg-sidebar border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-ink/40">Organization</label>
                  <input type="text" defaultValue="Global Tech Solutions" className="w-full bg-sidebar border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-ink/40">Timezone</label>
                  <select className="w-full bg-sidebar border border-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20">
                    <option>UTC (GMT+0)</option>
                    <option>EST (GMT-5)</option>
                    <option>PST (GMT-8)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-4">
                <button className="px-8 py-3 rounded-lg font-bold text-sm text-navy/60 hover:bg-sidebar transition-all">CANCEL</button>
                <button className="px-8 py-3 bg-accent text-white rounded-lg font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
                  SAVE CHANGES
                </button>
              </div>
            </motion.div>
          )}

          {activeSection !== 'profile' && (
            <div className="h-96 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-sidebar flex items-center justify-center text-navy/20 mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">Module Under Maintenance</h3>
              <p className="text-sm text-ink/40 max-w-xs leading-relaxed">
                This configuration module is currently being updated for enhanced security protocols.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
