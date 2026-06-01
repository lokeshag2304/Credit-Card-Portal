import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { FileText, Sliders, Gift, Search, Bell, ChevronDown, Eye, Calendar, Wallet, Lock, MessageSquare, CheckCircle, X, EyeOff, Shield, ShieldCheck, Smartphone, Repeat, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';

const getDummyCards = (t) => [
  { id: 1, type: t('card_primary'), status: t('status_active'), name: "Visa Signature", network: "VISA", number: "4111 2222 3333 4567", exp: "12/28", cvv: "123", out: "₹ 25,430.75", avail: "₹ 74,569.25", limit: "₹ 1,00,000.00", due: "05 Jun 2024", bgClass: "bg-gradient-to-br from-[#0B1F5E] to-[#123FAF] preserve-gradient" },
  { id: 2, type: t('card_travel'), status: t('status_active'), name: "Amex Platinum", network: "AMEX", number: "3782 8224 6310 0005", exp: "10/26", cvv: "456", out: "₹ 12,000.00", avail: "₹ 1,88,000.00", limit: "₹ 2,00,000.00", due: "12 Jun 2024", bgClass: "bg-[#5D4B75]" },
  { id: 3, type: t('card_shopping'), status: t('status_active'), name: "Mastercard Rewards", network: "MASTERCARD", number: "5123 4567 8901 2345", exp: "08/25", cvv: "789", out: "₹ 4,500.50", avail: "₹ 45,499.50", limit: "₹ 50,000.00", due: "15 Jun 2024", bgClass: "bg-[#485265]" },
  { id: 4, type: t('card_business'), status: t('status_active'), name: "Visa Corporate", network: "VISA", number: "4000 1234 5678 9010", exp: "01/29", cvv: "321", out: "₹ 1,25,000.00", avail: "₹ 3,75,000.00", limit: "₹ 5,00,000.00", due: "20 Jun 2024", bgClass: "bg-[#374151]" },
  { id: 5, type: t('card_forex'), status: t('status_inactive'), name: "Global Multi-Currency", network: "VISA", number: "4567 8901 2345 6789", exp: "11/27", cvv: "987", out: "₹ 0.00", avail: "₹ 50,000.00", limit: "₹ 50,000.00", due: "N/A", bgClass: "bg-[#2D4A45]" }
];

const getPromoOffers = (t) => [
  { 
    id: 1, 
    title: t('promo_1_title'), 
    desc: t('promo_1_desc'), 
    btn: t('promo_1_btn'), 
    bg: "bg-gradient-to-r from-[#FFF5EE] to-[#FFEBE0] dark:from-[#1D1035] dark:to-[#0F172A]",
    btnClass: "bg-[#0B1F5E] dark:bg-gradient-to-r dark:from-[#9333EA] dark:to-[#6366F1] dark:shadow-[0_0_15px_rgba(147,51,234,0.4)]"
  },
  { 
    id: 2, 
    title: t('promo_2_title'), 
    desc: t('promo_2_desc'), 
    btn: t('promo_2_btn'), 
    bg: "bg-gradient-to-r from-[#F0F7FF] to-[#E5F0FF] dark:from-[#0B1A30] dark:to-[#050816]",
    btnClass: "bg-[#0B1F5E] dark:bg-gradient-to-r dark:from-[#2563FF] dark:to-[#00E5FF] dark:shadow-[0_0_15px_rgba(37,99,255,0.4)]"
  },
  { 
    id: 3, 
    title: t('promo_3_title'), 
    desc: t('promo_3_desc'), 
    btn: t('promo_3_btn'), 
    bg: "bg-gradient-to-r from-[#F9F5FF] to-[#F1E5FF] dark:from-[#161230] dark:to-[#0F172A]",
    btnClass: "bg-[#0B1F5E] dark:bg-gradient-to-r dark:from-[#FF6B00] dark:to-[#FF8533] dark:shadow-[0_0_15px_rgba(255,107,0,0.4)]"
  }
];

const DashboardHome = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showFullCard, setShowFullCard] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [primaryCardId, setPrimaryCardId] = useState(1);
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  const promoOffers = getPromoOffers(t);
  const dummyCards = getDummyCards(t);

  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromoIndex((prev) => (prev + 1) % promoOffers.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextCard = () => setActiveCardIndex((prev) => (prev + 1) % dummyCards.length);
  const prevCard = () => setActiveCardIndex((prev) => (prev - 1 + dummyCards.length) % dummyCards.length);

  const nextPromo = () => setActivePromoIndex((prev) => (prev + 1) % promoOffers.length);
  const prevPromo = () => setActivePromoIndex((prev) => (prev - 1 + promoOffers.length) % promoOffers.length);
  
  const activeCard = dummyCards[activeCardIndex];

  const handlePointerDown = (e) => {
    if (e.button !== 0) return; // Only left click drag
    if (e.target.closest('button, svg, [role="button"], a, .cursor-pointer')) {
      return;
    }
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !dragStart) return;
    const diffX = e.clientX - dragStart.x;
    setDragOffset(diffX);
  };

  const handlePointerUp = (e) => {
    if (!isDragging || !dragStart) return;
    setIsDragging(false);
    setDragStart(null);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (dragOffset < -60) {
      nextCard();
    } else if (dragOffset > 60) {
      prevCard();
    }
    setDragOffset(0);
  };

  const getStackedCardProps = (offset) => {
    switch (offset) {
      case 1: return "z-[15] top-[2%] sm:top-[3%] lg:top-[4%] right-[-6px] sm:right-[-10px] lg:right-[-16px] w-full h-[96%] sm:h-[94%] lg:h-[92%] opacity-100 cursor-pointer hover:translate-x-2";
      case 2: return "z-[14] top-[4%] sm:top-[6%] lg:top-[8%] right-[-12px] sm:right-[-20px] lg:right-[-32px] w-full h-[92%] sm:h-[88%] lg:h-[84%] opacity-100 cursor-pointer hover:translate-x-3";
      case 3: return "z-[13] top-[6%] sm:top-[9%] lg:top-[12%] right-[-18px] sm:right-[-30px] lg:right-[-48px] w-full h-[88%] sm:h-[82%] lg:h-[76%] opacity-100 cursor-pointer hover:translate-x-4";
      default: return "opacity-0 pointer-events-none hidden";
    }
  };

  return (
    <div className="p-3 lg:px-6 lg:py-3">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top Row: Card & Payment */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Credit Card Carousel Wrapper */}
          <div className="lg:w-[60%] relative flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Helper Text Centered Above Stack */}
            <div className="text-[11px] font-bold tracking-wider text-blue-600 dark:text-[#00E5FF] mb-3 animate-pulse flex items-center gap-1 opacity-90 drop-shadow-[0_0_8px_rgba(37,99,255,0.25)] select-none">
              <span>{t('dash_slide_hint')}</span>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full flex items-center justify-center">
              {/* Left Arrow */}
              <button
                onClick={prevCard}
                style={{ backgroundColor: 'white' }}
                className="absolute -left-3 lg:-left-5 z-20 w-8 h-8 lg:w-10 lg:h-10 rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-orange-500 transition-all border border-gray-200 hover:border-orange-200 hover:shadow-lg group duration-200"
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 ml-[-2px] transition-colors" />
              </button>

              {/* Cards Stack */}
              <div className="relative w-full max-w-[85%] lg:max-w-[78%] mx-auto pb-2 pt-2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-8">
                {/* Spotlight Glow Behind Cards */}
                <div className="absolute inset-0 bg-[#2563FF]/5 dark:bg-[#2563FF]/8 blur-[90px] rounded-full pointer-events-none z-0"></div>
                {/* Background Cards */}
                {dummyCards.map((card, idx) => {
                  if (idx === activeCardIndex) return null;
                  
                  // Calculate position in stack (1, 2, 3, or hidden)
                  let offset = (idx - activeCardIndex + dummyCards.length) % dummyCards.length;
                  
                  return (
                    <div 
                      key={card.id}
                      onClick={() => setActiveCardIndex(idx)}
                      className={`absolute ${getStackedCardProps(offset)} ${card.bgClass} rounded-[2rem] shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-white/5 transition-all duration-300`}
                    ></div>
                  );
                })}

                {/* Main Front Card */}
                <div 
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onMouseEnter={() => setIsCardHovered(true)}
                  onMouseLeave={() => setIsCardHovered(false)}
                  className={`relative z-20 w-full ${activeCard.bgClass} rounded-[2rem] p-4 lg:p-5 text-white overflow-hidden group ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none touch-none border border-white/10`}
                  style={{
                    transform: `translateX(${dragOffset}px) translateY(${!isDragging && isCardHovered ? '-8px' : '0px'}) scale(${isDragging ? 0.98 : 1})`,
                    transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: isCardHovered && !isDragging
                      ? '0 28px 56px -12px rgba(11,31,94,0.65), 0 0 40px rgba(37,99,235,0.2)'
                      : '0 20px 40px -15px rgba(11,31,94,0.5)',
                  }}
                >
                  {/* Abstract waves */}
                  <div className="absolute top-0 right-0 w-[150%] h-[150%] transform translate-x-[20%] -translate-y-[20%] opacity-20 pointer-events-none group-hover:rotate-6 transition-transform duration-1000">
                    <svg viewBox="0 0 800 800" className="w-full h-full animate-spin-slow">
                      <path d="M400,100 C565.685425,100 700,234.314575 700,400 C700,565.685425 565.685425,700 400,700 C234.314575,700 100,565.685425 100,400 C100,234.314575 234.314575,100 400,100 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 15"></path>
                      <path d="M400,150 C538.071187,150 650,261.928813 650,400 C650,538.071187 538.071187,650 400,650 C261.928813,650 150,538.071187 150,400 C150,261.928813 261.928813,150 400,150 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 10"></path>
                      <path d="M400,200 C510.45695,200 600,289.54305 600,400 C600,510.45695 510.45695,600 400,600 C289.54305,600 200,510.45695 200,400 C200,289.54305 289.54305,200 400,200 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 5"></path>
                    </svg>
                  </div>

                  <div className="relative z-10 flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-blue-100 text-[9px] xs:text-[11px] lg:text-xs font-semibold uppercase tracking-wider">
                           {activeCard.id === primaryCardId ? "PRIMARY" : activeCard.type}
                        </span>
                        <span className={`text-[8px] xs:text-[10px] font-bold px-1.5 py-0.5 rounded-full border shadow-sm ${activeCard.status === 'Active' ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' : 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>{activeCard.status}</span>
                      </div>
                      <h3 className="text-base xs:text-xl lg:text-2xl font-bold tracking-wide drop-shadow-sm truncate">{activeCard.name}</h3>
                    </div>
                    <div className="text-xl xs:text-2xl lg:text-3xl font-black italic tracking-tighter drop-shadow-md cursor-pointer hover:scale-110 transition-transform shrink-0">{activeCard.network}</div>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 mb-4 transition-all duration-500">
                    {showFullCard ? (
                      <div className="flex flex-col">
                        <span className="font-mono text-xl lg:text-2xl tracking-widest ml-1 drop-shadow-md text-white animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                          {activeCard.number}
                        </span>
                        <div className="flex gap-6 mt-2 ml-1 text-[11px] font-mono text-blue-200 animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
                          <span>EXP: {activeCard.exp}</span>
                          <span>CVV: {activeCard.cvv}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span>
                        </div>
                        <div className="flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span><span className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></span>
                        </div>
                        <span className="font-mono text-xl lg:text-2xl tracking-widest ml-1 drop-shadow-md">{activeCard.number.slice(-4)}</span>
                      </>
                    )}
                    <div onClick={(e) => { e.stopPropagation(); setShowFullCard(!showFullCard); }} className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/30 backdrop-blur-md transition-colors ml-4 shadow-sm group/eye">
                      {showFullCard ? <EyeOff className="w-4 h-4 text-white group-hover/eye:scale-110 transition-transform" /> : <Eye className="w-4 h-4 text-white group-hover/eye:scale-110 transition-transform" />}
                    </div>
                  </div>

                  <div className="relative z-10 grid grid-cols-3 gap-1.5 sm:gap-3 mb-4">
                    <div>
                      <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-blue-200 font-medium mb-1 uppercase tracking-wider">Outstanding</p>
                      <p className="text-[11px] sm:text-base lg:text-2xl font-bold drop-shadow-sm truncate">{activeCard.out}</p>
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-blue-200 font-medium mb-1 uppercase tracking-wider">Available</p>
                      <p className="text-[11px] sm:text-base lg:text-2xl font-bold drop-shadow-sm truncate">{activeCard.avail}</p>
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-blue-200 font-medium mb-1 uppercase tracking-wider">Card Limit</p>
                      <p className="text-[11px] sm:text-base lg:text-2xl font-bold drop-shadow-sm truncate">{activeCard.limit}</p>
                    </div>
                  </div>

                  <div className="relative z-10 border-t border-white/20 pt-5 flex justify-between items-center gap-1">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[11px] text-blue-200 font-medium uppercase tracking-wider hidden xs:inline">Due Date</span>
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                        <Calendar className="w-3 h-3 text-blue-100 shrink-0" />
                        <span className="text-[9px] xs:text-[11px] font-bold tracking-wide">{activeCard.due}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate('/dashboard/cards'); }} 
                      style={{ backgroundColor: '#ffffff', color: '#1d4ed8', border: 'none' }}
                      className="text-[9px] xs:text-[11px] font-bold py-1.5 px-2.5 xs:py-2 xs:px-4 rounded-lg shadow-sm transition-all hover:opacity-90 hover:-translate-y-0.5 shrink-0 transform"
                    >View Details</button>
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextCard}
                style={{ backgroundColor: 'white' }}
                className="absolute right-0 lg:right-2 z-20 w-8 h-8 lg:w-10 lg:h-10 rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-orange-500 transition-all border border-gray-200 hover:border-orange-200 hover:shadow-lg group duration-200"
              >
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 ml-[2px] transition-colors" />
              </button>
            </div>

            {/* Indicator Dots & Card Actions (Compact Row) */}
            <div className="w-full flex items-center justify-between mt-2 lg:mt-3 px-1 lg:px-4 relative">
              {/* Left: Security Status */}
              <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                <ShieldCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-[10px] lg:text-[11px] font-bold text-gray-700 dark:text-gray-200">Card is secure</span>
              </div>

              {/* Center: Indicator Dots */}
              <div className="flex gap-2 absolute left-1/2 -translate-x-1/2">
                {dummyCards.map((_, idx) => (
                  <span 
                    key={idx}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${idx === activeCardIndex ? 'bg-blue-600 dark:bg-blue-500 scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                  ></span>
                ))}
              </div>

              {/* Right: Manage Cards */}
              <button onClick={() => navigate('/dashboard/cards')} className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-sm hover:shadow-md hover:bg-orange-50 hover:text-orange-600 transition-all text-gray-700 dark:text-gray-200 font-bold text-[9px] lg:text-[10px] group global-card">
                <CreditCard className="w-3 h-3 text-blue-600 dark:text-blue-400 group-hover:text-orange-500 transition-colors" />
                {t('dash_manage_cards')}
              </button>
            </div>

            {/* Promotional Banner */}
            <div className="w-full relative mt-3 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
               <div className={`relative w-full rounded-[1.25rem] overflow-hidden ${promoOffers[activePromoIndex].bg} transition-colors duration-500 shadow-sm border border-orange-100/50 flex items-center justify-between p-3 lg:px-4 lg:py-3`}>
                  
                  <div className="flex-1 max-w-[65%] z-10 pl-3 lg:pl-4">
                     <h3 className="text-[12px] lg:text-[14px] font-extrabold text-gray-900 dark:text-white tracking-tight mb-0.5">{promoOffers[activePromoIndex].title}</h3>
                     <p className="text-[9px] lg:text-[10px] text-gray-600 dark:text-[#94A3B8] mb-2 line-clamp-1">{promoOffers[activePromoIndex].desc}</p>
                     <button className={`${promoOffers[activePromoIndex].btnClass || 'bg-[#0B1F5E] hover:bg-[#123FAF]'} text-white text-[9px] lg:text-[10px] font-bold py-1 lg:py-1.5 px-3 lg:px-4 rounded-md shadow-sm transition-all transform hover:-translate-y-0.5`}>
                       {promoOffers[activePromoIndex].btn}
                     </button>
                  </div>
                  
                  <div className="relative w-16 h-12 lg:w-20 lg:h-16 flex items-center justify-center mr-3 lg:mr-5 z-10">
                     {activePromoIndex === 0 && (
                       <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-orange-100 flex items-center justify-center shadow-inner relative group">
                          <Gift className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500 drop-shadow-sm group-hover:scale-110 transition-transform" />
                          <div className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[7px] lg:text-[8px] font-bold w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center rounded-full shadow-md transform rotate-12">20%<br/>OFF</div>
                       </div>
                     )}
                     {activePromoIndex === 1 && (
                       <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-blue-100 flex items-center justify-center shadow-inner group">
                          <Wallet className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500 drop-shadow-sm group-hover:scale-110 transition-transform" />
                          <div className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[7px] lg:text-[8px] font-bold w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center rounded-full shadow-md transform rotate-12">5X<br/>PTS</div>
                       </div>
                     )}
                     {activePromoIndex === 2 && (
                       <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-purple-100 flex items-center justify-center shadow-inner group">
                          <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500 drop-shadow-sm group-hover:scale-110 transition-transform" />
                          <div className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[7px] lg:text-[8px] font-bold w-6 h-6 lg:w-7 lg:h-7 flex items-center justify-center rounded-full shadow-md transform rotate-12">15%<br/>CASH</div>
                       </div>
                     )}
                  </div>

                  {/* Soft Background Mesh Elements */}
                  <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-white/40 blur-2xl rounded-full pointer-events-none"></div>
                  <div className="absolute bottom-[-50%] left-[20%] w-24 h-24 bg-white/30 blur-xl rounded-full pointer-events-none"></div>
               </div>

               {/* External Left/Right Arrows */}
               <button onClick={prevPromo} className="absolute -left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-orange-900/30 transition-colors border border-gray-100 dark:border-gray-700 group">
                 <ChevronLeft className="w-4 h-4 ml-[-2px] group-hover:text-orange-500 transition-colors" />
               </button>
               <button onClick={nextPromo} className="absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-orange-900/30 transition-colors border border-gray-100 dark:border-gray-700 group">
                 <ChevronRight className="w-4 h-4 ml-[2px] group-hover:text-orange-500 transition-colors" />
               </button>

               {/* Indicator Dots */}
               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                 {promoOffers.map((_, idx) => (
                   <span 
                     key={idx} 
                     onClick={() => setActivePromoIndex(idx)}
                     className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${idx === activePromoIndex ? 'bg-[#0B1F5E] dark:bg-white scale-125' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                   ></span>
                 ))}
               </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:w-[40%] bg-[#FCFBF9] dark:bg-[#0F172A] rounded-[2rem] p-4 lg:p-5 shadow-sm border border-gray-100 dark:border-white/10 flex flex-col hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(37,99,255,0.1)] transition-all animate-fade-in-up group" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:rotate-12 transition-transform duration-500">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base lg:text-lg">{t('dash_payment_sum')}</h3>
              </div>
              <button onClick={() => navigate('/dashboard/payments')} className="text-blue-600 font-bold text-xs hover:underline cursor-pointer">{t('dash_view_details')}</button>
            </div>

            {/* Top Cards Row */}
            <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-3">
               {/* Left Card: Credit Limit Used */}
               <div className="bg-white dark:bg-[#050816]/60 rounded-[1.25rem] p-3 lg:p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.3)] border border-gray-100/80 dark:border-white/10 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:border-teal-200 dark:hover:border-[#00E5FF]/30 cursor-pointer group/limit global-card">
                  <h4 className="text-gray-500 dark:text-gray-400 font-bold text-[11px] lg:text-[12px] mb-2 text-center group-hover/limit:text-teal-500 dark:group-hover/limit:text-teal-400 transition-colors">{t('dash_credit_used')}</h4>
                  <div className="relative w-full aspect-[2/1] mb-2 flex justify-center mt-1">
                     <svg viewBox="0 0 100 50" className="w-[85%] lg:w-[90%] overflow-visible absolute top-0 transform group-hover/limit:scale-[1.03] transition-transform duration-500">
                        <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round" />
                        <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray="141.37" strokeDashoffset="50.89" className="text-teal-400 drop-shadow-[0_0_4px_rgba(45,212,191,0.5)]" />
                     </svg>
                     <div className="absolute bottom-[-5px] flex flex-col items-center">
                        <span className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight group-hover/limit:text-teal-600 dark:group-hover/limit:text-teal-400 transition-all duration-300 transform group-hover/limit:scale-[1.05]">64%</span>
                     </div>
                  </div>
                  <span className="text-[10px] lg:text-[11px] text-gray-500 font-medium text-center mt-1 group-hover/limit:text-gray-700 dark:group-hover/limit:text-gray-300 transition-colors">of ₹ 1,00,000</span>
               </div>
               
               {/* Right Card: Credit Score */}
               <div className="bg-white dark:bg-[#050816]/60 rounded-[1.25rem] p-3 lg:p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.3)] border border-gray-100/80 dark:border-white/10 flex flex-col relative justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:border-green-200 dark:hover:border-[#00E5FF]/30 cursor-pointer group/score global-card">
                  <div className="flex flex-col items-center">
                    <h4 className="text-gray-500 dark:text-gray-400 font-bold text-[11px] lg:text-[12px] mb-3 text-center group-hover/score:text-green-500 dark:group-hover/score:text-green-400 transition-colors">{t('dash_credit_score')}</h4>
                    <div className="relative w-full aspect-[2/1] mb-1 flex justify-center mt-2">
                       <svg viewBox="0 0 100 50" className="w-[85%] lg:w-[90%] overflow-visible absolute top-0 transform group-hover/score:scale-[1.03] transition-transform duration-500">
                          <defs>
                            <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ef4444" />
                              <stop offset="50%" stopColor="#f97316" />
                              <stop offset="100%" stopColor="#22c55e" />
                            </linearGradient>
                          </defs>
                          <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round" />
                          <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="url(#score-gradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="141.37" strokeDashoffset="27.85" className="drop-shadow-[0_0_4px_rgba(34,197,94,0.4)]" />
                       </svg>
                       <div className="absolute bottom-[-8px] flex flex-col items-center">
                          <span className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white tracking-tight group-hover/score:text-green-600 dark:group-hover/score:text-green-400 transition-all duration-300 transform group-hover/score:scale-[1.05]">782</span>
                          <span className="text-[9px] lg:text-[10px] font-bold text-green-500 mt-[-2px] animate-pulse">Excellent</span>
                       </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-800 w-full">
                     <span className="text-[9px] text-gray-400 font-medium">Updated 5 days ago</span>
                     <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline group-hover/score:text-blue-500 transition-colors">View Details</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-0 mb-3 bg-white dark:bg-[#050816]/60 shadow-[0_2px_15px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.3)] py-3 px-1 sm:px-2 rounded-[1.25rem] border border-gray-100/80 dark:border-white/10 items-center justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)] hover:border-blue-100 dark:hover:border-[#2563FF]/30 cursor-pointer group/due global-card">
              <div className="flex flex-col items-center border-r border-gray-100 dark:border-gray-800 px-1 sm:px-2 transition-all duration-300 hover:scale-100">
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider text-center group-hover/due:text-gray-500 dark:group-hover/due:text-gray-300 transition-colors">{t('dash_min_due')}</p>
                <p className="text-[10px] sm:text-[15px] font-black text-gray-900 dark:text-white tracking-tight group-hover/due:text-orange-500 transition-colors truncate">₹ 2,500</p>
              </div>
              <div className="flex flex-col items-center border-r border-gray-100 dark:border-gray-800 px-1 sm:px-2 transition-all duration-300 hover:scale-100">
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider text-center group-hover/due:text-gray-500 dark:group-hover/due:text-gray-300 transition-colors">{t('dash_total_due')}</p>
                <p className="text-[10px] sm:text-[15px] font-black text-gray-900 dark:text-white tracking-tight group-hover/due:text-blue-600 dark:group-hover/due:text-blue-400 transition-colors truncate">₹ 25,431</p>
              </div>
              <div className="flex flex-col items-center px-1 sm:px-2 transition-all duration-300 hover:scale-100">
                <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider text-center group-hover/due:text-gray-500 dark:group-hover/due:text-gray-300 transition-colors">{t('dash_due_date')}</p>
                <p className="text-[10px] sm:text-[15px] font-black text-gray-900 dark:text-white tracking-tight group-hover/due:text-teal-600 dark:group-hover/due:text-teal-400 transition-colors truncate">05 Jun</p>
              </div>
            </div>

            <button onClick={() => navigate('/dashboard/payments')} className="w-full relative overflow-hidden bg-[#FA6A14] hover:bg-[#E85D0E] dark:bg-gradient-to-r dark:from-[#FF6B00] dark:to-[#FFA000] text-white font-extrabold text-[13px] lg:text-sm py-3.5 lg:py-4 rounded-xl shadow-[0_8px_20px_rgba(250,106,20,0.25)] dark:shadow-[0_8px_25px_rgba(255,107,0,0.35)] hover:shadow-[0_15px_30px_rgba(250,106,20,0.45)] dark:hover:shadow-[0_15px_35px_rgba(255,107,0,0.55)] hover:-translate-y-1 hover:scale-[1.01] active:scale-95 transition-all duration-300 mt-auto before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
              {t('dash_pay_now')}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] p-3 lg:p-4 shadow-sm border border-gray-100 dark:border-white/10 animate-fade-in-up global-card" style={{ animationDelay: '0.5s' }}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base">{t('dash_quick_actions')}</h3>
            <Sliders className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:rotate-90 duration-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
            {[
              { icon: Wallet, title: t('dash_pay_now'), desc: "Make payment", color: "blue", bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-500 dark:text-blue-400", path: "/dashboard/payments" },
              { icon: FileText, title: t('dash_view_stmt'), desc: "Download statement", color: "indigo", bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-500 dark:text-indigo-400", path: "/dashboard/statements" },
              { icon: Lock, title: t('dash_block_card'), desc: "Temporarily block", color: "red", bg: "bg-red-50 dark:bg-red-900/20", text: "text-red-500 dark:text-red-400", path: "/dashboard/controls" },
              { icon: MessageSquare, title: t('dash_raise_req'), desc: "Submit a request", color: "teal", bg: "bg-teal-50 dark:bg-teal-900/20", text: "text-teal-500 dark:text-teal-400", path: "/dashboard/requests" },
              { icon: Repeat, title: t('dash_view_txn'), desc: "Check recent txns", color: "purple", bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-500 dark:text-purple-400", path: "/dashboard/transactions" },
              { icon: CreditCard, title: t('dash_emi_loans'), desc: "Convert to EMI", color: "orange", bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-500 dark:text-orange-400", path: "/dashboard/emi-loans" }
            ].map((action, idx) => (
              <div key={idx} onClick={() => navigate(action.path)} className="flex flex-col xl:flex-row items-center xl:items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#050816]/60 cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-white/10 hover:shadow-sm group">
                <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-4 h-4 ${action.text}`} />
                </div>
                <div className="text-center xl:text-left">
                  <h4 className="font-bold text-[12px] text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{action.title}</h4>
                  <p className="text-[9px] text-gray-500 dark:text-gray-400 leading-tight">{action.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Transactions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* Recent Transactions */}
          <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-shadow global-card">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base">Recent Transactions</h3>
              <span onClick={() => navigate('/dashboard/transactions')} className="text-[11px] font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full hover:shadow-sm">View All</span>
            </div>
            <div className="space-y-1">
              {[
                { merchant: "Amazon - Purchase", date: "12 May 2024, 10:15 AM", amount: "- ₹1,499.00", status: "Posted", color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400", initial: "a" },
                { merchant: "Zomato - Food Delivery", date: "11 May 2024, 08:45 PM", amount: "- ₹329.00", status: "Posted", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400", initial: "z" },
                { merchant: "Reliance Petrol Pump", date: "11 May 2024, 05:30 PM", amount: "- ₹1,250.00", status: "Posted", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400", initial: "r" },
                { merchant: "Netflix Subscription", date: "10 May 2024, 12:00 PM", amount: "- ₹649.00", status: "Posted", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400", initial: "n" },
                { merchant: "Flipkart - Purchase", date: "09 May 2024, 09:20 PM", amount: "- ₹2,299.00", status: "Posted", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400", initial: "f" }
              ].map((tx, idx) => (
                <div key={idx} onClick={() => navigate('/dashboard/transactions')} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 dark:hover:bg-[#050816]/60 p-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[15px] uppercase ${tx.color} shadow-sm group-hover:scale-110 transition-transform`}>
                      {tx.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-[12px] text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tx.merchant}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[12px] text-gray-900 dark:text-white mb-0.5">{tx.amount}</p>
                    <span className="inline-block bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-[8px] font-bold px-1.5 py-0.5 rounded border border-teal-100 dark:border-teal-800 uppercase tracking-wider">{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white dark:bg-[#0F172A] rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-shadow global-card">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm lg:text-base">Alerts & Notifications</h3>
              <span onClick={() => navigate('/dashboard/notifications')} className="text-[11px] font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full hover:shadow-sm">View All</span>
            </div>
            <div className="space-y-2">
              {[
                { icon: Bell, title: "Payment Due Reminder", desc: "Your payment of ₹25,430.75 is due on 05 Jun 2024.", time: "2h ago", bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-500 dark:text-orange-400" },
                { icon: FileText, title: "Statement Generated", desc: "Your Apr 2024 statement is ready to download.", time: "1d ago", bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-500 dark:text-blue-400" },
                { icon: CheckCircle, title: "Payment Received", desc: "We've received your payment of ₹10,000.00.", time: "3d ago", bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-500 dark:text-green-400" },
                { icon: Gift, title: "Milestone Unlocked", desc: "Congratulations! You've unlocked a new reward.", time: "4d ago", bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-500 dark:text-indigo-400" }
              ].map((alert, idx) => (
                <div key={idx} onClick={() => navigate('/dashboard/notifications')} className="flex gap-3 group cursor-pointer hover:bg-gray-50 dark:hover:bg-[#050816]/60 p-2 rounded-xl transition-colors">
                  <div className={`w-8 h-8 rounded-full ${alert.bg} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                    <alert.icon className={`w-3.5 h-3.5 ${alert.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="font-bold text-[12px] text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{alert.title}</h4>
                      <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">{alert.time}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-snug">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div onClick={() => navigate('/dashboard/offers')} className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-[#0B1A30] dark:to-[#050816] rounded-[2rem] p-5 lg:p-6 flex flex-col md:flex-row justify-between items-center border border-teal-100 dark:border-white/10 shadow-sm hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(0,229,255,0.15)] transition-all animate-fade-in-up relative overflow-hidden group cursor-pointer" style={{ animationDelay: '0.7s' }}>
          <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none w-48 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10 mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-base lg:text-lg font-extrabold text-teal-900 dark:text-teal-100 mb-1 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">Travel more. Earn more. ✈️</h3>
            <p className="text-[11px] lg:text-xs text-teal-700 dark:text-teal-300 font-medium">Earn up to 10X reward points on flight bookings this month.</p>
          </div>
          <button className="relative z-10 bg-teal-600 hover:bg-teal-700 dark:bg-gradient-to-r dark:from-[#2563FF] dark:to-[#00E5FF] dark:shadow-[0_0_15px_rgba(37,99,255,0.4)] text-white text-[11px] font-bold py-2.5 px-6 rounded-xl transition-all transform group-hover:scale-100">Explore Offers</button>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
