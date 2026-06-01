import React, { useState } from 'react';
import { 
  ChevronDown, ShieldCheck, Wallet, PieChart, Lock, Globe, Plane, Wifi, Landmark, 
  ShoppingCart, Smartphone, RefreshCw, Bell, AlertTriangle, CreditCard, Key, Search,
  CheckCircle2, Headphones, RotateCcw, ArrowRight, Check, Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const CardControls = () => {
  const [controls, setControls] = useState({
    block: false,
    online: true,
    international: true,
    contactless: true,
    atm: true,
    ecommerce: true,
    tapToPay: true,
    recurring: true,
    alerts: true
  });

  // Dummy cards for dropdown selector with specific financial values
  const cardsList = [
    { id: 'visa', name: 'Visa Signature', number: '•••• •••• •••• 4567', limit: 100000, used: 25430.75, type: 'VISA', bg: 'bg-blue-900', border: 'border-blue-800' },
    { id: 'mastercard', name: 'Mastercard World', number: '•••• •••• •••• 8901', limit: 250000, used: 50000.00, type: 'MC', bg: 'bg-[#FF5F00]', border: 'border-orange-600' },
    { id: 'amex', name: 'Amex Platinum', number: '•••• •••• •••• 3002', limit: 500000, used: 125000.00, type: 'AMEX', bg: 'bg-teal-900', border: 'border-teal-800' }
  ];

  const [activeCard, setActiveCard] = useState(cardsList[0]);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);

  // Spend limit states mapping to dynamic ranges
  const [limits, setLimits] = useState({
    overall: 70000,
    daily: 15000,
    online: 25000,
    international: 50000,
    atm: 10000
  });

  const totalLimit = activeCard.limit;
  const usedAmount = activeCard.used;
  const availableAmount = totalLimit - usedAmount;
  const utilizationPercent = Math.round((usedAmount / totalLimit) * 100);

  const handleToggle = (key) => {
    setControls(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      if (key === 'block') {
        if (updated.block) {
          toast.error('Your credit card has been temporarily BLOCKED.');
        } else {
          toast.success('Your credit card has been UNBLOCKED.');
        }
      } else {
        toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} setting updated successfully!`);
      }
      return updated;
    });
  };

  const handleLimitChange = (key, value) => {
    const numeric = parseInt(value) || 0;
    setLimits(prev => ({ ...prev, [key]: numeric }));
  };

  const saveLimit = () => {
    toast.success('Spending limit updated successfully!');
  };

  const resetAllLimits = () => {
    setLimits({
      overall: Math.round(totalLimit * 0.7),
      daily: Math.round(totalLimit * 0.15),
      online: Math.round(totalLimit * 0.25),
      international: Math.round(totalLimit * 0.5),
      atm: Math.round(totalLimit * 0.1)
    });
    toast.success('Spending limits reset to default recommendations.');
  };

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Card Controls</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Card Controls</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage your card usage, security settings and spending limits</p>
        </div>
        
        {/* Dynamic Card Selection Dropdown */}
        <div className="relative z-30">
          <div 
            onClick={() => setCardDropdownOpen(!cardDropdownOpen)}
            className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl p-2.5 flex items-center gap-3 cursor-pointer shadow-sm hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-[#00E5FF]/5 transition-all duration-300 active:scale-[0.98] global-card"
          >
            <div className={`w-12 h-7 ${activeCard.bg} rounded-[4px] relative overflow-hidden flex items-center justify-center border ${activeCard.border} shrink-0 shadow-sm`}>
               <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
               <div className="text-[6px] font-bold text-white relative z-10 font-mono tracking-widest">{activeCard.type}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{activeCard.number}</p>
              <p className="text-[10px] text-gray-500 font-medium">{activeCard.name}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 transition-transform duration-300 ${cardDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {cardDropdownOpen && (
            <>
              {/* Dropdown Clickaway Backdrop */}
              <div className="fixed inset-0 z-45 cursor-default" onClick={() => setCardDropdownOpen(false)}></div>
              
              <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-[#071426]/95 backdrop-blur-2xl border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl py-2 animate-fade-in z-50 global-card">
                <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase px-4 py-1.5 tracking-wider border-b border-gray-100 dark:border-white/5 mb-1">Select Credit Card</p>
                {cardsList.map((card) => (
                  <div 
                    key={card.id}
                    onClick={() => {
                      setActiveCard(card);
                      setCardDropdownOpen(false);
                      toast.success(`Switched to ${card.name}`);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-[#0A0F1D]/50 ${activeCard.id === card.id ? 'bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-[#00E5FF]' : 'text-gray-700 dark:text-gray-300'}`}
                  >
                    <div className={`w-10 h-6 ${card.bg} rounded-[3px] relative overflow-hidden flex items-center justify-center border ${card.border} shrink-0 shadow-sm`}>
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
                      <div className="text-[5px] font-bold text-white relative z-10 font-mono tracking-widest">{card.type}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate leading-tight">{card.name}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate">{card.number}</p>
                    </div>
                    {activeCard.id === card.id && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-[#00E5FF] shrink-0" />}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Column - Main Content */}
        <div className="xl:w-[75%] space-y-6">
          
          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card Status */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-[#00E5FF]/5 transition-all duration-300 global-card">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${controls.block ? 'bg-red-50 dark:bg-red-950/20 text-red-600 border-red-600/25' : 'bg-green-50 dark:bg-green-950/20 text-green-600 border-green-600/25'}`}>
                 <ShieldCheck className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Card Status</p>
                <h4 className={`font-extrabold text-xl mb-0.5 ${controls.block ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>{controls.block ? 'Blocked' : 'Active'}</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{controls.block ? 'Card is locked and cannot be used.' : 'Your card is active and ready to use.'}</p>
              </div>
            </div>

            {/* Available Credit */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-[#00E5FF]/5 transition-all duration-300 global-card">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-[#00E5FF] flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-500/10">
                 <Wallet className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Available Credit</p>
                <h4 className="font-extrabold text-xl text-gray-900 dark:text-white mb-0.5">₹ {availableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold">Limit: ₹ {totalLimit.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Credit Utilization */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-5 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-[#00E5FF]/5 transition-all duration-300 relative overflow-hidden global-card">
              <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full text-gray-100 dark:text-gray-800">
                    <path className="stroke-current" fill="none" strokeWidth="4" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <svg viewBox="0 0 36 36" className="w-full h-full absolute inset-0 text-teal-500 dark:text-[#00E5FF] transform -rotate-90 transition-all duration-500">
                    <path className="stroke-current" strokeDasharray={`${utilizationPercent}, 100`} fill="none" strokeWidth="4" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute text-[11px] font-black text-gray-800 dark:text-white">{utilizationPercent}%</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Credit Utilization</p>
                <h4 className="font-extrabold text-xl text-gray-900 dark:text-white mb-0.5">₹ {usedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Used</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-405 font-bold">Available: ₹ {availableAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Main Controls Toggles */}
            <div className="lg:w-1/2 bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.002] transition-transform duration-300 global-card">
              <h3 className="font-bold text-[15px] mb-6 flex items-center gap-2">Card Controls <ShieldCheck className="w-4 h-4 text-blue-500 dark:text-[#00E5FF]"/></h3>
              <div className="space-y-1">
                {[
                  { key: 'block', label: 'Block / Unblock Card', desc: 'Temporarily block or unblock your card', icon: Lock, color: 'text-red-500 bg-red-50 dark:bg-red-950/20 dark:text-red-400' },
                  { key: 'online', label: 'Online Transactions', desc: 'Enable or disable online payments', icon: Globe, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-400' },
                  { key: 'international', label: 'International Usage', desc: 'Enable or disable international transactions', icon: Plane, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 dark:text-indigo-400' },
                  { key: 'contactless', label: 'Contactless Payments', desc: 'Enable or disable tap & pay / contactless payments', icon: Wifi, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400' },
                  { key: 'atm', label: 'ATM Transactions', desc: 'Enable or disable ATM cash withdrawals', icon: Landmark, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/20 dark:text-teal-400' },
                  { key: 'ecommerce', label: 'E-commerce Transactions', desc: 'Enable or disable e-commerce transactions', icon: ShoppingCart, color: 'text-green-500 bg-green-50 dark:bg-green-950/20 dark:text-green-400' },
                  { key: 'tapToPay', label: 'Tap to Pay', desc: 'Enable or disable Tap to Pay on supported devices', icon: Smartphone, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20 dark:text-purple-400' },
                  { key: 'recurring', label: 'Recurring Payments', desc: 'Allow or block recurring/auto debit payments', icon: RefreshCw, color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/20 dark:text-pink-400' },
                  { key: 'alerts', label: 'Transaction Alerts', desc: 'Receive real-time alerts for transactions', icon: Bell, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 dark:text-yellow-400' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#0A0F1D]/55 rounded-2xl transition-all duration-300 hover:scale-[1.015] hover:shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color} border border-gray-100 dark:border-white/5`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.label}</h4>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <div 
                      onClick={() => handleToggle(item.key)}
                      className={`w-11 h-6 rounded-full p-1 cursor-pointer transition-colors relative flex items-center ${controls[item.key] ? 'bg-gradient-to-r from-teal-400 to-emerald-500 dark:from-[#00E5FF] dark:to-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.25)]' : 'bg-gray-200 dark:bg-gray-700'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 transform ${controls[item.key] ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 dark:text-[#00E5FF]" /> Settings are updated instantly and applied in real-time.
              </div>
            </div>

            {/* Spending Limits */}
            <div className="lg:w-1/2 bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.002] transition-transform duration-300 global-card">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                 <h3 className="font-bold text-[15px] flex items-center gap-2">Spending Limits <Wallet className="w-4 h-4 text-blue-500 dark:text-[#00E5FF]"/></h3>
                 <button onClick={resetAllLimits} className="text-xs font-bold text-blue-600 dark:text-[#00E5FF] hover:underline flex items-center gap-1 hover:scale-[1.03] active:scale-[0.97] transition-all">Reset Limits <RotateCcw className="w-3 h-3" /></button>
              </div>

              <div className="space-y-8">
                {[
                  { key: 'overall', label: 'Overall Spending Limit', desc: 'Set the total amount you can spend', min: 10000, max: totalLimit },
                  { key: 'daily', label: 'Daily Transaction Limit', desc: 'Set your daily spending limit', min: 1000, max: Math.round(totalLimit * 0.5) },
                  { key: 'online', label: 'Online Transaction Limit', desc: 'Set the maximum amount for online transactions', min: 1000, max: Math.round(totalLimit * 0.5) },
                  { key: 'international', label: 'International Transaction Limit', desc: 'Set the maximum amount for international transactions', min: 1000, max: totalLimit },
                  { key: 'atm', label: 'ATM Withdrawal Limit (Daily)', desc: 'Set the daily limit for ATM cash withdrawals', min: 1000, max: Math.round(totalLimit * 0.2) }
                ].map((limit) => {
                   const percent = ((limits[limit.key] - limit.min) / (limit.max - limit.min)) * 100;
                   
                   return (
                    <div key={limit.key} className="hover:scale-[1.01] transition-transform duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="pr-4">
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white">{limit.label}</h4>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{limit.desc}</p>
                        </div>
                        <div className="flex items-center gap-1 border border-gray-100 dark:border-white/5 rounded-xl px-3 py-1.5 bg-gray-50/50 dark:bg-[#0A0F1D]/40 focus-within:border-teal-500 dark:focus-within:border-[#00E5FF] transition-all hover:scale-[1.03]">
                          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">₹</span>
                          <input 
                            type="number" 
                            value={limits[limit.key] || 0} 
                            onChange={(e) => handleLimitChange(limit.key, e.target.value)}
                            onBlur={saveLimit}
                            className="w-20 bg-transparent outline-none text-xs font-extrabold text-gray-900 dark:text-white text-right placeholder-gray-300"
                          />
                        </div>
                      </div>
                      
                      <div className="relative pt-1 cursor-pointer">
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div style={{ width: `${percent}%` }} className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 dark:from-[#00E5FF] dark:to-cyan-400 rounded-full"></div>
                        </div>
                        <input 
                          type="range" 
                          min={limit.min} 
                          max={limit.max} 
                          value={limits[limit.key] || limit.min} 
                          onChange={(e) => handleLimitChange(limit.key, e.target.value)}
                          onMouseUp={saveLimit}
                          className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
                        />
                        <div 
                           className="absolute top-0.5 w-4 h-4 bg-white border-2 border-teal-500 dark:border-[#00E5FF] rounded-full shadow-md pointer-events-none transform -translate-x-1/2 -mt-1 hover:scale-110 transition-transform global-card"
                           style={{ left: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[9px] font-bold text-gray-400 dark:text-gray-500 mt-2">
                        <span>₹ {limit.min.toLocaleString()}</span>
                        <span>₹ {limit.max.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
          
          {/* Bottom Trust Indicators */}
          <div className="flex flex-wrap justify-between gap-6 py-6 border-t border-gray-100 dark:border-white/5 mt-8 text-left">
             {[
               { icon: RefreshCw, label: "Instant Updates", sub: "All changes reflect instantly" },
               { icon: ShieldCheck, label: "100% Secure", sub: "Bank-grade security" },
               { icon: Lock, label: "You're in Control", sub: "Enable only what you need" },
               { icon: Headphones, label: "24x7 Support", sub: "We're here to help" }
             ].map((item, i) => (
               <div key={i} className="flex gap-3 text-gray-500 dark:text-gray-400 flex-1 min-w-[150px] hover:scale-[1.03] transition-transform duration-200 cursor-pointer">
                 <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-[#0A0F1D]/50 flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5 shadow-sm">
                    <item.icon className="w-4 h-4 text-blue-600 dark:text-[#00E5FF]" />
                 </div>
                 <div>
                   <span className="block text-[11px] font-bold text-gray-900 dark:text-gray-300">{item.label}</span>
                   <span className="block text-[9px] mt-0.5">{item.sub}</span>
                 </div>
               </div>
             ))}
          </div>

        </div>

        {/* Right Column - Help & Security widgets */}
        <div className="xl:w-[25%] space-y-6">
          
          {/* Security Tips */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.015] hover:shadow-md transition-all duration-300 global-card">
            <h3 className="font-bold text-[15px] mb-6">Security Tips</h3>
            
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/20 rounded-2xl flex items-center justify-center border border-blue-100 dark:border-blue-600/20 shadow-inner hover:scale-[1.05] transition-transform">
                <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-[#00E5FF] animate-pulse" />
              </div>
            </div>

            <ul className="space-y-3.5 mb-6">
              {['Keep your card details confidential', 'Enable only the controls you need', 'Monitor your transactions regularly', 'Report any suspicious activity'].map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[11px] font-semibold text-gray-600 dark:text-gray-405 leading-normal">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>

            <button className="w-full text-center text-xs font-bold text-blue-600 dark:text-[#00E5FF] hover:underline flex items-center justify-center gap-1 hover:scale-[1.02] active:scale-[0.98] transition-all">
              View All Tips <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.015] hover:shadow-md transition-all duration-300 global-card">
            <h3 className="font-bold text-[15px] mb-4">Quick Actions</h3>
            <div className="space-y-2.5">
              {[
                { label: "Report Lost or Stolen Card", icon: AlertTriangle, color: 'text-red-500 bg-red-500/10' },
                { label: "Manage PIN", icon: Key, color: 'text-blue-500 bg-blue-500/10' },
                { label: "Set Transaction Alerts", icon: Bell, color: 'text-orange-500 bg-orange-500/10' },
                { label: "View Card Details", icon: CreditCard, color: 'text-green-500 bg-green-500/10' }
              ].map((link, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#0A0F1D]/55 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.015] group">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5 ${link.color}`}>
                      <link.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold group-hover:text-blue-600 dark:group-hover:text-[#00E5FF] transition-colors">{link.label}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90 group-hover:translate-x-1 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF] transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Travel Promo */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-3xl p-6 shadow-lg shadow-blue-500/10 border border-blue-500/20 relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
             <div className="relative z-10 w-2/3">
               <h3 className="font-extrabold text-[16px] text-white mb-2 leading-tight">Traveling abroad?</h3>
               <p className="text-[10px] text-blue-100/90 mb-6 leading-relaxed">Enable International Usage before you travel for a seamless experience.</p>
               <button className="bg-white text-blue-700 font-extrabold py-2 px-5 rounded-xl shadow-md hover:scale-[1.03] active:scale-[0.97] transition-transform text-xs global-card">
                 Enable Now
               </button>
             </div>
             
             {/* Simple plane/travel illustration mock */}
             <div className="absolute right-[-10px] bottom-[-10px] w-28 h-28 opacity-80 pointer-events-none">
               <Plane className="w-12 h-12 text-white/30 absolute top-2 right-2 transform rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-700" />
               <div className="w-16 h-20 bg-blue-500/40 absolute bottom-[-10px] right-4 rounded-t-xl border-4 border-blue-500/20">
                 <div className="w-10 h-2 bg-blue-600 absolute -top-3 left-2 rounded-full"></div>
                 <div className="w-full h-3 bg-white/20 mt-2"></div>
                 <div className="w-full h-3 bg-white/20 mt-2"></div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardControls;
