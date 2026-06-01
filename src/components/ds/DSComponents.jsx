import React, { useState } from 'react';
import { Search, Eye, EyeOff, ChevronDown, Upload, Check, ToggleRight, ToggleLeft, CreditCard, TrendingUp, Gift, ArrowRight } from 'lucide-react';

const Section = ({ title, sub, children }) => (
  <div className="mb-12">
    <div className="mb-6">
      <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{title}</h2>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
    {children}
  </div>
);

export default function DSComponents() {
  const [showPass, setShowPass] = useState(false);
  const [tog1, setTog1] = useState(true);
  const [tog2, setTog2] = useState(false);
  const [tog3, setTog3] = useState(true);

  return (
    <div>
      {/* Buttons */}
      <Section title="Button System" sub="All button variants, sizes, and states">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-6">
          {/* Primary */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Primary Buttons</p>
            <div className="flex flex-wrap gap-3 items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">Pay Now</button>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition-all flex items-center gap-2">Submit Request <ArrowRight className="w-4 h-4"/></button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-md transition-all">Confirm EMI</button>
              <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-xs shadow-sm">Small</button>
              <button disabled className="bg-blue-300 text-white font-bold py-3 px-6 rounded-xl text-sm cursor-not-allowed opacity-60">Disabled</button>
              <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl text-sm flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Processing...
              </button>
            </div>
          </div>
          {/* Secondary & Ghost */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Secondary & Ghost</p>
            <div className="flex flex-wrap gap-3 items-center">
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-xl text-sm transition-colors">View Details</button>
              <button className="border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold py-3 px-6 rounded-xl text-sm transition-colors">Cancel</button>
              <button className="text-blue-600 hover:underline font-bold text-sm transition-colors">View All →</button>
              <button className="border border-red-200 text-red-600 hover:bg-red-50 font-bold py-3 px-6 rounded-xl text-sm transition-colors">Block Card</button>
            </div>
          </div>
          {/* FAB + Sticky */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Floating & Mobile CTAs</p>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/40 flex items-center justify-center text-white border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6"/>
              </div>
              <div className="w-full md:w-72 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg cursor-pointer hover:-translate-y-0.5 transition-transform">
                <span className="font-bold text-sm">Pay Outstanding ₹25,430</span>
                <ArrowRight className="w-5 h-5"/>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Inputs */}
      <Section title="Input Components" sub="Form fields, validation states, and specialized inputs">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Text */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-1.5">Default Input</label>
            <input placeholder="Enter full name" className="w-full border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"/>
          </div>
          {/* Password */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-1.5">Password Field</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" className="w-full border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"/>
              <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors">
                {showPass ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
              </button>
            </div>
          </div>
          {/* Search */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-1.5">Search Bar</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
              <input placeholder="Search transactions..." className="w-full border border-gray-100 dark:border-gray-700 rounded-full px-4 py-3 pl-11 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"/>
            </div>
          </div>
          {/* Success */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-1.5">Success State</label>
            <div className="relative">
              <input defaultValue="rahul@email.com" className="w-full border border-green-400 rounded-xl px-4 py-3 pr-12 text-sm bg-green-50 dark:bg-green-900/10 text-gray-900 dark:text-white outline-none"/>
              <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500"/>
            </div>
            <p className="text-[10px] text-green-600 font-bold mt-1">✓ Email verified</p>
          </div>
          {/* Error */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-1.5">Error State</label>
            <input defaultValue="invalid-pan" className="w-full border border-red-400 rounded-xl px-4 py-3 text-sm bg-red-50 dark:bg-red-900/10 text-gray-900 dark:text-white outline-none"/>
            <p className="text-[10px] text-red-500 font-bold mt-1">✗ Invalid PAN format</p>
          </div>
          {/* Dropdown */}
          <div>
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-1.5">Dropdown</label>
            <div className="relative">
              <select className="w-full border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 text-sm outline-none appearance-none bg-white dark:bg-gray-900 text-gray-700 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer">
                <option>Billing & Statement</option>
                <option>Card Services</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
            </div>
          </div>
          {/* OTP */}
          <div className="col-span-full">
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-1.5">OTP Input</label>
            <div className="flex gap-3">
              {[1,2,3,4,5,6].map(i => (
                <input key={i} maxLength={1} defaultValue={i <= 3 ? '•' : ''} className={`w-12 h-14 text-center border-2 rounded-xl text-lg font-black outline-none transition-all ${i === 4 ? 'border-blue-500 ring-4 ring-blue-500/20 shadow-sm' : i <= 3 ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900'}`}/>
              ))}
            </div>
          </div>
          {/* EMI Slider */}
          <div className="col-span-full">
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-2">EMI Range Slider</label>
            <input type="range" min="3" max="24" defaultValue="12" className="w-full h-2 bg-blue-100 rounded-full appearance-none cursor-pointer accent-blue-600"/>
            <div className="flex justify-between text-[10px] text-gray-500 font-medium mt-1"><span>3 months</span><span className="text-blue-600 font-bold">12 months (selected)</span><span>24 months</span></div>
          </div>
          {/* File Upload */}
          <div className="col-span-full">
            <label className="block text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase mb-1.5">File Upload</label>
            <div className="border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors group">
              <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors"/>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400"><span className="text-blue-600 font-bold">Click to upload</span> or drag and drop</p>
              <p className="text-[10px] text-gray-400">PDF, JPG, PNG (Max. 5MB)</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section title="Card System" sub="Reusable card components for all dashboard contexts">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Credit Card Widget */}
          <div className="bg-gradient-to-br from-[#0B1F5E] to-blue-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden min-h-[160px]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"/>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Credit Card</p>
                <p className="text-lg font-extrabold">**** **** **** 4567</p>
              </div>
              <span className="text-[10px] bg-white/20 border border-white/30 px-2 py-0.5 rounded font-bold">VISA</span>
            </div>
            <div className="flex justify-between items-end">
              <div><p className="text-[9px] text-blue-200">Balance</p><p className="font-extrabold">₹1,24,500</p></div>
              <div><p className="text-[9px] text-blue-200">Limit</p><p className="font-extrabold">₹3,00,000</p></div>
            </div>
          </div>
          {/* Analytics Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center border border-blue-100"><TrendingUp className="w-5 h-5 text-blue-600"/></div>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">+12.4%</span>
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Monthly Spending</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">₹45,230</p>
            <div className="mt-3 w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full"><div className="w-3/5 h-full bg-blue-600 rounded-full"/></div>
          </div>
          {/* Reward Card */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <Gift className="w-6 h-6 text-white/80"/>
              <span className="text-[10px] bg-white/20 border border-white/30 px-2 py-0.5 rounded font-bold">PLATINUM</span>
            </div>
            <p className="text-[10px] text-purple-200 font-bold uppercase tracking-widest mb-1">Reward Points</p>
            <p className="text-3xl font-extrabold">12,450</p>
            <p className="text-[10px] text-purple-200 mt-2">≈ ₹1,245 cashback value</p>
          </div>
        </div>
      </Section>

      {/* Toggles */}
      <Section title="Toggles & Switches" sub="Binary control components for settings and preferences">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'International Transactions', desc: 'Allow transactions abroad', val: tog1, set: setTog1, color: 'bg-blue-600' },
              { label: 'Contactless Payments', desc: 'NFC tap-to-pay', val: tog2, set: setTog2, color: 'bg-teal-600' },
              { label: 'Two-Factor Auth', desc: '2FA for all logins', val: tog3, set: setTog3, color: 'bg-green-600' },
            ].map(t => (
              <div key={t.label} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{t.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{t.desc}</p>
                </div>
                <div onClick={() => t.set(!t.val)} className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${t.val ? t.color : 'bg-gray-200 dark:bg-gray-700'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${t.val ? 'left-[22px]' : 'left-0.5'}`}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
