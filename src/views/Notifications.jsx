import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, ShieldAlert, ShieldCheck, Gift, Calendar, Bookmark, 
  ChevronDown, Search, Filter, CalendarDays, ArrowRight,
  MoreVertical, Shield, IndianRupee, FileText, Settings, Sparkles, Bot, Headphones
} from 'lucide-react';
import toast from 'react-hot-toast';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const filterTabs = ['All', 'Transactions', 'Payments', 'Rewards', 'Security', 'EMI & Loans', 'Service Requests', 'Offers', 'System Updates'];

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'Payments', title: 'Payment of ₹25,430 successful', desc: 'Your credit card payment has been received successfully.', time: '2 mins ago', unread: true, icon: IndianRupee, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/40', dot: 'bg-blue-500', action: null, bookmarked: false },
    { id: 2, type: 'Rewards', title: 'Congratulations! New cashback offer unlocked 🎉', desc: 'You have unlocked a special cashback offer. Shop now and save more!', time: '15 mins ago', unread: true, icon: Gift, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/40', dot: 'bg-purple-500', action: 'View Offer', bookmarked: false },
    { id: 3, type: 'Security', title: 'International transaction blocked', desc: 'A transaction of $129.99 at EVRI*APPLE.COM was blocked.', time: '1 hour ago', unread: false, icon: ShieldAlert, color: 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/40', dot: 'bg-red-500', action: 'View Details', bookmarked: false },
    { id: 4, type: 'EMI & Loans', title: 'EMI payment due tomorrow', desc: 'Your EMI of ₹12,850 is due on 15 May 2024.', time: '2 hours ago', unread: false, icon: Calendar, color: 'text-teal-500 bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-900/40', dot: 'bg-teal-500', action: 'Pay Now', bookmarked: false },
    { id: 5, type: 'Service Requests', title: 'Your service request is resolved', desc: 'Your request REQ12345678 has been resolved successfully.', time: '3 hours ago', unread: false, icon: Headphones, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/40', dot: 'bg-indigo-500', action: 'View Details', bookmarked: false },
    { id: 6, type: 'Rewards', title: 'Reward points credited', desc: '1,250 reward points have been credited to your account.', time: '5 hours ago', unread: false, icon: Gift, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/40', dot: 'bg-orange-500', action: null, bookmarked: false },
    { id: 7, type: 'Statements', title: 'New statement generated', desc: 'Your credit card statement for Apr 2024 is now available.', time: '1 day ago', unread: false, icon: FileText, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/40', dot: 'bg-blue-500', action: 'View Statement', bookmarked: false },
    { id: 8, type: 'Offers', title: 'Weekend Special: Extra 10% off', desc: 'Use your card for weekend shopping and get extra 10% off.', time: '1 day ago', unread: false, icon: Sparkles, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/40', dot: 'bg-orange-500', action: 'Explore Offers', bookmarked: false },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast.success('All notifications marked as read.');
  };

  const toggleBookmark = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        const nextState = !n.bookmarked;
        toast.success(nextState ? 'Notification bookmarked!' : 'Bookmark removed.');
        return { ...n, bookmarked: nextState };
      }
      return n;
    }));
  };

  const toggleReadStatus = (id) => {
    setNotifications(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, unread: !n.unread };
      }
      return n;
    }));
  };

  const handleActionClick = (actionName) => {
    toast.success(`Action triggered: "${actionName}"`);
  };

  // Filter notifications list
  const filteredNotifications = notifications.filter(notif => {
    // 1. Unread only
    if (unreadOnly && !notif.unread) return false;

    // 2. Category Tab Filter
    if (activeFilter !== 'All') {
      const typeLower = notif.type.toLowerCase();
      const activeLower = activeFilter.toLowerCase();
      
      if (activeFilter === 'Transactions' && (typeLower === 'payments' || typeLower === 'emi & loans')) {
        // Transactions maps to payments and EMIs
      } else if (activeFilter === 'System Updates' && typeLower === 'statements') {
        // System updates maps to statements
      } else if (typeLower !== activeLower) {
        return false;
      }
    }

    // 3. Search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = notif.title.toLowerCase().includes(query);
      const matchDesc = notif.desc.toLowerCase().includes(query);
      const matchType = notif.type.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc && !matchType) return false;
    }

    // 4. Priority Filter
    if (priorityFilter !== 'All') {
      if (priorityFilter === 'High' && notif.type !== 'Security') return false;
      if (priorityFilter === 'Medium' && notif.type !== 'Payments' && notif.type !== 'EMI & Loans') return false;
      if (priorityFilter === 'Low' && (notif.type === 'Security' || notif.type === 'Payments' || notif.type === 'EMI & Loans')) return false;
    }

    return true;
  });

  const MiniTrend = ({ stroke }) => (
    <svg viewBox="0 0 40 20" className="w-10 h-5 overflow-visible">
      <path d="M0 15 Q5 5 10 10 T20 5 T30 15 T40 5" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  
  // Dynamic stats
  const totalCount = notifications.length;
  const unreadCount = notifications.filter(n => n.unread).length;
  const securityCount = notifications.filter(n => n.type === 'Security').length;
  const promoCount = notifications.filter(n => n.type === 'Offers' || n.type === 'Rewards').length;
  const paymentReminderCount = notifications.filter(n => n.type === 'EMI & Loans' || n.type === 'Payments').length;

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto bg-transparent min-h-0 flex-1 flex flex-col relative select-none">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Notifications</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Notifications & Alerts</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Stay updated with your account activity, offers and security alerts</p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100/50 dark:border-green-900/35">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
             <div className="flex flex-col">
               <span className="text-[10px] font-bold text-green-700 dark:text-green-400 leading-tight">Live sync</span>
               <span className="text-[9px] text-green-600/80 leading-tight">Just now</span>
             </div>
          </div>
          <button 
            onClick={handleMarkAllRead} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:shadow-[0_6px_16px_rgba(37,99,235,0.35)] cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark all read
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Notifications', value: totalCount, sub: 'All time', icon: Bell, color: 'text-blue-500 bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/40', trend: '#3b82f6' },
          { label: 'Unread Alerts', value: unreadCount, sub: 'Requires attention', icon: Bookmark, color: 'text-purple-500 bg-purple-50 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900/40', trend: '#a855f7' },
          { label: 'Security Alerts', value: securityCount, sub: 'Critical security', icon: ShieldAlert, color: 'text-red-500 bg-red-50 border-red-100 dark:bg-red-950/20 dark:border-red-900/40', trend: '#ef4444' },
          { label: 'Promotional Offers', value: promoCount, sub: 'New rewards', icon: Gift, color: 'text-orange-500 bg-orange-50 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/40', trend: '#f97316' },
          { label: 'Payment Reminders', value: paymentReminderCount, sub: 'Upcoming EMIs', icon: Calendar, color: 'text-teal-500 bg-teal-50 border-teal-100 dark:bg-teal-950/20 dark:border-teal-900/40', trend: '#14b8a6' },
        ].map((card, idx) => (
          <div key={idx} className="p-5 flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-default global-card">
             <div className="flex justify-between items-start mb-3">
               <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${card.color}`}>
                  <card.icon className="w-4 h-4" />
               </div>
             </div>
             <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1">{card.label}</p>
             <div className="flex justify-between items-end">
               <div>
                 <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white leading-none mb-1">{card.value}</h4>
                 <p className="text-[10px] text-gray-500 font-medium">{card.sub}</p>
               </div>
               <div className="opacity-70"><MiniTrend stroke={card.trend} /></div>
             </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1">
        
        {/* Left Side: Filters & Feed (70%) */}
        <div className="xl:w-[70%] flex flex-col">
          
          {/* Smart Filters */}
          <div className="p-5 mb-4 space-y-4 global-card relative z-30">
            
            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {filterTabs.map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${activeFilter === tab ? 'bg-blue-600 text-white shadow-md dark:bg-blue-500' : 'border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filter Controls Row */}
            <div className="flex flex-wrap justify-between items-center gap-4 border-t border-gray-100 dark:border-white/5 pt-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button 
                    onClick={() => setShowPriorityDropdown(!showPriorityDropdown)} 
                    className="flex items-center gap-2 border border-gray-100 dark:border-white/5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer select-none"
                  >
                    <Filter className="w-3.5 h-3.5 text-blue-500" /> Priorities: <span className="text-blue-600 dark:text-[#00E5FF]">{priorityFilter}</span> <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                  {showPriorityDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#071426] border border-gray-100 dark:border-white/10 rounded-xl shadow-lg z-50 py-1.5 w-32 animate-fade-in-up">
                      {['All', 'High', 'Medium', 'Low'].map((prio) => (
                        <div 
                          key={prio} 
                          onClick={() => { setPriorityFilter(prio); setShowPriorityDropdown(false); }}
                          className={`px-3 py-1.5 text-xs font-bold cursor-pointer transition-colors ${priorityFilter === prio ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                        >
                          {prio}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <input 
                    type="checkbox" 
                    checked={unreadOnly} 
                    onChange={() => setUnreadOnly(!unreadOnly)} 
                    className="sr-only" 
                  />
                  <div className={`w-8 h-4 rounded-full transition-colors relative ${unreadOnly ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${unreadOnly ? 'left-[18px]' : 'left-0.5'}`}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">Unread only</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search notifications..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 rounded-lg text-xs outline-none focus:border-blue-500 w-64 text-gray-800 dark:text-white" 
                  />
                </div>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveFilter('All'); setPriorityFilter('All'); setUnreadOnly(false); }} 
                  className="px-3 py-1.5 border border-gray-100 dark:border-white/5 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Feed */}
          <div className="overflow-hidden flex flex-col flex-1 global-card">
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3 animate-pulse" />
                  <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300">No notifications found</h4>
                  <p className="text-xs text-gray-400 max-w-[280px] mt-1">Try resetting filters or search queries to view other notifications.</p>
                </div>
              ) : (
                filteredNotifications.map((notif) => (
                  <div key={notif.id} className={`flex items-start gap-4 p-4 lg:p-5 border-b border-gray-50 dark:border-white/5 hover:bg-gray-50/40 dark:hover:bg-gray-800/20 transition-colors group relative ${notif.unread ? 'bg-blue-50/5 dark:bg-blue-900/5' : ''}`}>
                     
                     {/* Unread Indicator */}
                     <div className="w-2 flex justify-center pt-2 shrink-0">
                       {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]"></span>}
                     </div>
                     
                     {/* Icon */}
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${notif.color} relative cursor-pointer`} onClick={() => toggleReadStatus(notif.id)}>
                       <notif.icon className="w-5 h-5" />
                     </div>

                     {/* Content */}
                     <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-1">
                          <h4 className={`text-[13px] font-bold truncate pr-4 cursor-pointer hover:text-blue-500 transition-colors ${notif.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`} onClick={() => toggleReadStatus(notif.id)}>
                            {notif.title}
                          </h4>
                          <div className="flex items-center gap-3 shrink-0 text-[10px] font-bold">
                            <span className={`px-2 py-0.5 rounded border border-gray-100/50 dark:border-gray-900 ${notif.color.split(' ')[0]}`}>{notif.type}</span>
                            <span className="text-gray-400 font-medium">{notif.time}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">{notif.desc}</p>
                        
                        {/* Optional Action Button */}
                        {notif.action && (
                          <button 
                            onClick={() => handleActionClick(notif.action)}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/40 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors cursor-pointer"
                          >
                            {notif.action}
                          </button>
                        )}
                     </div>

                     {/* Hover Actions */}
                     <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shrink-0 self-center pl-2">
                       <button 
                         onClick={() => toggleBookmark(notif.id)}
                         className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${notif.bookmarked ? 'text-orange-500 border-orange-100 bg-orange-50 dark:border-orange-950/30 dark:bg-orange-950/20' : 'text-gray-400 border-gray-100 dark:border-white/5 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'}`}
                         title="Bookmark notification"
                       >
                         <Bookmark className={`w-3.5 h-3.5 ${notif.bookmarked ? 'fill-orange-500' : ''}`} />
                       </button>
                       <button 
                         onClick={() => toggleReadStatus(notif.id)}
                         className="p-1.5 text-gray-400 border border-gray-100 dark:border-white/5 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                         title={notif.unread ? "Mark as read" : "Mark as unread"}
                       >
                         <CheckCircle2 className="w-3.5 h-3.5" />
                       </button>
                     </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-[11px] font-bold text-gray-500 bg-gray-50/20 dark:bg-gray-900/10">
               <span>Showing {filteredNotifications.length} of {notifications.length} notifications</span>
               <div className="flex items-center gap-1">
                 <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"><ChevronDown className="w-3 h-3 transform rotate-90" /></button>
                 <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm font-bold">1</button>
                 <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"><ChevronDown className="w-3 h-3 transform -rotate-90" /></button>
               </div>
            </div>
          </div>

        </div>

        {/* Right Side Widgets (30%) */}
        <div className="xl:w-[30%] space-y-6">
          
          {/* Priority Alerts */}
          <div className="p-6 global-card">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-[14px]">Priority Alerts</h3>
              <button onClick={() => setPriorityFilter('High')} className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">Filter High</button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30"><ShieldAlert className="w-3.5 h-3.5" /></div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">Suspicious login detected</h4>
                  <p className="text-[9px] text-gray-500 mt-0.5 font-medium">2 mins ago • Security</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30"><IndianRupee className="w-3.5 h-3.5" /></div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">High value transaction</h4>
                  <p className="text-[9px] text-gray-500 mt-0.5 font-medium">1 hour ago • Payments</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0 border border-green-100 dark:bg-green-950/20 dark:border-green-900/30"><Shield className="w-3.5 h-3.5" /></div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">Card limit almost reached</h4>
                  <p className="text-[9px] text-gray-500 mt-0.5 font-medium">3 hours ago • Limit</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => { setPriorityFilter('High'); toast.success('Filtered by High Priority Alerts'); }}
              className="w-full mt-5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-950/30 text-red-600 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-red-100 cursor-pointer"
            >
              View all priority alerts <ArrowRight className="w-3.5 h-3.5 animate-bounce-horizontal" />
            </button>
          </div>

          {/* Upcoming Payment */}
          <div className="p-6 global-card">
            <h3 className="font-bold text-[14px] mb-4">Upcoming Payment</h3>
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-white/5 mb-4">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-6 bg-blue-900 rounded-[3px] flex items-center justify-center text-[5px] text-white font-bold tracking-widest shrink-0 shadow-inner">VISA</div>
                 <div>
                   <p className="text-[10px] font-bold text-gray-900 dark:text-white leading-tight">Credit Card Payment</p>
                   <p className="text-[9px] text-gray-500 font-mono">.... 4567</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className="text-[9px] text-gray-500 font-bold uppercase mb-0.5">Due in</p>
                 <p className="text-sm font-extrabold text-orange-500">02 <span className="text-[10px]">Days</span></p>
               </div>
            </div>
            <div className="flex justify-between items-end">
               <div>
                 <p className="text-[10px] font-bold text-gray-500 uppercase mb-0.5">Amount Due</p>
                 <p className="text-lg font-extrabold text-gray-900 dark:text-white">₹25,430.00</p>
               </div>
               <button 
                 onClick={() => handleActionClick('Payment Process initiated')}
                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
               >
                 Pay Now
               </button>
            </div>
          </div>

          {/* Latest Security Activity */}
          <div className="p-6 global-card">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-[14px]">Latest Security Activity</h3>
              <button onClick={() => setActiveFilter('Security')} className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">Filter Security</button>
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-start">
                 <div className="flex gap-2 items-start">
                   <ShieldCheck className="w-3.5 h-3.5 text-blue-500 mt-0.5" />
                   <div>
                     <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Login from new device</p>
                     <p className="text-[9px] text-gray-500">Mumbai, India</p>
                   </div>
                 </div>
                 <span className="text-[9px] font-bold text-gray-400">2 mins ago</span>
               </div>
               <div className="flex justify-between items-start">
                 <div className="flex gap-2 items-start">
                   <ShieldCheck className="w-3.5 h-3.5 text-green-500 mt-0.5" />
                   <div>
                     <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Password changed</p>
                   </div>
                 </div>
                 <span className="text-[9px] font-bold text-gray-400">4 hours ago</span>
               </div>
               <div className="flex justify-between items-start">
                 <div className="flex gap-2 items-start">
                   <ShieldCheck className="w-3.5 h-3.5 text-green-500 mt-0.5" />
                   <div>
                     <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">2FA enabled</p>
                   </div>
                 </div>
                 <span className="text-[9px] font-bold text-gray-400">2 days ago</span>
               </div>
            </div>
          </div>

          {/* AI Smart Suggestion Promo */}
          <div className="bg-gradient-to-br from-[#0B1F5E] to-[#123FAF] preserve-gradient rounded-[2rem] p-6 shadow-lg border border-blue-800/50 text-white relative overflow-hidden">
            <div className="relative z-10 w-3/4">
               <div className="flex items-center gap-2 mb-2">
                 <h3 className="font-bold text-[13px]">AI Smart Suggestion</h3>
                 <span className="text-[8px] bg-blue-500/40 border border-blue-400/50 px-1.5 py-0.5 rounded font-bold tracking-widest">BETA</span>
               </div>
               <p className="text-[10px] text-blue-200 mb-5 leading-relaxed">Enable smart notifications to get personalized alerts that matter most to you.</p>
               <button 
                 onClick={() => toast.success('Smart alerts successfully enabled!')}
                 className="bg-blue-600 hover:bg-blue-500 border border-blue-400 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
               >
                 Enable Smart Alerts
               </button>
            </div>
            {/* Robot illustration mock */}
            <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-90 pointer-events-none">
              <Bot className="w-16 h-16 text-blue-300 transform -rotate-12 absolute bottom-2 right-4 drop-shadow-lg" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notifications;
