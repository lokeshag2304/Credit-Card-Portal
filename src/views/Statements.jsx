import React, { useState } from 'react';
import { 
  Search, Calendar, ChevronDown, Download, Wallet, Clock, FileText, CalendarCheck, Info,
  PieChart, Gift, Award, CreditCard, RefreshCcw, X, Printer, Mail
} from 'lucide-react';
import toast from 'react-hot-toast';

const Statements = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [previewId, setPreviewId] = useState(null);

  // Dynamic filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState('All Cards');
  const [selectedType, setSelectedType] = useState('All Types');
  const [paymentStatus, setPaymentStatus] = useState('All Status');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  
  // Date selector state
  const [dateRangeFilter, setDateRangeFilter] = useState('All Time');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  // Quick filter chips tracking
  const [activeChip, setActiveChip] = useState(null);

  // PDF Preview settings state
  const [pdfPasswordProtected, setPdfPasswordProtected] = useState(true);

  // Insight selector states
  const [selectedInsightPeriod, setSelectedInsightPeriod] = useState('This Year');
  const [insightDropdownOpen, setInsightDropdownOpen] = useState(false);

  const handleExport = (format = 'PDF') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success(`Statement ${format} downloaded successfully!`);
    }, 1500);
  };

  const handleEmailStatement = (monthName) => {
    toast.success(`Statement for ${monthName} emailed to rahul.s@splendin.com!`);
  };

  const handlePrintStatement = (monthName) => {
    toast.success(`Preparing print job for ${monthName} statement...`);
  };

  const handleDispute = () => {
    toast.success('Dispute ticket raised! Our team will contact you within 24 hours.');
  };

  const statements = [
    { id: 1, month: "April 2024", period: "01 Apr - 30 Apr 2024", totalDue: "₹ 24,680.50", totalDueVal: 24680.50, minDue: "₹ 2,500.00", due: "05 May 2024", status: "Paid", color: "text-green-500 bg-green-500/10 border border-green-500/20", generated: "01 May 2024", size: "1.2 MB", card: "**** 4567" },
    { id: 2, month: "March 2024", period: "01 Mar - 31 Mar 2024", totalDue: "₹ 22,560.75", totalDueVal: 22560.75, minDue: "₹ 2,250.00", due: "05 Apr 2024", status: "Paid", color: "text-green-500 bg-green-500/10 border border-green-500/20", generated: "01 Apr 2024", size: "1.1 MB", card: "**** 4567" },
    { id: 3, month: "February 2024", period: "01 Feb - 29 Feb 2024", totalDue: "₹ 21,430.00", totalDueVal: 21430.00, minDue: "₹ 2,250.00", due: "05 Mar 2024", status: "Paid", color: "text-green-500 bg-green-500/10 border border-green-500/20", generated: "01 Mar 2024", size: "1.0 MB", card: "**** 4567" },
    { id: 4, month: "January 2024", period: "01 Jan - 31 Jan 2024", totalDue: "₹ 20,450.30", totalDueVal: 20450.30, minDue: "₹ 2,000.00", due: "05 Feb 2024", status: "Paid", color: "text-green-500 bg-green-500/10 border border-green-500/20", generated: "01 Feb 2024", size: "1.0 MB", card: "**** 4567" },
    { id: 5, month: "December 2023", period: "01 Dec - 31 Dec 2023", totalDue: "₹ 26,780.60", totalDueVal: 26780.60, minDue: "₹ 2,500.00", due: "05 Jan 2024", status: "Overdue", color: "text-red-500 bg-red-500/10 border border-red-500/20", generated: "01 Jan 2024", size: "1.3 MB", card: "**** 4567" },
    { id: 6, month: "November 2023", period: "01 Nov - 30 Nov 2023", totalDue: "₹ 18,950.00", totalDueVal: 18950.00, minDue: "₹ 1,895.00", due: "05 Dec 2023", status: "Paid", color: "text-green-500 bg-green-500/10 border border-green-500/20", generated: "01 Dec 2023", size: "980 KB", card: "**** 4567" },
    { id: 7, month: "October 2023", period: "01 Oct - 31 Oct 2023", totalDue: "₹ 17,890.45", totalDueVal: 17890.45, minDue: "₹ 1,789.00", due: "05 Nov 2023", status: "Paid", color: "text-green-500 bg-green-500/10 border border-green-500/20", generated: "01 Nov 2023", size: "950 KB", card: "**** 4567" },
    { id: 8, month: "September 2023", period: "01 Sep - 30 Sep 2023", totalDue: "₹ 16,430.20", totalDueVal: 16430.20, minDue: "₹ 1,643.00", due: "05 Oct 2023", status: "Paid", color: "text-green-500 bg-green-500/10 border border-green-500/20", generated: "01 Oct 2023", size: "950 KB", card: "**** 4567" }
  ];

  // Insights datasets for dropdown
  const insightMetrics = {
    'This Year': {
      totalPaid: '₹ 1,25,430.25',
      vsText: '▲ 18.6% vs last year',
      chartPath: 'M0,130 C30,120 60,110 90,130 C120,150 150,100 180,90 C210,80 240,110 270,90 C300,70 330,60 360,40 C380,25 400,30 400,30',
      chartGrad: 'M0,130 C30,120 60,110 90,130 C120,150 150,100 180,90 C210,80 240,110 270,90 C300,70 330,60 360,40 C380,25 400,30 400,30 L400,150 L0,150 Z',
      circleX: 360,
      circleY: 40,
      textLabel: '₹ 24.6K',
      categories: [
        { name: "Shopping", pct: "40%", width: "w-[40%]", color: "bg-blue-600 dark:bg-blue-500" },
        { name: "Travel", pct: "20%", width: "w-[20%]", color: "bg-teal-500" },
        { name: "Food & Dining", pct: "18%", width: "w-[18%]", color: "bg-orange-500" },
        { name: "Utilities", pct: "12%", width: "w-[12%]", color: "bg-purple-500" },
        { name: "Others", pct: "10%", width: "w-[10%]", color: "bg-gray-400 dark:bg-gray-600" },
      ]
    },
    'Last Year': {
      totalPaid: '₹ 2,12,650.00',
      vsText: '▲ 8.2% vs previous',
      chartPath: 'M0,100 C30,120 60,95 90,105 C120,70 150,85 180,50 C210,65 240,55 270,40 C300,30 330,25 360,15 C380,10 400,10 400,10',
      chartGrad: 'M0,100 C30,120 60,95 90,105 C120,70 150,85 180,50 C210,65 240,55 270,40 C300,30 330,25 360,15 C380,10 400,10 L400,150 L0,150 Z',
      circleX: 360,
      circleY: 15,
      textLabel: '₹ 26.8K',
      categories: [
        { name: "Shopping", pct: "35%", width: "w-[35%]", color: "bg-blue-600 dark:bg-blue-500" },
        { name: "Travel", pct: "25%", width: "w-[25%]", color: "bg-teal-500" },
        { name: "Food & Dining", pct: "22%", width: "w-[22%]", color: "bg-orange-500" },
        { name: "Utilities", pct: "10%", width: "w-[10%]", color: "bg-purple-500" },
        { name: "Others", pct: "8%", width: "w-[8%]", color: "bg-gray-400 dark:bg-gray-600" },
      ]
    }
  };

  // Perform dynamic filtering based on selections
  const filteredStatements = statements.filter((stmt) => {
    // 1. Search Query
    if (searchQuery && !stmt.month.toLowerCase().includes(searchQuery.toLowerCase()) && !stmt.totalDue.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // 2. Card Selection
    if (selectedCard !== 'All Cards') {
      const cardNum = selectedCard.includes('4567') ? '**** 4567' : '**** 1234';
      if (stmt.card !== cardNum) return false;
    }
    // 3. Payment Status Selection
    if (paymentStatus !== 'All Status' && stmt.status !== paymentStatus) {
      return false;
    }
    // 4. Min Amount
    if (minAmount && stmt.totalDueVal < parseFloat(minAmount)) {
      return false;
    }
    // 5. Max Amount
    if (maxAmount && stmt.totalDueVal > parseFloat(maxAmount)) {
      return false;
    }
    // 6. Quick filters chips
    if (activeChip === 'Downloaded' && stmt.id % 2 !== 0) return false;
    if (activeChip === 'Unpaid' && stmt.status !== 'Overdue') return false;
    if (activeChip === 'Last 3 Months' && stmt.id > 3) return false;
    
    return true;
  });

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCard('All Cards');
    setSelectedType('All Types');
    setPaymentStatus('All Status');
    setMinAmount('');
    setMaxAmount('');
    setDateRangeFilter('All Time');
    setActiveChip(null);
    toast.success('Filters reset successfully!');
  };

  const handleApplyFilters = () => {
    toast.success(`Applied filters successfully! Found ${filteredStatements.length} statements.`);
  };

  const handleChipClick = (chip) => {
    if (activeChip === chip) {
      setActiveChip(null);
      toast.success(`Removed quick filter: ${chip}`);
    } else {
      setActiveChip(chip);
      toast.success(`Quick filter applied: ${chip}`);
    }
  };

  // Extract selected statement details for PDF preview modal
  const selectedStatement = statements.find(s => s.id === previewId) || statements[0];

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-[#F8FAFC] max-w-[1600px] mx-auto relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Statements</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-white">Statements</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Access, download and manage your monthly credit card statements</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline">
          How statements work? <Info className="w-4 h-4" />
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 relative">
        
        {/* Left Column - Main Content */}
        <div className="xl:w-[70%] space-y-6">
          
          {/* Top Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Outstanding Card */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl border border-gray-100/80 dark:border-white/10 rounded-3xl p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(37,99,235,0.1)] dark:hover:shadow-[0_0_20px_rgba(37,99,255,0.15)] dark:hover:border-[#00E5FF]/20 transition-all duration-300 global-card">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-500/20 mb-4 shrink-0">
                <Wallet className="w-5 h-5"/>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider h-7 flex items-end">Total Outstanding</p>
                <h4 className="font-extrabold text-[16.5px] text-gray-900 dark:text-white whitespace-nowrap leading-snug">₹ 25,430.75</h4>
              </div>
              <div className="mt-4">
                <p className="text-[11px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 inline-block px-2.5 py-1 rounded-lg border border-green-100 dark:border-green-500/10">▲ 12.4% vs last cycle</p>
              </div>
            </div>

            {/* Current Billing Card */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl border border-gray-100/80 dark:border-white/10 rounded-3xl p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(20,184,166,0.1)] dark:hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] dark:hover:border-[#00E5FF]/20 transition-all duration-300 relative overflow-hidden global-card">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-500/20"></div>
              <div className="absolute bottom-0 left-0 w-2/3 h-1 bg-teal-500"></div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-100 dark:border-purple-500/20 mb-4 shrink-0">
                <Calendar className="w-5 h-5"/>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider h-7 flex items-end">Current Billing Cycle</p>
                <h4 className="font-extrabold text-[13.5px] text-gray-900 dark:text-white whitespace-nowrap tracking-tight leading-snug">01 May - 31 May 2024</h4>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-4.5 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-teal-500"/> 12 days remaining</p>
            </div>

            {/* Last Statement Card */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl border border-gray-100/80 dark:border-white/10 rounded-3xl p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_0_20px_rgba(13,148,136,0.15)] dark:hover:border-[#00E5FF]/20 transition-all duration-300 global-card">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-100 dark:border-teal-500/20 mb-4 shrink-0">
                <FileText className="w-5 h-5"/>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider h-7 flex items-end">Last Statement Amount</p>
                <h4 className="font-extrabold text-[16.5px] text-gray-900 dark:text-white whitespace-nowrap leading-snug">₹ 24,680.50</h4>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-4.5">April 2024 Statement</p>
            </div>

            {/* Upcoming Due Card */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl border border-gray-100/80 dark:border-white/10 rounded-3xl p-5.5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(249,115,22,0.1)] dark:hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] dark:hover:border-[#00E5FF]/20 transition-all duration-300 global-card">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center border border-orange-100 dark:border-orange-500/20 mb-4 shrink-0">
                <CalendarCheck className="w-5 h-5"/>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider h-7 flex items-end">Upcoming Due Date</p>
                <h4 className="font-extrabold text-[16.5px] text-gray-900 dark:text-white whitespace-nowrap leading-snug">05 Jun 2024</h4>
              </div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap mt-4.5">Minimum Due: ₹2,500.00</p>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <div className="bg-white/90 dark:bg-[#071426]/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-100/80 dark:border-white/10 global-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 mb-6">
              
              {/* Search input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Search Statement</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search month..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-100 dark:border-white/5 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-[#00E5FF]/40 bg-gray-50/50 dark:bg-[#0A0F1D]/60 text-gray-700 dark:text-white" 
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Date range selector dropdown */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
                <button 
                  onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                  className="w-full flex items-center justify-between border border-gray-100 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-semibold cursor-pointer hover:border-blue-400 dark:bg-[#0A0F1D]/60 transition-colors text-gray-700 dark:text-gray-200"
                >
                  <span className="truncate">{dateRangeFilter}</span>
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
                </button>
                {dateDropdownOpen && (
                  <div className="absolute left-0 mt-1 bg-white/95 dark:bg-[#0F172A]/95 border border-gray-100 dark:border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl py-1.5 z-30 w-full animate-fade-in-up global-card">
                    {['All Time', 'Jan 2024 - May 2024', 'Last 6 Months', 'Year 2023'].map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setDateRangeFilter(range);
                          setDateDropdownOpen(false);
                          toast.success(`Date limit set to: ${range}`);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-bold ${dateRangeFilter === range ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cards select dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Card</label>
                <div className="relative">
                  <select 
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                    className="w-full appearance-none border border-gray-100 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-200 bg-transparent dark:bg-[#0A0F1D]/60 outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-[#00E5FF]/40 cursor-pointer"
                  >
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">All Cards</option>
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">Visa Signature (4567)</option>
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">Mastercard (1234)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Statement type select */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Statement Type</label>
                <div className="relative">
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full appearance-none border border-gray-100 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-200 bg-transparent dark:bg-[#0A0F1D]/60 outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-[#00E5FF]/40 cursor-pointer"
                  >
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">All Types</option>
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">Monthly</option>
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">Annual</option>
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">Tax Summary</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Payment status dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Payment Status</label>
                <div className="relative">
                  <select 
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full appearance-none border border-gray-100 dark:border-white/5 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-200 bg-transparent dark:bg-[#0A0F1D]/60 outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-[#00E5FF]/40 cursor-pointer"
                  >
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">All Status</option>
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">Paid</option>
                    <option className="dark:bg-[#0F172A] text-gray-800 dark:text-gray-200">Overdue</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Amount ranges */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Amount Range (₹)</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="w-1/2 border border-gray-100 dark:border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-500 dark:bg-[#0A0F1D]/60 text-gray-700 dark:text-white" 
                  />
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="w-1/2 border border-gray-100 dark:border-white/5 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-500 dark:bg-[#0A0F1D]/60 text-gray-700 dark:text-white" 
                  />
                </div>
                <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-3">
                  <div className="absolute left-0 right-1/4 h-full bg-teal-500 rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 bg-white border-2 border-teal-500 rounded-full cursor-pointer"></div>
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 -mr-1.5 w-3 h-3 bg-white border-2 border-teal-500 rounded-full cursor-pointer"></div>
                </div>
              </div>

              {/* Quick Filter chips */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Quick Filters</label>
                <div className="flex flex-wrap gap-2">
                  {['Last 3 Months', 'Downloaded', 'Unpaid'].map((chip, i) => (
                    <span 
                      key={i} 
                      onClick={() => handleChipClick(chip)}
                      className={`px-3 py-1.5 border rounded-lg text-xs font-extrabold cursor-pointer transition-all duration-200 ${activeChip === chip ? 'bg-blue-600 border-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.2)]' : 'border-gray-100/80 dark:border-white/5 text-gray-600 dark:text-gray-350 hover:bg-gray-100 dark:hover:bg-[#0A0F1D]/75'}`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-100/80 dark:border-white/5 pt-5 mt-2 gap-4">
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleApplyFilters}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.35)] dark:shadow-[0_0_20px_rgba(37,99,255,0.3)] hover:-translate-y-0.5 text-xs"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={handleReset}
                  className="flex-1 sm:flex-none border border-gray-300 dark:border-white/10 text-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold py-2.5 px-6 rounded-xl transition-all text-xs"
                >
                  Reset
                </button>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                 <button onClick={() => handleExport('CSV')} className="w-full sm:w-auto flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-4 py-2.5 rounded-xl transition-colors">
                   <Download className="w-4 h-4"/> Export List
                 </button>
                 <button onClick={() => handleExport('ZIP')} className="w-full sm:w-auto flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-4 py-2.5 rounded-xl transition-colors">
                   <Download className="w-4 h-4"/> Download All Statements
                 </button>
              </div>
            </div>
          </div>

          {/* Statements List */}
          <div className="bg-white/90 dark:bg-[#071426]/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-100/80 dark:border-white/10 overflow-hidden relative global-card">
            <div className="p-6 border-b border-gray-100/80 dark:border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Statements List</h3>
                <span className="bg-gray-200/70 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-gray-100/10">
                  {filteredStatements.length} Statements
                </span>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              {filteredStatements.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-semibold text-sm">
                  No statements match the selected filters.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-widest border-b border-gray-100/80 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0F1D]/40">
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Statement Month</th>
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Billing Period</th>
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Total Due (₹)</th>
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Minimum Due (₹)</th>
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Due Date</th>
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Status</th>
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Generated On</th>
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Size</th>
                      <th className="px-6 py-4.5 font-bold whitespace-nowrap">Card Used</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/60 dark:divide-white/5">
                    {filteredStatements.map((stmt) => (
                      <tr key={stmt.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-blue-500 opacity-80 shrink-0" />
                            <div className="flex items-center gap-2">
                               <h4 className="font-extrabold text-sm text-gray-900 dark:text-[#F8FAFC]">{stmt.month}</h4>
                               <span 
                                 onClick={() => {
                                   setPreviewId(stmt.id);
                                   toast.success(`Loading ${stmt.month} statement preview...`);
                                 }} 
                                 className={`text-[10px] font-extrabold cursor-pointer hover:underline transition-colors ${previewId === stmt.id ? 'text-teal-600 dark:text-teal-400 font-black' : 'text-blue-600 dark:text-blue-400'}`}
                               >
                                 {previewId === stmt.id ? 'Viewing' : 'View'}
                               </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-500 dark:text-gray-400">{stmt.period}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-gray-900 dark:text-white">{stmt.totalDue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-gray-300">{stmt.minDue}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-500 dark:text-gray-400">{stmt.due}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md ${stmt.color}`}>{stmt.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-500 dark:text-gray-400">{stmt.generated}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-500 dark:text-gray-400">{stmt.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-xs font-extrabold text-gray-900 dark:text-gray-200">{stmt.card}</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">Visa Signature</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-5 border-t border-gray-100/80 dark:border-white/5 flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Showing 1 to {filteredStatements.length} of {filteredStatements.length} statements</span>
              <div className="flex gap-4 items-center">
                 <div className="flex items-center gap-2">
                   <span>Rows per page:</span>
                   <select className="border border-gray-100 dark:border-white/5 rounded px-2.5 py-1 outline-none dark:bg-[#0A0F1D]/60 text-gray-700 dark:text-gray-300">
                     <option>10</option>
                     <option>20</option>
                   </select>
                 </div>
                 <div className="flex gap-1.5">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-bold">&lt;</button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 text-white font-bold shadow-md">1</button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-bold">&gt;</button>
                </div>
              </div>
            </div>

            {/* Statement Preview Modal (Absolute positioned over the table) */}
            {previewId && (
              <div className="absolute right-6 top-16 w-[350px] bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-2xl shadow-2xl rounded-2xl border border-gray-100 dark:border-white/10 z-30 transform transition-all animate-fade-in-up">
                <div className="p-4 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-[#071426]/70 rounded-t-2xl">
                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">Statement Preview</h4>
                  <button 
                    onClick={() => setPreviewId(null)} 
                    className="p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                  </button>
                </div>
                <div className="p-4 bg-gray-100/50 dark:bg-[#0A0F1D]/80 flex justify-center">
                   {/* DYNAMIC PDF Preview Mock based on selected statement details */}
                   <div className="bg-white dark:bg-gray-950 dark:text-gray-100 p-4 w-full h-[300px] shadow-lg flex flex-col text-[8px] font-mono border dark:border-white/5 text-gray-800 transition-colors rounded-xl relative overflow-hidden">
                      <div className="flex justify-between border-b pb-2 mb-2 dark:border-white/5">
                        <div className="font-bold text-blue-700 dark:text-blue-400 text-[10px] tracking-tight">SPLENDIN<br/><span className="text-[6px] font-normal text-gray-500 dark:text-gray-400">CREDIT CARD PORTAL</span></div>
                        <div className="text-right font-bold">STATEMENT OF ACCOUNT<br/><span className="font-normal text-gray-500 dark:text-gray-400">{selectedStatement.month}</span></div>
                      </div>
                      <div className="flex justify-between mb-4">
                        <div>Card Holder<br/><b>Rahul Sharma</b></div>
                        <div className="text-right">Card Number<br/><b>{selectedStatement.card}</b></div>
                      </div>
                      <div className="flex justify-between mb-4">
                        <div>Statement Date<br/><b>{selectedStatement.generated}</b></div>
                        <div className="text-right">Credit Limit<br/><b>₹ 1,00,000.00</b></div>
                      </div>
                      <div className="border border-gray-100 dark:border-white/5 p-1.5 mb-2 font-extrabold bg-gray-50 dark:bg-gray-900 rounded">Summary</div>
                      <div className="flex justify-between mb-1"><span>Billing Period</span><span>{selectedStatement.period}</span></div>
                      <div className="flex justify-between mb-1"><span>Minimum Due</span><span>{selectedStatement.minDue}</span></div>
                      <div className="flex justify-between mb-2"><span>Finance Charges</span><span>₹ 0.00</span></div>
                      <div className="border-t border-gray-300 dark:border-white/5 pt-2 flex justify-between font-extrabold mb-1"><span>Total Amount Due</span><span>{selectedStatement.totalDue}</span></div>
                      <div className="flex justify-between font-extrabold text-gray-600 dark:text-gray-400 mb-4"><span>Status</span><span className={selectedStatement.status === 'Paid' ? 'text-green-500' : 'text-red-500'}>{selectedStatement.status}</span></div>
                      <div className="flex justify-between font-extrabold text-[9px]"><span>Due Date</span><span>{selectedStatement.due}</span></div>
                      
                      <div className="mt-auto text-[5px] text-gray-400 text-center border-t dark:border-white/5 pt-1">* This is system generated statement and does not require signature.</div>
                   </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-center text-[10px] text-gray-500 mb-2">1 / 3</div>
                  <button onClick={() => handleExport('PDF')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-2.5 rounded-xl text-xs flex justify-center items-center gap-2 transition-all shadow-[0_4px_12px_rgba(37,99,235,0.2)]">
                    <Download className="w-4 h-4"/> Download PDF
                  </button>
                  <button onClick={() => handlePrintStatement(selectedStatement.month)} className="w-full border border-gray-250 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-800 font-extrabold py-2 rounded-xl text-xs flex justify-center items-center gap-2 transition-all text-blue-700 dark:text-blue-400">
                    <Printer className="w-4 h-4"/> Print Statement
                  </button>
                  <button onClick={() => handleEmailStatement(selectedStatement.month)} className="w-full border border-gray-250 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-800 font-extrabold py-2 rounded-xl text-xs flex justify-center items-center gap-2 transition-all text-blue-655 dark:text-blue-400">
                    <Mail className="w-4 h-4"/> Email Statement
                  </button>
                  <div className="flex justify-between items-center pt-3.5 border-t border-gray-100 dark:border-white/5 mt-2.5">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Password Protection
                    </span>
                    <button 
                      onClick={() => {
                        setPdfPasswordProtected(!pdfPasswordProtected);
                        toast.success(pdfPasswordProtected ? 'Password protection disabled for downloads.' : 'Password protection enabled for downloads.');
                      }}
                      className={`w-9 h-5 rounded-full relative transition-colors duration-250 ${pdfPasswordProtected ? 'bg-teal-500' : 'bg-gray-200 dark:bg-[#0A0F1D]'}`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${pdfPasswordProtected ? 'left-[18px]' : 'left-0.5'} shadow-sm`} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Insights & Stats */}
        <div className="xl:w-[30%] space-y-6">
          
          {/* Statement Insights */}
          <div className="bg-white/90 dark:bg-[#071426]/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-100/80 dark:border-white/10 relative overflow-hidden global-card">
            <div className="flex justify-between items-center mb-6 relative">
              <h3 className="font-bold text-[15px] text-gray-900 dark:text-white">Statement Insights</h3>
              <div className="relative">
                <button 
                  onClick={() => setInsightDropdownOpen(!insightDropdownOpen)}
                  className="text-[11px] font-bold bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center gap-1 text-gray-700 dark:text-gray-200"
                >
                  {selectedInsightPeriod} <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>
                {insightDropdownOpen && (
                  <div className="absolute right-0 mt-1 bg-white/95 dark:bg-[#0F172A]/95 border border-gray-100 dark:border-white/10 rounded-xl shadow-2xl py-1.5 z-30 w-32 animate-fade-in-up global-card">
                    {Object.keys(insightMetrics).map((period) => (
                      <button
                        key={period}
                        onClick={() => {
                          setSelectedInsightPeriod(period);
                          setInsightDropdownOpen(false);
                          toast.success(`Switched metrics to: ${period}`);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-bold ${selectedInsightPeriod === period ? 'text-blue-700 dark:text-blue-400 font-extrabold' : 'text-gray-800 dark:text-gray-300'}`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-455 mb-1">Total Amount Paid</p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                {insightMetrics[selectedInsightPeriod].totalPaid}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-black text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded border border-green-500/10">
                  {insightMetrics[selectedInsightPeriod].vsText}
                </span>
              </div>
            </div>

            {/* SVG Line Chart Mock based on selected period */}
            <div className="h-32 w-full relative">
              <svg viewBox="0 0 400 150" className="w-full h-full preserve-aspect-ratio-none">
                <defs>
                  <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={insightMetrics[selectedInsightPeriod].chartGrad} fill="url(#lineGrad2)" />
                <path d={insightMetrics[selectedInsightPeriod].chartPath} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                <circle cx="90" cy="130" r="4" fill="#2563EB" stroke="white" strokeWidth="2" />
                <circle cx="180" cy="90" r="4" fill="#2563EB" stroke="white" strokeWidth="2" />
                <circle cx="270" cy="90" r="4" fill="#2563EB" stroke="white" strokeWidth="2" />
                <circle cx={insightMetrics[selectedInsightPeriod].circleX} cy={insightMetrics[selectedInsightPeriod].circleY} r="5" fill="#00E5FF" stroke="#2563EB" strokeWidth="3" className="drop-shadow-md" />
                <rect x={insightMetrics[selectedInsightPeriod].circleX - 22} y={insightMetrics[selectedInsightPeriod].circleY - 22} width="44" height="15" rx="4" fill="#2563EB" />
                <text x={insightMetrics[selectedInsightPeriod].circleX} y={insightMetrics[selectedInsightPeriod].circleY - 12} fontSize="8" fill="white" fontWeight="black" textAnchor="middle">
                  {insightMetrics[selectedInsightPeriod].textLabel}
                </text>
              </svg>
              <div className="absolute bottom-[-10px] w-full flex justify-between text-[9px] font-black text-gray-400 dark:text-gray-500">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Dec</span>
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white/90 dark:bg-[#071426]/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-100/80 dark:border-white/10 global-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[15px] text-gray-900 dark:text-white">Top Categories (By Spend)</h3>
              <span className="text-xs font-extrabold bg-gray-50 dark:bg-gray-800 px-2.5 py-1 rounded-lg border border-gray-100 dark:border-white/5 text-gray-700 dark:text-gray-300">{selectedInsightPeriod}</span>
            </div>
            
            <div className="space-y-4.5">
              {insightMetrics[selectedInsightPeriod].categories.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-bold">
                  <span className="w-24 text-gray-700 dark:text-gray-300">{item.name}</span>
                  <div className="flex-1 mx-4 h-1.5 bg-gray-100 dark:bg-gray-950 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} ${item.width} rounded-full`}></div>
                  </div>
                  <span className="text-gray-900 dark:text-white font-extrabold w-8 text-right">{item.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* More Insights */}
          <div className="bg-white/90 dark:bg-[#071426]/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-100/80 dark:border-white/10 global-card">
            <h3 className="font-bold text-[15px] mb-4 text-gray-900 dark:text-white">More Insights</h3>
            <div className="space-y-4">
              {[
                { title: "Cashback Earned", val: "₹ 2,450.00", icon: Gift, color: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20 border border-green-500/10" },
                { title: "Reward Points Earned", val: "12,450 Pts", icon: Award, color: "text-purple-605 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/20 border border-purple-500/10" },
                { title: "Credit Utilization", val: "32%", icon: PieChart, color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20 border border-blue-500/10" },
                { title: "EMI Converted", val: "₹ 18,500.00", icon: CreditCard, color: "text-orange-605 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/20 border border-orange-500/10" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-0.5">{stat.title}</p>
                    <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">{stat.val}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help CTA */}
          <div className="bg-white/90 dark:bg-[#071426]/70 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-100/80 dark:border-white/10 flex flex-col items-start gap-4 global-card">
             <div>
               <h4 className="font-extrabold text-gray-900 dark:text-white text-[15px] mb-1">Need Help?</h4>
               <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Raise a billing dispute or get help with your statement.</p>
             </div>
             <button onClick={handleDispute} className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-950/30 font-bold py-2.5 px-6 rounded-xl transition-all self-end text-xs">
               Raise Dispute
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Statements;
