const fs = require('fs');

const pages = [
  {
    name: 'Cards',
    content: `import React from 'react';
import { CreditCard, Plus, Eye, EyeOff, Lock, Sliders } from 'lucide-react';

const Cards = () => {
  return (
    <div className="p-6 lg:p-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Cards</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 shadow-md transition-colors"><Plus className="w-4 h-4"/> Add New Card</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Card */}
        <div className="w-full relative bg-gradient-to-br from-[#0B1F5E] to-[#123FAF] rounded-3xl p-6 text-white shadow-xl group">
           <div className="flex justify-between items-start mb-6">
             <span className="text-xl font-black italic">VISA</span>
             <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold">Signature</span>
           </div>
           <div className="font-mono text-2xl tracking-widest mb-6">4111 2222 3333 4567</div>
           <div className="flex justify-between items-end">
             <div><p className="text-[9px] uppercase">Card Holder</p><p className="font-bold">Rahul Sharma</p></div>
             <div className="flex gap-4">
               <div><p className="text-[9px] uppercase">Valid Thru</p><p className="font-bold">12/28</p></div>
               <div><p className="text-[9px] uppercase">CVV</p><p className="font-bold">123</p></div>
             </div>
           </div>
           <div className="absolute top-4 right-4 flex gap-2">
              <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">Active</span>
           </div>
        </div>
        
        {/* Inactive Card */}
        <div className="w-full relative bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl p-6 text-white shadow-lg opacity-80 hover:opacity-100 transition-opacity">
           <div className="flex justify-between items-start mb-6">
             <span className="text-xl font-black italic">MasterCard</span>
             <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold">Platinum</span>
           </div>
           <div className="font-mono text-2xl tracking-widest mb-6">5522 1234 5678 9012</div>
           <div className="flex justify-between items-end">
             <div><p className="text-[9px] uppercase">Card Holder</p><p className="font-bold">Rahul Sharma</p></div>
             <div className="flex gap-4">
               <div><p className="text-[9px] uppercase">Valid Thru</p><p className="font-bold">08/25</p></div>
               <div><p className="text-[9px] uppercase">CVV</p><p className="font-bold">***</p></div>
             </div>
           </div>
           <div className="absolute top-4 right-4 flex gap-2">
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">Blocked</span>
           </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;`
  },
  {
    name: 'Transactions',
    content: `import React from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Transactions = () => {
  return (
    <div className="p-6 lg:p-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search transactions..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-gray-200" />
          </div>
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><Filter className="w-5 h-5 text-gray-600 dark:text-gray-400"/></button>
          <button className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><Download className="w-5 h-5 text-gray-600 dark:text-gray-400"/></button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
              <th className="p-4 font-bold">Transaction Details</th>
              <th className="p-4 font-bold">Date</th>
              <th className="p-4 font-bold">Category</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {[
              { title: "Amazon Order #1234", date: "May 12, 2024", cat: "Shopping", status: "Completed", amount: "-₹1,499.00", type: "debit" },
              { title: "Salary Credit", date: "May 01, 2024", cat: "Income", status: "Completed", amount: "+₹1,25,000.00", type: "credit" },
              { title: "Netflix Subscription", date: "Apr 28, 2024", cat: "Entertainment", status: "Completed", amount: "-₹649.00", type: "debit" },
              { title: "Refund from Myntra", date: "Apr 25, 2024", cat: "Refund", status: "Completed", amount: "+₹2,100.00", type: "credit" },
              { title: "Shell Petrol Pump", date: "Apr 20, 2024", cat: "Fuel", status: "Pending", amount: "-₹3,500.00", type: "debit" }
            ].map((tx, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className={\`w-10 h-10 rounded-full flex items-center justify-center \${tx.type === 'credit' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}\`}>
                     {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5"/> : <ArrowUpRight className="w-5 h-5"/>}
                  </div>
                  <span className="font-bold text-sm text-gray-900 dark:text-white">{tx.title}</span>
                </td>
                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{tx.date}</td>
                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{tx.cat}</td>
                <td className="p-4"><span className={\`text-xs font-bold px-2 py-1 rounded-full \${tx.status === 'Completed' ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' : 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}\`}>{tx.status}</span></td>
                <td className={\`p-4 text-right font-bold \${tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}\`}>{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Transactions;`
  },
  {
    name: 'Profile',
    content: `import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Edit3 } from 'lucide-react';

const Profile = () => {
  return (
    <div className="p-6 lg:p-8 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-700">
             <div className="relative inline-block mb-4">
               <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg" />
               <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"><Edit3 className="w-4 h-4"/></button>
             </div>
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rahul Sharma</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Premium Member</p>
             <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
               <p className="text-xs text-gray-400 mb-1">Member Since</p>
               <p className="font-bold text-gray-700 dark:text-gray-200">August 2022</p>
             </div>
          </div>
        </div>
        
        <div className="md:w-2/3 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="font-bold text-lg mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">Personal Information</h4>
          <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700"><User className="w-5 h-5 text-gray-400"/><span className="font-semibold text-gray-800 dark:text-gray-200">Rahul Sharma</span></div>
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700"><Mail className="w-5 h-5 text-gray-400"/><span className="font-semibold text-gray-800 dark:text-gray-200">rahul.sharma@example.com</span></div>
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700"><Phone className="w-5 h-5 text-gray-400"/><span className="font-semibold text-gray-800 dark:text-gray-200">+91 98765 43210</span></div>
               </div>
               <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Address</label>
                 <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700"><MapPin className="w-5 h-5 text-gray-400"/><span className="font-semibold text-gray-800 dark:text-gray-200">Mumbai, India</span></div>
               </div>
             </div>
             <div className="mt-8">
               <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors">Save Changes</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;`
  },
  {
    name: 'Placeholder',
    content: `import React from 'react';
import { HelpCircle } from 'lucide-react';
const Placeholder = ({ title }) => {
  return (
    <div className="p-6 lg:p-8 flex items-center justify-center h-full animate-fade-in-up">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
           <HelpCircle className="w-10 h-10 text-blue-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400">This module is currently being built out with static frontend data. Stay tuned for updates!</p>
      </div>
    </div>
  );
};
export default Placeholder;`
  }
];

pages.forEach(p => {
  fs.writeFileSync('c:/Users/Lokesh Agarwal/Desktop/SplIn/frontend/src/pages/' + p.name + '.jsx', p.content);
});
