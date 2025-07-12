import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Heart,
  Award,
  Globe,
  Zap,
  Crown,
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find exactly what you want with our intelligent search algorithm",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Personal Lists",
      description: "Create and manage your favorite movies and watchlists",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Award,
      title: "Actor Profiles",
      description: "Explore detailed actor information and filmography",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Globe,
      title: "Global Cinema",
      description: "Discover movies from around the world",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Stay updated with the latest releases and trends",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Crown,
      title: "Premium Experience",
      description: "Enjoy a seamless, ad-free movie discovery experience",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="px-6 py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose WhisperFrame?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of movie discovery with our cutting-edge features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-purple-500/30 transition-all duration-500 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 