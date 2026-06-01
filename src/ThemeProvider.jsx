import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Global Accessibility States
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // small | medium | large
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [voiceNav, setVoiceNav] = useState(false);
  const [largeTapTargets, setLargeTapTargets] = useState(false);
  const [screenReaderOpt, setScreenReaderOpt] = useState(false);

  // New Appearance States
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem('themeColor') || 'blue');
  const [glassmorphism, setGlassmorphism] = useState(() => localStorage.getItem('glassmorphism') || 'medium');
  const [bgStyle, setBgStyle] = useState(() => localStorage.getItem('bgStyle') || 'default');
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('fontFamily') || 'inter');
  const [layoutDensity, setLayoutDensity] = useState(() => localStorage.getItem('layoutDensity') || 'comfortable');
  const [cardStyle, setCardStyle] = useState(() => localStorage.getItem('cardStyle') || 'soft');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'English');
  const [dashboardTheme, setDashboardTheme] = useState(() => localStorage.getItem('dashboardTheme') || 'default');

  useEffect(() => {
    // 1. Temporarily disable all animations and transitions globally
    document.documentElement.classList.add('theme-toggling');

    // 2. Perform the actual dark mode class toggle
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // 3. Force synchronous layout reflow so the browser paints the new theme instantly
    const _ = window.getComputedStyle(document.body).opacity;

    // 4. Restore normal transition animations in the next frame
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-toggling');
    }, 100);

    return () => clearTimeout(timer);
  }, [isDark]);

  // ─── RESIZE: Prevent layout bursting transition lag ────────────────────
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      document.documentElement.classList.add('resize-toggling');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.documentElement.classList.remove('resize-toggling');
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // ─── FONT: dedicated instant effect ────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-font', fontFamily);
    localStorage.setItem('fontFamily', fontFamily);
    document.documentElement.style.removeProperty('font-family');
  }, [fontFamily]);

  // ─── DASHBOARD THEME: dedicated instant effect ──────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-dashboard-theme', dashboardTheme);
    localStorage.setItem('dashboardTheme', dashboardTheme);
  }, [dashboardTheme]);

  // ─── FONT SIZE: dedicated instant effect (5 levels) ──────────────────────
  useEffect(() => {
    const sizeMap = {
      xs:     '80%',
      small:  '90%',
      medium: '100%',
      large:  '112%',
      xlarge: '125%',
    };
    document.documentElement.style.fontSize = sizeMap[fontSize] || '100%';
    document.documentElement.setAttribute('data-fontsize', fontSize || 'medium');
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // ─── ANIMATIONS: dedicated instant effect ───────────────────────────────
  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
      document.documentElement.setAttribute('data-motion', 'off');
    } else {
      document.documentElement.classList.remove('reduce-motion');
      document.documentElement.setAttribute('data-motion', 'on');
    }
  }, [reduceMotion]);

  // Apply Accessibility Settings globally to DOM
  useEffect(() => {
    // High Contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Dyslexia Font
    if (dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }

    // Appearance persist and DOM apply
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('glassmorphism', glassmorphism);
    localStorage.setItem('bgStyle', bgStyle);
    localStorage.setItem('layoutDensity', layoutDensity);
    localStorage.setItem('cardStyle', cardStyle);
    localStorage.setItem('language', language);

    document.documentElement.setAttribute('data-theme-color', themeColor);
    document.documentElement.setAttribute('data-glass', glassmorphism);
    document.documentElement.setAttribute('data-bg', bgStyle);
    document.documentElement.setAttribute('data-density', layoutDensity);
    document.documentElement.setAttribute('data-card', cardStyle);
    // NOTE: data-font/fontSize/reduceMotion handled by dedicated effects above

  }, [highContrast, dyslexicFont, themeColor, glassmorphism, bgStyle, layoutDensity, cardStyle, language]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const resetAccessibility = () => {
    setHighContrast(false);
    setReduceMotion(false);
    setFontSize('medium');
    setDyslexicFont(false);
    setVoiceNav(false);
    setLargeTapTargets(false);
    setScreenReaderOpt(false);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      toggleTheme,
      highContrast,
      setHighContrast,
      reduceMotion,
      setReduceMotion,
      fontSize,
      setFontSize,
      dyslexicFont,
      setDyslexicFont,
      voiceNav,
      setVoiceNav,
      largeTapTargets,
      setLargeTapTargets,
      screenReaderOpt,
      setScreenReaderOpt,
      resetAccessibility,
      themeColor, setThemeColor,
      glassmorphism, setGlassmorphism,
      bgStyle, setBgStyle,
      fontFamily, setFontFamily,
      layoutDensity, setLayoutDensity,
      cardStyle, setCardStyle,
      language, setLanguage,
      dashboardTheme, setDashboardTheme,
      setIsDark
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
