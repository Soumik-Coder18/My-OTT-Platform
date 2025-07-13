import React from "react";
import { motion } from "framer-motion";
import Avatar from "./Avtar";
import { ShieldCheck, Info, Lock, Globe, Bell, Mail, User, Heart, MessageSquare, Database } from "lucide-react";

const sections = [
  {
    icon: <Info className="w-6 h-6 text-white" />,
    title: "Introduction",
    text: "Welcome to WhisperFrame. We are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we handle your data when you use our browsing service.",
  },
  {
    icon: <User className="w-6 h-6 text-white" />,
    title: "User Account Data",
    text: "We collect your username, email, and password (encrypted with bcrypt) for account creation and authentication. This data is stored securely in our database and used only for account management and login purposes.",
  },
  {
    icon: <Heart className="w-6 h-6 text-white" />,
    title: "Favorites & Preferences",
    text: "We store your favorite movies and TV shows to enhance your browsing experience. This data helps us provide personalized recommendations and maintain your watchlist across sessions.",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    title: "Comments & Reviews",
    text: "When you leave comments on movies or shows, we store your username and comment content. Comments are publicly visible and help other users discover content. You can manage your comments through your account.",
  },
  {
    icon: <Mail className="w-6 h-6 text-white" />,
    title: "Contact Information",
    text: "When you use our contact form, we collect your name, email, and message content. This information is used solely to respond to your inquiries and provide customer support.",
  },
  {
    icon: <Lock className="w-6 h-6 text-white" />,
    title: "Security & Authentication",
    text: "Your password is securely hashed using bcrypt encryption. We use JWT (JSON Web Tokens) for secure authentication. Your information is protected using industry-standard security measures.",
  },
  {
    icon: <Globe className="w-6 h-6 text-white" />,
    title: "Cookies & Sessions",
    text: "We use cookies for authentication, session management, and analytics. JWT tokens are stored securely and used for maintaining your login session. You can manage cookie preferences in your browser settings.",
  },
  {
    icon: <Bell className="w-6 h-6 text-white" />,
    title: "Data Usage",
    text: "Your data helps us provide personalized browsing experience, manage your favorites, track your comments, and improve our platform. We use your information only with your permission and for service enhancement.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Data Protection",
    text: "We never sell, trade, or share your personal information with third parties. Your data is used only for platform functionality and is protected by industry-standard security measures.",
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        
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
            <ShieldCheck className="w-5 h-5" />
            <span className="font-semibold">Data Protection</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Policy</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our privacy policy outlines how we handle your information, how it's stored, and how you're protected while using our browsing platform.
          </p>
          
          <p className="text-sm text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>

        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <Avatar />
        </motion.div>

        {/* Privacy Sections Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/25 transition-all duration-500"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{section.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Your Rights & Choices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Access Your Data</h4>
                <p className="text-sm">You can view and manage your account information, favorites, and comments through your profile settings.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Delete Your Account</h4>
                <p className="text-sm">You can request account deletion at any time. This will permanently remove all your data from our platform.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Update Information</h4>
                <p className="text-sm">You can update your profile information, email, and password through your account settings.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Contact Us</h4>
                <p className="text-sm">For privacy questions or concerns, please use our contact form. We're committed to addressing your data protection inquiries.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
