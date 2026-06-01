import React, { useState } from 'react';
import { 
  Search, Calendar, ChevronDown, Download, MoreVertical, 
  ShoppingBag, Utensils, MonitorPlay, Fuel, Plane, Smartphone, 
  RefreshCcw, Zap, Wallet, X, Copy, MapPin
} from 'lucide-react';
import toast from 'react-hot-toast';

const Transactions = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('12 May 2024, 10:30 AM');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  
  // Date selection states
  const [selectedDateRange, setSelectedDateRange] = useState('All Dates');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  // Month selector states
  const [selectedMonth, setSelectedMonth] = useState('May 2024');
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  // Sorting states
  const [sortBy, setSortBy] = useState('Date (Newest)');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success('Transactions exported successfully!');
    }, 1500);
  };

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const formatted = now.toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      });
      setLastUpdated(formatted);
      setIsRefreshing(false);
      toast.success('Transactions refreshed!');
    }, 1200);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Transaction ID copied!');
  };

  const transactions = [
    { id: 1, merchant: "Amazon Purchase", sub: "Order #402-8792156-1234567", icon: ShoppingBag, color: "text-blue-600 bg-blue-100", cat: "Shopping", catIcon: ShoppingBag, date: "12 May 2024", time: "10:15 AM", card: "**** 4567", cardType: "Visa Signature", amount: "- ₹1,499.00", amountVal: 1499.00, isCredit: false, status: "Completed", statusColor: "text-teal-600", dotColor: "bg-teal-500", txId: "TXN5120412345678", location: "Amazon Development Centre India Pvt Ltd, 26/1, Brigade Gateway, Dr Rajkumar Road, Malleswaram West, Bengaluru, Karnataka 560055, India", mode: "Online", currency: "INR" },
    { id: 2, merchant: "Swiggy Food Order", sub: "Order #1839201930", icon: Utensils, color: "text-orange-600 bg-orange-100", cat: "Food & Dining", catIcon: Utensils, date: "11 May 2024", time: "08:45 PM", card: "**** 4567", cardType: "Visa Signature", amount: "- ₹329.00", amountVal: 329.00, isCredit: false, status: "Completed", statusColor: "text-teal-600", dotColor: "bg-teal-500", txId: "TXN5120412345679", location: "Swiggy India, Bengaluru", mode: "Online", currency: "INR" },
    { id: 3, merchant: "Netflix Subscription", sub: "netflix.com", icon: MonitorPlay, color: "text-red-600 bg-red-100", cat: "Entertainment", catIcon: MonitorPlay, date: "10 May 2024", time: "12:00 PM", card: "**** 1234", cardType: "Mastercard", amount: "- ₹649.00", amountVal: 649.00, isCredit: false, status: "Completed", statusColor: "text-teal-600", dotColor: "bg-teal-500", txId: "TXN5120412345680", location: "Netflix.com", mode: "Recurring", currency: "INR" },
    { id: 4, merchant: "Reliance Fuel", sub: "Bandra West, Mumbai", icon: Fuel, color: "text-yellow-600 bg-yellow-100", cat: "Fuel", catIcon: Fuel, date: "09 May 2024", time: "06:30 PM", card: "**** 7890", cardType: "Visa Cashback", amount: "- ₹2,150.00", amountVal: 2150.00, isCredit: false, status: "Completed", statusColor: "text-teal-600", dotColor: "bg-teal-500", txId: "TXN5120412345681", location: "Reliance Petrol Pump, Bandra West, Mumbai, 400050", mode: "POS (Tap & Pay)", currency: "INR" },
    { id: 5, merchant: "IndiGo Flight Booking", sub: "PNR: SE12345", icon: Plane, color: "text-indigo-600 bg-indigo-100", cat: "Travel", catIcon: Plane, date: "08 May 2024", time: "09:20 AM", card: "**** 4567", cardType: "Visa Signature", amount: "- ₹6,842.00", amountVal: 6842.00, isCredit: false, status: "Completed", statusColor: "text-teal-600", dotColor: "bg-teal-500", txId: "TXN5120412345682", location: "IndiGo Airlines Online", mode: "Online", currency: "INR" },
    { id: 6, merchant: "Apple Store", sub: "apple.com/bill", icon: Smartphone, color: "text-gray-900 bg-gray-200 dark:bg-gray-700 dark:text-white", cat: "Shopping", catIcon: ShoppingBag, date: "07 May 2024", time: "11:10 AM", card: "**** 1234", cardType: "Mastercard", amount: "- ₹4,999.00", amountVal: 4999.00, isCredit: false, status: "Pending", statusColor: "text-orange-500", dotColor: "bg-orange-400", txId: "TXN5120412345683", location: "Apple Store Online", mode: "Online", currency: "INR" },
    { id: 7, merchant: "PhonePe Cashback", sub: "Cashback Received", icon: RefreshCcw, color: "text-purple-600 bg-purple-100", cat: "Refunds", catIcon: RefreshCcw, date: "06 May 2024", time: "04:45 PM", card: "**** 4567", cardType: "Visa Signature", amount: "+ ₹250.00", amountVal: 250.00, isCredit: true, status: "Refunded", statusColor: "text-green-600", dotColor: "bg-green-500", txId: "TXN5120412345684", location: "PhonePe UPI", mode: "Refund", currency: "INR" },
    { id: 8, merchant: "Electricity Bill", sub: "BSES Rajdhani", icon: Zap, color: "text-amber-600 bg-amber-100", cat: "Utilities", catIcon: Zap, date: "05 May 2024", time: "01:30 PM", card: "**** 7890", cardType: "Visa Cashback", amount: "- ₹1,245.00", amountVal: 1245.00, isCredit: false, status: "Failed", statusColor: "text-red-500", dotColor: "bg-red-500", txId: "TXN5120412345685", location: "BSES Rajdhani Power Limited", mode: "Online", currency: "INR" }
  ];

  const monthlySummaries = {
    'May 2024': {
      total: '₹ 28,650.75',
      vsText: 'vs Apr 2024',
      vsPct: '▲ 18.6%',
      vsColor: 'text-green-600 bg-green-50 dark:bg-green-900/30',
      chartPath: 'M0,120 C40,110 80,140 120,100 C160,60 200,90 240,50 C280,10 320,60 360,30 C380,15 400,20 400,20',
      chartGrad: 'M0,120 C40,110 80,140 120,100 C160,60 200,90 240,50 C280,10 320,60 360,30 C380,15 400,20 400,20 L400,150 L0,150 Z',
      circleX: 360,
      circleY: 30,
      textX: 360,
      textY: 15,
      textLabel: '₹ 28.6K',
      breakdown: [
        { name: "Shopping", pct: "40%", color: "bg-blue-600" },
        { name: "Travel", pct: "20%", color: "bg-purple-500" },
        { name: "Food & Dining", pct: "18%", color: "bg-orange-500" },
        { name: "Utilities", pct: "12%", color: "bg-green-500" },
        { name: "Others", pct: "10%", color: "bg-gray-400" },
      ]
    },
    'April 2024': {
      total: '₹ 24,150.00',
      vsText: 'vs Mar 2024',
      vsPct: '▲ 12.4%',
      vsColor: 'text-green-600 bg-green-50 dark:bg-green-900/30',
      chartPath: 'M0,130 C40,120 80,110 120,130 C160,90 200,100 240,80 C280,60 320,70 360,50 C380,45 400,50 400,50',
      chartGrad: 'M0,130 C40,120 80,110 120,130 C160,90 200,100 240,80 C280,60 320,70 360,50 C380,45 400,50 400,50 L400,150 L0,150 Z',
      circleX: 360,
      circleY: 50,
      textX: 360,
      textY: 35,
      textLabel: '₹ 24.1K',
      breakdown: [
        { name: "Shopping", pct: "35%", color: "bg-blue-600" },
        { name: "Travel", pct: "25%", color: "bg-purple-500" },
        { name: "Food & Dining", pct: "20%", color: "bg-orange-500" },
        { name: "Utilities", pct: "10%", color: "bg-green-500" },
        { name: "Others", pct: "10%", color: "bg-gray-400" },
      ]
    },
    'March 2024': {
      total: '₹ 31,420.50',
      vsText: 'vs Feb 2024',
      vsPct: '▼ 5.2%',
      vsColor: 'text-red-600 bg-red-50 dark:bg-red-900/30',
      chartPath: 'M0,100 C40,110 80,90 120,120 C160,110 200,80 240,70 C280,50 320,40 360,20 C380,15 400,10 400,10',
      chartGrad: 'M0,100 C40,110 80,90 120,120 C160,110 200,80 240,70 C280,50 320,40 360,20 C380,15 400,10 400,10 L400,150 L0,150 Z',
      circleX: 360,
      circleY: 20,
      textX: 360,
      textY: 10,
      textLabel: '₹ 31.4K',
      breakdown: [
        { name: "Shopping", pct: "45%", color: "bg-blue-600" },
        { name: "Travel", pct: "15%", color: "bg-purple-500" },
        { name: "Food & Dining", pct: "22%", color: "bg-orange-500" },
        { name: "Utilities", pct: "10%", color: "bg-green-500" },
        { name: "Others", pct: "8%", color: "bg-gray-400" },
      ]
    }
  };

  // Perform dynamic filtering based on selections
  const filteredTransactions = transactions.filter((tx) => {
    // 1. Search Query (Merchant or subtext)
    if (searchQuery && !tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) && !tx.sub.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // 2. Category Dropdown
    if (selectedCategory !== 'All Categories' && tx.cat !== selectedCategory) {
      return false;
    }
    // 3. Min Amount
    if (minAmount && tx.amountVal < parseFloat(minAmount)) {
      return false;
    }
    // 4. Max Amount
    if (maxAmount && tx.amountVal > parseFloat(maxAmount)) {
      return false;
    }
    return true;
  });

  // Sorting logic based on selected criterion
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'Date (Newest)') {
      return b.id - a.id;
    } else if (sortBy === 'Date (Oldest)') {
      return a.id - b.id;
    } else if (sortBy === 'Amount (High to Low)') {
      return b.amountVal - a.amountVal;
    } else if (sortBy === 'Amount (Low to High)') {
      return a.amountVal - b.amountVal;
    }
    return 0;
  });

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setMinAmount('');
    setMaxAmount('');
    setSelectedDateRange('All Dates');
    toast.success('Filters reset successfully!');
  };

  const handleApplyFilters = () => {
    toast.success(`Applied filters successfully! Found ${filteredTransactions.length} results.`);
  };

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Transactions</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Transactions</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Track and manage all your credit card activities</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-3 py-2 rounded-xl shadow-sm hover:border-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
        >
          Last updated: {lastUpdated}
          <RefreshCcw className={`w-3.5 h-3.5 transition-transform duration-700 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Column - Main Content */}
        <div className={`xl:w-[70%] space-y-6 transition-all duration-300 ${selectedTx ? 'opacity-40 pointer-events-none' : ''}`}>
          
          {/* Filters Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 global-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              
              {/* Date Range Selection */}
              <div className="relative">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Date Range</label>
                <button 
                  onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                  className="w-full flex items-center justify-between border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs font-semibold cursor-pointer hover:border-blue-400 dark:bg-gray-900/40 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-200 truncate">{selectedDateRange}</span>
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
                </button>
                {dateDropdownOpen && (
                  <div className="absolute left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-1 z-30 w-full global-card">
                    {['All Dates', '01 Apr 2024 - 12 May 2024', 'Last 30 Days', 'Last 90 Days'].map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setSelectedDateRange(range);
                          setDateDropdownOpen(false);
                          toast.success(`Date filter set to: ${range}`);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-semibold ${selectedDateRange === range ? 'text-blue-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Amount Range Slider Mock & Textboxes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Amount Range (₹)</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="w-1/2 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-500 dark:bg-gray-900 text-gray-700 dark:text-white" 
                  />
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="w-1/2 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-500 dark:bg-gray-900 text-gray-700 dark:text-white" 
                  />
                </div>
                <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-3">
                  <div className="absolute left-1/4 right-1/4 h-full bg-teal-500 rounded-full"></div>
                  <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 bg-white border-2 border-teal-500 rounded-full cursor-pointer"></div>
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 -mr-1.5 w-3 h-3 bg-white border-2 border-teal-500 rounded-full cursor-pointer"></div>
                </div>
              </div>

              {/* Transaction Type / Category Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Transaction Type</label>
                <div className="relative">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-200 bg-transparent dark:bg-gray-900/40 outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option className="dark:bg-gray-800 text-gray-700 dark:text-white">All Categories</option>
                    <option className="dark:bg-gray-800 text-gray-700 dark:text-white">Shopping</option>
                    <option className="dark:bg-gray-800 text-gray-700 dark:text-white">Food & Dining</option>
                    <option className="dark:bg-gray-800 text-gray-700 dark:text-white">Entertainment</option>
                    <option className="dark:bg-gray-800 text-gray-700 dark:text-white">Travel</option>
                    <option className="dark:bg-gray-800 text-gray-700 dark:text-white">Fuel</option>
                    <option className="dark:bg-gray-800 text-gray-700 dark:text-white">Utilities</option>
                    <option className="dark:bg-gray-800 text-gray-700 dark:text-white">Refunds</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Search Box */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Search</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-100 dark:border-gray-700 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold outline-none focus:border-blue-500 dark:bg-gray-900 text-gray-700 dark:text-white" 
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-5 mt-2 gap-4">
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleApplyFilters}
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-md text-xs"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={handleReset}
                  className="flex-1 sm:flex-none border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-bold py-2.5 px-6 rounded-xl transition-colors text-xs"
                >
                  Reset
                </button>
              </div>
              <button onClick={handleExport} disabled={isExporting} className="w-full sm:w-auto flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                <Download className="w-4 h-4"/> {isExporting ? 'Exporting...' : 'Export Transactions'}
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden global-card">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg">All Transactions</h3>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {filteredTransactions.length} Results
                </span>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 cursor-pointer bg-transparent hover:text-blue-500 transition-colors"
                >
                  Sort by: <span className="text-blue-600 dark:text-[#00E5FF] font-bold">{sortBy}</span> <ChevronDown className="w-4 h-4"/>
                </button>
                {sortDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl py-1.5 z-30 w-48 global-card">
                    {['Date (Newest)', 'Date (Oldest)', 'Amount (High to Low)', 'Amount (Low to High)'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setSortDropdownOpen(false);
                          toast.success(`Sorted by ${opt}`);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors font-semibold ${sortBy === opt ? 'text-blue-600 dark:text-[#00E5FF] font-extrabold bg-blue-50/50 dark:bg-blue-900/10' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              {filteredTransactions.length === 0 ? (
                <div className="p-12 text-center text-gray-500 font-semibold text-sm">
                  No transactions found matching the selected filters.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-gray-400 dark:text-gray-500 text-[11px] uppercase tracking-widest border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                      <th className="px-6 py-4 font-bold whitespace-nowrap">Merchant Name</th>
                      <th className="px-6 py-4 font-bold whitespace-nowrap">Category</th>
                      <th className="px-6 py-4 font-bold whitespace-nowrap">Date & Time</th>
                      <th className="px-6 py-4 font-bold whitespace-nowrap">Card Used</th>
                      <th className="px-6 py-4 font-bold whitespace-nowrap text-right">Amount (₹)</th>
                      <th className="px-6 py-4 font-bold whitespace-nowrap">Status</th>
                      <th className="px-6 py-4 font-bold whitespace-nowrap text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {sortedTransactions.map((tx) => (
                      <tr onClick={() => setSelectedTx(tx)} key={tx.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.color}`}>
                              <tx.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{tx.merchant}</h4>
                              <p className="text-[11px] text-gray-500 font-medium mt-0.5">{tx.sub}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <tx.catIcon className="w-3.5 h-3.5 text-blue-500 opacity-70" />
                            <span className="text-xs font-semibold">{tx.cat}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{tx.date}</p>
                          <p className="text-[11px] text-gray-500 font-medium mt-0.5">{tx.time}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-bold text-gray-900 dark:text-gray-200">{tx.card}</p>
                          <p className="text-[11px] text-gray-500 font-medium mt-0.5">{tx.cardType}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <p className={`text-[15px] font-bold ${tx.isCredit ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>{tx.amount}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${tx.dotColor}`}></span>
                            <span className={`text-xs font-bold ${tx.statusColor}`}>{tx.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5"/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs font-semibold text-gray-500">
              <span>Showing 1 to {filteredTransactions.length} of {filteredTransactions.length} transactions</span>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded flex items-center justify-center border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">&lt;</button>
                <button className="w-8 h-8 rounded flex items-center justify-center bg-blue-600 text-white">1</button>
                <button className="w-8 h-8 rounded flex items-center justify-center border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Insights & Stats (Hidden when Modal Open) */}
        <div className={`xl:w-[30%] space-y-6 transition-all duration-300 ${selectedTx ? 'opacity-0 translate-x-10 pointer-events-none absolute right-0 w-[30%]' : 'opacity-100 translate-x-0'}`}>
          
          {/* Monthly Spending */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 relative global-card">
            <div className="flex justify-between items-center mb-6 relative">
              <h3 className="font-bold text-[15px]">Monthly Spending Summary</h3>
              <div className="relative">
                <button 
                  onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
                  className="text-xs font-semibold bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-1 text-gray-700 dark:text-gray-300"
                >
                  {selectedMonth} <ChevronDown className="w-3 h-3 shrink-0" />
                </button>
                {monthDropdownOpen && (
                  <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg py-1 z-30 w-32 global-card">
                    {Object.keys(monthlySummaries).map((month) => (
                      <button
                        key={month}
                        onClick={() => {
                          setSelectedMonth(month);
                          setMonthDropdownOpen(false);
                          toast.success(`Switched metrics to ${month}`);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors font-semibold ${selectedMonth === month ? 'text-blue-600 font-extrabold' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 mb-1">Total Spent</p>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{monthlySummaries[selectedMonth].total}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-gray-500">{monthlySummaries[selectedMonth].vsText}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${monthlySummaries[selectedMonth].vsColor}`}>
                  {monthlySummaries[selectedMonth].vsPct}
                </span>
              </div>
            </div>

            {/* SVG Line Chart Mock */}
            <div className="h-32 w-full relative">
              <svg viewBox="0 0 400 150" className="w-full h-full preserve-aspect-ratio-none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={monthlySummaries[selectedMonth].chartGrad} fill="url(#lineGrad)" />
                <path d={monthlySummaries[selectedMonth].chartPath} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                <circle cx={monthlySummaries[selectedMonth].circleX} cy={monthlySummaries[selectedMonth].circleY} r="5" fill="#2563EB" stroke="white" strokeWidth="2" className="drop-shadow-md" />
                <text x={monthlySummaries[selectedMonth].textX} y={monthlySummaries[selectedMonth].textY} fontSize="12" fill="#2563EB" fontWeight="bold" textAnchor="middle" className="dark:fill-blue-400">
                  {monthlySummaries[selectedMonth].textLabel}
                </text>
              </svg>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 global-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[15px]">Expense Breakdown</h3>
              <span className="text-xs font-semibold bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded border border-gray-100 dark:border-gray-600 cursor-pointer text-gray-700 dark:text-gray-300">This Month</span>
            </div>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="15" className="dark:stroke-gray-700" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2563EB" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="150" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8B5CF6" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="201" transform="rotate(144 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="216" transform="rotate(216 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="221" transform="rotate(280 50 50)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] text-gray-500 font-bold mb-0.5">Total Spent</span>
                  <span className="font-black text-xs text-gray-900 dark:text-white">
                    {monthlySummaries[selectedMonth].total.split(' ')[1]}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {monthlySummaries[selectedMonth].breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                      {item.name}
                    </div>
                    <span className="text-gray-900 dark:text-white font-bold">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline transition-all">
              View Full Breakdown →
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 global-card">
            <h3 className="font-bold text-[15px] mb-4">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { title: "Total Spent", val: monthlySummaries[selectedMonth].total, icon: Wallet, color: "text-blue-600 bg-blue-100" },
                { title: "Pending Payments", val: "₹ 4,999.00", icon: Calendar, color: "text-orange-600 bg-orange-100" },
                { title: "Refunds Received", val: "₹ 250.00", icon: RefreshCcw, color: "text-green-600 bg-green-100" },
                { title: "Cashback Earned", val: "₹ 1,250.00", icon: Zap, color: "text-purple-600 bg-purple-100" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl cursor-pointer transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 mb-0.5">{stat.title}</p>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">{stat.val}</h4>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 transform -rotate-90 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Slide-over Transaction Detail Panel */}
      {selectedTx && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedTx(null)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto transform transition-transform duration-500 translate-x-0">
            
            <div className="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center z-10">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Transaction Details</h3>
              <button onClick={() => setSelectedTx(null)} className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Merchant Summary Card */}
              <div className="flex justify-between items-center pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${selectedTx.color}`}>
                    <selectedTx.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">{selectedTx.merchant}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{selectedTx.sub}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${selectedTx.isCredit ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>{selectedTx.amount}</p>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${selectedTx.dotColor.replace('bg-', 'bg-').replace('500', '100')} ${selectedTx.statusColor}`}>{selectedTx.status}</span>
                </div>
              </div>

              {/* Transaction ID row */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500 font-semibold">{selectedTx.date}, {selectedTx.time}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     <span className="text-gray-500 font-semibold">Transaction ID:</span> {selectedTx.txId}
                   </span>
                   <button onClick={() => copyToClipboard(selectedTx.txId)} className="text-gray-400 hover:text-blue-600 transition-colors">
                     <Copy className="w-4 h-4" />
                   </button>
                </div>
              </div>

              {/* Transaction Info Grid */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Transaction Information</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Merchant Name</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTx.merchant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Category</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTx.cat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Date & Time</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTx.date}, {selectedTx.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Amount</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTx.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Status</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${selectedTx.dotColor}`}></span>
                      <span className={`font-semibold ${selectedTx.statusColor}`}>{selectedTx.status}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Card Used</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTx.card} ({selectedTx.cardType})</span>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Location</h4>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-1">
                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <p className="leading-relaxed font-medium">{selectedTx.location}</p>
                    </div>
                  </div>
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-600 relative">
                     {/* Embedded Map Mock */}
                     <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                        <path d="M0,20 L100,0 L100,20 L0,40 Z M0,40 L100,20 L100,40 L0,60 Z M0,60 L100,40 L100,60 L0,80 Z M0,80 L100,60 L100,80 L0,100 Z" fill="none" stroke="#9CA3AF" strokeWidth="2" />
                        <path d="M20,0 L20,100 M40,0 L40,100 M60,0 L60,100 M80,0 L80,100" fill="none" stroke="#9CA3AF" strokeWidth="2" />
                     </svg>
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                       <MapPin className="w-6 h-6 text-red-500 fill-current" />
                     </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Payment Information</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Payment Mode</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTx.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Currency</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedTx.currency}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-gray-500 font-medium shrink-0">Description</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-right break-words">{selectedTx.merchant} - {selectedTx.sub}</span>
                  </div>
                </div>
              </div>

              {/* Support / Dispute Section */}
              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/50 rounded-2xl p-5 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Need help with this transaction?</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">If you didn't make this transaction or have any issues, you can raise a dispute.</p>
                </div>
                <button className="shrink-0 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-5 rounded-xl transition-colors text-sm shadow-md">
                  Raise Dispute
                </button>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 flex justify-between items-center gap-4">
                <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-bold text-sm transition-colors">
                  <Download className="w-4 h-4" /> Download Receipt
                </button>
                <button onClick={() => setSelectedTx(null)} className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-bold py-2.5 px-8 rounded-xl transition-colors text-sm">
                  Close
                </button>
              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default Transactions;
