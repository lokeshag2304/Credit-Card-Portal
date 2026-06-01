import React from 'react';
import { useTheme } from '../ThemeProvider';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Sun, Moon, Palette, Droplets, Layout, Type, 
  Maximize, Settings2, Sparkles,
  Globe2, CreditCard, CheckCircle2,
  ChevronDown
} from 'lucide-react';

// Color Palette for Theme Selection — hex values are hardcoded so global accent overrides never affect swatches
const accentColors = [
  { id: 'blue',   hex: '#2563EB', glow: 'rgba(37,99,235,0.55)',   name: 'Royal Blue' },
  { id: 'orange', hex: '#F97316', glow: 'rgba(249,115,22,0.55)',  name: 'Soft Orange' },
  { id: 'purple', hex: '#9333EA', glow: 'rgba(147,51,234,0.55)',  name: 'Lavender' },
  { id: 'pink',   hex: '#EC4899', glow: 'rgba(236,72,153,0.55)',  name: 'Rose Pink' },
  { id: 'mint',   hex: '#0D9488', glow: 'rgba(13,148,136,0.55)',  name: 'Mint' },
  { id: 'gold',   hex: '#D97706', glow: 'rgba(217,119,6,0.55)',   name: 'Gold' },
  { id: 'slate',  hex: '#475569', glow: 'rgba(71,85,105,0.55)',   name: 'Slate' }
];

const PRESET_THEMES = [
  { id: 'default-air', name: 'Default Air', bg: '#F8FAFC', sidebar: '#ffffff', card: '#ffffff', text: '#0F172A', accent: '#3b82f6' },
  { id: 'beige-luxe', name: 'Beige Luxe', bg: '#fdfaf6', sidebar: '#faf6f0', card: '#ffffff', text: '#4a3f35', accent: '#d4a373' },
  { id: 'olive-mist', name: 'Olive Mist', bg: '#f4f6f3', sidebar: '#f0f4ee', card: '#ffffff', text: '#2f3b2f', accent: '#7ba37b' },
  { id: 'pista-glow', name: 'Pista Glow', bg: '#F8F7F2', sidebar: '#0F172A', card: '#ffffff', text: '#2B2B2B', accent: '#A3C957' },
  { id: 'cherry-blush', name: 'Cherry Blush', bg: '#fdf5f6', sidebar: '#fcf0f2', card: '#ffffff', text: '#4a2b30', accent: '#e57384' }
];

