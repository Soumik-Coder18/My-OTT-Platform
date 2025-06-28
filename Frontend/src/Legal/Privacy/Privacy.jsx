import React from "react";
import Avatar from "./Avtar";
import { ShieldCheck, Info, Lock, Globe, Bell, Mail } from "lucide-react";

const sections = [
  {
    icon: <Info className="w-6 h-6 text-[#555879]" />,
    title: "Introduction",
    text: "We respect your privacy and are committed to protecting your personal information. This policy explains how we handle your data.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#555879]" />,
    title: "Data Collection",
    text: "We may collect your name, email, IP address, and other details you provide directly to us or through your use of the site.",
  },
  {
    icon: <Lock className="w-6 h-6 text-[#555879]" />,
    title: "Security",
    text: "Your information is protected using industry-standard security measures. However, no method is 100% secure.",
  },
  {
    icon: <Globe className="w-6 h-6 text-[#555879]" />,
    title: "Cookies",
    text: "We use cookies for analytics and personalization. You can manage cookie preferences in your browser settings.",
  },
  {
    icon: <Bell className="w-6 h-6 text-[#555879]" />,
    title: "Usage",
    text: "Your data helps us improve services, respond to inquiries, and send relevant updates—only with your permission.",
  },
  {
    icon: <Mail className="w-6 h-6 text-[#555879]" />,
    title: "Contact",
    text: "Questions? Email us anytime at privacy@example.com. We're happy to help clarify any concerns.",
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#F4EBD3] px-6 py-12">
      <div className="max-w-6xl mx-auto text-[#555879]">
        {/* Avatar added here */}
        <div className="flex justify-center mb-8">
          <Avatar />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-center text-[#98A1BC] mb-12 max-w-2xl mx-auto">
          Our privacy policy outlines how we handle your information, how it’s stored, and how you’re protected while using our services.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-[#DED3C4] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#F4EBD3] rounded-full">{section.icon}</div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <p className="text-[#98A1BC]">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
