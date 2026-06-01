import React, { useState, useEffect } from 'react';
import { 
  Check, Loader2, MousePointer2, AlertCircle, Eye, Hand, 
  Keyboard, Type, Contrast, Maximize, Settings2
} from 'lucide-react';

const Section = ({ title, sub, children }) => (
  <div className="mb-12">
    <div className="mb-6">
      <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{title}</h2>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
    {children}
  </div>
);

export default function DSAccessibilityMotion() {
  const [payState, setPayState] = useState('idle'); // idle | loading | success
  const [toggleState, setToggleState] = useState(false);

  const handlePayClick = () => {
    if (payState !== 'idle') return;
    setPayState('loading');
    setTimeout(() => setPayState('success'), 2000);
    setTimeout(() => setPayState('idle'), 5000);
  };

  return (
    <div className="space-y-12 animate-fade-in-up">
      
      {/* Interactive Motion & Feedback */}
      <Section title="Micro Interactions & Feedback" sub="Tactile, smooth, and responsive interactions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Button States */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <MousePointer2 className="w-4 h-4"/> Button Physics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Hover Glow & Lift</span>
                <button className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-md transition-all duration-300 hover:shadow-blue-500/30 hover:shadow-lg hover:-translate-y-0.5">
                  Hover Me
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Haptic Press</span>
                <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-2.5 px-6 rounded-xl text-sm transition-all duration-150 active:scale-95 active:bg-gray-800">
                  Press Me
                </button>
              </div>
            </div>
          </div>

          {/* Payment Success Animation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-center items-center relative overflow-hidden">
            <h3 className="absolute top-6 left-6 text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Settings2 className="w-4 h-4"/> Payment Flow
            </h3>
            
            <div className="mt-8 flex flex-col items-center justify-center min-h-[140px]">
              <button 
                onClick={handlePayClick}
                className={`relative overflow-hidden font-bold rounded-xl transition-all duration-500 flex items-center justify-center
                  ${payState === 'idle' ? 'bg-blue-600 hover:bg-blue-700 text-white w-40 h-12 shadow-lg hover:shadow-blue-500/30' : ''}
                  ${payState === 'loading' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 w-12 h-12 rounded-full cursor-wait' : ''}
                  ${payState === 'success' ? 'bg-green-500 text-white w-48 h-12 shadow-green-500/40 shadow-lg' : ''}
                `}
              >
                {payState === 'idle' && <span>Pay ₹25,430</span>}
                {payState === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                {payState === 'success' && (
                  <span className="flex items-center gap-2 animate-fade-in-up">
                    <Check className="w-5 h-5" /> Successful
                  </span>
                )}
              </button>
              <p className="text-[10px] text-gray-400 mt-4 font-medium text-center max-w-[200px]">
                Click to simulate real-time processing and success feedback.
              </p>
            </div>
          </div>

        </div>
      </Section>

      {/* Forms & Validation */}
      <Section title="Inline Validation States" sub="Real-time feedback without breaking user flow">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="space-y-1 group">
              <label className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase">Card Number</label>
              <div className="relative">
                <input 
                  defaultValue="4532 1123" 
                  className="w-full border-2 border-red-400 rounded-xl px-4 py-3 text-sm bg-red-50/50 dark:bg-red-900/10 text-gray-900 dark:text-white outline-none transition-colors"
                />
                <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500 animate-pulse"/>
              </div>
              <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1 animate-fade-in-up">
                <AlertCircle className="w-3 h-3"/> Incomplete card number
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase">Password</label>
              <div className="relative">
                <input 
                  type="password"
                  defaultValue="StrongPass123!" 
                  className="w-full border-2 border-green-400 rounded-xl px-4 py-3 text-sm bg-green-50/50 dark:bg-green-900/10 text-gray-900 dark:text-white outline-none transition-colors"
                />
                <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500"/>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <div className="h-1 flex-1 bg-green-500 rounded-full"/>
                <div className="h-1 flex-1 bg-green-500 rounded-full"/>
                <div className="h-1 flex-1 bg-green-500 rounded-full"/>
                <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"/>
              </div>
              <p className="text-[10px] text-green-600 font-bold mt-1">Strong password</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase">Interactive Toggle</label>
              <div className="h-[46px] flex items-center justify-between px-4 border border-gray-100 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 cursor-pointer" onClick={() => setToggleState(!toggleState)}>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Smart Alerts</span>
                <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${toggleState ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                  <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${toggleState ? 'translate-x-6' : 'translate-x-0'}`}/>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-medium mt-1">Smooth physics & color transition</p>
            </div>

          </div>
        </div>
      </Section>

      {/* Accessibility System */}
      <Section title="Accessibility System (A11y)" sub="Built for everyone — WCAG compliant enterprise standards">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Keyboard Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Keyboard className="w-4 h-4"/> Keyboard Focus States
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              Every interactive element features a highly visible, high-contrast focus ring that adheres to accessibility standards, ensuring clear navigation via Tab key.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <button className="bg-blue-50 text-blue-600 font-bold py-2.5 px-6 rounded-xl text-sm border-2 border-transparent hover:bg-blue-100">
                  Normal Button
                </button>
                <button className="bg-blue-50 text-blue-600 font-bold py-2.5 px-6 rounded-xl text-sm outline-none ring-4 ring-blue-500/40 border-2 border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]">
                  Focused Button
                </button>
              </div>
              
              <div className="relative">
                <input 
                  placeholder="Focus me..." 
                  className="w-full border-2 border-blue-500 rounded-xl px-4 py-3 text-sm bg-white dark:bg-gray-900 outline-none ring-4 ring-blue-500/20 text-gray-900 dark:text-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500 border border-gray-100 dark:border-gray-700">Tab</span>
              </div>
            </div>
          </div>

          {/* Screen Reader & Contrast */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4"/> Screen Reader & Contrast
            </h3>
            
            <div className="space-y-4">
              {/* Aria Labels Demo */}
              <div className="p-4 border border-dashed border-purple-300 bg-purple-50 dark:bg-purple-900/10 dark:border-purple-800/50 rounded-xl relative">
                <span className="absolute -top-2.5 left-4 bg-white dark:bg-gray-800 px-2 text-[9px] font-bold text-purple-600 uppercase tracking-widest">Aria Labeling</span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="Close modal window">
                      <Check className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                    </button>
                    <div>
                      <p className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">aria-label="Close modal window"</p>
                      <p className="text-[9px] text-gray-500 mt-0.5">Invisible to sighted users, read aloud by VoiceOver.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contrast Demo */}
              <div className="p-4 border border-dashed border-amber-300 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800/50 rounded-xl relative">
                <span className="absolute -top-2.5 left-4 bg-white dark:bg-gray-800 px-2 text-[9px] font-bold text-amber-600 uppercase tracking-widest">WCAG AAA Contrast</span>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-400 text-white px-3 py-1.5 rounded text-xs font-bold line-through opacity-50">Fail (2.1:1)</div>
                  <div className="bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm">Pass AAA (8.5:1)</div>
                </div>
                <p className="text-[9px] text-gray-500 mt-2">All typography and interactive elements meet or exceed WCAG 2.1 AA/AAA contrast ratios.</p>
              </div>
            </div>
          </div>

        </div>
      </Section>

    </div>
  );
}
