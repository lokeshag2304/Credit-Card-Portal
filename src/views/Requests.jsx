import React, { useState } from 'react';
import { 
  ChevronDown, Search, ArrowRight, FileText, CheckCircle2, Clock, 
  CreditCard, IndianRupee, User, Gift, ShieldAlert, Settings, HelpCircle, 
  MessageSquare, UploadCloud, X, Rocket, Zap, Eye, ShieldCheck, Headphones
} from 'lucide-react';
import toast from 'react-hot-toast';

const Requests = () => {
  const cardsList = [
    { id: 'visa', name: 'Visa Signature', number: '•••• •••• •••• 4567', type: 'VISA', bg: 'bg-blue-900', border: 'border-blue-800', label: 'Primary Card' },
    { id: 'mastercard', name: 'Mastercard World', number: '•••• •••• •••• 8901', type: 'MC', bg: 'bg-[#FF5F00]', border: 'border-orange-600', label: 'Secondary Card' },
    { id: 'amex', name: 'Amex Platinum', number: '•••• •••• •••• 3002', type: 'AMEX', bg: 'bg-teal-900', border: 'border-teal-800', label: 'Corporate Card' }
  ];

  const [activeCard, setActiveCard] = useState(cardsList[0]);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Billing & Statement');
  const [description, setDescription] = useState('');
  const [fileUploaded, setFileUploaded] = useState(true); // default true to match mockup

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) {
      toast.error('Please provide a description.');
      return;
    }
    toast.success('Service request submitted successfully!');
    setDescription('');
    setFileUploaded(false);
  };

  const requestTypes = [
    { id: 'Billing & Statement', desc: 'Dispute charges, incorrect billing, statement issues', icon: FileText, color: 'text-blue-500 bg-blue-50' },
    { id: 'Card Services', desc: 'Request for new card, replacement, upgrade', icon: CreditCard, color: 'text-indigo-500 bg-indigo-50' },
    { id: 'Payments & EMI', desc: 'Payment issues, EMI conversion, refund status', icon: IndianRupee, color: 'text-teal-500 bg-teal-50' },
    { id: 'Account Services', desc: 'Account update, limit increase, information change', icon: User, color: 'text-blue-400 bg-blue-50' },
    { id: 'Rewards & Offers', desc: 'Reward points, offers, cashback related queries', icon: Gift, color: 'text-orange-500 bg-orange-50' },
    { id: 'Fraud & Security', desc: 'Report fraud, unauthorized transactions', icon: ShieldAlert, color: 'text-purple-500 bg-purple-50' },
    { id: 'Technical Support', desc: 'App, login, feature or technical issues', icon: Settings, color: 'text-pink-500 bg-pink-50' },
    { id: 'Other Requests', desc: 'Any other requests or general queries', icon: HelpCircle, color: 'text-gray-500 bg-gray-50' },
  ];

  const activeRequests = [
    { title: 'Dispute on Billing', id: 'REQ12345678', status: 'In Progress', date: '12 May 2024', icon: FileText, color: 'text-blue-500 bg-blue-50', statusColor: 'text-orange-600 bg-orange-50 border-orange-200' },
    { title: 'Card Replacement', id: 'REQ12345679', status: 'Under Review', date: '10 May 2024', icon: CreditCard, color: 'text-red-500 bg-red-50', statusColor: 'text-blue-600 bg-blue-50 border-blue-200' },
    { title: 'Payment Failure', id: 'REQ12345680', status: 'In Progress', date: '08 May 2024', icon: IndianRupee, color: 'text-teal-500 bg-teal-50', statusColor: 'text-orange-600 bg-orange-50 border-orange-200' },
    { title: 'Increase Credit Limit', id: 'REQ12345681', status: 'Under Review', date: '05 May 2024', icon: User, color: 'text-purple-500 bg-purple-50', statusColor: 'text-blue-600 bg-blue-50 border-blue-200' },
  ];

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto bg-[#F8FAFC] dark:bg-gray-900 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Service Requests</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Service Requests</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Raise, track and manage your requests with ease</p>
        </div>
        <div className="relative z-35">
          <div 
            onClick={() => setCardDropdownOpen(!cardDropdownOpen)}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-2.5 flex items-center gap-3 cursor-pointer hover:border-blue-400 transition-colors shadow-sm global-card"
          >
            <div className={`w-12 h-7 ${activeCard.bg} rounded-[4px] relative overflow-hidden flex items-center justify-center border ${activeCard.border} shrink-0`}>
               <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
               <div className="text-[6px] font-bold text-white relative z-10 font-mono tracking-widest">{activeCard.type}</div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{activeCard.name} {activeCard.number.slice(-4)}</p>
              <p className="text-[10px] text-gray-500 font-medium">{activeCard.label}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 transition-transform duration-300 ${cardDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {cardDropdownOpen && (
            <>
              {/* Dropdown Clickaway Backdrop */}
              <div className="fixed inset-0 z-40 cursor-default" onClick={() => setCardDropdownOpen(false)}></div>
              
              <div className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-[#071426]/95 backdrop-blur-2xl border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl py-2 animate-fade-in z-50 global-card">
                <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase px-4 py-1.5 tracking-wider border-b border-gray-100 dark:border-white/5 mb-1">Select Credit Card</p>
                {cardsList.map((card) => (
                  <div 
                    key={card.id}
                    onClick={() => {
                      setActiveCard(card);
                      setCardDropdownOpen(false);
                      toast.success(`Switched request context to ${card.name}`);
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
                    {activeCard.id === card.id && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-blue-600 dark:text-[#00E5FF] shrink-0">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 hover:shadow-md transition-shadow global-card">
          <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900">
             <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Requests</p>
            <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-0.5">12</h4>
            <p className="text-[10px] text-gray-500 font-medium">All time requests</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 hover:shadow-md transition-shadow global-card">
          <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-900">
             <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Active Requests</p>
            <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-0.5">4</h4>
            <p className="text-[10px] text-gray-500 font-medium">In progress</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 hover:shadow-md transition-shadow global-card">
          <div className="w-14 h-14 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100 dark:border-orange-900">
             <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">Resolved Requests</p>
            <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-0.5">8</h4>
            <p className="text-[10px] text-gray-500 font-medium">Completed</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Panel - Request Types */}
        <div className="lg:w-[30%] space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col global-card">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-[15px] mb-1">Request Types</h3>
              <p className="text-[11px] text-gray-500">Select a type to raise a new request</p>
            </div>
            
            <div className="p-3 space-y-1 flex-1">
              {requestTypes.map((type) => (
                <div 
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border ${selectedType === type.id ? 'bg-blue-50/50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 shadow-sm' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-100 dark:hover:border-gray-600'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${type.color}`}>
                      <type.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm ${selectedType === type.id ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>{type.id}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{type.desc}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 transform -rotate-90 transition-colors ${selectedType === type.id ? 'text-blue-600' : 'text-gray-400'}`} />
                </div>
              ))}
            </div>

            {/* Support CTA */}
            <div className="p-5 bg-gray-50/80 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 m-3 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">Can't find what you need?</h4>
                  <p className="text-[9px] text-gray-500 mt-0.5 leading-tight">Chat with our support team for immediate assistance.</p>
                </div>
              </div>
              <button className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold py-1.5 px-3 rounded-lg text-xs shadow-sm hover:border-blue-400 transition-colors shrink-0 global-card">
                Chat Now
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel - Request Form */}
        <div className="lg:w-[40%] bg-white dark:bg-gray-800 rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col global-card">
          <h3 className="font-bold text-[18px] mb-1">Raise a New Request</h3>
          <p className="text-xs text-gray-500 mb-8">Fill in the details and we'll get back to you</p>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                Request Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-semibold appearance-none outline-none focus:border-blue-500 transition-colors cursor-pointer text-gray-900 dark:text-white"
                >
                  {requestTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.id}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="mb-6 relative">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                placeholder="Please provide a detailed description of your issue..."
                className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors h-32 resize-none text-gray-900 dark:text-white placeholder-gray-400"
              />
              <span className="absolute bottom-3 right-3 text-[10px] font-bold text-gray-400">{description.length}/500</span>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                Attachments <span className="text-gray-400 font-medium">(Optional)</span>
              </label>
              
              <div className="border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors mb-4 group">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Click to upload</span> or drag and drop
                </p>
                <p className="text-[10px] text-gray-500">PDF, JPG, PNG (Max. 5MB each)</p>
              </div>

              {/* Uploaded File Preview */}
              {fileUploaded && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl animate-fade-in-up">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-600">
                      <FileText className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Statement_May2024.pdf</p>
                      <p className="text-[10px] text-gray-500">1.2 MB</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setFileUploaded(false)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6">
                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-[11px] text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
                  Your request will be reviewed by our team and we will get back to you within 24-48 business hours.
                </p>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors text-sm">
                Submit Request
              </button>
            </div>
          </form>
        </div>

        {/* Right Panel - Active Requests & Widgets */}
        <div className="lg:w-[30%] space-y-6">
          
          {/* Active Requests */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 global-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[15px]">Active Requests</h3>
              <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
            </div>
            
            <div className="space-y-3">
              {activeRequests.map((req, i) => (
                <div key={i} className="flex justify-between items-center p-3 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-colors group bg-white dark:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${req.color}`}>
                      <req.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{req.title}</h4>
                      <p className="text-[9px] text-gray-500 mt-0.5">{req.id}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${req.statusColor}`}>
                      {req.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-medium">{req.date}</span>
                      <ChevronDown className="w-3 h-3 text-gray-400 transform -rotate-90 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help Widget */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-6 shadow-sm border border-blue-100 dark:border-blue-800/50 relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10 w-2/3">
              <h3 className="font-bold text-[15px] text-gray-900 dark:text-white mb-2">Need Help?</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">Get quick answers to common questions</p>
              <button className="bg-white border border-blue-200 dark:bg-gray-800 dark:border-gray-600 hover:border-blue-400 text-blue-600 dark:text-blue-400 font-bold py-2 px-5 rounded-xl transition-colors shadow-sm text-xs global-card">
                View FAQs
              </button>
            </div>
            {/* Minimal Illustration Mock */}
            <div className="absolute right-0 bottom-0 w-32 h-32 pointer-events-none opacity-80 flex items-center justify-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center transform rotate-12 shadow-inner border border-white/50 relative">
                <HelpCircle className="w-8 h-8 text-blue-500" />
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 flex items-center justify-center transform -rotate-12">
                   <MessageSquare className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Exclusive Promo */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden flex items-center justify-between global-card">
            <div className="relative z-10 w-2/3">
              <h3 className="font-bold text-[14px] text-gray-900 dark:text-white mb-1.5">Exclusive for You!</h3>
              <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">Get faster resolutions with Priority Support</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-lg shadow transition-colors text-xs">
                Upgrade Now
              </button>
            </div>
            {/* Rocket Mock */}
            <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 pointer-events-none">
              <Rocket className="w-16 h-16 text-orange-500 transform rotate-45 opacity-80" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Trust Section */}
      <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs font-bold text-gray-900 dark:text-white mb-6">Why choose Splendin Service?</p>
        <div className="flex flex-wrap justify-between gap-6 text-left">
          {[
            { icon: Clock, title: "Fast Resolution", desc: "We resolve most requests within 24-48 hours", color: "text-blue-600 bg-blue-50 border-blue-100" },
            { icon: Eye, title: "Transparent Tracking", desc: "Track your request status in real-time", color: "text-purple-600 bg-purple-50 border-purple-100" },
            { icon: ShieldCheck, title: "Secure & Reliable", desc: "Your data and requests are 100% secure", color: "text-teal-600 bg-teal-50 border-teal-100" },
            { icon: Settings, title: "Expert Support", desc: "Dedicated team to assist you", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
            { icon: MessageSquare, title: "Multiple Channels", desc: "Raise requests via web, app or chat", color: "text-orange-600 bg-orange-50 border-orange-100" }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 text-gray-500 dark:text-gray-400 flex-1 min-w-[200px]">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${item.color} dark:bg-gray-800 dark:border-gray-700`}>
                 <item.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-900 dark:text-gray-300 mb-1">{item.title}</span>
                <span className="block text-[10px] leading-relaxed pr-4">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Requests;
