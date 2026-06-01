import React, { useState } from 'react';
import { 
  Keyboard, Eye, Type, Volume2, ShieldCheck, 
  HelpCircle, RefreshCw, Smartphone, Sparkles, Check, 
  User, CheckCircle2, ChevronRight, AlertCircle, Accessibility
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

export default function DSAccessibilityShowcase() {
  // Preferences State
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // small | medium | large | xlarge
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [voiceNav, setVoiceNav] = useState(false);
  const [largeTapTargets, setLargeTapTargets] = useState(false);
  const [screenReaderOpt, setScreenReaderOpt] = useState(false);
  
  // Voice Simulation state
  const [voiceCommand, setVoiceCommand] = useState('');
  const [aiSpeechOutput, setAiSpeechOutput] = useState('Welcome to Splendin. How can I assist you today?');
  const [isListening, setIsListening] = useState(false);

  const simulateVoiceCommand = (command, responseText) => {
    setIsListening(true);
    setVoiceCommand(command);
    setTimeout(() => {
      setIsListening(false);
      setAiSpeechOutput(responseText);
    }, 1500);
  };

  // Font size classes mapping
  const sizeMap = {
    small: { text: 'text-[11px]', heading: 'text-sm', label: 'text-[10px]' },
    medium: { text: 'text-xs', heading: 'text-base', label: 'text-[11px]' },
    large: { text: 'text-sm', heading: 'text-lg', label: 'text-xs' },
    xlarge: { text: 'text-base', heading: 'text-xl', label: 'text-sm' },
  };

  return (
    <div className={`space-y-8 animate-fade-in-up font-sans transition-all duration-300 ${dyslexicFont ? 'font-serif tracking-wide' : ''}`}>
      
      {/* Overview Cards & Prefs Panel Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Preference Settings Panel (Left 1-Column) */}
        <div className="xl:col-span-1 bg-white dark:bg-gray-800 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Accessibility className="w-5 h-5"/>
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Accessibility Preferences</h3>
              <p className="text-[10px] text-gray-500 font-medium">Customize your self-service ecosystem</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-500" /> High Contrast Mode
                </p>
                <p className="text-[9px] text-gray-400">Enhance colors for visibility</p>
              </div>
              <div 
                onClick={() => setHighContrast(!highContrast)} 
                className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors duration-200 ${highContrast ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${highContrast ? 'left-[20px]' : 'left-0.5'}`}/>
              </div>
            </div>

            {/* Reduce Motion */}
            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">Reduce Motion</p>
                <p className="text-[9px] text-gray-400">Minimize animations and transition effects</p>
              </div>
              <div 
                onClick={() => setReduceMotion(!reduceMotion)} 
                className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors duration-200 ${reduceMotion ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${reduceMotion ? 'left-[20px]' : 'left-0.5'}`}/>
              </div>
            </div>

            {/* Font Scaling selector */}
            <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-blue-500" /> Text Scaling Mode
                </p>
                <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{fontSize}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {['small', 'medium', 'large', 'xlarge'].map((sz) => (
                  <button 
                    key={sz} 
                    onClick={() => setFontSize(sz)}
                    className={`py-1 rounded text-[10px] font-bold border transition-all uppercase ${fontSize === sz ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 text-gray-600 dark:text-gray-400'}`}
                  >
                    {sz.replace('large', 'L').replace('small', 'S').replace('medium', 'M').replace('xlarge', 'XL')}
                  </button>
                ))}
              </div>
            </div>

            {/* Dyslexia-Friendly Font */}
            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">Dyslexia-Friendly Font</p>
                <p className="text-[9px] text-gray-400">Specially designed weighted characters</p>
              </div>
              <div 
                onClick={() => setDyslexicFont(!dyslexicFont)} 
                className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors duration-200 ${dyslexicFont ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${dyslexicFont ? 'left-[20px]' : 'left-0.5'}`}/>
              </div>
            </div>

            {/* Large Tap Targets Switch */}
            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">Expand Touch Zones</p>
                <p className="text-[9px] text-gray-400">Increase touch target size for motor ease</p>
              </div>
              <div 
                onClick={() => setLargeTapTargets(!largeTapTargets)} 
                className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors duration-200 ${largeTapTargets ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${largeTapTargets ? 'left-[20px]' : 'left-0.5'}`}/>
              </div>
            </div>

            {/* Screen Reader Optimization */}
            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">Screen Reader Focus Mode</p>
                <p className="text-[9px] text-gray-400">Optimizes ARIA flow for screen readers</p>
              </div>
              <div 
                onClick={() => setScreenReaderOpt(!screenReaderOpt)} 
                className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors duration-200 ${screenReaderOpt ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <div className={`w-4.5 h-4.5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${screenReaderOpt ? 'left-[20px]' : 'left-0.5'}`}/>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interface Preview Render (Right 2-Columns) */}
        <div className={`xl:col-span-2 bg-[#F8FAFC] dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-6 shadow-inner transition-colors duration-300 relative flex flex-col justify-between min-h-[500px]
          ${highContrast ? 'bg-white dark:bg-black border-4 border-gray-950 dark:border-white text-black dark:text-white' : ''}
        `}>
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Dynamic Preview Area</span>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className={`font-extrabold text-gray-900 dark:text-white tracking-tight ${sizeMap[fontSize].heading} ${highContrast ? 'text-black dark:text-white border-b-2 border-current pb-2' : ''}`}>
                Interactive Accessible Card Component
              </h4>
              <p className={`text-gray-500 dark:text-gray-400 mt-1 font-medium ${sizeMap[fontSize].text} ${highContrast ? 'text-black dark:text-white font-bold' : ''}`}>
                This mockup adjusts dynamically according to the preference settings on the left. Toggle choices to see live inclusive scaling.
              </p>
            </div>

            {/* Mock Transaction UI Card with focus border emulation */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4 transition-all duration-300 relative outline-none ring-4 ring-transparent
              ${highContrast ? 'bg-white dark:bg-black border-2 border-gray-950 dark:border-white' : ''}
              ${!reduceMotion ? 'hover:scale-[1.01] hover:shadow-md' : ''}
            `}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <span className={`font-bold text-gray-400 block uppercase tracking-wider ${sizeMap[fontSize].label}`}>Account Holder</span>
                    <span className={`font-extrabold text-gray-900 dark:text-white ${sizeMap[fontSize].heading}`}>Rahul Sharma</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-bold text-gray-400 block uppercase tracking-wider ${sizeMap[fontSize].label}`}>Available Limit</span>
                  <span className={`font-black text-gray-900 dark:text-white ${sizeMap[fontSize].heading}`}>₹1,24,500.00</span>
                </div>
              </div>

              {/* Progress bar emulation */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400">
                  <span>Card Utilization</span>
                  <span>41%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-[41%] h-full bg-blue-600 rounded-full" />
                </div>
              </div>
            </div>

            {/* Interactive Actions grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Payment Simulated trigger Button */}
              <button 
                className={`w-full font-bold rounded-xl text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 outline-none
                  ${highContrast ? 'bg-black dark:bg-white text-white dark:text-black border-2 border-current font-black' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                  ${largeTapTargets ? 'py-4 px-8 text-base rounded-2xl' : 'py-3 px-5'}
                  ${fontSize === 'xlarge' ? 'text-lg' : ''}
                `}
              >
                <CheckCircle2 className="w-4 h-4" /> Quick Pay Outstanding
              </button>

              {/* A11y status badge */}
              <div className={`rounded-xl border flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700
                ${highContrast ? 'bg-white dark:bg-black border-2 border-gray-950 dark:border-white' : ''}
                ${largeTapTargets ? 'p-5' : 'p-3.5'}
              `}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <span className={`font-bold text-gray-900 dark:text-white block ${sizeMap[fontSize].text}`}>Inclusive Standard</span>
                    <span className="text-[10px] text-gray-400 font-medium">WCAG 2.2 AAA Compliant</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Skip link simulation bottom status */}
          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <span>Skip Navigation Link: Active</span>
            <span>Focus Target: Main Dashboard</span>
          </div>

        </div>

      </div>

      {/* Screen Reader & AI Voice Assistant Showcase */}
      <Section title="AI Smart Voice Accessibility" sub="Max Voice Assistant integration for screen-free operations">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Voice interface simulation */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0B1F5E] to-[#123FAF] preserve-gradient rounded-[2rem] p-6 text-white shadow-lg flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[8px] bg-blue-500/40 border border-blue-400/50 px-2 py-0.5 rounded font-bold tracking-widest uppercase">Max Voice Engine</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
              </div>
              <h4 className="text-base font-extrabold tracking-tight mb-2">Simulated Voice Output</h4>
              
              {/* Listening pulse simulation */}
              <div className="bg-white/10 rounded-2xl p-4 min-h-[90px] border border-white/10 flex flex-col justify-between">
                <p className="text-xs font-mono text-blue-200 italic leading-relaxed">
                  "{aiSpeechOutput}"
                </p>
                {voiceCommand && (
                  <p className="text-[10px] text-green-300 font-bold mt-2">
                    User voice input heard: "{voiceCommand}"
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button 
                onClick={() => simulateVoiceCommand('Pay my credit card bill', 'Processing request. Navigating to securely auto-fill outstanding bill pay form.')}
                disabled={isListening}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all disabled:opacity-50"
              >
                "Pay my credit card bill"
              </button>
              <button 
                onClick={() => simulateVoiceCommand('What is my credit score?', 'Your Experian Credit Score is 790, which is rated as Excellent. Your limit usage is optimal.')}
                disabled={isListening}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all disabled:opacity-50"
              >
                "What is my credit score?"
              </button>
              <button 
                onClick={() => simulateVoiceCommand('Change to high contrast mode', 'Enabling High Contrast Mode for improved visibility.')}
                disabled={isListening}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all disabled:opacity-50 text-amber-200"
              >
                "Enable high contrast mode"
              </button>
            </div>
          </div>

          {/* Voice capabilities info */}
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-blue-500" /> Regional & Multilingual Support
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Full inclusive keyboard navigation combined with speech synthesis tools supporting English, Hindi (Hinglish integration), and regional voice formats.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"/>
                Voice navigation compatible with screen readers
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"/>
                Dyslexia-optimized character scaling
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"/>
                Haptic tap feedback confirmations
              </div>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
}
