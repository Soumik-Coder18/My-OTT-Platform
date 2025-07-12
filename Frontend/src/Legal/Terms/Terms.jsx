import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Film, Globe, Lock, AlertTriangle } from 'lucide-react';
import Card from './Card';

const Term = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl space-y-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-6 py-3 rounded-full mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Legal Information</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Conditions</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using our movie browsing platform
          </p>
          
          <p className="text-sm text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Terms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Account & Registration */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Account & Registration</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">• You must be 13+ years old to create an account</p>
              <p className="text-sm">• Provide accurate and complete information</p>
              <p className="text-sm">• Keep your login credentials secure</p>
              <p className="text-sm">• One account per person</p>
            </div>
          </motion.div>

          {/* Content Usage */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Content Usage</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">• Browse movie and show information freely</p>
              <p className="text-sm">• No downloading or copying of content</p>
              <p className="text-sm">• Respect intellectual property rights</p>
              <p className="text-sm">• Information availability may vary by region</p>
            </div>
          </motion.div>

          {/* Privacy & Data */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Privacy & Data</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">• We collect data to improve your experience</p>
              <p className="text-sm">• Your data is never sold to third parties</p>
              <p className="text-sm">• We use cookies for functionality</p>
              <p className="text-sm">• Review our Privacy Policy for details</p>
            </div>
          </motion.div>

          {/* Prohibited Activities */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Prohibited Activities</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">• Sharing account credentials</p>
              <p className="text-sm">• Attempting to hack or disrupt service</p>
              <p className="text-sm">• Violating any applicable laws</p>
              <p className="text-sm">• Misusing the browsing platform</p>
            </div>
          </motion.div>

          {/* Platform Usage */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Platform Usage</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">• Free browsing and discovery service</p>
              <p className="text-sm">• No subscription fees or payments required</p>
              <p className="text-sm">• Browse movies and shows information</p>
              <p className="text-sm">• Access to movie details and reviews</p>
            </div>
          </motion.div>

          {/* Service Availability */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Service Availability</h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">• Service provided "as is"</p>
              <p className="text-sm">• We strive for reliable browsing experience</p>
              <p className="text-sm">• Maintenance may cause temporary downtime</p>
              <p className="text-sm">• Information accuracy not guaranteed</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Terms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Additional Terms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Information Accuracy</h4>
                <p className="text-sm">We provide movie and show information for browsing purposes. Information accuracy depends on external sources.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Device Compatibility</h4>
                <p className="text-sm">Our browsing platform works on most modern devices and browsers. Some features may not be available on all platforms.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Changes to Terms</h4>
                <p className="text-sm">We may update these terms at any time. Continued use of the service constitutes acceptance of new terms.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Contact Information</h4>
                <p className="text-sm">For questions about these terms, please contact our support team through the help center.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Agreement Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex justify-center mt-12"
        >
          <Card />
        </motion.div>
      </div>
    </div>
  );
};

export default Term;
