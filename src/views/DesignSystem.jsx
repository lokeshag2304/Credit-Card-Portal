import React, { useState } from 'react';
import DSFoundation from '../components/ds/DSFoundation';
import DSComponents from '../components/ds/DSComponents';
import DSPatterns from '../components/ds/DSPatterns';
import DSAccessibilityMotion from '../components/ds/DSAccessibilityMotion';
import DSAccessibilityShowcase from '../components/ds/DSAccessibilityShowcase';
import { Layers, Palette, MousePointer, Layout, Activity, Accessibility } from 'lucide-react';

const tabs = [
  { id: 'foundation', label: 'Foundation', icon: Palette, sub: 'Brand · Colors · Typography' },
  { id: 'components', label: 'Components', icon: MousePointer, sub: 'Buttons · Inputs · Cards' },
  { id: 'patterns', label: 'Patterns', icon: Layout, sub: 'Alerts · Tables · Navigation' },
  { id: 'motion', label: 'Motion Physics', icon: Activity, sub: 'Interactions · Success State' },
  { id: 'inclusive', label: 'Inclusive UX', icon: Accessibility, sub: 'A11y · Contrast · Scale · Voice' },
];

export default function DesignSystem() {
  const [active, setActive] = useState('foundation');

  return (
    <div className="p-6 lg:p-8 font-sans text-gray-900 dark:text-gray-100 bg-[#F8FAFC] dark:bg-gray-900 min-h-screen animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Layers className="w-4 h-4 text-white"/>
            </div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg border border-blue-100 dark:border-blue-800 uppercase tracking-widest">Design System v1.0</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1">Splendin UI Library</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enterprise-grade fintech component system · Stripe + Revolut inspired</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"/>
          Production Ready
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border ${
              active === tab.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0"/>
            <span>{tab.label}</span>
            <span className={`text-[9px] font-medium hidden lg:inline ${active === tab.id ? 'text-blue-200' : 'text-gray-400'}`}>{tab.sub}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {active === 'foundation' && <DSFoundation />}
        {active === 'components' && <DSComponents />}
        {active === 'patterns' && <DSPatterns />}
        {active === 'motion' && <DSAccessibilityMotion />}
        {active === 'inclusive' && <DSAccessibilityShowcase />}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-400">
        <span className="font-bold">Splendin Design System v1.0 · Built with React + Tailwind CSS</span>
        <div className="flex gap-4 font-bold">
          <span>Inter Typography</span>
          <span>Lucide Icons</span>
          <span>Fintech Patterns</span>
        </div>
      </div>
    </div>
  );
}
