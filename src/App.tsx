import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Components
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';

// Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import CaseVault from './pages/CaseVault';
import EvidenceVault from './pages/EvidenceVault';
import Settings from './pages/Settings';
import { ArbitrationSession } from './pages/ArbitrationSession';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-ink selection:bg-accent selection:text-white">
        <Navigation />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 lg:ml-64 p-8 lg:p-12 min-h-[calc(100vh-64px)]">
            <PageWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/case-vault" element={<CaseVault />} />
                <Route path="/evidence-vault" element={<EvidenceVault />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/session" element={<ArbitrationSession />} />
                <Route path="/session/:id" element={<ArbitrationSession />} />
              </Routes>
            </PageWrapper>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
