import React, { useState, useRef } from 'react';
import { 
  Search, Mic, ChevronRight, ChevronDown, CheckCircle2, MessageSquare, 
  Phone, Mail, FileText, ShieldAlert, AlertTriangle, Download, 
  CreditCard, Calendar, Gift, Lock, ShieldCheck, Send, Paperclip,
  Bot, Clock, Headphones, X, Zap, Shield, Sparkles, Copy, ExternalLink,
  HelpCircle, Trash2, ArrowUpRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const Support = () => {
  const [activeFaqCategory, setActiveFaqCategory] = useState('Payments');
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Contact section tabs: 'message' or 'connect'
  const [activeContactMethod, setActiveContactMethod] = useState('message');

  // Interactive screenshot attachment state
  const [screenshot, setScreenshot] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const screenshotInputRef = useRef(null);

  // Sidebar MAX AI widget states
  const [sidebarMessages, setSidebarMessages] = useState([
    { sender: 'ai', text: `Namaste ${localStorage.getItem('splendin_username')?.split(' ')[0] || 'Rahul'}! 👋 Main Max hoon. How can I help you today? Ask me about payments, EMIs, or limits.` }
  ]);
  const [sidebarInput, setSidebarInput] = useState('');
  const [sidebarLoading, setSidebarLoading] = useState(false);

  // Form submission state
  const [formData, setFormData] = useState({
    name: localStorage.getItem('splendin_username') || 'Rahul Sharma',
    email: 'rahul.sharma@splendin.com',
    category: 'Payments',
    relatedTo: 'Transaction',
    message: ''
  });

  const faqCategories = [
    { id: 'Payments', icon: CreditCard, color: 'text-blue-500 dark:text-blue-400' },
    { id: 'Statements', icon: FileText, color: 'text-indigo-500 dark:text-indigo-400' },
    { id: 'EMI & Loans', icon: Calendar, color: 'text-teal-500 dark:text-teal-400' },
    { id: 'Rewards', icon: Gift, color: 'text-orange-500 dark:text-orange-400' },
    { id: 'Card Controls', icon: Lock, color: 'text-rose-500 dark:text-rose-400' },
    { id: 'Security', icon: ShieldCheck, color: 'text-green-500 dark:text-green-400' },
    { id: 'Service Requests', icon: Headphones, color: 'text-purple-500 dark:text-purple-400' }
  ];

  const faqsByCategory = {
    'Payments': [
      { question: 'How do I make a credit card payment?', answer: 'You can make a payment instantly using Net Banking, UPI, debit card or bank transfer through our app. Go to the Payments section, select your card, and make a real-time clearance payment.', link: 'Go to Payments', path: '/dashboard/payments' },
      { question: 'Why is my payment pending?', answer: 'Payments made via third-party apps can take up to 24-48 hours to settle. For instant updates, we recommend paying directly through the Splendin portal.', link: null },
      { question: 'Are there any charges for UPI card payments?', answer: 'No, Splendin does not charge any processing fees for payments made via UPI or standard Net Banking channels.', link: null }
    ],
    'Statements': [
      { question: 'When is my monthly statement generated?', answer: 'Your credit card billing statement is generated on the 20th of every month and sent via email and SMS.', link: 'View Statements', path: '/dashboard/statements' },
      { question: 'How can I download old statements?', answer: 'You can download up to 36 months of previous statements in PDF or Excel format from the Statements tab under the dashboard.', link: 'Download History', path: '/dashboard/statements' },
      { question: 'What should I do if there is an incorrect charge?', answer: 'If you spot a transaction you did not authorize, you can raise a temporary dispute directly from the transactions screen or statements detail view.', link: 'Raise Dispute', path: '/dashboard/transactions' }
    ],
    'EMI & Loans': [
      { question: 'How can I convert a transaction into EMI?', answer: 'Any transaction above ₹2,500 can be converted to easy EMIs. Simply go to the EMI & Loans page, choose the transaction, and pick your tenure (3, 6, 12, or 24 months).', link: 'View EMI Options', path: '/dashboard/emi-loans' },
      { question: 'What is the interest rate for EMIs?', answer: 'Interest rates range from 12% to 15% per annum, depending on the chosen tenure and promotional offers. You can check individual rates before final submission.', link: null },
      { question: 'Can I preclose my active loan or EMI?', answer: 'Yes, you can preclose your active EMI by contacting our customer care line. Note that a nominal preclosure fee of 2% may apply.', link: null }
    ],
    'Rewards': [
      { question: 'How do I earn Splendin reward points?', answer: 'You earn 5x points on online shopping and dining, 2x points on utilities, and 1x point on all other retail transactions.', link: 'Check Rates', path: '/dashboard/rewards' },
      { question: 'How do I redeem my reward points?', answer: 'Go to the Rewards section, choose from Amazon/Flipkart shopping vouchers, movie tickets, or instantly convert points to cash credits against your outstanding bill.', link: 'Browse Catalog', path: '/dashboard/rewards' },
      { question: 'Do Splendin reward points expire?', answer: 'No! Splendin reward points come with lifetime validity, meaning they never expire as long as your account is active.', link: null }
    ],
    'Card Controls': [
      { question: 'How do I temporarily lock my credit card?', answer: 'You can instantly freeze or unblock your card in one click from the Card Controls panel to prevent unauthorized transactions.', link: 'Go to Card Controls', path: '/dashboard/controls' },
      { question: 'How do I change my credit card PIN?', answer: 'Navigate to Card Controls, select Change PIN, enter your new 4-digit code, and verify with a secure OTP sent to your registered mobile number.', link: null },
      { question: 'How do I enable international usage?', answer: 'Under Card Controls, toggle on the International Usage option. You can also customize daily transaction limits for ATM, POS, and online purchases.', link: null }
    ],
    'Security': [
      { question: 'Is my credit card covered by insurance?', answer: 'Yes, all Splendin credit cards come with complimentary Zero Lost Card Liability cover. Report a lost card immediately to avail complete protection.', link: 'View Security Policy', path: null },
      { question: 'What is a secure Virtual Card?', answer: 'A Virtual Card is a temporary credit card number created online for safer digital shopping, shielding your physical card details from merchants.', link: null },
      { question: 'How does Splendin protect against online fraud?', answer: 'We employ multi-factor verification, real-time AI anomaly detection, and end-to-end standard encryption across all transactional APIs.', link: null }
    ],
    'Service Requests': [
      { question: 'How do I request a credit limit increase?', answer: 'If eligible, a "Limit Increase" offer will appear in your Requests page. Alternatively, you can upload income proofs to raise a manual request.', link: 'Submit Request', path: '/dashboard/requests' },
      { question: 'How long does physical card delivery take?', answer: 'Once approved, your physical card is dispatched within 24 hours. Delivery typically takes 3-5 business days depending on your location.', link: null },
      { question: 'How do I update my registered mobile number?', answer: 'To change your mobile number or email, go to Profile and verify the change securely with biometric or secondary factor validation.', link: 'Go to Profile', path: '/dashboard/profile' }
    ]
  };

  const handleCategoryClick = (catId) => {
    setActiveFaqCategory(catId);
    setExpandedFaq(0);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const tid = toast.loading('Sending secure support message...');
    setTimeout(() => {
      toast.dismiss(tid);
      toast.success('Ticket submitted successfully! Support ID: SPL-TKT-' + Math.floor(Math.random() * 900000 + 100000));
      setFormData(prev => ({ ...prev, message: '' }));
      setScreenshot(null);
      setUploadProgress(0);
    }, 1500);
  };

  const handleScreenshotClick = () => {
    if (screenshotInputRef.current) {
      screenshotInputRef.current.click();
    }
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setScreenshot(file);
    setIsUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success(`"${file.name}" uploaded securely!`);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  const removeScreenshot = (e) => {
    e.stopPropagation();
    setScreenshot(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (screenshotInputRef.current) screenshotInputRef.current.value = '';
    toast.success("Screenshot removed.");
  };

  const handleSidebarSend = (e) => {
    e.preventDefault();
    const query = sidebarInput.trim();
    if (!query) return;

    const newMsgs = [...sidebarMessages, { sender: 'user', text: query }];
    setSidebarMessages(newMsgs);
    setSidebarInput('');
    setSidebarLoading(true);

    setTimeout(() => {
      setSidebarLoading(false);
      let reply = "Let me look that up in your secure account profile... Is there anything else you want to ask?";
      const lower = query.toLowerCase();
      
      if (lower.includes('card') || lower.includes('block') || lower.includes('lost')) {
        reply = "Aap Card Controls page se instantly card block/unblock kar sakte hain. Agar card ghum gaya hai, toh sidebar me 'Report Lost Card' button use karein to permanently block and reissue.";
      } else if (lower.includes('payment') || lower.includes('fail') || lower.includes('due') || lower.includes('pay')) {
        reply = "Rahul, payment due status check karne ke liye 'Payments' tab par jaein. Aapka current balance ₹25,430 hai. Kisi specific payment transaction details ke liye 'Transactions' click karein.";
      } else if (lower.includes('limit') || lower.includes('increase') || lower.includes('eligible')) {
        reply = "Aapke solid payment behavior ke basis par, aap extra ₹50,000 credit limit increment ke liye eligible ho sakte hain. Service raise karne ke liye 'Requests' tab explore karein.";
      } else if (lower.includes('emi') || lower.includes('loan') || lower.includes('convert')) {
        reply = "Aap kisi bhi payment transaction (₹2,500 se upar) ko monthly low-interest EMIs me change kar sakte hain dashboard ke 'EMI & Loans' portal se.";
      } else if (lower.includes('statement') || lower.includes('pdf')) {
        reply = "Aap monthly statements verify & download directly 'Statements' section se kar sakte hain. PDF & Excel options pre-loaded hain.";
      } else if (lower.includes('thank') || lower.includes('shukriya') || lower.includes('ok')) {
        reply = "Aapka swagat hai Rahul! 🌟 Splendin customer priority hi sab kuch hai. Any other help?";
      }

      setSidebarMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1200);
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  // Quick action click simulator
  const handleQuickAction = (actionName, info) => {
    toast.success(`${actionName} triggered! ${info}`);
  };

  // FAQs filtering based on search query
  const currentFaqs = faqsByCategory[activeFaqCategory] || [];
  const filteredFaqs = searchQuery 
    ? Object.values(faqsByCategory).flat().filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentFaqs;

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto min-h-screen flex flex-col relative">
      {/* Background rich design flows */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-700/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[45%] h-[45%] bg-[#00E5FF]/4 dark:bg-[#00E5FF]/3 blur-[110px] rounded-full pointer-events-none -z-10"></div>

      {/* Top Breadcrumb */}
      <div className="flex justify-between items-center mb-6 relative z-10">
         <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="px-1 text-gray-400 dark:text-gray-700 font-bold">&gt;</span>
            <span className="text-gray-900 dark:text-gray-300 font-extrabold">Help & Support</span>
         </div>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4 border-b border-gray-100 dark:border-white/5 pb-6 relative z-10">
        <div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Help & Support</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Get instant support, trace complaints or chat with our experts</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs font-bold">
           <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950/20 px-3 py-1.5 rounded-xl border border-green-100 dark:border-green-800/40">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Specialists Online
           </div>
           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
             <Clock className="w-4 h-4 text-blue-500" /> Avg. Wait: ~2 mins
           </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 relative z-10">
        
        {/* Main Content Area (Left 71%) */}
        <div className="xl:w-[71%] space-y-6">
          
          {/* Smart Search Banner - Premium Gradient Glass Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-[#0B1E38]/95 dark:to-[#0F172A]/95 rounded-[2rem] p-6 lg:p-8 shadow-[0_15px_35px_rgba(37,99,235,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-blue-400/20 dark:border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 group">
             {/* Tech Grid Effect in Background */}
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00E5FF]/20 rounded-full blur-3xl pointer-events-none"></div>
             
             <div className="relative z-10 w-full md:w-3/4 lg:w-2/3">
                <h3 className="text-white font-extrabold text-xl lg:text-2xl mb-2 flex items-center gap-2">
                   What can we solve for you? <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                </h3>
                <p className="text-blue-100 dark:text-gray-400 text-xs font-semibold mb-6">Search from our comprehensive knowledge database or raise a direct ticket below</p>
                
                <div className="relative mb-5 group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search help articles, categories, FAQs or billing issue keywords..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-gray-900 border-2 border-transparent dark:border-white/5 rounded-2xl text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-md text-gray-900 dark:text-white font-semibold global-card" 
                  />
                  {searchQuery ? (
                    <X onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
                  ) : (
                    <Mic onClick={() => toast.success("Listening... Speak your query.")} className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" />
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-black text-blue-200 dark:text-gray-500 uppercase tracking-widest mb-2.5">Trending keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {['Card blocked', 'EMI Convert', 'Payment Delay', 'Dispute Charge', 'Limit Increase'].map(topic => (
                      <button 
                        key={topic} 
                        onClick={() => {
                          setSearchQuery(topic);
                          toast.success(`Searching for: ${topic}`);
                        }}
                        className="px-3 py-1.5 bg-white/15 hover:bg-white/25 border border-white/10 dark:bg-gray-800/80 dark:border-white/5 text-white dark:text-gray-300 rounded-xl text-[10px] font-bold cursor-pointer transition-all hover:scale-100 active:scale-95 shadow-sm global-card"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
             </div>
             
             {/* Headphone Floating Design */}
             <div className="hidden md:block shrink-0 relative pr-4">
               <div className="w-24 h-24 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-xl relative animate-float global-card">
                 <Headphones className="w-12 h-12 text-white" />
                 <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-10"></span>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             
             {/* FAQ Accordion Section - Premium Overhaul */}
             <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-white/10 flex flex-col hover:scale-[1.002] transition-transform duration-300 global-card">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <h3 className="font-bold text-[16px]">Knowledge Base & FAQs</h3>
                   <p className="text-[10px] text-gray-500 font-medium">Select a category or find matching answers</p>
                 </div>
                 {searchQuery && (
                   <button 
                     onClick={() => setSearchQuery('')}
                     className="text-[9px] font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 px-2 py-1 rounded-xl"
                   >
                     Clear Search
                   </button>
                 )}
               </div>

               <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[420px]">
                 
                 {/* FAQ Categories Column */}
                 <div className="md:w-[42%] space-y-1.5">
                   {faqCategories.map(cat => (
                     <button 
                       key={cat.id} 
                       onClick={() => handleCategoryClick(cat.id)}
                       disabled={!!searchQuery}
                       className={`w-full text-left flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border outline-none active:scale-98 ${searchQuery ? 'opacity-40 cursor-not-allowed' : ''} ${activeFaqCategory === cat.id && !searchQuery ? 'bg-blue-600 dark:bg-[#2563FF] border-blue-600 dark:border-[#00E5FF]/20 text-white shadow-md shadow-blue-500/10' : 'bg-transparent border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/40'}`}
                     >
                       <div className="flex items-center gap-3">
                         <cat.icon className={`w-4 h-4 shrink-0 transition-transform ${activeFaqCategory === cat.id && !searchQuery ? 'text-white scale-110' : cat.color}`} />
                         <span className="text-xs font-bold truncate max-w-[110px]">{cat.id}</span>
                       </div>
                       {activeFaqCategory === cat.id && !searchQuery && <ChevronRight className="w-4 h-4 text-white shrink-0" />}
                     </button>
                   ))}
                 </div>

                 {/* FAQs Accordion Column */}
                 <div className="md:w-[58%] border-t md:border-t-0 md:border-l border-gray-100 dark:border-white/5 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      {filteredFaqs.length === 0 ? (
                        <div className="py-12 text-center text-gray-500 font-semibold text-xs flex flex-col items-center gap-3">
                          <HelpCircle className="w-10 h-10 text-gray-400 animate-pulse" />
                          <span>No matches found. Try searching different keywords.</span>
                        </div>
                      ) : (
                        filteredFaqs.map((faq, idx) => (
                          <div key={idx} className="border-b border-gray-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                            <div 
                              onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                              className="flex justify-between items-start cursor-pointer group"
                            >
                              <h4 className={`text-[12px] font-bold pr-4 transition-colors ${expandedFaq === idx ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#00E5FF]'}`}>
                                {faq.question}
                              </h4>
                              <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${expandedFaq === idx ? 'transform rotate-180 text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                            </div>
                            
                            {expandedFaq === idx && (
                              <div className="mt-2.5 pl-1.5 border-l-2 border-blue-500 dark:border-[#00E5FF] animate-fade-in-up">
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed mb-3 font-semibold">{faq.answer}</p>
                                {faq.link && faq.path && (
                                  <a href={faq.path} className="text-[10px] font-extrabold text-blue-600 dark:text-[#00E5FF] hover:underline flex items-center gap-1 w-max">
                                    {faq.link} <ArrowUpRight className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/5 flex justify-center">
                      <button onClick={() => toast.success("Complete offline guide catalog loaded!")} className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 dark:text-[#00E5FF] hover:bg-blue-50 dark:hover:bg-[#00E5FF]/5 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-blue-100 dark:hover:border-cyan-900/30 uppercase tracking-wider">
                        <Zap className="w-3.5 h-3.5 text-yellow-500 animate-bounce" /> Full Help Center Document
                      </button>
                    </div>
                 </div>

               </div>
             </div>

             {/* Contact Support Section - Translucent Premium Forms */}
             <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-white/10 flex flex-col hover:scale-[1.002] transition-transform duration-300 global-card">
               <h3 className="font-bold text-[16px] mb-1">Direct Help Desk</h3>
               <p className="text-[10px] text-gray-600 dark:text-gray-400 font-semibold mb-6">Open a secure service request ticket with our premium engineers</p>
               
               {/* Contact tabs */}
               <div className="flex bg-gray-50/60 dark:bg-gray-900/50 p-1.5 rounded-2xl mb-6 border border-gray-100/40 dark:border-white/5 shrink-0">
                 <button 
                   onClick={() => setActiveContactMethod('message')}
                   className={`py-2 px-3 rounded-xl font-bold text-xs flex-1 transition-all outline-none ${activeContactMethod === 'message' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                 >
                   Send us a message
                 </button>
                 <button 
                   onClick={() => setActiveContactMethod('connect')}
                   className={`py-2 px-3 rounded-xl font-bold text-xs flex-1 transition-all outline-none ${activeContactMethod === 'connect' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
                 >
                   Alternative Channels
                 </button>
               </div>

               {activeContactMethod === 'message' ? (
                 <form onSubmit={handleSendMessage} className="space-y-4 flex-1 flex flex-col justify-between">
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Full Name</label>
                       <input 
                         type="text" 
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         placeholder="Enter your name" 
                         className="w-full bg-gray-50/50 dark:bg-gray-900/60 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-blue-500 dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-gray-900 transition-all text-gray-900 dark:text-white" 
                         required 
                       />
                     </div>
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Registered Email</label>
                       <input 
                         type="email" 
                         value={formData.email}
                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                         placeholder="Enter your email" 
                         className="w-full bg-gray-50/50 dark:bg-gray-900/60 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-blue-500 dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-gray-900 transition-all text-gray-900 dark:text-white" 
                         required 
                       />
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Issue Category</label>
                       <div className="relative">
                         <select 
                           value={formData.category}
                           onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                           className="w-full bg-gray-50/50 dark:bg-gray-900/60 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:bg-gray-900 transition-all appearance-none font-bold text-gray-600 dark:text-gray-300 cursor-pointer"
                         >
                           <option>Payments</option>
                           <option>Card Controls</option>
                           <option>Statements</option>
                           <option>EMI & Loans</option>
                           <option>Rewards & Points</option>
                           <option>Security Vault</option>
                         </select>
                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                       </div>
                     </div>
                     <div>
                       <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Related Subject</label>
                       <div className="relative">
                         <select 
                           value={formData.relatedTo}
                           onChange={(e) => setFormData({ ...formData, relatedTo: e.target.value })}
                           className="w-full bg-gray-50/50 dark:bg-gray-900/60 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 dark:bg-gray-900 transition-all appearance-none font-bold text-gray-600 dark:text-gray-300 cursor-pointer"
                         >
                           <option>Transaction dispute</option>
                           <option>Late fees charges</option>
                           <option>Interest rate inquiry</option>
                           <option>Limit enhancement eligibility</option>
                           <option>KYC validation status</option>
                         </select>
                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                       </div>
                     </div>
                   </div>

                   <div className="relative">
                     <div className="flex justify-between items-center mb-1.5">
                       <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Detail Message</label>
                       <span className="text-[9px] text-gray-400 font-bold">{formData.message.length}/500</span>
                     </div>
                     <textarea 
                       value={formData.message}
                       onChange={(e) => setFormData({ ...formData, message: e.target.value.substring(0, 500) })}
                       placeholder="Explain the transaction ID, date, or problem description in detail..." 
                       className="w-full bg-gray-50/50 dark:bg-gray-900/60 border border-gray-100 dark:border-white/5 rounded-xl px-4 py-3 text-xs font-semibold outline-none focus:border-blue-500 dark:focus:border-blue-500/50 focus:bg-white dark:focus:bg-gray-900 transition-all h-24 resize-none text-gray-900 dark:text-white" 
                       required 
                     ></textarea>
                   </div>
                   
                   {/* Interactive file upload */}
                   <div 
                     onClick={handleScreenshotClick}
                     className={`border-2 border-dashed rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-all hover:bg-blue-50/20 dark:hover:bg-blue-950/5 ${screenshot ? 'border-green-500/50 bg-green-50/10' : 'border-gray-100 dark:border-white/10 hover:border-blue-500/50'}`}
                   >
                     <input 
                       type="file" 
                       ref={screenshotInputRef} 
                       onChange={handleScreenshotChange} 
                       accept="image/*" 
                       className="hidden" 
                     />
                     <div className="flex items-center gap-3.5 min-w-0">
                       <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${screenshot ? 'bg-green-100 border-green-200 text-green-600' : 'bg-gray-100/80 dark:bg-gray-800 border-gray-100/50 dark:border-white/5 text-gray-500 dark:text-gray-400'}`}>
                         {screenshot ? <CheckCircle2 className="w-5 h-5" /> : <Paperclip className="w-4 h-4" />}
                       </div>
                       <div className="min-w-0">
                         {screenshot ? (
                           <>
                             <p className="text-[11px] font-bold text-gray-900 dark:text-white truncate max-w-[150px] sm:max-w-[200px]">{screenshot.name}</p>
                             <p className="text-[9px] text-gray-400 font-bold uppercase">{(screenshot.size / 1024).toFixed(1)} KB • {isUploading ? 'Uploading...' : 'Attached'}</p>
                           </>
                         ) : (
                           <>
                             <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300">Upload Transaction Screenshot</p>
                             <p className="text-[9px] text-gray-400">PNG, JPG, PDF up to 5MB (Optional)</p>
                           </>
                         )}
                       </div>
                     </div>

                     {screenshot && (
                       <button 
                         onClick={removeScreenshot}
                         className="p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                       >
                         <Trash2 className="w-3.5 h-3.5" />
                       </button>
                     )}
                   </div>

                   {isUploading && (
                     <div className="w-full bg-gray-100 dark:bg-gray-800 h-1 rounded-full overflow-hidden shrink-0">
                       <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                     </div>
                   )}

                   <button 
                     type="submit" 
                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-blue-500/10 active:scale-99 transition-all flex items-center justify-center gap-2 border border-white/10"
                   >
                     <Send className="w-4 h-4 shrink-0" /> Submit Ticket
                   </button>
                 </form>
               ) : (
                 <div className="flex-1 flex flex-col justify-between min-h-[380px] animate-fade-in-up">
                   <div className="space-y-4">
                     <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Connect immediately with key desks</p>
                     
                     <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between">
                       <div>
                         <span className="block text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">Corporate Grievance</span>
                         <span className="block text-xs font-bold text-gray-900 dark:text-white">nodal.desk@splendin.com</span>
                       </div>
                       <button 
                         onClick={() => copyToClipboard('nodal.desk@splendin.com', 'Grievance email copied!')}
                         className="p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/5 rounded-xl hover:text-blue-500 dark:hover:text-[#00E5FF] transition-all hover:scale-100 active:scale-95 shadow-sm global-card"
                       >
                         <Copy className="w-3.5 h-3.5" />
                       </button>
                     </div>

                     <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between">
                       <div>
                         <span className="block text-[10px] font-black text-rose-500 dark:text-rose-400 uppercase tracking-wider mb-0.5">Emergency Card Hotlisting</span>
                         <span className="block text-xs font-bold text-gray-900 dark:text-white">1800-419-9000 (Toll Free)</span>
                       </div>
                       <button 
                         onClick={() => copyToClipboard('1800-419-9000', 'Emergency number copied!')}
                         className="p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/5 rounded-xl hover:text-blue-500 dark:hover:text-[#00E5FF] transition-all hover:scale-100 active:scale-95 shadow-sm global-card"
                       >
                         <Copy className="w-3.5 h-3.5" />
                       </button>
                     </div>

                     <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between">
                       <div>
                         <span className="block text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-0.5">Platinum Customer Care</span>
                         <span className="block text-xs font-bold text-gray-900 dark:text-white">platinum.support@splendin.com</span>
                       </div>
                       <button 
                         onClick={() => copyToClipboard('platinum.support@splendin.com', 'Platinum support email copied!')}
                         className="p-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/5 rounded-xl hover:text-blue-500 dark:hover:text-[#00E5FF] transition-all hover:scale-100 active:scale-95 shadow-sm global-card"
                       >
                         <Copy className="w-3.5 h-3.5" />
                       </button>
                     </div>
                   </div>

                   <div className="pt-4 border-t border-gray-100 dark:border-white/5 mt-auto">
                     <div className="flex gap-3 justify-center items-center text-xs font-bold text-gray-500 bg-gray-50 dark:bg-gray-900/40 p-3 rounded-2xl border border-gray-100 dark:border-white/5">
                       <Headphones className="w-4 h-4 text-blue-500" />
                       <span>Nodal Office hours: 9:00 AM - 6:00 PM (IST)</span>
                     </div>
                   </div>
                 </div>
               )}
             </div>

          </div>
        </div>

        {/* Right Sidebar Widgets (29%) */}
        <div className="xl:w-[29%] space-y-6">
          
          {/* Quick Actions Grid */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.01] transition-transform duration-300 global-card">
             <h4 className="font-bold text-[14px] text-gray-900 dark:text-white mb-4">Quick Service Desk</h4>
             <div className="grid grid-cols-2 gap-3.5">
               
               <div 
                 onClick={() => handleQuickAction("Track Service Request", "Redirecting to your active queries.")}
                 className="border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 dark:hover:border-[#00E5FF]/20 hover:bg-blue-50/30 dark:hover:bg-blue-950/10 hover:scale-100 active:scale-95 transition-all duration-300 group shadow-sm"
               >
                 <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-all border border-blue-100 dark:border-blue-900/30">
                   <FileText className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
                 </div>
                 <span className="text-[10px] font-extrabold text-gray-800 dark:text-gray-300 leading-tight">Track Ticket Status</span>
               </div>

               <div 
                 onClick={() => handleQuickAction("Report Lost Card", "Permanent lock screen initialized.")}
                 className="border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-400 dark:hover:border-red-800/40 hover:bg-red-50/30 dark:hover:bg-red-950/10 hover:scale-100 active:scale-95 transition-all duration-300 group shadow-sm"
               >
                 <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-all border border-red-100 dark:border-red-900/30">
                   <Lock className="w-4.5 h-4.5 text-red-600 dark:text-red-400" />
                 </div>
                 <span className="text-[10px] font-extrabold text-gray-800 dark:text-gray-300 leading-tight">Report Lost Card</span>
               </div>

               <div 
                 onClick={() => handleQuickAction("Raise Dispute", "Opening financial transaction logger.")}
                 className="border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-400 dark:hover:border-orange-800/40 hover:bg-orange-50/30 dark:hover:bg-orange-950/10 hover:scale-100 active:scale-95 transition-all duration-300 group shadow-sm"
               >
                 <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-all border border-orange-100 dark:border-orange-900/30">
                   <AlertTriangle className="w-4.5 h-4.5 text-orange-600 dark:text-orange-400" />
                 </div>
                 <span className="text-[10px] font-extrabold text-gray-800 dark:text-gray-300 leading-tight">Raise Tx Dispute</span>
               </div>

               <div 
                 onClick={() => handleQuickAction("Download Statement", "Triggering PDF export.")}
                 className="border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-gray-900/20 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-400 dark:hover:border-green-800/40 hover:bg-green-50/30 dark:hover:bg-green-950/10 hover:scale-100 active:scale-95 transition-all duration-300 group shadow-sm"
               >
                 <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-all border border-green-100 dark:border-green-900/30">
                   <Download className="w-4.5 h-4.5 text-green-600 dark:text-green-400" />
                 </div>
                 <span className="text-[10px] font-extrabold text-gray-800 dark:text-gray-300 leading-tight">Export Statements</span>
               </div>

             </div>
          </div>

          {/* Emergency support channels panel */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.01] transition-transform duration-300 global-card">
             <h4 className="font-bold text-[14px] text-gray-900 dark:text-white mb-4">Direct Contact Points</h4>
             <div className="space-y-3.5">
               
               <div className="flex justify-between items-center group p-2.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                 <div className="flex gap-3 items-center min-w-0">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/30">
                     <MessageSquare className="w-4.5 h-4.5 text-blue-600" />
                   </div>
                   <div className="min-w-0">
                     <p className="text-xs font-bold text-gray-900 dark:text-white">Live Chat Support</p>
                     <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Chat directly with experts</p>
                   </div>
                 </div>
                 <span className="text-[9px] font-black text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2.5 py-0.5 rounded-xl border border-green-200/40 shrink-0">Online</span>
               </div>
               
               <div 
                 onClick={() => copyToClipboard('1800-123-4567', 'Splendin toll free copied!')}
                 className="flex justify-between items-center group p-2.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-white/5 cursor-pointer"
               >
                 <div className="flex gap-3 items-center min-w-0">
                   <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center shrink-0 border border-teal-100 dark:border-teal-900/30">
                     <Phone className="w-4.5 h-4.5 text-teal-600" />
                   </div>
                   <div className="min-w-0">
                     <p className="text-xs font-bold text-gray-900 dark:text-white">Toll-Free Helpline</p>
                     <p className="text-[10px] text-gray-600 dark:text-gray-400">1800-123-4567</p>
                   </div>
                 </div>
                 <span className="text-[9px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-[#00E5FF] px-2.5 py-0.5 rounded-xl border border-blue-200/40 shrink-0">24x7 Support</span>
               </div>

               <div 
                 onClick={() => copyToClipboard('support@splendin.com', 'Support email copied!')}
                 className="flex justify-between items-center group p-2.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-white/5 cursor-pointer"
               >
                 <div className="flex gap-3 items-center min-w-0">
                   <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-900/30">
                     <Mail className="w-4.5 h-4.5 text-purple-600" />
                   </div>
                   <div className="min-w-0">
                     <p className="text-xs font-bold text-gray-900 dark:text-white">Email Assistance</p>
                     <p className="text-[10px] text-gray-600 dark:text-gray-400 truncate">support@splendin.com</p>
                   </div>
                 </div>
                 <span className="text-[9px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-[#00E5FF] px-2.5 py-0.5 rounded-xl border border-blue-200/40 shrink-0">24x7 Support</span>
               </div>

             </div>
          </div>

          {/* Interactive Chatbot Panel Widget (MAX AI Support Widget) */}
          <div className="bg-gradient-to-br from-indigo-700 to-blue-800 dark:from-[#08172E] dark:to-[#040C1A] rounded-[2rem] p-6 shadow-xl border border-indigo-400/20 dark:border-white/10 relative text-white overflow-hidden group">
             {/* Subltle orb backgrounds */}
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
             
             <div className="flex justify-between items-start mb-4 relative z-10">
               <div className="flex gap-3 items-center">
                 <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center shadow-md p-1.5 border border-white/20 shrink-0 global-card">
                   <Bot className="w-full h-full text-blue-600 dark:text-[#00E5FF]" />
                 </div>
                 <div>
                   <div className="flex items-center gap-2">
                     <h4 className="font-extrabold text-[13px] tracking-tight">MAX AI Support</h4>
                     <span className="text-[8px] bg-teal-500 text-white px-1.5 py-0.2 rounded font-black tracking-widest uppercase">Live</span>
                   </div>
                   <p className="text-[10px] text-indigo-200 dark:text-gray-400 font-semibold">Your virtual banking engine</p>
                 </div>
               </div>
               <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse border border-white dark:border-gray-950"></span>
             </div>

             {/* Conversational Screen for Widget */}
             <div className="h-44 bg-black/15 dark:bg-black/30 rounded-2xl p-3 mb-4 overflow-y-auto space-y-3 custom-scrollbar border border-white/5 relative flex flex-col justify-between">
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                   {sidebarMessages.map((msg, idx) => (
                     <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                       <p className={`px-3 py-2 rounded-2xl text-[10px] font-semibold leading-relaxed max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/10 text-white rounded-bl-none border border-white/5'}`}>
                         {msg.text}
                       </p>
                     </div>
                   ))}
                   {sidebarLoading && (
                     <div className="flex justify-start">
                       <div className="bg-white/10 px-3 py-2 rounded-2xl rounded-bl-none flex items-center gap-1">
                         <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                         <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                         <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                       </div>
                     </div>
                   )}
                </div>
             </div>

             {/* Dynamic Pre-coded Queries */}
             <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none mb-3 pb-1">
               {['Card Limit?', 'Failed Payment?', 'How to convert EMI?'].map((tag) => (
                 <button 
                   key={tag}
                   onClick={() => {
                     setSidebarInput(tag);
                     toast.success(`Click "Send" to ask about: ${tag}`);
                   }}
                   className="px-2.5 py-1 bg-white/10 hover:bg-white/20 dark:bg-gray-800/80 dark:border-white/5 border border-white/15 text-white dark:text-gray-300 rounded-lg text-[9px] font-extrabold transition-all cursor-pointer select-none active:scale-95"
                 >
                   {tag}
                 </button>
               ))}
             </div>

             <form onSubmit={handleSidebarSend} className="relative z-10">
               <input 
                 type="text" 
                 placeholder="Type card block, EMI convert, due date..." 
                 value={sidebarInput}
                 onChange={(e) => setSidebarInput(e.target.value)}
                 className="w-full bg-white/10 dark:bg-gray-950/70 text-white border border-white/15 dark:border-white/5 rounded-xl pl-4 pr-10 py-2.5 text-[10px] font-bold outline-none focus:border-white/30 dark:focus:border-cyan-500/50 shadow-inner global-card" 
               />
               <button 
                 type="submit"
                 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-white dark:bg-[#2563FF] hover:bg-indigo-50 dark:hover:bg-blue-600 rounded-lg flex items-center justify-center text-blue-600 dark:text-white shadow transition-all active:scale-95 cursor-pointer"
               >
                 <Send className="w-3.5 h-3.5" />
               </button>
             </form>
          </div>

        </div>
      </div>

      {/* Bottom Trust Indicators */}
      <div className="mt-10 pt-6 border-t border-gray-100 dark:border-white/5 flex flex-wrap justify-between gap-6 text-left pb-4">
        {[
          { icon: MessageSquare, title: "Expert Support", desc: "Live chat with card engineers 24/7", color: "text-blue-500 bg-blue-50/50 border-blue-100" },
          { icon: ShieldCheck, title: "Traceable Tickets", desc: "Track complaint status globally anytime", color: "text-green-500 bg-green-50/50 border-green-100" },
          { icon: Shield, title: "Bank Grade Encryption", desc: "End to end isolated secure assistance", color: "text-teal-500 bg-teal-50/50 border-teal-100" },
          { icon: Zap, title: "Instant SLA Resolution", desc: "Avg. response time less than 2 mins", color: "text-purple-500 bg-purple-50/50 border-purple-100" }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 text-gray-500 dark:text-gray-400 flex-1 min-w-[240px] p-4 bg-white/30 dark:bg-[#071426]/30 backdrop-blur-sm rounded-3xl border border-gray-100/50 dark:border-white/5 shadow-sm hover:scale-102 transition-all global-card">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${item.color} dark:bg-gray-800 dark:border-gray-700`}>
                <item.icon className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-[11px] font-black text-gray-900 dark:text-gray-300 mb-0.5">{item.title}</span>
              <span className="block text-[9.5px] leading-relaxed text-gray-500 dark:text-gray-400 pr-2 font-medium">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Support;
