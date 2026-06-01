import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeProvider';
import { useLanguage } from '../i18n/LanguageContext';
import {
  LayoutDashboard, CreditCard, Repeat, FileText, IndianRupee,
  Sliders, Gift, Edit3, User, Percent, HelpCircle,
  Search, Bell, ChevronDown, ChevronRight, Wallet, Lock, X, Menu,
  Shield, MessageSquare, Palette, Accessibility, Sparkles, RefreshCw, Check, Bot, AlertTriangle, Send, ArrowRight, LogOut, Sun, Moon
} from 'lucide-react';
import logoLight from '../assets/logo-light.png';
import Footer from '../components/Footer';

// ─── Sidebar Item ───────────────────────────────────────────────────────────
const SidebarItem = ({ icon: Icon, label, path, activePath, onClick }) => {
  const navigate = useNavigate();
  const active =
    activePath === path ||
    (path === '/dashboard' && activePath === '/dashboard');

  const handleClick = () => {
    navigate(path);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${active
          ? 'bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.25)] dark:bg-[#2563FF] dark:text-[#F8FAFC] dark:shadow-[0_0_20px_rgba(37,99,255,0.4)] dark:border dark:border-[#00E5FF]/20'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#0F172A] hover:text-blue-600 dark:hover:text-blue-400 dark:hover:shadow-[inset_0_0_10px_rgba(37,99,255,0.05)] border border-transparent'
        }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 shrink-0" />
        <span className="font-semibold text-[13px]">{label}</span>
      </div>
      {active && <Sparkles className="w-3.5 h-3.5 text-yellow-300 opacity-90 drop-shadow-sm" />}
    </div>
  );
};

// ─── Bottom Nav Item ─────────────────────────────────────────────────────────
const BottomNavItem = ({ icon: Icon, label, path, activePath }) => {
  const navigate = useNavigate();
  const active = activePath === path || (path === '/dashboard' && activePath === '/dashboard');
  return (
    <button
      onClick={() => navigate(path)}
      className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-all duration-200 relative ${active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
        }`}
    >
      {active && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full" />
      )}
      <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''} transition-transform`} />
      <span className={`text-[9px] font-bold ${active ? 'text-blue-600' : ''}`}>{label}</span>
    </button>
  );
};

