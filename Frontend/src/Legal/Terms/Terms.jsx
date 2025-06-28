import React from 'react';
import Card from './Card';

const Term = () => {
  return (
    <div className="min-h-screen w-full bg-[#F4EBD3] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl space-y-6">
        
        {/* Title Box */}
        <div className="bg-[#DED3C4] border border-[#98A1BC] rounded-xl p-6 shadow">
          <h1 className="text-3xl font-bold text-[#555879] mb-2">Terms & Conditions</h1>
          <p className="text-[#555879] text-sm">
            Updated on: June 26, 2025
          </p>
        </div>

        {/* Term Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#DED3C4] border border-[#98A1BC] rounded-xl p-5 space-y-3 shadow">
            <h2 className="text-xl font-semibold text-[#555879]">1. User Agreement</h2>
            <p className="text-[#555879] text-sm">
              By using our website, you agree to follow the terms and policies stated here.
              This includes respecting content, user behavior, and platform usage.
            </p>
          </div>

          <div className="bg-[#DED3C4] border border-[#98A1BC] rounded-xl p-5 space-y-3 shadow">
            <h2 className="text-xl font-semibold text-[#555879]">2. Privacy Commitment</h2>
            <p className="text-[#555879] text-sm">
              We value your privacy. Your data will never be sold or shared without consent.
              Please review our Privacy Policy for more details.
            </p>
          </div>

          <div className="bg-[#DED3C4] border border-[#98A1BC] rounded-xl p-5 space-y-3 shadow">
            <h2 className="text-xl font-semibold text-[#555879]">3. Content Ownership</h2>
            <p className="text-[#555879] text-sm">
              All content remains property of the creators. Do not reproduce or distribute without permission.
            </p>
          </div>

          <div className="bg-[#DED3C4] border border-[#98A1BC] rounded-xl p-5 space-y-3 shadow">
            <h2 className="text-xl font-semibold text-[#555879]">4. Changes to Terms</h2>
            <p className="text-[#555879] text-sm">
              We may update our terms at any time. Continued use indicates acceptance of any changes.
            </p>
          </div>
        </div>

        {/* Agreement Card */}
        <div className="flex justify-center mt-6">
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Term;
