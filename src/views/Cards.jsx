import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, ShieldCheck, TrendingUp, BellRing, Plus, Wifi, Star, Sparkles, Globe, RefreshCcw, Nfc } from 'lucide-react';

const CreditCardMock = ({ type, number, holder, validThru, isActive, gradient, scale = "scale-100", activeHighlight = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`relative ${gradient} rounded-[2rem] p-6 lg:p-8 text-white shadow-xl transition-all duration-500 ${scale} ${activeHighlight ? 'z-10 shadow-blue-900/30 ring-4 ring-blue-500/20' : 'opacity-60 hover:opacity-100 cursor-pointer'}`}

  >
    {/* Abstract waves */}
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none opacity-20">
      <svg viewBox="0 0 800 800" className="w-[150%] h-[150%] transform -translate-x-[10%] -translate-y-[20%]">
        <path d="M400,100 C565.685425,100 700,234.314575 700,400 C700,565.685425 565.685425,700 400,700 C234.314575,700 100,565.685425 100,400 C100,234.314575 234.314575,100 400,100 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 15"></path>
        <path d="M400,150 C538.071187,150 650,261.928813 650,400 C650,538.071187 538.071187,650 400,650 C261.928813,650 150,538.071187 150,400 C150,261.928813 261.928813,150 400,150 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 10"></path>
      </svg>
    </div>
    
    <div className="relative z-10 flex justify-between items-start mb-6 xs:mb-10">
      <div className="flex flex-col gap-1">
        <div className="w-10 h-7 xs:w-12 xs:h-8 bg-yellow-400/80 rounded-md border border-yellow-300/50 shadow-inner flex items-center justify-center opacity-90 overflow-hidden relative">
           <div className="absolute w-full h-[1px] bg-yellow-600/30 top-1/2"></div>
           <div className="absolute h-full w-[1px] bg-yellow-600/30 left-1/3"></div>
           <div className="absolute h-full w-[1px] bg-yellow-600/30 right-1/3"></div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
         <span className="text-xl xs:text-2xl font-black italic tracking-tighter drop-shadow-md leading-none">{type}</span>
         {(type === 'VISA' || type === 'Visa Signature' || type === 'Visa Cashback') && <span className="text-[8px] xs:text-[9px] font-medium tracking-widest uppercase">Signature</span>}
         <Wifi className="w-4 h-4 xs:w-5 xs:h-5 opacity-70 mt-1.5" />
      </div>
    </div>

    <div className="relative z-10 font-mono text-base xs:text-lg sm:text-xl lg:text-[26px] tracking-[0.16em] sm:tracking-[0.25em] mb-6 xs:mb-8 drop-shadow-md text-white font-medium">
      {number}
    </div>

    <div className="relative z-10 flex justify-between items-end gap-2">
      <div>
        <p className="text-[7px] xs:text-[8px] uppercase tracking-widest text-white/70 mb-0.5">Card Holder</p>
        <p className="font-bold tracking-widest uppercase text-xs xs:text-sm drop-shadow-sm truncate max-w-[100px] xs:max-w-none">{holder}</p>
      </div>
      <div className="flex items-center gap-3 xs:gap-5">
        <div>
          <p className="text-[7px] xs:text-[8px] uppercase tracking-widest text-white/70 mb-0.5">Valid</p>
          <p className="font-bold text-xs xs:text-sm tracking-widest drop-shadow-sm">{validThru}</p>
        </div>
        <div className={`px-2 py-0.5 xs:px-3 xs:py-1 rounded-full text-[8px] xs:text-[10px] font-bold shadow-sm backdrop-blur-md border ${isActive ? 'bg-teal-500/20 text-teal-100 border-teal-500/30' : 'bg-gray-500/40 text-gray-200 border-gray-400/30'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </div>
      </div>
    </div>
  </div>
);

const Cards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [primaryId, setPrimaryId] = useState(1);
  const [nfc, setNfc] = useState(true);
  const [intl, setIntl] = useState(true);
  const [autopay, setAutopay] = useState(true);

  const allCards = [
    { id: 1, type: "Visa Signature", num: "**** **** **** 4567", status: "Active", limit: "₹ 1,00,000", avail: "₹ 74,569.25", valid: "05/28", color: "bg-blue-600", gradient: "bg-gradient-to-br from-[#0B1F5E] via-[#123FAF] to-[#1E4ED8] preserve-gradient", shortType: "VISA", holder: "RAHUL SHARMA" },
    { id: 2, type: "Mastercard Platinum", num: "**** **** **** 1234", status: "Active", limit: "₹ 75,000", avail: "₹ 45,230.10", valid: "11/26", color: "bg-purple-600", gradient: "bg-gradient-to-br from-[#4A148C] via-[#6A1B9A] to-[#8E24AA]", shortType: "MasterCard", holder: "RAHUL SHARMA" },
    { id: 3, type: "Visa Cashback", num: "**** **** **** 7890", status: "Inactive", limit: "₹ 50,000", avail: "₹ 0.00", valid: "08/27", color: "bg-gray-800", gradient: "bg-gradient-to-br from-gray-800 via-gray-900 to-black", shortType: "VISA", holder: "RAHUL SHARMA" },
    { id: 4, type: "Mastercard Rewards", num: "**** **** **** 2345", status: "Active", limit: "₹ 50,000", avail: "₹ 12,340.00", valid: "03/29", color: "bg-teal-600", gradient: "bg-gradient-to-br from-[#0F5A47] via-[#147D62] to-[#1BAC84]", shortType: "MasterCard", holder: "RAHUL SHARMA" }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allCards.length) % allCards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allCards.length);
  };

  const leftCard = allCards[(currentIndex - 1 + allCards.length) % allCards.length];
  const centerCard = allCards[currentIndex];
  const rightCard = allCards[(currentIndex + 1) % allCards.length];

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">My Cards</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">My Cards</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage your cards, view details and track usage.</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          View Add-on Cards <ChevronRight className="w-4 h-4"/>
        </button>
      </div>

      {/* Carousel Section */}
      <div className="relative flex items-center justify-center mb-12">
        <button 
          onClick={handlePrev}
          className="absolute left-0 z-20 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:scale-110 global-card"
        >
           <ChevronLeft className="w-5 h-5"/>
        </button>
        
        <div className="flex items-center justify-center w-full max-w-6xl overflow-hidden md:gap-[-2rem] px-2 xs:px-4 md:px-12">
          <div className="hidden md:block w-[28%] lg:w-[30%] z-0 -mr-12 lg:-mr-16 shrink-0">
            <CreditCardMock 
              type={leftCard.shortType} 
              number={leftCard.num} 
              holder={leftCard.holder} 
              validThru={leftCard.valid} 
              isActive={leftCard.status === "Active"} 
              gradient={leftCard.gradient}
              scale="scale-[0.85]"
              onClick={handlePrev}
            />
          </div>
          
          <div className="w-full max-w-[340px] md:w-[44%] md:max-w-none md:min-w-[350px] lg:min-w-[380px] z-10 relative shrink-0">
            {/* PRIMARY badge or Set as Primary button */}
            {centerCard.id === primaryId ? (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-1.5 bg-[#3CB371] text-white text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg tracking-wide border border-white/20">
                PRIMARY
                <Star className="w-3 h-3 text-white" />
              </div>
            ) : (
              <button
                onClick={() => setPrimaryId(centerCard.id)}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-1.5 bg-white/20 hover:bg-[#3CB371] text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md tracking-wide border border-white/30 backdrop-blur-sm transition-all duration-200 whitespace-nowrap"
              >
                <Star className="w-3 h-3 text-white" />
                Set as Primary
              </button>
            )}
            <CreditCardMock 
              type={centerCard.shortType} 
              number={centerCard.num} 
              holder={centerCard.holder} 
              validThru={centerCard.valid} 
              isActive={centerCard.status === "Active"} 
              gradient={centerCard.gradient}
              scale="scale-100"
              activeHighlight={true}
            />
          </div>

          <div className="hidden md:block w-[28%] lg:w-[30%] z-0 -ml-12 lg:-ml-16 shrink-0">
            <CreditCardMock 
              type={rightCard.shortType} 
              number={rightCard.num} 
              holder={rightCard.holder} 
              validThru={rightCard.valid} 
              isActive={rightCard.status === "Active"} 
              gradient={rightCard.gradient}
              scale="scale-[0.85]"
              onClick={handleNext}
            />
          </div>
        </div>

        <button 
          onClick={handleNext}
          className="absolute right-0 z-20 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:scale-110 global-card"
        >
           <ChevronRight className="w-5 h-5"/>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mb-12">
        {allCards.map((card, idx) => (
          <div 
            key={card.id}
            onClick={() => setCurrentIndex(idx)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-6 h-1.5 bg-blue-600' : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'}`}
          />
        ))}
      </div>

      {/* ── Bottom 3 Info Cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

        {/* 1. Smart Pick for You — AI (dynamic per card) */}
        {(() => {
          const tips = {
            1: { tip: "5X rewards on dining & fuel", sub: "Best for weekends & travel spends", badge: "5X" },
            2: { tip: "Unlimited lounge access + 3X travel miles", sub: "Ideal for your next flight booking", badge: "3X" },
            3: { tip: "10% cashback on OTT & online shopping", sub: "Stream more, save more every month", badge: "10%" },
            4: { tip: "2% cashback on all purchases", sub: "Everyday card — zero annual fee benefit", badge: "2%" },
          };
          const t = tips[centerCard.id] || tips[1];
          return (
            <div className="relative flex items-center justify-between gap-4 bg-gradient-to-br from-[#f0faf4] to-white dark:from-[#0d2818] dark:to-[#161D2D] border border-[#c8ecd8] dark:border-[#1a4a2a] rounded-2xl px-5 py-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group overflow-hidden">
              {/* Subtle glow bg */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3CB371]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#3CB371]/15 dark:bg-[#3CB371]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-[#3CB371]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-bold text-gray-900 dark:text-white">Smart Pick for You</span>
                    <span className="text-[9px] font-black bg-[#3CB371] text-white px-1.5 py-0.5 rounded-full tracking-wide">AI</span>
                    <span className="text-[9px] font-black bg-[#3CB371]/15 text-[#3CB371] border border-[#3CB371]/30 px-1.5 py-0.5 rounded-full">{t.badge}</span>
                  </div>
                  <p className="text-[12px] font-semibold text-gray-800 dark:text-gray-200">{t.tip}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{t.sub} · <span className="font-semibold text-[#3CB371]">{centerCard.type}</span></p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#3CB371] group-hover:translate-x-1 transition-all duration-200 shrink-0 relative z-10" />
            </div>
          );
        })()}

        {/* 2. Your Cards. Safe & Secure */}
        <div className="relative flex items-center gap-4 bg-gradient-to-br from-[#f0f7ff] to-white dark:from-[#0d1a2e] dark:to-[#161D2D] border border-[#c8dff8] dark:border-[#1a3050] rounded-2xl px-5 py-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 relative z-10">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
          </div>
          <div className="relative z-10 flex-1">
            <p className="text-[13px] font-bold text-gray-900 dark:text-white mb-1">
              Your Cards. <span className="text-blue-500">Safe & Secure</span>
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2">Bank-grade security is active on all your cards.</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 px-2 py-0.5 rounded-full">256-bit SSL</span>
              <span className="text-[9px] font-bold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800 px-2 py-0.5 rounded-full">2FA Active</span>
              <span className="text-[9px] font-bold bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800 px-2 py-0.5 rounded-full">Fraud Guard</span>
            </div>
          </div>
        </div>

        {/* 3. Quick Feature Toggles — NFC / Intl. Usage / AutoPay */}
        <div className="flex flex-col justify-between gap-3 bg-white dark:bg-[#161D2D] border border-gray-100 dark:border-[#252D3D] rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Nfc className="w-3.5 h-3.5 text-[#3CB371]" />
              <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">NFC Enabled</span>
            </div>
            <button onClick={() => setNfc(!nfc)} className={`w-8 h-4 rounded-full relative transition-colors duration-300 flex-shrink-0 ${nfc ? 'bg-[#3CB371]' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${nfc ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">Intl. Usage</span>
            </div>
            <button onClick={() => setIntl(!intl)} className={`w-8 h-4 rounded-full relative transition-colors duration-300 flex-shrink-0 ${intl ? 'bg-[#3CB371]' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${intl ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCcw className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">AutoPay</span>
              {autopay && <span className="w-1.5 h-1.5 rounded-full bg-[#3CB371] animate-pulse" />}
            </div>
            <button onClick={() => setAutopay(!autopay)} className={`w-8 h-4 rounded-full relative transition-colors duration-300 flex-shrink-0 ${autopay ? 'bg-[#3CB371]' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${autopay ? 'left-[18px]' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

      </div>


      {/* All Cards Table */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">All Cards</h3>
          <button className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            <Plus className="w-4 h-4"/> Apply for New Card
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden global-card">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-[11px] uppercase tracking-widest border-b border-gray-100 dark:border-gray-700">
                  <th className="px-6 py-5 font-bold">Card</th>
                  <th className="px-6 py-5 font-bold">Card Type</th>
                  <th className="px-6 py-5 font-bold">Status</th>
                  <th className="px-6 py-5 font-bold">Credit Limit</th>
                  <th className="px-6 py-5 font-bold">Available Credit</th>
                  <th className="px-6 py-5 font-bold">Valid Thru</th>
                  <th className="px-6 py-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {allCards.map((card, idx) => (
                  <tr 
                    key={card.id} 
                    onClick={() => setCurrentIndex(idx)}
                    className={`hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-pointer transition-all duration-200 group ${currentIndex === idx ? 'bg-blue-50/70 dark:bg-blue-900/20 font-bold border-l-4 border-blue-600 dark:border-blue-500' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-8 rounded-md ${card.color} flex flex-col justify-between p-1 relative overflow-hidden shadow-sm`}>
                           <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                           <div className="w-2 h-1.5 bg-yellow-400/80 rounded-[1px] relative z-10"></div>
                           <div className="text-[4px] font-bold text-white relative z-10">{card.type.includes('Visa') ? 'VISA' : 'MC'}</div>
                        </div>
                        <span className="font-mono text-sm font-semibold tracking-wider text-gray-700 dark:text-gray-200">{card.num}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">{card.type}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${card.status === 'Active' ? 'bg-teal-500' : 'bg-gray-400'}`}></span>
                        <span className={`text-xs font-bold ${card.status === 'Active' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500 dark:text-gray-400'}`}>{card.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-200">{card.limit}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-200">{card.avail}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{card.valid}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Feature Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 hover:shadow-md transition-shadow group cursor-pointer global-card">
           <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-7 h-7" />
           </div>
           <div>
             <h4 className="font-bold text-gray-900 dark:text-white mb-1">Safe & Secure</h4>
             <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Your card details are protected with 256-bit encryption.</p>
           </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 hover:shadow-md transition-shadow group cursor-pointer global-card">
           <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-7 h-7" />
           </div>
           <div>
             <h4 className="font-bold text-gray-900 dark:text-white mb-1">Track Usage</h4>
             <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Monitor your spending and stay in control of your finances.</p>
           </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 hover:shadow-md transition-shadow group cursor-pointer global-card">
           <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
              <BellRing className="w-7 h-7" />
           </div>
           <div>
             <h4 className="font-bold text-gray-900 dark:text-white mb-1">Smart Alerts</h4>
             <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Get real-time alerts on spends, bills and important updates.</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Cards;
