import React, { useState } from 'react';
import { 
  ChevronDown, Search, ArrowRight, Smartphone, Plane, ShoppingBag, Laptop,
  Calendar, CreditCard, ShieldCheck, Zap, Sparkles, TrendingUp, Info, PieChart,
  CheckCircle2, Percent, Clock, Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmiLoans = () => {
  // Live credit cards list with custom financial variables
  const cardsList = [
    { 
      id: 'visa', 
      name: 'Visa Signature', 
      number: '•••• •••• •••• 4567', 
      type: 'VISA', 
      bg: 'bg-blue-900', 
      border: 'border-blue-800',
      activeEmis: 2,
      monthlyEmiDue: 4250,
      emiDueDate: '05 Jun 2026',
      totalOutstanding: 18450,
      emiLimit: 150000,
      limitProgress: 75,
      interestRate: 15,
      preApprovedAmt: 250000,
      preApprovedRate: 12.5
    },
    { 
      id: 'mastercard', 
      name: 'Mastercard World', 
      number: '•••• •••• •••• 8901', 
      type: 'MC', 
      bg: 'bg-[#FF5F00]', 
      border: 'border-orange-600',
      activeEmis: 4,
      monthlyEmiDue: 8900,
      emiDueDate: '08 Jun 2026',
      totalOutstanding: 44200,
      emiLimit: 300000,
      limitProgress: 80,
      interestRate: 14,
      preApprovedAmt: 450000,
      preApprovedRate: 11.9
    },
    { 
      id: 'amex', 
      name: 'Amex Platinum', 
      number: '•••• •••• •••• 3002', 
      type: 'AMEX', 
      bg: 'bg-teal-900', 
      border: 'border-teal-800',
      activeEmis: 1,
      monthlyEmiDue: 12400,
      emiDueDate: '10 Jun 2026',
      totalOutstanding: 78120,
      emiLimit: 500000,
      limitProgress: 90,
      interestRate: 13,
      preApprovedAmt: 750000,
      preApprovedRate: 10.9
    }
  ];

  const [activeCard, setActiveCard] = useState(cardsList[0]);
  const [cardDropdownOpen, setCardDropdownOpen] = useState(false);

  const [loanAmount, setLoanAmount] = useState(25000);
  const [tenure, setTenure] = useState(6);

  // Quick cash transfer state
  const [transferAmount, setTransferAmount] = useState(50000);
  const [transferBank, setTransferBank] = useState('HDFC Bank (•••• 9876)');
  const [transferLoading, setTransferLoading] = useState(false);

  // Auto-EMI rules state
  const [autoConvertActive, setAutoConvertActive] = useState(true);
  const [autoConvertThreshold, setAutoConvertThreshold] = useState(15000);
  const [autoConvertInternational, setAutoConvertInternational] = useState(false);
  const [noCostPriority, setNoCostPriority] = useState(true);
  
  // Dynamic EMI calculations synced with active card variables
  const monthlyRate = activeCard.interestRate / 12 / 100;
  const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - loanAmount;

  const handleConvert = (merchant) => {
    toast.success(`Successfully converted purchase from ${merchant} to EMI!`);
  };

  const eligibleTransactions = [
    { id: 1, merchant: 'Apple Store', amt: '₹ 24,999', date: '12 May 2026', plan: '6 Months', emi: '₹ 4,350/mo', icon: Laptop, color: 'text-gray-800 bg-gray-50 dark:bg-[#0A0F1D]/55 dark:text-gray-300' },
    { id: 2, merchant: 'MakeMyTrip', amt: '₹ 15,500', date: '08 May 2026', plan: '3 Months', emi: '₹ 5,296/mo', icon: Plane, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-400' },
    { id: 3, merchant: 'Reliance Digital', amt: '₹ 42,000', date: '02 May 2026', plan: '12 Months', emi: '₹ 3,791/mo', icon: Smartphone, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 dark:text-indigo-400' },
    { id: 4, merchant: 'Amazon Purchase', amt: '₹ 8,450', date: '28 Apr 2026', plan: '3 Months', emi: '₹ 2,887/mo', icon: ShoppingBag, color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400' }
  ];

  const comparePlans = [
    { months: 3, recommended: false },
    { months: 6, recommended: true },
    { months: 12, recommended: false },
    { months: 24, recommended: false },
  ].map(plan => {
    const planEmi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, plan.months)) / (Math.pow(1 + monthlyRate, plan.months) - 1);
    return { ...plan, emi: planEmi };
  });

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">EMI & Loans</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">EMI & Loans</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Convert eligible purchases into affordable monthly payments</p>
        </div>

        {/* Dynamic Card Selector Dropdown */}
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
              <p className="text-[10px] text-gray-500 font-medium">Available Limit: ₹ {(activeCard.emiLimit - activeCard.totalOutstanding).toLocaleString('en-IN')}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 transition-transform duration-300 ${cardDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {cardDropdownOpen && (
            <>
              {/* Dropdown Backdrop */}
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
        
        {/* Left Main Content */}
        <div className="xl:w-[72%] space-y-6">
          
          {/* Top Overview Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Active EMIs */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 global-card">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-100/50 dark:border-white/5">
                  <PieChart className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active EMIs</p>
              </div>
              <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white leading-tight">{activeCard.activeEmis}</h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-1">Ongoing monthly conversions</p>
            </div>
            
            {/* Monthly EMI Due */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 global-card">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 border border-orange-100/50 dark:border-white/5">
                  <Calendar className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Monthly EMI Due</p>
              </div>
              <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white leading-tight">₹ {activeCard.monthlyEmiDue.toLocaleString('en-IN')}</h4>
              <p className="text-[10px] text-gray-500 dark:text-orange-400 font-bold mt-1">Due on {activeCard.emiDueDate}</p>
            </div>
            
            {/* Total Outstanding */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 global-card">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-[#00E5FF] flex items-center justify-center shrink-0 border border-blue-100/50 dark:border-white/5">
                  <CreditCard className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Outstanding</p>
              </div>
              <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white leading-tight">₹ {activeCard.totalOutstanding.toLocaleString('en-IN')}</h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-1">Principal EMI balance left</p>
            </div>
            
            {/* Available EMI Limit */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 global-card">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-100/50 dark:border-white/5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Available EMI Limit</p>
              </div>
              <h4 className="font-extrabold text-2xl text-gray-900 dark:text-white leading-tight">₹ {activeCard.emiLimit.toLocaleString('en-IN')}</h4>
              <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-2.5">
                <div className="h-full bg-teal-500 rounded-full transition-all duration-500" style={{ width: `${activeCard.limitProgress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Smart EMI Suggestion Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-6 shadow-xl text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Smart Recommendation</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Convert your ₹24,999 Apple Store purchase into easy EMIs.</h3>
              <p className="text-xs text-blue-100/80 mb-4 leading-relaxed">Pay just <strong className="text-white">₹4,350/month</strong> for 6 months at a low interest rate of {activeCard.interestRate}% p.a.</p>
              <div className="flex flex-wrap gap-2.5">
                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wide">{activeCard.interestRate}% Interest Rate</span>
                <span className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wide">No Processing Fee</span>
              </div>
            </div>
            
            <div className="relative z-10 shrink-0 w-full sm:w-auto">
              <button 
                onClick={() => handleConvert('Apple Purchase')}
                className="w-full sm:w-auto bg-white text-indigo-900 hover:scale-100 active:scale-95 transition-all font-bold py-3 px-8 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-xs global-card"
              >
                Convert Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Eligible Transactions */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden hover:scale-[1.002] transition-transform duration-300 global-card">
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-[15px] flex items-center gap-2">Eligible Purchases for EMI <Sparkles className="w-4 h-4 text-blue-500 dark:text-[#00E5FF]"/></h3>
              <button className="text-xs font-bold text-blue-600 dark:text-[#00E5FF] hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 dark:bg-[#0A0F1D]/55 text-[10px] uppercase text-gray-600 dark:text-gray-400 font-extrabold tracking-wider border-b border-gray-100 dark:border-white/5">
                  <tr>
                    <th className="px-6 py-4">Transaction</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Suggested Plan</th>
                    <th className="px-6 py-4">Monthly EMI</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {eligibleTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-[#0A0F1D]/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-gray-100/50 dark:border-white/5 ${tx.color}`}>
                            <tx.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-xs leading-none">{tx.merchant}</p>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{tx.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-gray-900 dark:text-white">{tx.amt}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-[#00E5FF] px-2.5 py-1 rounded-xl text-[10px] font-bold border border-blue-100/50 dark:border-blue-500/10 whitespace-nowrap">
                          {tx.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">{tx.emi}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleConvert(tx.merchant)}
                          className="bg-white hover:bg-blue-600 hover:text-white border border-gray-100 dark:bg-gray-800 dark:border-white/10 dark:hover:bg-blue-700 hover:border-blue-600 text-blue-600 dark:text-[#00E5FF] font-bold py-1.5 px-4.5 rounded-xl text-[11px] transition-all shadow-sm active:scale-95 global-card"
                        >
                          Convert
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* EMI Calculator */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.002] transition-transform duration-300 global-card">
            <h3 className="font-bold text-[15px] mb-6 flex items-center gap-2">EMI Calculator <Percent className="w-4 h-4 text-blue-500 dark:text-[#00E5FF]"/></h3>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Inputs */}
              <div className="md:w-1/2 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Loan Amount</label>
                    <div className="flex items-center gap-1 border border-gray-250 dark:border-white/5 rounded-xl px-3 py-1.5 bg-gray-50 dark:bg-[#0A0F1D]/55">
                      <span className="text-xs font-bold text-gray-500">₹</span>
                      <input 
                        type="number" 
                        value={loanAmount} 
                        onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                        className="w-24 bg-transparent outline-none text-sm font-bold text-gray-900 dark:text-white text-right border-none p-0 focus:ring-0"
                      />
                    </div>
                  </div>
                  <input 
                    type="range" min="5000" max="150000" step="1000"
                    value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-[#00E5FF]"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-gray-400 mt-2 tracking-wider">
                    <span>₹5,000</span><span>₹1,50,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Tenure (Months)</label>
                    <div className="flex items-center gap-1 border border-gray-250 dark:border-white/5 rounded-xl px-3 py-1.5 bg-gray-50 dark:bg-[#0A0F1D]/55">
                      <input 
                        type="number" 
                        value={tenure} 
                        onChange={(e) => setTenure(Number(e.target.value) || 0)}
                        className="w-12 bg-transparent outline-none text-sm font-bold text-gray-900 dark:text-white text-right border-none p-0 focus:ring-0"
                      />
                      <span className="text-xs font-bold text-gray-500">mo</span>
                    </div>
                  </div>
                  <input 
                    type="range" min="3" max="24" step="3"
                    value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-[#00E5FF]"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-gray-400 mt-2 tracking-wider">
                    <span>3M</span><span>6M</span><span>12M</span><span>24M</span>
                  </div>
                </div>
              </div>

              {/* Results Output Panel */}
              <div className="md:w-1/2 bg-blue-50/50 dark:bg-[#00E5FF]/5 border border-blue-100 dark:border-[#00E5FF]/10 rounded-2xl p-6 flex flex-col justify-center shadow-inner">
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1 text-center tracking-widest">Estimated Monthly EMI</p>
                <h3 className="text-4xl font-extrabold text-blue-600 dark:text-[#00E5FF] text-center mb-6">₹ {Math.round(emi).toLocaleString('en-IN')}</h3>
                
                <div className="space-y-3 border-t border-blue-100 dark:border-white/5 pt-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Principal Amount</span>
                    <span className="font-bold text-gray-900 dark:text-white">₹ {loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Total Interest ({activeCard.interestRate}% p.a.)</span>
                    <span className="font-bold text-orange-500">₹ {Math.round(totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-px bg-gray-200 dark:bg-gray-800 my-2"></div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-900 dark:text-white font-extrabold">Total Payable</span>
                    <span className="font-black text-gray-900 dark:text-white">₹ {Math.round(totalPayable).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comparison Cards */}
            <div className="mt-8">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Compare EMI Plans</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {comparePlans.map((plan) => (
                  <div 
                    key={plan.months} 
                    onClick={() => {
                      setTenure(plan.months);
                      toast.success(`Selected ${plan.months} Months plan`);
                    }}
                    className={`border rounded-2xl p-4 cursor-pointer transition-all relative hover:scale-[1.03] active:scale-[0.98] ${tenure === plan.months ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/20 shadow-md' : 'border-gray-100 dark:border-white/10 hover:border-blue-300 dark:hover:border-[#00E5FF]/20'}`}
                  >
                    {plan.recommended && <span className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[8px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap tracking-wider">Best Value</span>}
                    <h5 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{plan.months} Months</h5>
                    <p className="text-[9px] text-gray-500 dark:text-gray-400 mb-2">@ {activeCard.interestRate}% p.a.</p>
                    <p className="font-extrabold text-blue-600 dark:text-[#00E5FF] text-base whitespace-nowrap">₹ {Math.round(plan.emi).toLocaleString('en-IN')}</p>
                    <p className="text-[9px] font-semibold text-gray-400 dark:text-gray-600 mt-1">/month</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Insights Sidebar */}
        <div className="xl:w-[28%] space-y-6">
          
          {/* Quick-Cash Instant Bank Transfer Widget */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden global-card">
            <div className="relative z-10">
              <span className="bg-teal-50 text-teal-800 dark:bg-teal-800/40 dark:text-teal-300 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg mb-4 inline-block shadow-sm">Pre-approved Cash</span>
              <h3 className="font-extrabold text-gray-900 dark:text-white text-[15px] mb-1.5 leading-tight flex items-center gap-1.5">Quick Cash Transfer <Zap className="w-4 h-4 text-yellow-500 fill-current animate-pulse"/></h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mb-4">Transfer money instantly from your credit limit to your bank account.</p>
              
              <div className="space-y-4 mb-5">
                {/* Amount input slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Transfer Amount</label>
                    <span className="text-xs font-black text-blue-700 dark:text-[#00E5FF]">₹ {transferAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" min="10000" max={activeCard.preApprovedAmt} step="5000"
                    value={transferAmount} onChange={(e) => setTransferAmount(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-700 dark:accent-[#00E5FF]"
                  />
                  <div className="flex justify-between text-[8px] font-bold text-gray-400 mt-1">
                    <span>₹10,000</span>
                    <span>Max: ₹ {activeCard.preApprovedAmt.toLocaleString()}</span>
                  </div>
                </div>

                {/* Target bank account selector */}
                <div>
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase block mb-2">Select Bank Account</label>
                  <select 
                    value={transferBank} 
                    onChange={(e) => setTransferBank(e.target.value)}
                    className="w-full text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0A0F1D]/55 border border-gray-100 dark:border-white/5 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="HDFC Bank (•••• 9876)">HDFC Bank (•••• 9876) - Primary</option>
                    <option value="ICICI Bank (•••• 5432)">ICICI Bank (•••• 5432)</option>
                    <option value="SBI Bank (•••• 1024)">SBI Bank (•••• 1024)</option>
                  </select>
                </div>
              </div>

              <button 
                disabled={transferLoading}
                onClick={() => {
                  setTransferLoading(true);
                  const tid = toast.loading(`Transferring ₹${transferAmount.toLocaleString()} to ${transferBank.split(' ')[0]}...`);
                  setTimeout(() => {
                    toast.dismiss(tid);
                    toast.success(`Successfully transferred ₹${transferAmount.toLocaleString()} to bank account! Check bank statement.`);
                    setTransferLoading(false);
                  }, 1800);
                }}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-3 px-6 rounded-2xl transition-all shadow-md text-xs w-full hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                {transferLoading ? (
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 animate-spin"/> Transferring...</span>
                ) : (
                  <>Send Cash Now <ArrowRight className="w-3.5 h-3.5"/></>
                )}
              </button>
            </div>
            <Zap className="absolute -bottom-4 -right-4 w-32 h-32 text-teal-500/5 transform rotate-12" />
          </div>

          {/* Credit Health Impact */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.01] transition-transform duration-300 global-card">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-[#00E5FF] flex items-center justify-center shrink-0 border border-blue-100/50 dark:border-white/5 shadow-sm">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[15px]">Credit Health</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed font-medium">
              Converting large purchases to EMIs and paying them on time can positively impact your credit score by maintaining a lower credit utilization ratio.
            </p>
            <div className="bg-blue-50/50 dark:bg-[#00E5FF]/5 rounded-2xl p-4 flex items-start gap-3 border border-blue-100/20">
               <Info className="w-4 h-4 text-blue-600 dark:text-[#00E5FF] shrink-0 mt-0.5" />
               <p className="text-[11px] font-bold text-blue-800 dark:text-blue-300">Your current utilization is <strong>25%</strong>. Taking an EMI will not block your entire limit.</p>
            </div>
          </div>

          {/* Smart Auto-EMI Rules Control Panel */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.01] transition-transform duration-300 global-card">
            <h3 className="font-bold text-[15px] mb-1.5 flex items-center gap-1.5">Auto-EMI Controls <Sparkles className="w-4 h-4 text-blue-500 dark:text-[#00E5FF] animate-pulse"/></h3>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mb-5">Configure rules to automatically convert bills to EMIs.</p>
            
            <div className="space-y-4">
              {/* Toggle 1: Auto-convert spend threshold */}
              <div className="border-b border-gray-100 dark:border-white/5 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Auto-Convert Bills</h4>
                    <p className="text-[9px] text-gray-500 font-medium mt-0.5">Convert high bills to EMIs automatically</p>
                  </div>
                  <button 
                    onClick={() => {
                      setAutoConvertActive(!autoConvertActive);
                      toast.success(`Auto-Convert set to ${!autoConvertActive ? 'Active' : 'Inactive'}`);
                    }}
                    className={`w-9 h-5 rounded-full relative transition-colors ${autoConvertActive ? 'bg-blue-600' : 'bg-gray-250 dark:bg-gray-800'}`}
                  >
                    <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${autoConvertActive ? 'left-[18px]' : 'left-0.5'}`}/>
                  </button>
                </div>
                
                {autoConvertActive && (
                  <div className="mt-3 animate-fade-in">
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1">
                      <span>Threshold Limit</span>
                      <span className="text-blue-600 dark:text-[#00E5FF]">₹ {autoConvertThreshold.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="10000" max="50000" step="5000"
                      value={autoConvertThreshold} onChange={(e) => setAutoConvertThreshold(Number(e.target.value))}
                      className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                )}
              </div>

              {/* Toggle 2: International Spends */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">International Transactions</h4>
                  <p className="text-[9px] text-gray-500 font-medium mt-0.5">Auto-convert foreign currency spends</p>
                </div>
                <button 
                  onClick={() => {
                    setAutoConvertInternational(!autoConvertInternational);
                    toast.success(`International auto-convert set to ${!autoConvertInternational ? 'Active' : 'Inactive'}`);
                  }}
                  className={`w-9 h-5 rounded-full relative transition-colors ${autoConvertInternational ? 'bg-blue-600' : 'bg-gray-250 dark:bg-gray-800'}`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${autoConvertInternational ? 'left-[18px]' : 'left-0.5'}`}/>
                </button>
              </div>

              {/* Toggle 3: No-Cost Priority */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">No-Cost EMI Priority</h4>
                  <p className="text-[9px] text-gray-500 font-medium mt-0.5">Always prefer 0% interest matchers</p>
                </div>
                <button 
                  onClick={() => {
                    setNoCostPriority(!noCostPriority);
                    toast.success(`No-Cost EMI Priority set to ${!noCostPriority ? 'Active' : 'Inactive'}`);
                  }}
                  className={`w-9 h-5 rounded-full relative transition-colors ${noCostPriority ? 'bg-blue-600' : 'bg-gray-250 dark:bg-gray-800'}`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${noCostPriority ? 'left-[18px]' : 'left-0.5'}`}/>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmiLoans;