// ─── Main Layout ─────────────────────────────────────────────────────────────
const DashboardLayout = () => {
  const {
    isDark,
    toggleTheme,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    fontSize,
    setFontSize,
    dyslexicFont,
    setDyslexicFont,
    resetAccessibility,
    largeTapTargets,
    setLargeTapTargets
  } = useTheme();
  const { t } = useLanguage();

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const profileRef = React.useRef(null);
  const a11yRef = React.useRef(null);

  // Close dropdowns when clicking anywhere outside of them (Non-blocking click-away)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (a11yRef.current && !a11yRef.current.contains(event.target)) {
        setA11yOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sync states for user details fetched from login page session/localstorage
  const [userName, setUserName] = useState(localStorage.getItem('splendin_username') || "Rahul Sharma");
  const [userPhoto, setUserPhoto] = useState(localStorage.getItem('splendin_user_photo') || "https://i.pravatar.cc/300?img=11");

  // MAX AI Chat State
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiTipVisible, setAiTipVisible] = useState(true);

  // Set reactive greeting inside AI chat when name updates
  useEffect(() => {
    const firstName = userName.split(' ')[0] || 'Rahul';
    setAiMessages([
      { sender: 'ai', text: `Namaste ${firstName}! 👋 Main hoon MAX, aapka AI-first financial assistant. How can I help you today?` }
    ]);
  }, [userName]);

  const handleAiSend = (textToSend = aiInput) => {
    const text = textToSend.trim();
    if (!text) return;
    setAiMessages(prev => [...prev, { sender: 'user', text }]);
    setAiInput('');

    // Simulated responses based on keywords
    setTimeout(() => {
      let reply = "I'm searching your credit profile... Is there anything specific you would like me to analyze?";
      const lower = text.toLowerCase();
      if (lower.includes('due') || lower.includes('kab hai')) {
        reply = "Rahul, aapka outstanding due ₹25,430 hai, jo ki 15th June 2026 ko due hai. Would you like me to auto-fill the payment for you?";
      } else if (lower.includes('emi') || lower.includes('convert')) {
        reply = "Aap apne ₹10,000+ ke transactions ko instantly 3, 6, ya 12 mahine ke low-interest EMIs me convert kar sakte hain statement page par. Main auto-suggest bhi kar sakta hoon!";
      } else if (lower.includes('reward') || lower.includes('points')) {
        reply = "Aapke paas total 12,450 Reward Points hain, jo ₹3,112 ke balance ke barabar hain. Aap inhe Flights ya Amazon vouchers ke liye redeem kar sakte hain!";
      } else if (lower.includes('help') || lower.includes('support')) {
        reply = "Sure! Main support page navigate kar sakta hoon ya support ticket raise kar sakta hoon. What issue are you facing?";
      } else if (lower.includes('contrast') || lower.includes('accessibility')) {
        setHighContrast(true);
        reply = "High Contrast Mode has been enabled for you. Aap navbar ke accessibility panel se custom adjustments bhi kar sakte hain.";
      }
      setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Listen to profile updates reactively
  useEffect(() => {
    const handleProfileUpdate = () => {
      const storedName = localStorage.getItem('splendin_username');
      const storedPhoto = localStorage.getItem('splendin_user_photo');
      if (storedName) setUserName(storedName);
      if (storedPhoto) setUserPhoto(storedPhoto);
    };

    window.addEventListener('profile-updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);

    // Initial fetch check in case loaded later
    handleProfileUpdate();

    return () => {
      window.removeEventListener('profile-updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  // Close drawer and all dropdowns on route change
  useEffect(() => {
    setDrawerOpen(false);
    setProfileOpen(false);
    setA11yOpen(false);
  }, [location]);

  const allNavItems = [
    { icon: LayoutDashboard, label: t('nav_dashboard'), path: '/dashboard' },
    { icon: CreditCard, label: t('nav_cards'), path: '/dashboard/cards' },
    { icon: Repeat, label: t('nav_transactions'), path: '/dashboard/transactions' },
    { icon: FileText, label: t('nav_statements'), path: '/dashboard/statements' },
    { icon: FileText, label: t('nav_emi'), path: '/dashboard/emi-loans' },
    { icon: IndianRupee, label: t('nav_payments'), path: '/dashboard/payments' },
    { icon: Sliders, label: t('nav_controls'), path: '/dashboard/controls' },
    { icon: Gift, label: t('nav_rewards'), path: '/dashboard/rewards' },
    { icon: Edit3, label: t('nav_requests'), path: '/dashboard/requests' },
    { icon: User, label: t('nav_profile'), path: '/dashboard/profile' },
    { icon: Percent, label: t('nav_offers'), path: '/dashboard/offers' },
    { icon: HelpCircle, label: t('nav_support'), path: '/dashboard/support' },
    { icon: Palette, label: t('nav_design'), path: '/dashboard/design-system' },
  ];

  // Bottom nav — 5 most-used items
  const bottomNavItems = [
    { icon: LayoutDashboard, label: t('nav_dashboard'), path: '/dashboard' },
    { icon: CreditCard, label: t('nav_cards'), path: '/dashboard/cards' },
    { icon: Repeat, label: t('nav_transactions').slice(0, 8), path: '/dashboard/transactions' },
    { icon: Gift, label: t('nav_rewards'), path: '/dashboard/rewards' },
    { icon: HelpCircle, label: t('nav_support').split(' ')[0], path: '/dashboard/support' },
  ];

  return (
    <div className="flex h-screen bg-[#FAF8F5] dark:bg-[#050816] overflow-hidden font-sans select-none transition-colors duration-100 relative">
      {/* Subtle background glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FFEBE0]/40 dark:bg-[#2563FF]/8 blur-[120px] dark:blur-[140px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#E5F0FF]/40 dark:bg-[#00E5FF]/6 blur-[100px] dark:blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* ── Desktop Sidebar ──────────────────────────────────────────────────── */}
      <aside className="neobank-sidebar hidden lg:flex w-64 bg-white dark:from-[#071426]/90 dark:via-[#050816]/95 dark:to-[#0B1020]/95 backdrop-blur-xl border-r border-gray-100 dark:border-white/10 flex-col flex-shrink-0 z-20 shadow-[2px_0_20px_rgba(0,0,0,0.02)] dark:shadow-[2px_0_30px_rgba(0,0,0,0.5)]">
        <div
          onClick={() => navigate('/dashboard')}
          className="px-6 pt-6 pb-4 cursor-pointer group"
        >
          <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-[1.02] origin-left">
            <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-start relative shrink-0 shadow-sm border border-gray-100 dark:border-transparent bg-white dark:bg-transparent">
              <img src={logoLight?.src || logoLight} alt="Splendin" className="absolute left-[-1px] h-[96%] w-auto max-w-none object-left contrast-[1.12] saturate-[1.18] brightness-[0.93] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
            </div>
            <div>
              <h3 className="font-black text-[20px] text-[#00abec] leading-none tracking-tight">
                Splendin
              </h3>
              <p className="text-[9px] font-extrabold text-[#f7931e] tracking-wide mt-1 uppercase">Simple and innovative</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar min-h-0">
          {allNavItems.map((item) => (
            <SidebarItem key={item.path} {...item} activePath={currentPath} />
          ))}
        </div>

        {/* Sidebar Bottom: Shortcuts + Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-[#1E293B]">
          <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">{t('sc_shortcuts')}</h5>
          <div className="flex justify-between px-2 mb-4">
            {[
              { icon: Wallet, label: t('sc_pay_now'), path: '/dashboard/payments', hover: 'group-hover/icon:bg-blue-100 dark:group-hover/icon:bg-blue-900/40 group-hover/icon:text-blue-600' },
              { icon: Lock, label: t('sc_block_card'), path: '/dashboard/controls', hover: 'group-hover/icon:bg-red-100 dark:group-hover/icon:bg-red-900/40 group-hover/icon:text-red-600' },
              { icon: Percent, label: t('sc_offers'), path: '/dashboard/offers', hover: 'group-hover/icon:bg-orange-100 dark:group-hover/icon:bg-orange-900/40 group-hover/icon:text-orange-600' },
            ].map(({ icon: Icon, label, path, hover }) => (
              <div
                key={label}
                onClick={() => navigate(path)}
                className="flex flex-col items-center gap-1 cursor-pointer group/icon"
              >
                <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-colors ${hover}`}>
                  <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
                </div>
                <span className="text-[9px] text-gray-500 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Premium Logout Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#DC2626] via-[#B91C1C] to-[#991B1B] dark:from-[#9F1239] dark:via-[#BE123C] dark:to-[#E11D48] shadow-[0_4px_15px_rgba(220,38,38,0.25)] dark:shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_8px_25px_rgba(220,38,38,0.4)] dark:hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-colors duration-300 border border-white/20 dark:border-white/10">
              <LogOut className="w-4 h-4 text-white drop-shadow-sm" />
              <span className="text-[12px] font-bold text-white tracking-wide drop-shadow-sm">{t('sc_logout')}</span>
            </div>
          </button>
        </div>
      </aside>

      {/* ── Mobile Slide-out Drawer ───────────────────────────────────────────── */}
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-[#071426] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div
            onClick={() => { navigate('/dashboard'); setDrawerOpen(false); }}
            className="cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-start relative shrink-0 shadow-sm border border-gray-100 dark:border-transparent bg-white dark:bg-transparent">
                <img src={logoLight?.src || logoLight} alt="Splendin" className="absolute left-[-1px] h-[95%] w-auto max-w-none object-left contrast-[1.12] saturate-[1.18] brightness-[0.93] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
              </div>
              <div>
                <h3 className="font-black text-base text-[#00abec] leading-none">
                  Splendin
                </h3>
                <p className="text-[8px] font-extrabold text-[#f7931e] tracking-wide mt-0.5 uppercase">Simple and innovative</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* User Mini-Profile */}
        <div
          onClick={() => { navigate('/dashboard/profile'); setDrawerOpen(false); }}
          className="mx-4 mt-4 mb-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 cursor-pointer flex items-center gap-3 hover:bg-blue-100 transition-colors"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 shrink-0">
            <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 dark:text-white">{userName}</p>
            <p className="text-[10px] text-blue-600 font-medium">✦ Platinum Member</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 ml-auto transform -rotate-90" />
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          {allNavItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              activePath={currentPath}
              onClick={() => setDrawerOpen(false)}
            />
          ))}
        </div>

        {/* Drawer Bottom Quick Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('dash_quick_actions')}</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Wallet, label: t('dash_pay_now'), path: '/dashboard/payments', color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { icon: Shield, label: t('dash_block_card'), path: '/dashboard/controls', color: 'bg-red-50 text-red-600 border-red-100' },
              { icon: MessageSquare, label: t('nav_support').split(' ')[0], path: '/dashboard/support', color: 'bg-teal-50 text-teal-600 border-teal-100' },
            ].map(({ icon: Icon, label, path, color }) => (
              <div
                key={label}
                onClick={() => { navigate(path); setDrawerOpen(false); }}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer hover:opacity-80 transition-opacity ${color}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <header className="relative glass-surface bg-white/95 dark:from-[#071426]/85 dark:via-[#050816]/90 dark:to-[#071426]/85 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 flex items-center justify-between px-4 lg:px-8 z-50 flex-shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] h-16 lg:h-20">

          {/* Left: hamburger (mobile) + greeting (desktop) */}
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Logo — mobile only */}
            <div
              onClick={() => navigate('/dashboard')}
              className="lg:hidden cursor-pointer"
            >
              <img src={logoLight?.src || logoLight} alt="Splendin" className="h-6 w-auto contrast-[1.12] saturate-[1.18] brightness-[0.93] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
            </div>

            {/* Greeting — desktop only */}
            <div className="hidden lg:block animate-fade-in-up">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {new Date().getHours() < 12 ? t('greeting_morning') : new Date().getHours() < 18 ? t('greeting_afternoon') : t('greeting_evening')}, {userName.split(' ')[0]}! <span className="inline-block">👋</span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                {t('dash_subtitle')}
              </p>
            </div>
          </div>

          {/* Right: search, A11y, bell, avatar */}
          <div className="flex items-center gap-3 lg:gap-5 relative">
            {/* Search — desktop only */}
            <div className="relative hidden md:block group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                className="pl-9 pr-4 py-2 bg-gray-100 dark:bg-[#0F172A]/70 border border-transparent dark:border-white/5 rounded-full text-sm w-48 lg:w-56 focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#2563FF] focus:border-blue-500 dark:focus:border-[#00E5FF]/40 focus:bg-white dark:focus:bg-[#0F172A] outline-none text-gray-700 dark:text-gray-200 transition-all shadow-sm"
              />
            </div>

            {/* Accessibility Button */}
            <div className="relative" ref={a11yRef}>
              <button
                onClick={() => setA11yOpen(!a11yOpen)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border border-gray-100 dark:border-gray-800 cursor-pointer ${a11yOpen ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                aria-label="Global Accessibility Panel"
              >
                {/* Wheelchair Accessibility Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                  <path d="M12 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.663 2.146a1.5 1.5 0 0 0-.47-2.115l-2.5-1.508a1.5 1.5 0 0 0-1.676.086l-2.329 1.75a.866.866 0 0 0 1.051 1.375L7.361 3.37l.922.71-2.038 2.445A4.73 4.73 0 0 0 2.628 7.67l1.064 1.065a3.25 3.25 0 0 1 4.574 4.574l1.064 1.063a4.73 4.73 0 0 0 1.09-3.998l1.043-.292-.187 2.991a.872.872 0 1 0 1.741.098l.206-4.121A1 1 0 0 0 12.224 8h-2.79zM3.023 9.48a3.25 3.25 0 0 0 4.496 4.496l1.077 1.077a4.75 4.75 0 0 1-6.65-6.65z" />
                </svg>
              </button>

              {/* Beautiful floating glassmorphism Accessibility panel */}
              {a11yOpen && (
                <div 
                  className="absolute right-0 top-12 w-80 rounded-3xl p-5 shadow-2xl animate-fade-in-up space-y-4 text-gray-900 dark:text-white"
                  style={{
                    background: isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                    zIndex: 9999,
                  }}
                >
                  <div className="flex justify-between items-center pb-2.5 border-b border-gray-100 dark:border-gray-800">
                    <h4 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-blue-500">
                        <path d="M12 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.663 2.146a1.5 1.5 0 0 0-.47-2.115l-2.5-1.508a1.5 1.5 0 0 0-1.676.086l-2.329 1.75a.866.866 0 0 0 1.051 1.375L7.361 3.37l.922.71-2.038 2.445A4.73 4.73 0 0 0 2.628 7.67l1.064 1.065a3.25 3.25 0 0 1 4.574 4.574l1.064 1.063a4.73 4.73 0 0 0 1.09-3.998l1.043-.292-.187 2.991a.872.872 0 1 0 1.741.098l.206-4.121A1 1 0 0 0 12.224 8h-2.79zM3.023 9.48a3.25 3.25 0 0 0 4.496 4.496l1.077 1.077a4.75 4.75 0 0 1-6.65-6.65z" />
                      </svg> Inclusive System
                    </h4>
                    <button
                      onClick={resetAccessibility}
                      className="text-[9px] font-extrabold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded flex items-center gap-0.5"
                    >
                      <RefreshCw className="w-2.5 h-2.5" /> Reset
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* High Contrast */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">High Contrast Mode</span>
                      <button
                        onClick={() => setHighContrast(!highContrast)}
                        className={`w-9 h-5 rounded-full relative transition-colors ${highContrast ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${highContrast ? 'left-[18px]' : 'left-0.5'}`} />
                      </button>
                    </div>



                    {/* Dyslexia Friendly */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">Dyslexia-Friendly Font</span>
                      <button
                        onClick={() => setDyslexicFont(!dyslexicFont)}
                        className={`w-9 h-5 rounded-full relative transition-colors ${dyslexicFont ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${dyslexicFont ? 'left-[18px]' : 'left-0.5'}`} />
                      </button>
                    </div>

                    {/* Large Touch Targets */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">Expand Touch Zones</span>
                      <button
                        onClick={() => setLargeTapTargets(!largeTapTargets)}
                        className={`w-9 h-5 rounded-full relative transition-colors ${largeTapTargets ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${largeTapTargets ? 'left-[18px]' : 'left-0.5'}`} />
                      </button>
                    </div>

                    {/* Text Scaling Options */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Text Scaling Mode</span>
                        <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase">{fontSize}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {['small', 'medium', 'large', 'xlarge'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setFontSize(sz)}
                            className={`py-1 rounded text-[9px] font-extrabold border transition-colors uppercase ${fontSize === sz ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 text-gray-500 dark:text-gray-400'}`}
                          >
                            {sz.substring(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-100 cursor-pointer"
              aria-label="Toggle Dark/Light Theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-500 animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Bell */}
            <div
              onClick={() => navigate('/dashboard/notifications')}
              className="relative cursor-pointer hover:scale-110 transition-transform"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-blue-500" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full text-[8px] flex items-center justify-center text-white font-bold animate-pulse">
                3
              </span>
            </div>

            {/* Avatar & Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => { setProfileOpen(!profileOpen); setA11yOpen(false); }}
                className="flex items-center gap-2 border-l border-gray-100 dark:border-gray-700 pl-3 cursor-pointer group"
              >
                <div className={`w-8 h-8 rounded-full bg-blue-100 overflow-hidden border-2 shadow-sm transition-all ${profileOpen ? 'border-blue-500 shadow-md scale-100' : 'border-transparent group-hover:border-blue-500'}`}>
                  <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-none mb-0.5 group-hover:text-blue-600 transition-colors">
                    {userName.split(' ')[0]} {userName.split(' ')[1] ? userName.split(' ')[1][0] + '.' : ''}
                  </p>
                  <p className="text-[8px] text-gray-400">Platinum</p>
                </div>
              </div>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div 
                  className="profile-dropdown-container absolute right-0 top-12 w-[280px] rounded-[2rem] overflow-hidden animate-fade-in-up global-card transition-all duration-300"
                  style={{
                    background: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.28)',
                    zIndex: 9999,
                  }}
                >
                  {/* Top Profile Card */}
                  <div className="p-5 border-b border-gray-100 dark:border-gray-800/50 relative overflow-hidden">
                    {/* Subtle glow effect behind profile */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="relative w-14 h-14 rounded-full border-[3px] border-white dark:border-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden shrink-0 group-hover:shadow-lg transition-shadow">
                        <img src={userPhoto} alt={userName} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full z-10 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-[15px] text-gray-900 dark:text-white tracking-tight truncate leading-tight mb-0.5">{userName}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate leading-tight mb-2 opacity-80">{userName.toLowerCase().replace(' ', '.')}@splendin.com</p>
                        
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm border bg-blue-50 border-blue-100 text-blue-600 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400 transition-colors">
                          Platinum Member
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="p-3 space-y-1.5 relative z-10">
                    <button onClick={() => { navigate('/dashboard/profile'); setProfileOpen(false); }} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-[1.25rem] transition-all duration-300 ease-out group hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent hover:border-blue-100 dark:hover:border-blue-800/50">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:shadow-md group-hover:scale-110 shrink-0">
                        <User className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all" />
                      </div>
                      <span className="text-[13px] font-bold tracking-wide">Details</span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </div>
                    </button>

                    <button onClick={() => { navigate('/dashboard/appearance'); setProfileOpen(false); }} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-[1.25rem] transition-all duration-300 ease-out group hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border border-transparent hover:border-blue-100 dark:hover:border-blue-800/50">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white border border-gray-100 dark:bg-gray-800 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:shadow-md group-hover:scale-110 shrink-0">
                        <Palette className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all" />
                      </div>
                      <span className="text-[13px] font-bold tracking-wide">Appearance</span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </div>
                    </button>
                  </div>

                  {/* Logout Button */}
                  <div className="p-4 border-t border-gray-100 dark:border-gray-800/50 relative">
                    <button 
                      onClick={() => { setProfileOpen(false); setLogoutModalOpen(true); }} 
                      className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl transition-all duration-300 group shadow-[0_4px_15px_rgba(255,59,48,0.2)] hover:shadow-[0_8px_25px_rgba(255,59,48,0.35)] hover:-translate-y-0.5 overflow-hidden relative border border-white/10"
                      style={{
                        background: isDark ? 'linear-gradient(135deg, #ff375f, #ff1744)' : 'linear-gradient(135deg, #ff5f6d, #ff3b30)',
                        color: 'white',
                        fontWeight: 600
                      }}
                    >
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                      <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 relative z-10" />
                      <span className="text-[13px] tracking-widest uppercase relative z-10">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Page Content ─────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative pb-20 lg:pb-0 z-10">
          <div className="flex flex-col min-h-full">
            <div className="flex-1">
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>

        {/* ── Mobile: Floating Pay Button ──────────────────────────────────── */}
        <div className="lg:hidden fixed bottom-20 right-4 z-30">
          <button
            onClick={() => navigate('/dashboard/payments')}
            className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border-2 border-white/30"
          >
            <IndianRupee className="w-6 h-6" />
          </button>
          <span className="block text-center text-[8px] font-bold text-blue-600 mt-1">Pay Now</span>
        </div>

        {/* ── Mobile: Bottom Navigation Bar ────────────────────────────────── */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-pb">
          <div className="flex items-stretch h-16">
            {bottomNavItems.map((item) => (
              <BottomNavItem key={item.path} {...item} activePath={currentPath} />
            ))}
          </div>
        </nav>

        {/* ── MAX AI Floating Assistant Orb & Dialog ────────────────────── */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">

          {/* Breathing hint above orb */}
          {aiTipVisible && !aiOpen && (
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 px-3.5 py-2 rounded-2xl text-[10px] font-bold shadow-lg mb-3 animate-float relative mr-2 flex items-center gap-2 global-card">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse shrink-0" />
              <span>Bhai, need help? Ask MAX! 👋</span>
              <button onClick={() => setAiTipVisible(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold ml-1">×</button>
            </div>
          )}

          {/* Conversational Chat Panel */}
          {aiOpen && (
            <div className="w-[340px] h-[450px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden mb-4 animate-fade-in-up flex flex-col justify-between z-50 text-gray-900 dark:text-white global-card">
              {/* Header */}
              <div className="bg-gradient-to-br from-[#0B1F5E] to-[#123FAF] preserve-gradient p-4 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8.5 h-8.5 rounded-lg overflow-hidden flex items-center justify-start relative shrink-0 bg-white shadow-sm">
                    <img src={logoLight?.src || logoLight} alt="Splendin" className="absolute left-[-1px] h-[95%] w-auto max-w-none object-left contrast-[1.12] saturate-[1.18] brightness-[0.93]" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm tracking-tight text-white flex items-center gap-1.5">
                      Splendin <span className="text-[#f7931e]">MAX</span>
                    </h4>
                    <p className="text-[8px] text-blue-200 font-extrabold uppercase tracking-widest mt-0.5">AI Engine</p>
                  </div>
                </div>
                <button
                  onClick={() => setAiOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white font-extrabold"
                >
                  ×
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs font-medium">
                {aiMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl shadow-sm leading-relaxed
                      ${msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700'}
                    `}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preset quick command buttons */}
              <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0">
                <button
                  onClick={() => handleAiSend('Kab hai mera due?')}
                  className="text-[9px] font-bold bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 px-2.5 py-1 rounded-full hover:border-blue-500 transition-colors"
                >
                  due kab hai?
                </button>
                <button
                  onClick={() => handleAiSend('EMI options check karo')}
                  className="text-[9px] font-bold bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 px-2.5 py-1 rounded-full hover:border-blue-500 transition-colors"
                >
                  EMI convert
                </button>
                <button
                  onClick={() => handleAiSend('Show my reward points')}
                  className="text-[9px] font-bold bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 px-2.5 py-1 rounded-full hover:border-blue-500 transition-colors"
                >
                  rewards show
                </button>
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex gap-2 shrink-0">
                <input
                  type="text"
                  placeholder="Ask MAX (e.g. EMI options)..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                  className="flex-1 border border-gray-100 dark:border-gray-700 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-blue-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => handleAiSend()}
                  className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Floating AI Orb trigger */}
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className={`w-14 h-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-[#123FAF] text-white rounded-full shadow-lg shadow-blue-500/35 border-2 border-white/20 flex items-center justify-center hover:scale-100 active:scale-95 transition-all relative overflow-hidden
              ${aiOpen ? 'rotate-180 bg-red-600' : 'animate-pulse-glow'}
            `}
          >
            {aiOpen ? (
              <span className="text-xl font-bold z-10">×</span>
            ) : (
              <div className="w-10 h-10 rounded-full overflow-hidden animate-[spin_4s_linear_infinite] flex items-center justify-start relative shadow-md bg-white border border-white/10 shrink-0">
                <img src={logoLight?.src || logoLight} alt="MAX AI" className="absolute left-[-1.5px] h-[95%] w-auto max-w-none object-left contrast-[1.12] saturate-[1.18] brightness-[0.93]" />
              </div>
            )}
          </button>

        </div>

      </main>

      {/* ── Logout Confirmation Modal ────────────────────────────────────── */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in px-4">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2rem] p-6 lg:p-8 w-full max-w-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-scale-in text-center global-card">
            <div className="w-16 h-16 mx-auto bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-5 border-4 border-red-100 dark:border-red-900/30">
              <LogOut className="w-8 h-8 text-red-500 drop-shadow-sm" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Ready to leave?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 px-2 leading-relaxed">
              Are you sure you want to logout? You will need to login again to access your dashboard.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="flex-1 py-3.5 px-4 rounded-xl font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => { setLogoutModalOpen(false); navigate('/'); }}
                className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#F43F5E] to-[#FB7185] shadow-[0_4px_15px_rgba(244,63,94,0.25)] hover:shadow-[0_8px_25px_rgba(244,63,94,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
