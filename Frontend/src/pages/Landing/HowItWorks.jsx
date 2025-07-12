import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Heart,
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your free account in seconds",
      icon: Users
    },
    {
      step: "2",
      title: "Explore",
      description: "Browse movies and discover new favorites",
      icon: Search
    },
    {
      step: "3",
      title: "Enjoy",
      description: "Save favorites and get recommendations",
      icon: Heart
    }
  ];

  return (
    <section className="px-6 py-20 bg-gradient-to-br from-purple-900/50 to-pink-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Get Started in 3 Steps
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your journey to discovering amazing movies starts here
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <step.icon size={16} className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 