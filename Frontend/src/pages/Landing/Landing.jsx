import React from 'react';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import FinalCTA from './FinalCTA';

const Landing = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Hero />
      <Features />
      <HowItWorks />
      <FinalCTA />
    </div>
  );
};

export default Landing; 