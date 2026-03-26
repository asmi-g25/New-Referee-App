import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Scale, Search, User } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy text-white px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <Scale size={20} className="text-white" />
        <span className="text-lg font-bold tracking-tighter uppercase">AIReferee</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `text-sm font-medium transition-colors hover:text-white/80 ${isActive ? 'text-white border-b-2 border-white py-5' : 'text-white/60'}`
          }
        >
          Analysis Dashboard
        </NavLink>
        <NavLink 
          to="/case-vault" 
          className={({ isActive }) => 
            `text-sm font-medium transition-colors hover:text-white/80 ${isActive ? 'text-white border-b-2 border-white py-5' : 'text-white/60'}`
          }
        >
          Case Vault
        </NavLink>
        <NavLink 
          to="/evidence-vault" 
          className={({ isActive }) => 
            `text-sm font-medium transition-colors hover:text-white/80 ${isActive ? 'text-white border-b-2 border-white py-5' : 'text-white/60'}`
          }
        >
          Evidence Vault
        </NavLink>
        <NavLink 
          to="/pricing" 
          className={({ isActive }) => 
            `text-sm font-medium transition-colors hover:text-white/80 ${isActive ? 'text-white border-b-2 border-white py-5' : 'text-white/60'}`
          }
        >
          Pricing
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `text-sm font-medium transition-colors hover:text-white/80 ${isActive ? 'text-white border-b-2 border-white py-5' : 'text-white/60'}`
          }
        >
          Settings
        </NavLink>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-white/60 hover:text-white transition-colors">
          <Search size={20} />
        </button>
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};