const Appearance = () => {
  const { t } = useLanguage();
  const { 
    isDark, setIsDark,
    themeColor, setThemeColor,
    glassmorphism, setGlassmorphism,
    bgStyle, setBgStyle,
    fontFamily, setFontFamily,
    fontSize, setFontSize,
    layoutDensity, setLayoutDensity,
    reduceMotion, setReduceMotion,
    highContrast, setHighContrast,
    language, setLanguage,
    cardStyle, setCardStyle,
    dashboardTheme, setDashboardTheme
  } = useTheme();

  const handleThemeMode = (mode) => setIsDark(mode === 'dark');

  // Reusable Section Card — pure div with Tailwind transition
  const SectionCard = ({ title, subtitle, icon: Icon, children, className = '' }) => (
    <div className={`bg-white dark:bg-[#161D2D] border border-gray-100 dark:border-[#252D3D] rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all duration-300 ${className} global-card`}>
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-[15px]">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in pb-32">
      
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">{t('nav_dashboard')}</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5" /> {t('app_title')}</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{t('app_title')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('app_subtitle')}</p>
        </div>

        {/* Right Section containing Presets + Live Preview */}
        <div className="flex flex-wrap items-center gap-5 xl:gap-6 shrink-0">
          
          {/* Preset Theme Selection Row */}
          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 xl:p-4 rounded-3xl shadow-sm global-card">
            {PRESET_THEMES.map((theme) => {
              const isActive = dashboardTheme === theme.id;
              return (
                <div 
                  key={theme.id} 
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setDashboardTheme(theme.id)}
                >
                  <div 
                    className={`w-[72px] h-12 rounded-xl border-2 transition-all overflow-hidden relative ${
                      isActive 
                        ? 'border-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.15)] scale-105' 
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                    style={{ backgroundColor: theme.bg }}
                  >
                    {/* Sidebar (Vertical column on the left) */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-[18px] border-r border-black/[0.03]" 
                      style={{ backgroundColor: theme.sidebar }}
                    />
                    {/* Content area: Tiny lines/blocks */}
                    <div className="absolute left-[22px] right-1 top-1 bottom-1 flex flex-col justify-between">
                      {/* Tiny Header line */}
                      <div className="h-1 rounded-[1px] w-2/3 bg-black/[0.08]" />
                      {/* Tiny Card in center */}
                      <div 
                        className="h-[14px] rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)] border border-black/[0.02]" 
                        style={{ backgroundColor: theme.card }}
                      />
                      {/* Tiny bottom line */}
                      <div className="flex justify-between items-center">
                        <div className="h-1 rounded-[1px] w-1/2 bg-black/[0.05]" />
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                      </div>
                    </div>
                    {/* Active Indicator inside miniature top right */}
                    {isActive && (
                      <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center border border-white shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Radio button / Label */}
                  <div className="flex items-center gap-1.5 mt-2 justify-center">
                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-all ${
                      isActive 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400'
                    }`}>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className={`text-[10px] font-bold tracking-tight transition-colors ${
                      isActive ? 'text-blue-600 dark:text-blue-400 font-extrabold' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {theme.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Preview (Dynamic) */}
          {(() => {
            const activeTheme = PRESET_THEMES.find(t => t.id === dashboardTheme) || PRESET_THEMES[0];
            return (
              <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 xl:p-4 rounded-3xl shadow-sm global-card shrink-0">
                <div className="hidden xl:block">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{t('preview')}</p>
                  <p className="text-[10px] text-gray-500 max-w-[60px] leading-tight mt-1">{t('preview_sub')}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {/* Light Mode Miniature */}
                  <div 
                    className={`w-14 h-9 rounded-lg border-2 transition-all ${!isDark ? 'shadow-sm scale-105 z-10' : 'border-gray-100 dark:border-gray-700 opacity-60 scale-95'} overflow-hidden relative`}
                    style={{ backgroundColor: activeTheme.bg, borderColor: !isDark ? activeTheme.accent : undefined }}
                  >
                    <div className="w-full h-1.5 border-b border-black/5" style={{ backgroundColor: activeTheme.sidebar }}></div>
                    <div className="absolute left-1 top-2.5 w-3 h-4 rounded-sm shadow-sm" style={{ backgroundColor: activeTheme.card }}></div>
                    <div className="absolute right-1 top-2.5 w-8 h-2.5 rounded shadow-sm" style={{ backgroundColor: activeTheme.accent }}></div>
                  </div>
                  {/* Dark Mode Miniature */}
                  <div 
                    className={`w-14 h-9 rounded-lg border-2 transition-all ${isDark ? 'shadow-[0_0_15px_rgba(0,229,255,0.2)] scale-105 z-10' : 'border-gray-200 dark:border-gray-700 opacity-60 scale-95'} overflow-hidden relative bg-gray-900`}
                    style={{ borderColor: isDark ? '#00E5FF' : undefined }}
                  >
                    <div className="w-full h-1.5 bg-gray-800 border-b border-gray-700"></div>
                    <div className="absolute left-1 top-2.5 w-3 h-4 bg-gray-800 rounded-sm shadow-sm"></div>
                    <div className="absolute right-1 top-2.5 w-8 h-2.5 bg-gradient-to-r from-[#00E5FF] to-[#2563FF] rounded shadow-[0_2px_8px_rgba(0,229,255,0.3)]"></div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ── Settings Grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. Theme Mode */}
        <SectionCard title={t('set_theme')} subtitle={t('set_theme_sub')} icon={Sun}>
          <div className="flex gap-3 bg-gray-50 dark:bg-gray-800/50 p-1.5 rounded-2xl">
            <button 
              onClick={() => handleThemeMode('light')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${!isDark ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm border border-gray-100 dark:border-gray-600' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Sun className="w-4 h-4" /> Light
            </button>
            <button 
              onClick={() => handleThemeMode('dark')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${isDark ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm border border-gray-100 dark:border-gray-600' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <Moon className="w-4 h-4" /> Dark
            </button>
          </div>
        </SectionCard>

        {/* 2. Accent Color */}
        <SectionCard title={t('set_accent')} subtitle={t('set_accent_sub')} icon={Palette}>
          <div className="flex justify-between items-center px-2 py-2">
            {accentColors.map((c) => {
              const isActive = themeColor === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setThemeColor(c.id)}
                  aria-label={c.name}
                  title={c.name}
                  style={{
                    backgroundColor: c.hex,  /* hardcoded — never overridable by CSS theme system */
                    ...(isActive ? {
                      boxShadow: `0 0 0 2.5px white, 0 0 0 4.5px ${c.hex}, 0 6px 18px ${c.glow}`,
                      transform: 'scale(1.15)',
                    } : {})
                  }}
                  className={`
                    relative w-9 h-9 rounded-full flex items-center justify-center
                    transition-all duration-200 ease-out cursor-pointer
                    ${!isActive ? 'hover:scale-110 hover:shadow-md' : ''}
                  `}
                >
                  {isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white/90 shadow-sm block" />
                  )}
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* 3. Glassmorphism Intensity */}
        <SectionCard 
          title={t('set_glass')}
          subtitle={t('set_glass_sub')}
          icon={Droplets}
        >
          {(() => {
            const levels = ['off', 'subtle', 'medium', 'strong'];
            const labels = ['25%', '50%', '75%', '100%'];
            const activeIdx = levels.indexOf(glassmorphism);
            const pct = labels[activeIdx] || '50%';
            return (
              <div className="px-1 pt-1 pb-2">
                {/* Live readout */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Intensity</span>
                  <span
                    className="text-sm font-black tabular-nums transition-all duration-300"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {pct}
                  </span>
                </div>

                {/* Premium styled range slider — track gradient is computed inline from current value */}
                <div className="relative py-2">
                  <input
                    type="range" min="0" max="3" step="1"
                    value={activeIdx}
                    onChange={(e) => setGlassmorphism(levels[+e.target.value])}
                    className="glass-slider w-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right,
                        var(--accent-primary) 0%,
                        var(--accent-primary) ${(activeIdx / 3) * 100}%,
                        var(--glass-track-inactive) ${(activeIdx / 3) * 100}%,
                        var(--glass-track-inactive) 100%)`,
                      accentColor: 'var(--accent-primary)',
                    }}
                  />
                </div>

                {/* Single label row — only one, no duplication */}
                <div className="flex justify-between mt-3 px-0.5">
                  {labels.map((label, idx) => {
                    const dist = Math.abs(idx - activeIdx);
                    const isActive = idx === activeIdx;
                    return (
                      <button
                        key={label}
                        onClick={() => setGlassmorphism(levels[idx])}
                        className="text-[10px] font-bold transition-all duration-200 cursor-pointer px-1 rounded"
                        style={{
                          color: isActive ? 'var(--accent-primary)' : undefined,
                          opacity: isActive ? 1 : Math.max(0.35, 1 - dist * 0.22),
                          transform: isActive ? 'scale(1.15)' : 'scale(1)',
                          fontWeight: isActive ? 800 : 600,
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </SectionCard>

        {/* 4. Background Style */}
        <SectionCard title={t('set_bg')} subtitle={t('set_bg_sub')} icon={Layout} className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'default',   label: 'Default',      bgClass: 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700' },
              { id: 'gradient',  label: 'Gradient',     bgClass: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-100 dark:border-blue-900/50' },
              { id: 'blur',      label: 'Soft Blur',    bgClass: 'bg-[#F8F9FB] dark:bg-[#0A0D14] border-gray-100 dark:border-gray-800', isMesh: true },
              { id: 'particles', label: 'Minimal',      bgClass: 'bg-gradient-to-tr from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-100 dark:border-gray-700' }
            ].map(bg => (
              <button
                key={bg.id}
                onClick={() => setBgStyle(bg.id)}
                className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200 overflow-hidden ${bgStyle === bg.id ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
              >
                <div className={`w-full h-16 rounded-xl border ${bg.bgClass} mb-3 relative overflow-hidden`}>
                  {bg.isMesh && <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-400/30 blur-xl rounded-full"></div>}
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{bg.label}</span>
                {bgStyle === bg.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* 5. Font Family */}
        <SectionCard title={t('set_font')} subtitle={t('set_font_sub')} icon={Type}>
          <div className="relative">
            <select 
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white text-sm font-bold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="inter">Aa Inter (Default)</option>
              <option value="poppins">Aa Poppins</option>
              <option value="montserrat">Aa Montserrat</option>
              <option value="space-grotesk">Aa Space Grotesk</option>
              <option value="roboto">Aa Roboto</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </SectionCard>

        {/* 6. Font Size — 5 presets */}
        <SectionCard title="Font Size" subtitle="Adjust global typography scaling" icon={Maximize}>
          <div className="grid grid-cols-5 gap-2">
            {[
              { id: 'xs',     label: 'XS',   sample: '10px', desc: 'Compact' },
              { id: 'small',  label: 'SM',   sample: '12px', desc: 'Small' },
              { id: 'medium', label: 'MD',   sample: '14px', desc: 'Default' },
              { id: 'large',  label: 'LG',   sample: '16px', desc: 'Large' },
              { id: 'xlarge', label: 'XL',   sample: '20px', desc: 'XLarge' },
            ].map(sz => {
              const isActive = fontSize === sz.id;
              return (
                <button
                  key={sz.id}
                  onClick={() => setFontSize(sz.id)}
                  style={isActive ? {
                    border: '2px solid var(--accent-primary)',
                    background: 'var(--accent-soft)',
                    color: 'var(--accent-primary)',
                  } : {}}
                  className={`flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl border-2 transition-all duration-200 ${
                    isActive
                      ? ''
                      : 'border-transparent bg-gray-50 dark:bg-gray-800/50 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white'
                  }`}
                >
                  <span style={{ fontSize: sz.sample }} className="font-black leading-none">Aa</span>
                  <span className="text-[9px] font-extrabold uppercase tracking-widest mt-0.5">{sz.label}</span>
                  <span className="text-[8px] opacity-60">{sz.desc}</span>
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* 7. Layout Density */}
        <SectionCard title={t('set_density')} subtitle={t('set_density_sub')} icon={Layout}>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 p-1.5 rounded-2xl">
            {['compact', 'comfortable', 'spacious'].map(density => (
              <button
                key={density}
                onClick={() => setLayoutDensity(density)}
                className={`flex-1 py-3 rounded-xl text-[10px] uppercase tracking-wider font-extrabold transition-all duration-200 ${layoutDensity === density ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm border border-gray-100 dark:border-gray-600' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
              >
                {density}
              </button>
            ))}
          </div>
        </SectionCard>

        {/* 8. Toggle Row: High Contrast + Language */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* High Contrast toggle */}
          <div className="bg-white dark:bg-[#161D2D] border border-gray-100 dark:border-[#252D3D] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:-translate-y-0.5 transition-transform duration-200 global-card">
            <div className="flex items-center gap-3">
              <Settings2 className="w-5 h-5 text-orange-500" />
              <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{t('set_contrast')}</h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{t('set_contrast_sub')}</p>
              </div>
            </div>
            <button 
              onClick={() => setHighContrast(!highContrast)} 
              className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${highContrast ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300 shadow-sm ${highContrast ? 'left-[22px]' : 'left-0.5'}`}/>
            </button>
          </div>

          {/* Language */}
          <div className="bg-white dark:bg-[#161D2D] border border-gray-100 dark:border-[#252D3D] rounded-2xl p-5 flex items-center justify-between shadow-sm hover:-translate-y-0.5 transition-transform duration-200 col-span-1 md:col-span-2 global-card">
            <div className="flex items-center gap-3">
              <Globe2 className="w-5 h-5 text-teal-500" />
              <div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{t('set_lang')}</h4>
                <p className="text-[10px] text-gray-500">{t('set_lang_sub')}</p>
              </div>
            </div>
            <div className="relative w-48">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="English">🇺🇸 English (US)</option>
                <option value="Hindi">🇮🇳 हिन्दी (Hindi)</option>
                <option value="Tamil">🇮🇳 தமிழ் (Tamil)</option>
                <option value="Telugu">🇮🇳 తెలుగు (Telugu)</option>
                <option value="French">🇫🇷 Français (French)</option>
                <option value="Spanish">🇪🇸 Español (Spanish)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 10. Card Style */}
        <SectionCard title={t('set_card')} subtitle={t('set_card_sub')} icon={CreditCard} className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'soft',     label: 'Soft Edge',    classes: 'rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800' },
              { id: 'elevated', label: 'Elevated',     classes: 'rounded-xl shadow-lg border-b-4 border-gray-100 dark:border-gray-800' },
              { id: 'flat',     label: 'Clean Flat',   classes: 'rounded-sm border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50' },
              { id: 'glass',    label: 'Premium Glass',classes: 'rounded-2xl backdrop-blur-md bg-white/40 dark:bg-gray-800/40 border border-white/60 dark:border-gray-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]' },
            ].map(style => (
              <button
                key={style.id}
                onClick={() => setCardStyle(style.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${cardStyle === style.id ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <div className={`w-full h-20 mb-3 flex items-center justify-center bg-white dark:bg-gray-900 ${style.classes}`}>
                  <div className="w-10 h-6 bg-blue-500/20 rounded"></div>
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{style.label}</span>
                {cardStyle === style.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </SectionCard>

      </div>

      {/* Footer Save Status */}
      <div className="mt-8 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">{t('app_tagline')}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t('app_tagline_sub')}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full text-[11px] font-bold border border-green-100 dark:border-green-900/30">
          <CheckCircle2 className="w-3.5 h-3.5" /> {t('app_saved')}
        </div>
      </div>

    </div>
  );
};

export default Appearance;
