import React from 'react';
import { motion } from 'framer-motion';
import logoLight from '../assets/logo-light.png';
import fsiLogo from '../assets/fsi-logo.png';

const SplendinFlowerLogo = () => (
  <div className="w-5.5 h-5.5 overflow-hidden flex items-center justify-start relative shrink-0 bg-transparent transition-transform duration-500 hover:rotate-90">
    <img
      src={logoLight?.src || logoLight}
      alt="Splendin Flower"
      className="absolute left-0 top-1/2 -translate-y-1/2 h-[95%] w-auto max-w-none object-left contrast-[1.12] saturate-[1.18] brightness-[0.93] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
    />
  </div>
);

const FlyingStarsLogo = () => (
  <div className="w-5.5 h-5.5 overflow-hidden flex items-center justify-center shrink-0 bg-transparent transition-transform duration-300 group-hover:scale-110">
    <img
      src={fsiLogo?.src || fsiLogo}
      alt="Flying Stars Logo"
      className="w-full h-full object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
    />
  </div>
);

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-4 lg:mx-6 mt-4 mb-2 overflow-hidden"
    >
      <div className="relative rounded-[18px] border border-white/40 dark:border-white/10 bg-gradient-to-r from-[#FFFDF9]/95 via-[#FAF8F5]/95 to-[#F5F2FC]/95 dark:from-[#071426]/95 dark:via-[#050816]/95 dark:to-[#0B1020]/95 backdrop-blur-xl shadow-[0_4px_15px_rgba(0,0,0,0.01)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300">
        {/* Soft atmospheric background glow inside card */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/5 dark:bg-purple-500/10 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 dark:bg-blue-500/10 blur-xl rounded-full pointer-events-none"></div>

        {/* Main Content wrapper: ultra-slim (py-2 lg:py-2.5) & min-h-[48px] */}
        <div className="px-5 py-2 lg:py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 relative z-10 min-h-[48px] lg:min-h-[52px]">

          {/* LEFT SECTION: Splendin Logo (Cropped PNG Flower) + Minimal Copyright */}
          <div className="flex items-center gap-2.5 flex-col sm:flex-row text-center sm:text-left">
            <SplendinFlowerLogo />

            <p className="text-[11px] lg:text-[12px] font-semibold text-gray-600 dark:text-gray-400 tracking-wide">
              © 2026{' '}
              <a
                href="https://www.splendin.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[#2563EB] dark:text-[#60A5FA] font-bold hover:underline transition-all relative"
              >
                Splendin
              </a>
              . Built for Secure, Fast & Reliable Card Services.
            </p>
          </div>

          {/* RIGHT SECTION: Handcrafted by Flying Stars (Bare FSI PNG logo) */}
          <div className="flex items-center gap-2 flex-col sm:flex-row text-center sm:text-left">
            <span className="text-[11px] lg:text-[12px] font-semibold text-gray-600 dark:text-gray-400 tracking-wide">
              Handcrafted with ❤️ by
            </span>

            <a
              href="https://flyingstars.co/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <FlyingStarsLogo />

              <span className="text-[11px] lg:text-[12px] font-extrabold text-gray-600 dark:text-gray-400 tracking-wider group-hover:text-[#FA6A14] dark:group-hover:text-[#FCD34D] transition-colors duration-300 group-hover:underline">
                FLYING STARS
              </span>
            </a>
          </div>

        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
