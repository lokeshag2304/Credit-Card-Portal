import React from 'react';
import { HelpCircle } from 'lucide-react';
const Placeholder = ({ title }) => {
  return (
    <div className="p-6 lg:p-8 flex items-center justify-center h-full animate-fade-in-up mt-20">
      <div className="text-center max-w-md bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 global-card">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
           <HelpCircle className="w-10 h-10 text-blue-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400">This module is currently being built out with static frontend data. Stay tuned for updates!</p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-colors" onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};
export default Placeholder;
