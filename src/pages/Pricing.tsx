import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for small, one-off project disputes.',
    features: ['1 Active Session', 'Up to 5 Documents', 'Standard AI Analysis', 'Email Support'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For freelancers and agencies with multiple projects.',
    features: ['Unlimited Sessions', 'Unlimited Documents', 'Advanced AI (Gemini 3.1 Pro)', 'Priority Support', 'Evidence Vault Storage'],
    cta: 'Go Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations.',
    features: ['Custom AI Training', 'SLA Guarantees', 'Dedicated Account Manager', 'White-label Options', 'API Access'],
    cta: 'Contact Sales',
    popular: false
  }
];

export const Pricing = () => {
  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-serif italic mb-6"
        >
          Simple, Transparent <br />
          <span className="not-italic font-sans font-bold text-accent">Pricing</span>.
        </motion.h1>
        <p className="text-xl opacity-60 max-w-2xl mx-auto">
          Choose the plan that fits your dispute resolution needs. No hidden fees, just fair outcomes.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div 
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-card p-10 flex flex-col relative ${plan.popular ? 'border-accent/50 shadow-[0_0_40px_rgba(242,125,38,0.1)]' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-accent text-bg px-4 py-1 text-xs font-mono uppercase tracking-widest rounded-full">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-2xl font-serif italic mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="opacity-40">/mo</span>}
              </div>
              <p className="opacity-60 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              {plan.features.map(feature => (
                <div key={feature} className="flex items-center gap-3 text-sm opacity-80">
                  <Check size={16} className="text-accent shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 font-mono uppercase text-sm tracking-widest transition-all rounded-sm ${plan.popular ? 'bg-accent text-bg hover:brightness-110' : 'border border-line hover:bg-white/5'}`}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
