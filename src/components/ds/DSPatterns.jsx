import React from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, ChevronRight, LayoutDashboard, CreditCard, Repeat, IndianRupee, Gift, HelpCircle, Shield, Zap, Clock, Bot } from 'lucide-react';

const Section = ({ title, sub, children }) => (
  <div className="mb-12">
    <div className="mb-6">
      <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{title}</h2>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
    {children}
  </div>
);

const transactions = [
  { name: 'Amazon Shopping', cat: 'Shopping', amount: '-₹4,299', date: '14 May', status: 'Completed', color: 'text-red-500' },
  { name: 'Salary Credit', cat: 'Income', amount: '+₹75,000', date: '01 May', status: 'Completed', color: 'text-green-600' },
  { name: 'Netflix', cat: 'Entertainment', amount: '-₹649', date: '28 Apr', status: 'Pending', color: 'text-red-500' },
];

export default function DSPatterns() {
  return (
    <div>
      {/* Alerts & Toasts */}
      <Section title="Alerts & Toasts" sub="Feedback components for all system states">
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5"/>
            <div><p className="text-sm font-bold text-green-800 dark:text-green-400">Payment Successful</p><p className="text-xs text-green-700 dark:text-green-500 mt-0.5">₹25,430 has been paid successfully. Ref: TXN2024051400123</p></div>
          </div>
          <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
            <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5"/>
            <div><p className="text-sm font-bold text-red-800 dark:text-red-400">Transaction Blocked</p><p className="text-xs text-red-700 dark:text-red-500 mt-0.5">International transaction blocked for security. Enable in Card Controls.</p></div>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"/>
            <div><p className="text-sm font-bold text-amber-800 dark:text-amber-400">EMI Due Tomorrow</p><p className="text-xs text-amber-700 dark:text-amber-500 mt-0.5">Your EMI of ₹12,850 is due on 15 May 2024. Pay to avoid late fees.</p></div>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"/>
            <div><p className="text-sm font-bold text-blue-800 dark:text-blue-400">Statement Available</p><p className="text-xs text-blue-700 dark:text-blue-500 mt-0.5">Your April 2024 statement is ready for download.</p></div>
          </div>
          {/* Toast preview */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg"><CheckCircle2 className="w-4 h-4 text-green-400"/> Payment successful!</div>
            <div className="bg-red-600 text-white px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg"><XCircle className="w-4 h-4"/> Transaction failed</div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg"><Info className="w-4 h-4 text-blue-500"/> 3 new notifications</div>
          </div>
        </div>
      </Section>

      {/* Tables & Status Badges */}
      <Section title="Tables & Status Badges" sub="Data display with status indicators and smart chips">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm mb-4">
          <div className="grid grid-cols-4 px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
            {['Transaction', 'Category', 'Amount', 'Status'].map(h => (
              <span key={h} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{h}</span>
            ))}
          </div>
          {transactions.map((t, i) => (
            <div key={i} className={`grid grid-cols-4 px-5 py-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${i < transactions.length-1 ? 'border-b border-gray-50 dark:border-gray-700/50' : ''}`}>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</span>
              <span className="text-xs text-gray-500 font-medium">{t.cat}</span>
              <span className={`text-sm font-extrabold ${t.color}`}>{t.amount}</span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border w-fit ${t.status === 'Completed' ? 'text-green-700 bg-green-50 border-green-200' : 'text-orange-700 bg-orange-50 border-orange-200'}`}>{t.status}</span>
            </div>
          ))}
        </div>
        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Completed', cls: 'bg-green-50 text-green-700 border-green-200' },
            { label: 'Pending', cls: 'bg-orange-50 text-orange-700 border-orange-200' },
            { label: 'In Progress', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Blocked', cls: 'bg-red-50 text-red-700 border-red-200' },
            { label: 'Under Review', cls: 'bg-purple-50 text-purple-700 border-purple-200' },
            { label: 'Resolved', cls: 'bg-teal-50 text-teal-700 border-teal-200' },
          ].map(b => (
            <span key={b.label} className={`text-[10px] font-bold px-3 py-1 rounded-full border ${b.cls}`}>{b.label}</span>
          ))}
        </div>
      </Section>

      {/* Navigation */}
      <Section title="Navigation Components" sub="Sidebar, bottom nav, breadcrumbs and quick actions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sidebar Sample */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-b from-[#0B1F5E] to-[#1a3a8f] p-4">
              <p className="text-white font-black text-base tracking-tight">Splendin</p>
              <p className="text-[9px] text-blue-200 tracking-widest uppercase mt-0.5">Credit Card Portal</p>
            </div>
            <div className="p-3 space-y-1">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', active: true },
                { icon: CreditCard, label: 'Cards', active: false },
                { icon: Repeat, label: 'Transactions', active: false },
                { icon: IndianRupee, label: 'Payments', active: false },
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${item.active ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  <item.icon className="w-4 h-4 shrink-0"/>
                  <span className="text-xs font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom Nav + Breadcrumb */}
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Breadcrumb</p>
              <div className="flex items-center gap-2 text-xs font-bold bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <span className="text-blue-600">Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400"/>
                <span className="text-blue-600">Payments</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400"/>
                <span className="text-gray-900 dark:text-white">Confirmation</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Mobile Bottom Navigation</p>
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
                <div className="flex">
                  {[
                    { icon: LayoutDashboard, label: 'Home', active: true },
                    { icon: CreditCard, label: 'Cards', active: false },
                    { icon: Repeat, label: 'Activity', active: false },
                    { icon: Gift, label: 'Rewards', active: false },
                    { icon: HelpCircle, label: 'Support', active: false },
                  ].map(item => (
                    <div key={item.label} className={`flex-1 flex flex-col items-center py-3 gap-1 relative ${item.active ? 'text-blue-600' : 'text-gray-400'}`}>
                      {item.active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"/>}
                      <item.icon className="w-4 h-4"/>
                      <span className="text-[9px] font-bold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Loading & Empty States */}
      <Section title="Loading & Empty States" sub="Skeleton loaders and empty state patterns">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Skeleton Loader</p>
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse shrink-0"/>
                <div className="flex-1 space-y-2">
                  <div className={`h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse ${i === 1 ? 'w-3/4' : i === 2 ? 'w-1/2' : 'w-2/3'}`}/>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700/60 rounded-full animate-pulse w-1/3"/>
                </div>
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"/>
              </div>
            ))}
          </div>
          {/* Empty State */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-4">
              <Repeat className="w-8 h-8 text-gray-300 dark:text-gray-500"/>
            </div>
            <h4 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-1">No Transactions Yet</h4>
            <p className="text-xs text-gray-400 mb-4">Your transactions will appear here once you start using your card.</p>
            <button className="bg-blue-600 text-white font-bold py-2 px-5 rounded-xl text-xs shadow-sm">Explore Offers</button>
          </div>
        </div>
      </Section>

      {/* Motion Principles */}
      <Section title="Motion & Interaction Principles" sub="Micro-interaction guidelines for enterprise fintech UX">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Zap, title: 'Instant Feedback', desc: '< 100ms for tap/click responses', color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
            { icon: Clock, title: 'Smooth Transitions', desc: '200–300ms ease-out curves', color: 'bg-blue-50 text-blue-600 border-blue-100' },
            { icon: Shield, title: 'Trust First', desc: 'Never animate security modals abruptly', color: 'bg-green-50 text-green-600 border-green-100' },
            { icon: Bot, title: 'AI Feel', desc: 'Typing, pulse, and thinking states', color: 'bg-purple-50 text-purple-600 border-purple-100' },
          ].map(p => (
            <div key={p.title} className={`rounded-2xl p-4 border ${p.color} bg-opacity-50`}>
              <p.icon className="w-5 h-5 mb-2"/>
              <p className="text-xs font-bold mb-1">{p.title}</p>
              <p className="text-[10px] opacity-80">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
