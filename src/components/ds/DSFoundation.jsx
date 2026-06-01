import React from 'react';
import { ShieldCheck, Zap, Globe } from 'lucide-react';

const Section = ({ title, sub, children }) => (
  <div className="mb-12">
    <div className="mb-6">
      <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{title}</h2>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
    {children}
  </div>
);

const colors = [
  { name: 'Navy Blue', hex: '#0B1F5E', cls: 'bg-[#0B1F5E]', usage: 'Sidebar, headers' },
  { name: 'Royal Blue', hex: '#2563EB', cls: 'bg-blue-600', usage: 'Primary CTA, links' },
  { name: 'Teal', hex: '#0D9488', cls: 'bg-teal-600', usage: 'Accents, success' },
  { name: 'Purple', hex: '#7C3AED', cls: 'bg-violet-600', usage: 'Rewards, premium' },
  { name: 'Success', hex: '#16A34A', cls: 'bg-green-600', usage: 'Confirmations' },
  { name: 'Warning', hex: '#D97706', cls: 'bg-amber-600', usage: 'Alerts, due dates' },
  { name: 'Error', hex: '#DC2626', cls: 'bg-red-600', usage: 'Blocks, fraud' },
  { name: 'Surface', hex: '#F8FAFC', cls: 'bg-[#F8FAFC] border border-gray-100', usage: 'Page background' },
];

const gradients = [
  { name: 'Primary Gradient', from: '#0B1F5E', to: '#2563EB', cls: 'bg-gradient-to-r from-[#0B1F5E] to-blue-600' },
  { name: 'Teal Gradient', from: '#0D9488', to: '#2563EB', cls: 'bg-gradient-to-r from-teal-500 to-blue-600' },
  { name: 'Premium Gradient', from: '#7C3AED', to: '#2563EB', cls: 'bg-gradient-to-r from-violet-600 to-blue-600' },
  { name: 'Warm Gradient', from: '#D97706', to: '#DC2626', cls: 'bg-gradient-to-r from-amber-500 to-red-500' },
];

const typeScale = [
  { label: 'Display', size: 'text-4xl', weight: 'font-extrabold', sample: 'Aa', desc: '36px / Black' },
  { label: 'H1', size: 'text-3xl', weight: 'font-extrabold', sample: 'Page Title', desc: '30px / ExtraBold' },
  { label: 'H2', size: 'text-2xl', weight: 'font-bold', sample: 'Section Heading', desc: '24px / Bold' },
  { label: 'H3', size: 'text-xl', weight: 'font-bold', sample: 'Card Title', desc: '20px / Bold' },
  { label: 'Body', size: 'text-sm', weight: 'font-medium', sample: 'Regular body text for descriptions and content.', desc: '14px / Medium' },
  { label: 'Caption', size: 'text-xs', weight: 'font-medium', sample: 'Labels, helper text, metadata', desc: '12px / Medium' },
  { label: 'Micro', size: 'text-[10px]', weight: 'font-bold', sample: 'UPPERCASE BADGES · TAGS', desc: '10px / Bold' },
];

export default function DSFoundation() {
  return (
    <div>
      {/* Brand */}
      <Section title="Brand Foundation" sub="Core brand identity and usage guidelines">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-gradient-to-br from-[#0B1F5E] to-blue-700 rounded-2xl p-8 text-white flex flex-col items-center justify-center gap-4 min-h-[180px]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-lg border border-white/30">S</div>
              <span className="text-2xl font-black tracking-tight">Splendin</span>
            </div>
            <p className="text-[10px] text-blue-200 tracking-[0.2em] uppercase font-bold">Credit Card Portal</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-center gap-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Brand Values</p>
            {[
              { icon: ShieldCheck, label: 'Trust & Security', color: 'text-green-500' },
              { icon: Zap, label: 'Speed & Simplicity', color: 'text-blue-500' },
              { icon: Globe, label: 'Global & Scalable', color: 'text-purple-500' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{label}</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 flex flex-col justify-center gap-3 border border-gray-800">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Dark Mode</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 font-black text-lg border border-blue-500/30">S</div>
              <span className="text-2xl font-black tracking-tight text-white">Splendin</span>
            </div>
            <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold">Credit Card Portal</p>
          </div>
        </div>
      </Section>

      {/* Colors */}
      <Section title="Color System" sub="Design tokens — primary, semantic, and surface colors">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {colors.map(c => (
            <div key={c.name} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className={`${c.cls} h-16`} />
              <div className="p-3">
                <p className="text-xs font-bold text-gray-900 dark:text-white">{c.name}</p>
                <p className="text-[10px] font-mono text-gray-500">{c.hex}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gradients.map(g => (
            <div key={g.name} className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className={`${g.cls} h-14 flex items-center justify-center`}>
                <span className="text-white text-xs font-bold drop-shadow">{g.name}</span>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3">
                <p className="text-[10px] font-mono text-gray-500">{g.from} → {g.to}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography Scale" sub="Inter font system — hierarchy and weights">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
          {typeScale.map((t, i) => (
            <div key={t.label} className={`flex items-center gap-6 px-6 py-4 ${i !== typeScale.length - 1 ? 'border-b border-gray-50 dark:border-gray-700/50' : ''} hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group`}>
              <span className="w-16 text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">{t.label}</span>
              <span className={`${t.size} ${t.weight} text-gray-900 dark:text-white flex-1`}>{t.sample}</span>
              <span className="text-[10px] text-gray-400 font-mono shrink-0 hidden md:block">{t.desc}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
