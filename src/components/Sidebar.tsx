import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, Settings, Activity, Shield, CreditCard, Archive, Plus } from 'lucide-react';

export const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Analysis Dashboard', path: '/' },
    { icon: Database, label: 'Case Vault', path: '/case-vault' },
    { icon: Archive, label: 'Evidence Vault', path: '/evidence-vault' },
    { icon: CreditCard, label: 'Pricing Protocols', path: '/pricing' },
    { icon: Settings, label: 'System Settings', path: '/settings' },
  ];

  const secondaryItems = [
    { icon: Activity, label: 'Integration Settings', path: '/integrations' },
    { icon: Shield, label: 'Security Status', path: '/status' },
  ];

  return (
    <aside className="fixed top-16 left-0 bottom-0 w-64 bg-sidebar border-r border-line p-6 hidden lg:block overflow-y-auto">
      <div className="mb-8 px-4">
        <NavLink 
          to="/session"
          className="w-full bg-accent text-white px-4 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
        >
          <Plus size={16} />
          NEW SESSION
        </NavLink>
      </div>

      <div className="mb-10">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 mb-6 px-4">
          The Digital Vault
        </h3>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-navy text-white shadow-lg shadow-navy/20'
                    : 'text-ink/60 hover:bg-navy/5 hover:text-navy'
                }`
              }
            >
              <item.icon size={18} className="shrink-0" />
              <span className="text-sm font-semibold">{item.label}</span>
              {item.path === '/case-vault' && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 mb-6 px-4">
          Infrastructure
        </h3>
        <div className="space-y-1">
          {secondaryItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-ink/40 cursor-not-allowed group"
            >
              <item.icon size={18} className="shrink-0" />
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-10">
        <div className="bg-navy/5 rounded-xl p-4 border border-navy/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-navy uppercase tracking-wider">Node Status: Active</span>
          </div>
          <p className="text-[10px] text-navy/60 leading-relaxed font-medium">
            Connected to Protocol v2.4.5 via secure tunnel.
          </p>
        </div>
      </div>
    </aside>
  );
};
