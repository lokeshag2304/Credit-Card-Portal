import React, { useState, useRef } from 'react';
import { 
  ChevronDown, Search, ArrowRight, Plane, Utensils, ShoppingCart, Gift, 
  CreditCard, ShieldCheck, Heart, Lock, Headphones, Award, Star, Filter, Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const Rewards = () => {
  const [filterTab, setFilterTab] = useState('All');
  
  // Dummy cards with reward metrics synced to card selector dropdown
  const cardsList = [
    { 
      id: 'visa', 
      name: 'Visa Signature', 
      number: '•••• •••• •••• 4567', 
      type: 'VISA', 
      bg: 'bg-blue-900', 
      border: 'border-blue-800',
      availablePoints: 12450,
      earnedThisYear: 18320,
      redeemedThisYear: 5870,
      earnedPercent: 24,
      redeemedPercent: 8,
      tier: 'Platinum',
      nextTierPts: 6550,
      nextTierName: 'Diamond',
      progress: 65,
      multiplier: '1.5X'
    },
    { 
      id: 'mastercard', 
      name: 'Mastercard World', 
      number: '•••• •••• •••• 8901', 
      type: 'MC', 
      bg: 'bg-[#FF5F00]', 
      border: 'border-orange-600',
      availablePoints: 32800,
      earnedThisYear: 42500,
      redeemedThisYear: 9700,
      earnedPercent: 32,
      redeemedPercent: 12,
      tier: 'World Elite',
      nextTierPts: 17200,
      nextTierName: 'Infinite',
      progress: 75,
      multiplier: '2.0X'
    },
    { 
      id: 'amex', 
      name: 'Amex Platinum', 
      number: '•••• •••• •••• 3002', 
      type: 'AMEX', 
      bg: 'bg-teal-900', 
      border: 'border-teal-800',
      availablePoints: 78120,
      earnedThisYear: 98400,
      redeemedThisYear: 20280,
      earnedPercent: 45,
      redeemedPercent: 18,
      tier: 'Centurion',
      nextTierPts: 21880,
      nextTierName: 'Super Elite',
      progress: 88,
      multiplier: '3.0X'
    }
  ];

  const [activeCard, setActiveCard] = useState(cardsList[0]);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);

  const carouselRef = useRef(null);

  const handleRedeem = (item) => {
    toast.success(`Successfully redeemed ${item.title}! Check your email for details.`);
  };

  // Scroll function for carousel
  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activityFeed = [
    { id: 1, title: 'Flight Booking - MakeMyTrip', date: '10 May 2024', pts: '+1,200 pts', icon: Plane, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-400', isPositive: true },
    { id: 2, title: 'Dining - Taj Hotels', date: '08 May 2024', pts: '+450 pts', icon: Utensils, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400', isPositive: true },
    { id: 3, title: 'Grocery - Reliance Smart', date: '05 May 2024', pts: '+120 pts', icon: ShoppingCart, color: 'text-green-500 bg-green-50 dark:bg-green-950/20 dark:text-green-400', isPositive: true },
    { id: 4, title: 'Redemption - Amazon Gift Card', date: '02 May 2024', pts: '-2,000 pts', icon: Gift, color: 'text-red-500 bg-red-50 dark:bg-red-950/20 dark:text-red-400', isPositive: false },
    { id: 5, title: 'Credit Card Payment', date: '01 May 2024', pts: '+250 pts', icon: CreditCard, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/20 dark:text-teal-400', isPositive: true },
  ];

  const rewardCards = [
    { id: 1, brand: 'amazon', title: 'Amazon Gift Card', val: '₹500 Value', pts: '2,000 pts', bg: 'bg-gradient-to-br from-gray-900 to-black' },
    { id: 2, brand: 'make my trip', title: 'MakeMyTrip Voucher', val: '₹1,000 Value', pts: '4,000 pts', bg: 'bg-gradient-to-br from-blue-700 to-blue-900' },
    { id: 3, brand: 'TAJ HOTELS', title: 'Taj Hotel Voucher', val: '₹2,000 Value', pts: '8,000 pts', bg: 'bg-gradient-to-br from-[#4A4238] to-[#2C2721]' },
    { id: 4, brand: 'bookmyshow', title: 'BookMyShow Voucher', val: '₹500 Value', pts: '1,500 pts', bg: 'bg-gradient-to-br from-[#E23340] to-[#9B1E29]' },
    { id: 5, brand: 'Flipkart', title: 'Flipkart Gift Card', val: '₹1,000 Value', pts: '4,000 pts', bg: 'bg-gradient-to-br from-blue-600 to-blue-800' },
    { id: 6, brand: 'Uber', title: 'Uber Voucher', val: '₹750 Value', pts: '3,000 pts', bg: 'bg-gradient-to-br from-gray-800 to-black' },
  ];

  // Calculated values based on selected card
  const availableValue = activeCard.availablePoints * 0.25;

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Rewards</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Rewards & Points</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Track your points, explore exciting rewards and redeem instantly.</p>
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

      <div className="space-y-6">
        
        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Available Points Hero Card */}
          <div className="bg-gradient-to-br from-[#6A1B9A] via-[#8E24AA] to-[#AB47BC] rounded-3xl p-6 shadow-lg shadow-purple-500/20 text-white relative overflow-hidden flex flex-col justify-between group hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
             {/* Abstract background elements */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
             <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-purple-900/40 rounded-full blur-xl"></div>
             
             <div className="relative z-10 flex justify-between items-start mb-4">
               <div>
                 <p className="text-[11px] font-bold text-purple-100 mb-1 tracking-wide uppercase">Available Points</p>
                 <h2 className="text-4xl font-extrabold tracking-tight">{activeCard.availablePoints.toLocaleString()}</h2>
                 <p className="text-[10px] text-purple-200 mt-1 font-bold">Equals ₹{availableValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })} in value</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0">
                 <Award className="w-6 h-6 text-white" />
               </div>
             </div>
             
             <button className="relative z-10 bg-white/25 hover:bg-white/35 backdrop-blur-md border border-white/30 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all self-start flex items-center gap-2 group-hover:pl-7 group-hover:pr-5 active:scale-[0.95]">
               Redeem Now <ArrowRight className="w-4 h-4" />
             </button>
          </div>

          {/* Points Summary */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between global-card">
            <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-4">Points Summary</h4>
            <div className="flex justify-between items-end gap-2">
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Earned This Year</p>
                <h3 className="text-xl font-extrabold text-green-600 dark:text-green-400 mb-1 whitespace-nowrap">{activeCard.earnedThisYear.toLocaleString()} pts</h3>
                <p className="text-[9px] font-bold text-green-600 bg-green-50 dark:bg-green-950/40 inline-block px-1.5 py-0.5 rounded whitespace-nowrap">↑ {activeCard.earnedPercent}% vs last yr</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Redeemed This Year</p>
                <h3 className="text-xl font-extrabold text-red-500 dark:text-red-400 mb-1 whitespace-nowrap">{activeCard.redeemedThisYear.toLocaleString()} pts</h3>
                <p className="text-[9px] font-bold text-red-500 bg-red-50 dark:bg-red-950/40 inline-block px-1.5 py-0.5 rounded whitespace-nowrap">↑ {activeCard.redeemedPercent}% vs last yr</p>
              </div>
            </div>
          </div>

          {/* Points Value */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 relative overflow-hidden flex flex-col justify-between global-card">
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-1">Points Value</h4>
              <p className="text-[11px] font-extrabold text-gray-700 dark:text-gray-300">1 Point = ₹0.25</p>
            </div>
            
            <div className="mt-4">
              <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">Redeemable Value</p>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">₹{availableValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h3>
            </div>

            {/* Illustration Mock */}
            <div className="absolute right-0 bottom-0 w-24 h-24 opacity-80 pointer-events-none flex items-end justify-end p-2">
               <div className="relative w-12 h-12">
                 <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-500/20 blur-md"></div>
                 <div className="absolute bottom-0 right-3 w-8 h-8 rounded-full bg-blue-500 border-2 border-blue-400 flex items-center justify-center shadow-lg transform -rotate-12 z-10"><Star className="w-3.5 h-3.5 text-white fill-current"/></div>
                 <div className="absolute bottom-3 right-0 w-8 h-8 rounded-full bg-indigo-500 border-2 border-indigo-400 flex items-center justify-center shadow-lg transform rotate-12 z-20"><Star className="w-3.5 h-3.5 text-white fill-current"/></div>
               </div>
            </div>
          </div>

          {/* Tier Status */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between global-card">
             <div className="flex justify-between items-start mb-2">
               <div>
                 <h4 className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-1">Tier Status</h4>
                 <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-0.5">{activeCard.tier}</h2>
                 <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold">You are earning {activeCard.multiplier} points</p>
               </div>
               <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-[#0A0F1D]/55 flex items-center justify-center border border-gray-100 dark:border-white/5 shrink-0 shadow-sm">
                 <Award className="w-5 h-5 text-blue-600 dark:text-[#00E5FF]" />
               </div>
             </div>
             
             <div className="mt-2">
                 <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
                   <div className="h-full bg-blue-600 dark:bg-[#00E5FF] rounded-full transition-all duration-500" style={{ width: `${activeCard.progress}%` }}></div>
                 </div>
                 <p className="text-[9px] font-bold text-gray-500 dark:text-gray-400">{activeCard.nextTierPts.toLocaleString()} pts to reach {activeCard.nextTierName}</p>
             </div>
          </div>

        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Points Activity */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.002] transition-transform duration-300 lg:col-span-1 global-card">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
              <h3 className="font-bold text-[15px] flex items-center gap-2">Recent Points Activity <Gift className="w-4 h-4 text-blue-500 dark:text-[#00E5FF]"/></h3>
              <button className="text-xs font-bold text-blue-600 dark:text-[#00E5FF] hover:underline">View All</button>
            </div>
            <div className="space-y-3.5">
              {activityFeed.map((item) => (
                <div key={item.id} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0A0F1D]/50 p-2 -mx-2 rounded-2xl transition-all hover:scale-[1.01] hover:shadow-sm">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5 ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white truncate">{item.title}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{item.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold whitespace-nowrap ${item.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                    {item.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Earning Breakdown */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.002] transition-transform duration-300 lg:col-span-1 global-card">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
              <h3 className="font-bold text-[15px] flex items-center gap-2">Earning Breakdown <Star className="w-4 h-4 text-blue-500 dark:text-[#00E5FF]"/></h3>
              <span className="text-xs font-bold bg-gray-50 dark:bg-[#0A0F1D]/60 hover:bg-gray-100 dark:hover:bg-[#0A0F1D]/80 px-3 py-1 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer select-none active:scale-[0.98] transition-transform">This Year ▼</span>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="15" className="dark:stroke-gray-800" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366F1" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="163" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="183" transform="rotate(126 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="208" transform="rotate(223 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#14B8A6" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="218" transform="rotate(284 50 50)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                  <span className="font-black text-xs text-gray-900 dark:text-white leading-tight">{(activeCard.earnedThisYear).toLocaleString()} pts</span>
                  <span className="text-[8px] text-gray-500 dark:text-gray-400 font-bold mt-0.5 uppercase tracking-wide">Total Earned</span>
                </div>
              </div>

              {/* SQUEEZE PROOF LEGEND */}
              <div className="space-y-3 w-full border-t border-gray-100 dark:border-white/5 pt-4">
                {[
                  { name: "Online Shopping", pts: "6,420 pts", pct: "35%", color: "bg-indigo-500" },
                  { name: "Travel", pts: "4,860 pts", pct: "27%", color: "bg-blue-500" },
                  { name: "Dining", pts: "3,120 pts", pct: "17%", color: "bg-amber-500" },
                  { name: "Groceries", pts: "2,450 pts", pct: "13%", color: "bg-teal-500" },
                  { name: "Others", pts: "1,470 pts", pct: "8%", color: "bg-gray-400" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] font-bold gap-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 min-w-0 flex-1">
                      <span className={`w-2 h-2 rounded-full ${item.color} shrink-0`}></span>
                      <span className="truncate leading-none">{item.name}</span>
                    </div>
                    <span className="text-gray-950 dark:text-white whitespace-nowrap shrink-0 leading-none">{item.pts}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-right w-8 shrink-0 leading-none">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unlock More Rewards Promo */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-3xl p-6 shadow-lg shadow-blue-500/10 border border-blue-500/20 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.015] active:scale-[0.98] transition-all duration-300">
            <div className="relative z-10">
              <h3 className="font-extrabold text-[16px] text-white mb-2 leading-tight">Unlock More Rewards!</h3>
              <p className="text-xs text-blue-100/90 mb-6 w-3/4 leading-relaxed">Explore exclusive offers and earn up to 5X points.</p>
              <button className="bg-white text-blue-700 font-extrabold py-2.5 px-6 rounded-xl transition-all shadow-md text-xs hover:scale-[1.03] active:scale-[0.97] global-card">
                Explore Offers
              </button>
            </div>
            {/* Gift Illustration Mock */}
            <div className="absolute bottom-[-10px] right-[-10px] w-32 h-32 pointer-events-none opacity-90">
               <div className="relative w-full h-full">
                 <div className="absolute bottom-4 right-4 w-20 h-16 bg-indigo-500/40 rounded-md border border-indigo-500/20 shadow-lg transform rotate-3"></div>
                 <div className="absolute bottom-6 right-6 w-20 h-16 bg-white/10 backdrop-blur-sm rounded-md border border-white/20 shadow-xl flex items-center justify-center global-card">
                    <div className="w-full h-2.5 bg-yellow-400/80"></div>
                    <div className="h-full w-2.5 bg-yellow-400/80 absolute"></div>
                 </div>
                 <div className="absolute bottom-16 right-10 flex text-yellow-400 font-bold text-2xl drop-shadow-md">
                   <div className="transform -rotate-12 animate-bounce">★</div>
                   <div className="transform translate-y-[-10px] rotate-12 scale-75 opacity-70">★</div>
                 </div>
               </div>
            </div>
          </div>

        </div>

        {/* Redeem Rewards Section */}
        <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.001] transition-transform duration-350 global-card">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
             <h3 className="font-bold text-lg">Redeem Rewards</h3>
             <div className="relative flex items-center w-full sm:w-auto">
               <input type="text" placeholder="Search rewards..." className="w-full sm:w-64 border border-gray-100 dark:border-white/5 rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold outline-none focus:border-blue-500 dark:focus:border-[#00E5FF] dark:bg-[#0A0F1D]/55 transition-colors" />
               <Search className="w-4 h-4 text-gray-400 absolute right-4" />
             </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar mb-2">
            {['All', 'Gift Cards', 'Travel', 'Shopping', 'Dining', 'Experiences', 'Entertainment', 'Vouchers'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all hover:scale-[1.03] active:scale-[0.97] ${filterTab === tab ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' : 'border border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#0A0F1D]/55'}`}
              >
                {tab}
              </button>
            ))}
            <button className="ml-auto px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#0A0F1D]/55 active:scale-[0.97] transition-transform">
              <Filter className="w-3.5 h-3.5"/> Filter
            </button>
          </div>

          {/* Rewards Carousel Container with Functional scroll */}
          <div className="relative group/carousel">
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto custom-scrollbar pb-6 pt-2 snap-x scroll-smooth scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {rewardCards.map((reward) => (
                <div key={reward.id} className="min-w-[260px] max-w-[260px] bg-white dark:bg-[#081324] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-[#00E5FF]/5 transition-all duration-300 transform hover:-translate-y-1.5 snap-start group overflow-hidden global-card">
                  {/* Card Banner */}
                  <div className={`h-32 ${reward.bg} p-4 flex flex-col justify-center items-center text-center relative overflow-hidden`}>
                    <h3 className="text-white font-black text-2xl tracking-tighter drop-shadow-md z-10 transition-transform group-hover:scale-100 duration-300">{reward.brand}</h3>
                    {/* Abstract overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  {/* Card Details */}
                  <div className="p-4 flex flex-col justify-between h-36">
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-900 dark:text-white mb-1">{reward.title}</h4>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold text-gray-400 line-through">₹500 Value</span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{reward.val}</span>
                        <span className="text-xs font-black text-blue-600 dark:text-[#00E5FF]">{reward.pts}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRedeem(reward)}
                      className="w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:!text-white dark:bg-blue-900/30 dark:text-[#00E5FF] dark:hover:bg-blue-600 dark:hover:!text-white font-extrabold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1 active:scale-[0.97]"
                    >
                      Redeem Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Functional Left Scroll Button */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/95 dark:bg-[#071426]/95 backdrop-blur-xl rounded-full shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-blue-600 dark:hover:text-[#00E5FF] transition-all -translate-x-4 z-10 hover:scale-110 active:scale-95 opacity-0 group-hover/carousel:opacity-100 global-card"
            >
              <ChevronDown className="w-5 h-5 transform rotate-90" />
            </button>

            {/* Functional Right Scroll Button */}
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/95 dark:bg-[#071426]/95 backdrop-blur-xl rounded-full shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-blue-600 dark:hover:text-[#00E5FF] transition-all translate-x-4 z-10 hover:scale-110 active:scale-95 opacity-0 group-hover/carousel:opacity-100 global-card"
            >
              <ChevronDown className="w-5 h-5 transform -rotate-90" />
            </button>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="flex flex-wrap justify-between gap-6 py-6 border-t border-gray-100 dark:border-white/5 mt-8 text-left">
             {[
               { icon: Gift, label: "Easy Redemption", sub: "Instant & hassle-free redemption process" },
               { icon: Heart, label: "Best Value", sub: "Get the best value for your reward points" },
               { icon: ShieldCheck, label: "Secure Transactions", sub: "100% safe and secure redemption" },
               { icon: Headphones, label: "24x7 Support", sub: "Need help? We're here for you" }
             ].map((item, i) => (
               <div key={i} className="flex gap-4 text-gray-500 dark:text-gray-400 flex-1 min-w-[200px] hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                 <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#0A0F1D]/55 flex items-center justify-center shrink-0 border border-gray-100 dark:border-white/5 shadow-sm">
                    <item.icon className="w-5 h-5 text-blue-600 dark:text-[#00E5FF]" />
                 </div>
                 <div>
                   <span className="block text-xs font-bold text-gray-900 dark:text-gray-300 mb-0.5">{item.label}</span>
                   <span className="block text-[10px] text-gray-500 dark:text-gray-400 leading-tight">{item.sub}</span>
                 </div>
               </div>
             ))}
        </div>

      </div>
    </div>
  );
};

export default Rewards;
