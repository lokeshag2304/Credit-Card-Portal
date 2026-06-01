import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Info, ArrowDown, FileText, Edit3, ThumbsUp, Landmark, 
  Smartphone, Wallet, CreditCard, PlusCircle, ShieldCheck, CheckCircle2, 
  BookOpen, HelpCircle, Headphones, Zap, Shield, Lock, Clock, Calendar, Check,
  Copy, Download, Eye, Mail, Share2, Star, AlertTriangle, MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

const Payments = () => {
  const [paymentStep, setPaymentStep] = useState('selection'); // 'selection' | 'processing' | 'success'
  const [amountType, setAmountType] = useState('total');
  const [customAmount, setCustomAmount] = useState('');
  const [methodTab, setMethodTab] = useState('Recommended');

  // Dummy cards for dropdown selector
  const cardsList = [
    { id: 'visa', name: 'Visa Signature', number: '•••• •••• •••• 4567', limit: '₹ 1,00,000', type: 'VISA', bg: 'bg-blue-900', border: 'border-blue-800' },
    { id: 'mastercard', name: 'Mastercard World', number: '•••• •••• •••• 8901', limit: '₹ 2,50,000', type: 'MC', bg: 'bg-[#FF5F00]', border: 'border-orange-600' },
    { id: 'amex', name: 'Amex Platinum', number: '•••• •••• •••• 3002', limit: '₹ 5,00,000', type: 'AMEX', bg: 'bg-teal-900', border: 'border-teal-800' }
  ];
  const [activeCard, setActiveCard] = useState(cardsList[0]);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);

  const getAmountToPay = () => {
    if (amountType === 'minimum') return '2,543.00';
    if (amountType === 'total') return '25,430.75';
    return customAmount || '0.00';
  };

  const handlePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      toast.success('Payment successful!');
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Transaction ID copied!');
  };

  // Shared Card Selector Dropdown Component
  const renderCardSelector = () => (
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
          {/* Backdrop to close click */}
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
  );

  if (paymentStep === 'success') {
    return (
      <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <p className="text-xs text-gray-500 font-bold mb-1">Home <span className="mx-1">&gt;</span> Payments <span className="mx-1">&gt;</span> <span className="text-gray-900 dark:text-gray-300">Payment Confirmation</span></p>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Payment Successful</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Your credit card payment has been processed successfully.</p>
          </div>
          {renderCardSelector()}
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Column - Success Card */}
          <div className="xl:w-[70%] space-y-6">
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-100/80 dark:border-white/10 flex flex-col items-center text-center relative overflow-hidden global-card">
              
              {/* Confetti/Dots Background Simulation */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-[20%] left-[30%] w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-[15%] left-[45%] w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="absolute top-[25%] left-[60%] w-1.5 h-1.5 bg-[#00E5FF] rounded-full"></div>
                <div className="absolute top-[35%] left-[25%] w-2 h-2 bg-purple-400 rounded-full"></div>
                <div className="absolute top-[30%] left-[70%] w-1 h-1 bg-orange-400 rounded-full"></div>
              </div>

              {/* Success Checkmark */}
              <div className="w-20 h-20 bg-green-50 dark:bg-green-950/20 rounded-full flex items-center justify-center mb-6 relative z-10 animate-bounce-short">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/35 dark:shadow-green-500/20">
                  <Check className="w-8 h-8 text-white stroke-[3]" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-green-600 dark:text-green-400 mb-2">Payment Successful!</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6">Your payment has been received and will be updated shortly.</p>
              
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">₹ {getAmountToPay()}</h1>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">Amount Paid</p>
              
              <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-bold mb-10 border border-green-100 dark:border-green-500/10 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" /> Payment Completed
              </div>

              {/* Transaction Details */}
              <div className="w-full text-left">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4">Transaction Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-3.5 h-3.5 text-gray-400"/>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Transaction ID</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">TXN2024051200012456</p>
                      <Copy onClick={() => copyToClipboard('TXN2024051200012456')} className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-[#00E5FF] transition-all hover:scale-[1.1] active:scale-[0.9]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400"/>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Payment Date & Time</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">12 May 2024, 10:45 AM</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Landmark className="w-3.5 h-3.5 text-gray-400"/>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Payment Method</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">HDFC Bank – Net Banking</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-3.5 h-3.5 text-gray-400"/>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Card Number</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{activeCard.name} {activeCard.number.substring(activeCard.number.length - 8)}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-gray-400"/>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Reference Number</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">HDF5421987654321</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-400"/>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Status</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Success</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-500/10 rounded-2xl p-4 flex gap-4 items-center mb-8">
                  <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-[#00E5FF] shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-blue-900 dark:text-blue-300">Your payment of ₹{getAmountToPay()} is being updated in real-time.</h5>
                    <p className="text-xs text-blue-700 dark:text-blue-400/80">It may take up to 5 minutes to reflect in your account.</p>
                  </div>
                </div>

                {/* Receipt Actions */}
                <div className="flex flex-wrap gap-4">
                  <button className="flex-1 min-w-[150px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.97] transition-all duration-300 text-sm">
                    <Download className="w-4 h-4" /> Download Receipt
                  </button>
                  <button className="flex-1 min-w-[150px] border border-gray-100 dark:border-white/5 hover:border-blue-400 dark:hover:border-[#00E5FF]/40 hover:text-blue-600 dark:hover:text-[#00E5FF] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-white/50 dark:bg-[#0A0F1D]/40 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 text-sm text-gray-700 dark:text-gray-300">
                    <Eye className="w-4 h-4" /> View Receipt
                  </button>
                  <button className="flex-1 min-w-[150px] border border-gray-100 dark:border-white/5 hover:border-blue-400 dark:hover:border-[#00E5FF]/40 hover:text-blue-600 dark:hover:text-[#00E5FF] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-white/50 dark:bg-[#0A0F1D]/40 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 text-sm text-gray-700 dark:text-gray-300">
                    <Mail className="w-4 h-4" /> Email Receipt
                  </button>
                  <button className="flex-1 min-w-[150px] border border-gray-100 dark:border-white/5 hover:border-blue-400 dark:hover:border-[#00E5FF]/40 hover:text-blue-600 dark:hover:text-[#00E5FF] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-white/50 dark:bg-[#0A0F1D]/40 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 text-sm text-gray-700 dark:text-gray-300">
                    <Share2 className="w-4 h-4" /> Share Receipt
                  </button>
                </div>
              </div>
            </div>

            {/* Smart Next Actions Row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="col-span-1 sm:col-span-2 bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-4 hover:scale-[1.015] hover:-translate-y-0.5 transition-all duration-300 global-card">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center shrink-0 border border-green-100 dark:border-green-500/10">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-0.5">Thank you for paying on time!</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">You have avoided late fee and maintained a good credit score.</p>
                </div>
              </div>
              <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-3 hover:scale-[1.015] hover:-translate-y-0.5 transition-all duration-300 global-card">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center shrink-0 border border-green-100 dark:border-green-500/10">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Late Fee Avoided</p>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">₹ 600.00</h4>
                </div>
              </div>
              <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 flex items-center gap-3 hover:scale-[1.015] hover:-translate-y-0.5 transition-all duration-300 global-card">
                <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center shrink-0 border border-purple-100 dark:border-purple-500/10">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Reward Points Earned</p>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">254 Points</h4>
                </div>
              </div>
            </div>

            {/* AutoPay Banner */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 hover:scale-[1.01] transition-all duration-300 global-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 rounded-2xl flex items-center justify-center shrink-0 border border-orange-100 dark:border-orange-500/10">
                  {/* Calendar Illustration Mock */}
                  <div className="w-6 h-6 border-2 border-orange-500 rounded relative bg-white dark:bg-[#0A0F1D]">
                    <div className="w-1.5 h-2 bg-orange-500 absolute -top-1 left-1 rounded-full"></div>
                    <div className="w-1.5 h-2 bg-orange-500 absolute -top-1 right-1 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-blue-500 dark:bg-[#00E5FF] rounded-full absolute bottom-0.5 right-0.5"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-0.5">Set up AutoPay for hassle-free payments</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Never miss a payment and enjoy uninterrupted services.</p>
                </div>
              </div>
              <button className="w-full sm:w-auto border border-blue-600 dark:border-[#00E5FF] text-blue-600 dark:text-[#00E5FF] hover:bg-blue-50 dark:hover:bg-blue-950/35 font-bold px-6 py-2.5 rounded-xl transition-all duration-350 text-sm bg-white/55 dark:bg-[#0A0F1D]/40 hover:scale-[1.02] hover:shadow-md dark:hover:shadow-[#00E5FF]/5 active:scale-[0.97]">
                Setup AutoPay
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-between gap-6 py-6 border-t border-gray-100 dark:border-white/5 mt-8 text-left">
               {[
                 { icon: Zap, label: "Instant Payments", sub: "Real-time processing" },
                 { icon: ShieldCheck, label: "No Hidden Charges", sub: "What you see is what you pay" },
                 { icon: Lock, label: "Secure & Encrypted", sub: "Bank-level security" },
                 { icon: Shield, label: "PCI DSS Compliant", sub: "Your data is always safe" },
                 { icon: Headphones, label: "24x7 Support", sub: "We're here to help" }
               ].map((item, i) => (
                 <div key={i} className="flex gap-3 text-gray-500 dark:text-gray-400 flex-1 min-w-[150px]">
                   <item.icon className="w-5 h-5 shrink-0 text-blue-500 dark:text-[#00E5FF]" />
                   <div>
                     <span className="block text-[11px] font-bold text-gray-900 dark:text-gray-300">{item.label}</span>
                     <span className="block text-[9px] mt-0.5">{item.sub}</span>
                   </div>
                 </div>
               ))}
            </div>

          </div>

          {/* Right Column - Summary & Support */}
          <div className="xl:w-[30%] space-y-6">
            
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 global-card">
              <h3 className="font-bold text-[15px] mb-6 border-b border-gray-100 dark:border-white/5 pb-4">Payment Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Total Outstanding</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹ 25,430.75</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Amount Paid</span>
                  <span className="font-bold text-green-600 dark:text-green-400">₹ {getAmountToPay()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Payment Method</span>
                  <span className="font-bold text-gray-900 dark:text-white text-right">HDFC Net Banking</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Payment Status</span>
                  <span className="text-[10px] font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-500/10 px-2 py-0.5 rounded">Success</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Paid On</span>
                  <span className="font-bold text-gray-900 dark:text-white text-right text-xs">12 May 2024, 10:45 AM</span>
                </div>
              </div>
            </div>

            {/* Right AutoPay Widget */}
            <div className="bg-teal-50/50 dark:bg-teal-950/10 border border-teal-100 dark:border-teal-500/10 rounded-3xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-gray-900 dark:text-white text-[15px] mb-2">Go Automatic with AutoPay</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 w-2/3 leading-relaxed">Set once and never worry about missing a payment.</p>
                
                <ul className="space-y-2 mb-6">
                  {['Pay on time, every time', 'Avoid late fees', 'Improve credit score', '100% secure'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-teal-800 dark:text-teal-300">
                      <Check className="w-3.5 h-3.5 text-teal-600 dark:text-[#00E5FF]" /> {item}
                    </li>
                  ))}
                </ul>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-xl hover:scale-[1.02] hover:shadow-lg active:scale-[0.97] transition-all duration-300 text-xs">
                  Setup AutoPay
                </button>
              </div>
              {/* Illustration Mock */}
              <div className="absolute right-[-20px] bottom-4 w-32 h-32 opacity-80 pointer-events-none">
                 <div className="w-20 h-20 bg-white dark:bg-[#071426]/90 rounded-xl shadow-lg border border-gray-100 dark:border-white/5 absolute bottom-4 right-8 transform rotate-12 flex flex-col p-2 global-card">
                   <div className="w-full h-3 bg-blue-500 rounded-sm mb-2"></div>
                   <div className="grid grid-cols-3 gap-1 mb-1"><div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-sm"></div><div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-sm"></div><div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-sm"></div></div>
                   <div className="grid grid-cols-3 gap-1 mb-1"><div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-sm"></div><div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-sm"></div><div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-sm"></div></div>
                   <div className="w-6 h-6 bg-yellow-400 rounded-full absolute -bottom-2 -right-2 border-2 border-white dark:border-[#071426] flex items-center justify-center text-[10px] font-bold text-white">✓</div>
                 </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 global-card">
              <h3 className="font-bold text-[15px] mb-4">Need Help?</h3>
              <div className="space-y-2">
                {[
                  { label: "View Payment Guide", icon: BookOpen },
                  { label: "FAQs", icon: HelpCircle },
                  { label: "Raise a Payment Issue", icon: AlertTriangle },
                  { label: "Chat with Support", icon: MessageSquare }
                ].map((link, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-[#0A0F1D]/50 rounded-xl cursor-pointer transition-colors group">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <link.icon className="w-4 h-4 text-blue-600 dark:text-[#00E5FF]" />
                      <span className="text-xs font-semibold group-hover:text-blue-600 dark:group-hover:text-[#00E5FF] transition-colors">{link.label}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90 group-hover:translate-x-1 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF] transition-all" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // DEFAULT PAYMENTS SELECTION SCREEN
  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto relative">
      {/* Processing Overlay */}
      {paymentStep === 'processing' && (
        <div className="fixed inset-0 bg-[#071426]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all animate-fade-in">
          <div className="w-16 h-16 border-4 border-white/10 border-t-[#00E5FF] rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-bold text-white mb-2">Processing Payment...</h3>
          <p className="text-sm text-gray-400 font-medium">Please do not refresh or close this window.</p>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Payments</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Make a Payment</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pay your credit card bill quickly and securely</p>
        </div>
        {renderCardSelector()}
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Column - Main Content */}
        <div className="xl:w-[70%] space-y-6">
          
          {/* Outstanding Summary */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100/80 dark:border-white/10 hover:scale-[1.005] hover:shadow-md transition-all duration-300 global-card">
            <h3 className="font-bold text-[15px] mb-6 flex items-center gap-2">Outstanding Summary <Info className="w-4 h-4 text-gray-400 cursor-pointer"/></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="border-r border-gray-100 dark:border-white/5 pr-4">
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">Total Outstanding</p>
                <h4 className="font-extrabold text-xl mb-1 text-gray-900 dark:text-white">₹ 25,430.75</h4>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">Last updated: 12 May 2024</p>
              </div>
              <div className="border-r border-gray-100 dark:border-white/5 pr-4 col-span-1">
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">Minimum Due</p>
                <h4 className="font-extrabold text-xl mb-1 text-gray-900 dark:text-white">₹ 2,543.00</h4>
                <p className="text-[10px] font-bold text-red-500 dark:text-red-400 whitespace-nowrap">Due Date: 05 Jun 2024</p>
              </div>
              <div className="border-r border-gray-100 dark:border-white/5 pr-4">
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">Last Statement Amount</p>
                <h4 className="font-extrabold text-xl mb-1 text-gray-900 dark:text-white">₹ 24,680.50</h4>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">Statement Date: 12 May 2024</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">Available Credit Limit</p>
                <h4 className="font-extrabold text-xl mb-2 text-gray-900 dark:text-white">{activeCard.id === 'visa' ? '₹ 74,569.25' : activeCard.id === 'mastercard' ? '₹ 2,24,680.50' : '₹ 4,74,569.25'}</h4>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-[#0A0F1D] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 w-[74.5%] rounded-full"></div>
                </div>
                <p className="text-[9px] text-gray-400 dark:text-gray-500 text-right mt-1 font-medium">74.57% available</p>
              </div>
            </div>
          </div>

          {/* Select Payment Amount */}
          <div>

          <h3 className="font-bold text-[15px] mb-4 flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-blue-600 dark:bg-[#00E5FF] text-white dark:text-[#071426] flex items-center justify-center text-xs font-black">1</span> Select Payment Amount</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div onClick={() => setAmountType('minimum')} className={`rounded-2xl p-5 border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] ${amountType === 'minimum' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-[0_4px_20px_rgba(37,99,235,0.12)] dark:border-[#00E5FF]/40 dark:shadow-[0_4px_20px_rgba(0,229,255,0.08)]' : 'border-gray-100 dark:border-white/5 bg-white/50 dark:bg-[#0A0F1D]/40 hover:border-gray-300 dark:hover:border-white/10'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${amountType === 'minimum' ? 'border-blue-600 dark:border-[#00E5FF]' : 'border-gray-300 dark:border-gray-600'}`}>
                      {amountType === 'minimum' && <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#00E5FF]"></div>}
                    </div>
                    <span className="font-bold text-sm text-gray-700 dark:text-gray-300">Minimum Due</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400 flex items-center justify-center"><ArrowDown className="w-4 h-4" /></div>
                </div>
                <h4 className="font-extrabold text-xl ml-7 mb-2 text-gray-900 dark:text-white">₹ 2,543.00</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 ml-7 leading-relaxed pr-4">Pay minimum amount to avoid late fee and maintain good credit score.</p>
              </div>

              <div onClick={() => setAmountType('total')} className={`rounded-2xl p-5 border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] ${amountType === 'total' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-[0_4px_20px_rgba(37,99,235,0.12)] dark:border-[#00E5FF]/40 dark:shadow-[0_4px_20px_rgba(0,229,255,0.08)]' : 'border-gray-100 dark:border-white/5 bg-white/50 dark:bg-[#0A0F1D]/40 hover:border-gray-300 dark:hover:border-white/10'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${amountType === 'total' ? 'border-blue-600 dark:border-[#00E5FF]' : 'border-gray-300 dark:border-gray-600'}`}>
                      {amountType === 'total' && <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#00E5FF]"></div>}
                    </div>
                    <span className="font-bold text-sm text-gray-700 dark:text-gray-300">Total Due</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 flex items-center justify-center"><FileText className="w-4 h-4" /></div>
                </div>
                <h4 className="font-extrabold text-xl ml-7 mb-2 text-gray-900 dark:text-white">₹ 25,430.75</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 ml-7 leading-relaxed pr-4">Pay total outstanding amount to clear your dues.</p>
              </div>

              <div onClick={() => setAmountType('custom')} className={`rounded-2xl p-5 border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] ${amountType === 'custom' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-[0_4px_20px_rgba(37,99,235,0.12)] dark:border-[#00E5FF]/40 dark:shadow-[0_4px_20px_rgba(0,229,255,0.08)]' : 'border-gray-100 dark:border-white/5 bg-white/50 dark:bg-[#0A0F1D]/40 hover:border-gray-300 dark:hover:border-white/10'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${amountType === 'custom' ? 'border-blue-600 dark:border-[#00E5FF]' : 'border-gray-300 dark:border-gray-600'}`}>
                      {amountType === 'custom' && <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#00E5FF]"></div>}
                    </div>
                    <span className="font-bold text-sm text-gray-700 dark:text-gray-300">Custom Amount</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-655/35 dark:text-orange-400 flex items-center justify-center"><Edit3 className="w-4 h-4" /></div>
                </div>
                <div className="ml-7 mb-2">
                  <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase mb-0.5">Enter Amount</p>
                  <div className="flex items-center gap-1 border-b-2 border-gray-100 dark:border-gray-800 focus-within:border-blue-600 dark:focus-within:border-[#00E5FF] transition-colors pb-1">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">₹</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmountType('custom');
                      }}
                      className="w-full bg-transparent outline-none font-bold text-lg text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600" 
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 ml-7 leading-relaxed pr-4">Enter any amount you wish to pay.</p>
              </div>

            </div>
          </div>

          {/* Select Payment Method */}
          <div>
            <h3 className="font-bold text-[15px] mb-4 flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-blue-600 dark:bg-[#00E5FF] text-white dark:text-[#071426] flex items-center justify-center text-xs font-black">2</span> Select Payment Method</h3>
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[400px] global-card">
              
              {/* Left Tabs */}
              <div className="md:w-[220px] bg-gray-50/50 dark:bg-[#0A0F1D]/40 border-r border-gray-100 dark:border-white/5 p-3 space-y-1">
                {[
                  { id: 'Recommended', icon: ThumbsUp },
                  { id: 'Net Banking', icon: Landmark },
                  { id: 'UPI', icon: Smartphone },
                  { id: 'Saved Accounts', icon: ShieldCheck },
                  { id: 'Cards', icon: CreditCard },
                  { id: 'Wallets', icon: Wallet },
                  { id: 'Other Methods', icon: PlusCircle }
                ].map((tab) => (
                  <div 
                    key={tab.id}
                    onClick={() => setMethodTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] ${methodTab === tab.id ? 'bg-white dark:bg-[#071426]/90 shadow-md border border-gray-100/80 dark:border-white/10 text-blue-600 dark:text-[#00E5FF] font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-[#0A0F1D]/20 hover:text-blue-600 dark:hover:text-[#00E5FF] font-medium'}`}
                  >
                    <tab.icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{tab.id}</span>
                    {methodTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#00E5FF] ml-auto shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>}
                  </div>
                ))}
              </div>

              {/* Right Methods List */}
              <div className="flex-1 p-6 relative">
                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Recommended for you</p>
                <div className="space-y-3">
                  
                  {/* Google Pay */}
                  <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-white/5 rounded-2xl hover:border-blue-400 dark:hover:border-[#00E5FF]/40 cursor-pointer bg-white/40 dark:bg-[#0A0F1D]/20 transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 active:scale-[0.99] hover:shadow-lg dark:hover:shadow-blue-500/5 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-gray-100/80 dark:border-white/10 flex items-center justify-center bg-white dark:bg-white overflow-hidden p-1 shadow-sm shrink-0">
                         <div className="flex gap-0.5 items-center">
                           <span className="text-blue-500 font-black text-lg -mt-1 tracking-tighter">G</span><span className="text-gray-500 font-bold text-xs mt-1">Pay</span>
                         </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">UPI — Google Pay</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">Pay using Google Pay UPI</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden sm:block text-[11px] text-gray-400 dark:text-gray-500">rahulsharma@okicici</span>
                      <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20">Instant</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* HDFC Net Banking */}
                  <div className="flex items-center justify-between p-4 border border-blue-400/80 bg-blue-50/20 dark:bg-blue-950/20 rounded-2xl cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.08)] transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 active:scale-[0.99] hover:shadow-lg dark:hover:shadow-blue-500/10 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-blue-800/20 flex items-center justify-center bg-blue-900 overflow-hidden shrink-0 shadow-sm">
                         <span className="text-white font-bold text-[10px]">HDFC</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">HDFC Bank — Net Banking</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">Pay securely using HDFC Bank</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden sm:block text-[11px] text-gray-400 dark:text-gray-500">No convenience fee</span>
                      <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20">Instant</span>
                      <div className="w-4 h-4 rounded-full border-2 border-blue-600 dark:border-[#00E5FF] flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#00E5FF]"></div></div>
                    </div>
                  </div>

                  {/* Axis Bank Saved */}
                  <div className="flex items-center justify-between p-4 border border-gray-100 dark:border-white/5 rounded-2xl hover:border-blue-400 dark:hover:border-[#00E5FF]/40 cursor-pointer bg-white/40 dark:bg-[#0A0F1D]/20 transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 active:scale-[0.99] hover:shadow-lg dark:hover:shadow-blue-500/5 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-gray-100/80 dark:border-white/10 flex items-center justify-center bg-white dark:bg-white overflow-hidden shrink-0 shadow-sm">
                         <span className="text-red-800 font-black text-xl leading-none -mt-1">A</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">Axis Bank — Savings Account</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">A/c No. XXXX XXXX 5678</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden sm:block text-[11px] text-gray-400 dark:text-gray-500">No convenience fee</span>
                      <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20">Instant</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  
                </div>

                <div className="mt-4 flex justify-center border-b border-gray-100 dark:border-white/5 pb-6">
                   <button className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-[#00E5FF] hover:underline hover:scale-[1.05] active:scale-[0.95] transition-all duration-200">
                     <PlusCircle className="w-3.5 h-3.5" /> Show More Methods <ChevronDown className="w-3.5 h-3.5" />
                   </button>
                </div>

                <div className="mt-6 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-100 dark:border-blue-500/10 hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-500/10">
                      <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-[#00E5FF]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-blue-900 dark:text-blue-355">Set AutoPay and never miss a payment</h4>
                      <p className="text-xs text-blue-700 dark:text-blue-400/80">Automate your payments and stay worry-free.</p>
                    </div>
                  </div>
                  <button className="shrink-0 bg-white/80 dark:bg-[#071426]/75 text-blue-600 dark:text-[#00E5FF] font-bold px-6 py-2.5 rounded-xl border border-gray-250 dark:border-white/10 hover:border-blue-300 dark:hover:border-[#00E5FF]/40 hover:scale-[1.03] hover:shadow-md dark:hover:shadow-[#00E5FF]/10 active:scale-[0.97] transition-all duration-200 text-sm w-full sm:w-auto global-card">
                    Setup AutoPay
                  </button>
                </div>

              </div>
            </div>
          </div>
          
          {/* Bottom Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 py-6 border-t border-gray-100 dark:border-white/5 mt-8">
             {[
               { icon: Zap, label: "Instant Payments" },
               { icon: CheckCircle2, label: "No Hidden Charges" },
               { icon: Lock, label: "Secure & Encrypted" },
               { icon: Headphones, label: "24x7 Support" }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-semibold hover:scale-[1.05] transition-transform duration-200 cursor-pointer">
                 <item.icon className="w-4 h-4 text-blue-500 dark:text-[#00E5FF]" />
                 <span className="text-xs">{item.label}</span>
               </div>
             ))}
          </div>

        </div>

        {/* Right Column - Insights & Stats */}
        <div className="xl:w-[30%]">
          <div className="sticky top-6 space-y-6">
            
            {/* Payment Summary */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.005] hover:shadow-md transition-all duration-300 global-card">
              <h3 className="font-bold text-[15px] mb-6 border-b border-gray-100 dark:border-white/5 pb-4">Payment Summary</h3>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Total Outstanding</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹ 25,430.75</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Minimum Due</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹ 2,543.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Late Payment Fee (if any)</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹ 0.00</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#0A0F1D]/60 p-4 rounded-2xl border border-gray-100 dark:border-white/5 mb-6 flex justify-between items-center hover:scale-[1.01] transition-transform duration-300">
                 <span className="font-bold text-gray-700 dark:text-gray-300 text-xs">Amount to be Paid</span>
                 <span className="font-extrabold text-xl text-blue-600 dark:text-[#00E5FF]">₹ {getAmountToPay()}</span>
              </div>

              <button onClick={handlePayment} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.96] transition-all duration-300 flex justify-center items-center gap-2 mb-4 text-sm">
                Proceed to Pay
              </button>

              <div className="flex items-start gap-3 bg-orange-500/10 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-500/20 p-4 rounded-xl hover:scale-[1.01] transition-transform duration-300">
                 <Calendar className="w-5 h-5 text-orange-500 shrink-0" />
                 <div className="flex-1">
                   <div className="flex justify-between items-center mb-0.5">
                     <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Due Date</span>
                     <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">05 Jun 2024</span>
                   </div>
                   <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">Pay before due date to avoid late fee</p>
                 </div>
              </div>
            </div>

            {/* Secure Payments Widget */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 flex gap-4 hover:scale-[1.015] hover:shadow-md transition-all duration-300 global-card">
               <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 dark:bg-green-950/20 text-green-600 dark:text-[#00E5FF] flex items-center justify-center shrink-0 border border-green-500/10 dark:border-[#00E5FF]/20">
                 <Shield className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-2">100% Secure Payments</h4>
                 <ul className="space-y-1.5">
                   {['Bank level security', 'Encrypted transactions', 'PCI DSS compliant'].map((item, i) => (
                     <li key={i} className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                       <Check className="w-3.5 h-3.5 text-green-500 dark:text-green-400" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
