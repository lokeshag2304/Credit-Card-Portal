import React from 'react';
import { 
  ChevronRight, Copy, Download, MessageSquare, Phone, 
  FileText, ShieldCheck, Clock, Settings, Headphones, 
  CheckCircle2, Circle, AlertCircle, Paperclip, Image, 
  Smile, Mic, Send, Bot, Check, UploadCloud, ArrowUpRight
} from 'lucide-react';

const RequestStatus = () => {
  const timelineSteps = [
    { id: 1, title: 'Request Submitted', desc: 'Your request has been received successfully', date: '12 May 2024', time: '10:45 AM', status: 'completed' },
    { id: 2, title: 'Under Review', desc: 'Our support team has started reviewing your request', date: '12 May 2024', time: '11:10 AM', status: 'completed' },
    { id: 3, title: 'Documents Verified', desc: 'Documents are verified and request is being processed', date: '13 May 2024', time: '02:35 PM', status: 'active' },
    { id: 4, title: 'Processing', desc: 'Our team is working to resolve your issue', date: '', time: 'Pending', status: 'pending' },
    { id: 5, title: 'Resolution Completed', desc: 'We will notify you once the issue is resolved', date: '', time: 'Pending', status: 'pending' },
  ];

  const liveUpdates = [
    { id: 1, title: 'Support agent reviewed your request', desc: 'Rahul Verma reviewed your billing dispute', time: '02:35 PM', date: 'Today', icon: MessageSquare, color: 'text-purple-500 bg-purple-50' },
    { id: 2, title: 'Additional document requested', desc: 'Please upload bank statement (last 3 months)', time: '01:20 PM', date: 'Today', icon: FileText, color: 'text-orange-500 bg-orange-50' },
    { id: 3, title: 'Your request moved to verification', desc: 'Documents are under verification', time: '11:10 AM', date: '12 May', icon: FileText, color: 'text-blue-500 bg-blue-50' },
    { id: 4, title: 'Request submitted successfully', desc: 'We have received your request', time: '10:45 AM', date: '12 May', icon: CheckCircle2, color: 'text-green-500 bg-green-50' },
  ];

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto bg-[#F8FAFC] dark:bg-gray-900 min-h-screen flex flex-col">
      
      {/* Top Breadcrumb & Header Nav */}
      <div className="flex justify-between items-center mb-6">
         <div className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400">
            <span className="text-blue-600 cursor-pointer hover:underline">Support Workspace</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600 cursor-pointer hover:underline">Request Status</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white">REQ12345678</span>
         </div>
         <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-2 flex items-center gap-3 cursor-pointer shadow-sm global-card">
          <div className="w-10 h-6 bg-blue-900 rounded-[4px] relative overflow-hidden flex items-center justify-center">
             <div className="text-[5px] font-bold text-white relative z-10 font-mono tracking-widest">VISA</div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">Visa Signature **** 4567</p>
            <p className="text-[9px] text-gray-500 font-medium">Primary Card</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1 flex items-center gap-2">
          Request Status <ShieldCheck className="w-6 h-6 text-green-500" />
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Track progress and updates for your service request</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Main Content Area (Left 70%) */}
        <div className="xl:w-[70%] space-y-6">
          
          {/* Overview Card */}
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700 global-card">
            <div className="flex flex-wrap justify-between gap-6 mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
               <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Request ID</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-extrabold">REQ12345678</h3>
                    <Copy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500 transition-colors" />
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium mt-1">Submitted on 12 May 2024 • 10:45 AM</p>
               </div>
               <div className="flex gap-12">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Request Type</p>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Billing Dispute</h4>
                      <p className="text-[10px] text-gray-500">Billing & Statement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 border-l border-gray-100 pl-6">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Priority</p>
                      <h4 className="font-bold text-sm text-orange-600">Medium</h4>
                    </div>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1 text-right">Current Status</p>
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-green-200">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> In Progress
                  </span>
                  <p className="text-[10px] text-gray-500 font-medium mt-1">Step 3 of 5</p>
               </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500"><Clock className="w-4 h-4"/></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-tight">Last Updated</p>
                  <p className="text-xs font-bold">Today, 02:35 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><User className="w-4 h-4"/></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-tight">Assigned Team</p>
                  <p className="text-xs font-bold">Billing Support Team</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500"><Clock className="w-4 h-4"/></div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-tight">Estimated Resolution</p>
                  <p className="text-xs font-bold">24-48 hours</p>
                </div>
              </div>
              <button className="flex items-center gap-2 border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 font-bold py-2 px-4 rounded-xl text-xs transition-colors ml-auto shadow-sm">
                <Download className="w-4 h-4" /> Download Summary
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700 global-card">
              <h3 className="font-bold text-[15px] mb-1">Timeline</h3>
              <p className="text-[11px] text-gray-500 mb-6">Track your request journey</p>
              
              <div className="relative border-l-2 border-gray-100 dark:border-gray-700 ml-4 space-y-6 pb-4">
                {timelineSteps.map((step, idx) => (
                  <div key={step.id} className="relative pl-8">
                    {/* Status Dot */}
                    <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 
                      ${step.status === 'completed' ? 'bg-green-500 text-white' : step.status === 'active' ? 'bg-blue-500 text-white ring-4 ring-blue-100' : 'bg-gray-100 border-gray-100 text-gray-400'}`}>
                      {step.status === 'completed' ? <Check className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">{step.id}</span>}
                    </div>
                    {/* Active glowing line */}
                    {step.status === 'completed' && <div className="absolute left-[-2px] top-8 w-0.5 h-[120%] bg-green-500 -z-10"></div>}
                    {step.status === 'active' && <div className="absolute left-[-2px] top-8 w-0.5 h-[50%] bg-gradient-to-b from-green-500 to-gray-100 -z-10"></div>}

                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`text-sm font-bold ${step.status === 'active' ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}>{step.title}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">{step.desc}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-900 dark:text-gray-300">{step.date}</p>
                        <p className="text-[9px] text-gray-500">{step.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Updates Feed */}
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col global-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[15px]">Live Updates</h3>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Real-time</span>
              </div>

              <div className="space-y-4 flex-1">
                {liveUpdates.map((update) => (
                  <div key={update.id} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${update.color}`}>
                      <update.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 border-b border-gray-50 pb-3">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white mb-0.5">{update.title}</h4>
                        <div className="text-right shrink-0">
                          <p className="text-[9px] font-bold text-gray-900">{update.time}</p>
                          <p className="text-[9px] text-gray-500">{update.date}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500">{update.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full text-blue-600 text-[11px] font-bold mt-4 flex items-center justify-center gap-1 hover:underline">
                View Full Activity <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* Communication Section */}
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-end gap-6 global-card">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between mb-2">
                 <div>
                   <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Communication</span>
          </div>
          <h3 className="font-bold text-[14px]">Communication</h3>
                   <p className="text-[10px] text-gray-500">All conversations & documents</p>
                 </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 space-y-4 max-h-[150px] overflow-y-auto custom-scrollbar">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">RV</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold">Rahul Verma</span>
                      <span className="text-[9px] text-gray-400">02:35 PM</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 text-gray-700 dark:text-gray-300 text-xs p-3 rounded-2xl rounded-tl-none leading-relaxed">
                      We have verified your documents. Our team is now processing your billing dispute. We'll keep you updated.
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Input area */}
            <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-2 shadow-sm flex flex-col justify-between self-stretch global-card">
               <input type="text" placeholder="Type your message..." className="w-full text-xs p-2 outline-none bg-transparent" />
               <div className="flex justify-between items-center px-2 pb-1">
                 <div className="flex gap-2">
                   <Paperclip className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500" />
                   <Image className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500" />
                   <FileText className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500" />
                   <Smile className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500" />
                   <Mic className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-500 ml-1 border-l pl-2" />
                 </div>
                 <button className="bg-blue-600 text-white p-2 rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                   <Send className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar Widgets (30%) */}
        <div className="xl:w-[30%] space-y-6">
          
          {/* Support Agent */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 global-card">
            <h4 className="text-[11px] font-bold text-gray-500 uppercase mb-4">Assigned Support Agent</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=33" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Rahul Verma</h4>
                  <p className="text-[10px] text-gray-500">Billing Support Specialist</p>
                  <p className="text-[9px] text-green-600 font-bold mt-0.5">• Online</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:text-blue-600 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Need More Help Grid */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 global-card">
            <h4 className="text-[11px] font-bold text-gray-900 dark:text-white mb-4">Need More Help?</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 border border-blue-100 bg-blue-50/50 text-blue-700 hover:bg-blue-100 rounded-xl p-3 text-[11px] font-bold transition-colors shadow-sm justify-center">
                <FileText className="w-3.5 h-3.5" /> View FAQs
              </button>
              <button className="flex items-center gap-2 border border-indigo-100 bg-indigo-50/50 text-indigo-700 hover:bg-indigo-100 rounded-xl p-3 text-[11px] font-bold transition-colors shadow-sm justify-center">
                <Headphones className="w-3.5 h-3.5" /> Chat with Us
              </button>
              <button className="flex items-center gap-2 border border-teal-100 bg-teal-50/50 text-teal-700 hover:bg-teal-100 rounded-xl p-3 text-[11px] font-bold transition-colors shadow-sm justify-center">
                <UploadCloud className="w-3.5 h-3.5" /> Upload Document
              </button>
              <button className="flex items-center gap-2 border border-red-100 bg-red-50/50 text-red-700 hover:bg-red-100 rounded-xl p-3 text-[11px] font-bold transition-colors shadow-sm justify-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> Escalate Request
              </button>
            </div>
          </div>

          {/* Resolution Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-6 global-card">
             <div className="w-24 h-24 shrink-0 relative">
               <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="12" />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0D9488" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="125" />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366F1" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="180" transform="rotate(180 50 50)" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                 <span className="font-extrabold text-sm text-gray-900">24-48</span>
                 <span className="text-[9px] font-bold text-gray-500 uppercase">Hours</span>
               </div>
             </div>
             <div className="flex-1 space-y-3">
               <div className="flex justify-between items-center text-[10px]">
                 <span className="font-bold text-gray-500">SLA Status</span>
                 <span className="font-bold text-green-600">On Track</span>
               </div>
               <div className="flex justify-between items-center text-[10px]">
                 <span className="font-bold text-gray-500">Priority</span>
                 <span className="font-bold text-orange-500">Medium</span>
               </div>
               <div className="flex justify-between items-center text-[10px]">
                 <span className="font-bold text-gray-500">Response Time</span>
                 <span className="font-bold text-gray-900">~ 2 hrs</span>
               </div>
             </div>
          </div>

          {/* AI Assistant */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg border border-purple-400">
            <div className="relative z-10 w-2/3">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-sm">AI Assistant</h3>
                <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded font-bold tracking-widest border border-white/30">BETA</span>
              </div>
              <p className="text-[10px] text-indigo-100 mb-4 leading-relaxed">Ask me anything about your request and I'll help you.</p>
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-sm global-card">
                <Bot className="w-4 h-4" /> Ask AI Assistant
              </button>
            </div>
            {/* Robot illustration mock */}
            <div className="absolute right-[-10px] bottom-[-20px] w-28 h-28 opacity-90">
              <div className="w-16 h-16 bg-white rounded-[2rem] shadow-2xl relative mt-8 ml-4 border-4 border-indigo-200 global-card">
                <div className="flex gap-2 justify-center pt-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Trust Indicators */}
      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-between gap-6 text-left pb-4">
        {[
          { icon: Eye, title: "Transparent Tracking", desc: "Real-time updates at every step", color: "text-blue-500 bg-blue-50 border-blue-100" },
          { icon: ShieldCheck, title: "Secure Communication", desc: "Your data and conversations are 100% secure", color: "text-teal-500 bg-teal-50 border-teal-100" },
          { icon: Clock, title: "Fast Resolution", desc: "Average resolution time 24-48 hours", color: "text-purple-500 bg-purple-50 border-purple-100" },
          { icon: Headphones, title: "24x7 Support", desc: "Our team is available round the clock", color: "text-indigo-500 bg-indigo-50 border-indigo-100" },
          { icon: CheckCircle2, title: "Quality Support", desc: "Dedicated experts to resolve your issues", color: "text-purple-600 bg-purple-50 border-purple-200" }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 text-gray-500 dark:text-gray-400 flex-1 min-w-[180px]">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${item.color} dark:bg-gray-800 dark:border-gray-700`}>
                <item.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-bold text-gray-900 dark:text-gray-300 mb-0.5">{item.title}</span>
              <span className="block text-[9px] leading-tight pr-2">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RequestStatus;
