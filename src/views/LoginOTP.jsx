import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, CreditCard, ShieldCheck, Zap, Headphones, Shield, Smartphone, Sun, Moon, ArrowLeft, Key } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import toast from 'react-hot-toast';
import logoLight from '../assets/logo-light.png';
import logoText from '../assets/Logotext.png';
import FlowBackground from '../components/FlowBackground';


const FullScreenLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-opacity duration-300">
    <div className="relative flex flex-col items-center">
      {/* Spinning Logo Flower (CSS Cropped) */}
      <div className="w-16 h-16 rounded-full overflow-hidden animate-[spin_2s_linear_infinite] mb-6 drop-shadow-xl flex items-center justify-start relative">
        <img src={logoLight?.src || logoLight} alt="Splendin" className="absolute left-[-2px] h-[90%] w-auto max-w-none object-left contrast-[1.12] saturate-[1.18] brightness-[0.93] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
      </div>
      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent animate-pulse tracking-tight">Verifying OTP...</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium tracking-wide">Securely logging you in</p>
    </div>
  </div>
);

const LoginOTP = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [step, setStep] = useState(location.state?.maskedPhone ? 2 : 1); // 1 = Phone, 2 = OTP
  const [maskedContact, setMaskedContact] = useState(location.state?.maskedPhone || '');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleResendOTP = () => {
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    toast.success('New OTP sent successfully!', {
      style: {
        background: isDark ? '#1f2937' : '#ffffff',
        color: isDark ? '#ffffff' : '#1f2937',
        border: isDark ? '1px solid #374151' : '1px solid #f3f4f6'
      }
    });
    inputRefs.current[0]?.focus();
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (phone.length >= 4) {
      setMaskedContact('******' + phone.slice(-4));
    } else {
      setMaskedContact('******XXXX');
    }
    setStep(2);
    setTimer(30);
    setCanResend(false);
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    
    // Check if OTP is fully entered
    if (enteredOtp.length < 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      
      // iykyk: 123456 is the magic OTP
      if (enteredOtp === '123456') {
        toast.success('Successfully logged in! Welcome back.', {
          style: {
            background: isDark ? '#1f2937' : '#ffffff',
            color: isDark ? '#ffffff' : '#1f2937',
            border: isDark ? '1px solid #374151' : '1px solid #f3f4f6'
          }
        });
        navigate('/dashboard'); 
      } else {
        toast.error('Invalid OTP entered. Please try again.', {
          style: {
            background: isDark ? '#1f2937' : '#ffffff',
            color: isDark ? '#ffffff' : '#1f2937',
            border: isDark ? '1px solid #374151' : '1px solid #f3f4f6'
          }
        });
        setOtp(['', '', '', '', '', '']); // Clear OTP fields
        inputRefs.current[0]?.focus(); // Focus first input
      }
    }, 250);
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <FlowBackground />
      
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-3 md:p-4 font-sans overflow-y-auto select-none relative py-6 md:py-4">
        
        {/* Main Container */}
        <div className="w-full max-w-5xl flex flex-col justify-center gap-4 my-auto py-2">
        
          {/* Main Card */}
          <div className="bg-white/40 dark:bg-[#0b1730]/40 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-blue-950/10 w-full flex flex-col md:flex-row overflow-hidden relative flex-shrink-0 min-h-[450px] animate-fade-in-up global-card">
            
            {/* Left Side (Light Blue Area) - Hidden on Mobile */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#eff5ff]/35 to-[#e0ebff]/35 dark:from-[#2563EB]/10 dark:to-transparent p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden group/left">
              {/* Logo */}
              <div className="z-10 flex items-center mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-32 lg:w-36">
                  <img 
                    src={logoLight?.src || logoLight} 
                    alt="Splendin Logo" 
                    className="w-full h-auto cursor-pointer transition-transform duration-500 hover:scale-110 hover:-rotate-2 contrast-[1.12] saturate-[1.18] brightness-[0.93] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] origin-left" 
                  />
                </div>
                <img 
                  src={logoText?.src || logoText} 
                  alt="Splendin Text Logo" 
                  className="h-40 lg:h-23 w-auto object-contain" 
                  style={{ marginLeft: '10px' }}
                />
              </div>

              {/* Welcome Text */}
              <div className="z-10 relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl lg:text-5xl font-extrabold mb-3 tracking-tighter drop-shadow-sm leading-tight">
                  <span className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent py-2 pr-2 inline-block">Welcome</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-[13px] lg:text-sm mb-4 max-w-[240px] font-medium leading-relaxed tracking-wide">
                  Login quickly and securely with an OTP on your mobile.
                </p>
                <div className="w-10 h-1 bg-gradient-to-r from-orange-400 to-orange-300 rounded-full mb-6 shadow-sm"></div>
              </div>

              {/* Credit Card Illustration */}
              <div className="relative z-10 flex-1 flex items-center justify-center py-4">
                <div className="absolute inset-0 bg-blue-300 opacity-20 blur-[80px] rounded-full animate-pulse-glow"></div>
                
                {/* The Card */}
                <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] w-64 lg:w-72 h-40 lg:h-44 rounded-2xl p-4 lg:p-5 text-white shadow-[0_20px_40px_-15px_rgba(29,78,216,0.6)] transform -rotate-6 relative z-20 border border-blue-400/30 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:rotate-[-2deg] hover:scale-[1.03] hover:shadow-[0_30px_60px_-15px_rgba(29,78,216,0.8)] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="absolute top-0 right-0 w-24 h-24 lg:w-32 lg:h-32 bg-blue-500 rounded-full mix-blend-screen filter blur-xl opacity-50 group-hover/left:scale-125 transition-transform duration-1000"></div>
                  
                  {/* Glass reflection line */}
                  <div className="absolute -inset-full h-full w-1/2 z-10 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover/left:animate-[shimmer_1.5s_infinite]"></div>

                  <div className="flex justify-between items-center mb-4 lg:mb-6 relative z-10">
                    <div className="flex items-center gap-1">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-orange-400" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" fill="currentColor" stroke="none" />
                      </svg>
                      <span className="font-semibold text-[10px] lg:text-xs">Splendin</span>
                    </div>
                    <div className="w-7 h-5 lg:w-8 lg:h-6 bg-yellow-400/80 rounded flex items-center justify-center shadow-inner">
                      <div className="w-4 h-2 lg:w-5 lg:h-3 border border-yellow-600/50 rounded-sm"></div>
                    </div>
                  </div>
                  <div className="font-mono text-base lg:text-lg tracking-widest mb-3 lg:mb-4 relative z-10 opacity-90 drop-shadow-md">
                    **** **** **** 1234
                  </div>
                  <div className="flex justify-between items-end relative z-10">
                    <div>
                      <div className="text-[7px] lg:text-[8px] text-gray-400 uppercase tracking-wider mb-1 font-medium">Valid Thru</div>
                      <div className="text-[10px] lg:text-xs font-bold uppercase tracking-wider drop-shadow-sm">Rohit Sharma</div>
                    </div>
                    <div className="text-lg lg:text-xl font-black italic tracking-tighter drop-shadow-md">VISA</div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-2 lg:top-4 left-2 lg:left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-1.5 lg:p-2 rounded-xl shadow-lg animate-float z-30 border border-white/40 dark:border-gray-600/50 transition-all hover:scale-110 global-card">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
                </div>
                <div className="absolute bottom-6 lg:bottom-10 left-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-1.5 lg:p-2 rounded-xl shadow-lg animate-float-delayed z-30 border border-white/40 dark:border-gray-600/50 transition-all hover:scale-110 global-card">
                  <Lock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-500" />
                </div>
                <div className="absolute top-8 lg:top-10 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-1.5 lg:p-2 rounded-xl shadow-lg animate-float z-30 border border-white/40 dark:border-gray-600/50 transition-all hover:scale-110 global-card">
                  <div className="flex items-end gap-0.5">
                      <div className="w-0.5 h-1.5 lg:w-1 lg:h-2 bg-blue-500 rounded-sm"></div>
                      <div className="w-0.5 h-2.5 lg:w-1 lg:h-3 bg-blue-500 rounded-sm"></div>
                      <div className="w-0.5 h-3.5 lg:w-1 lg:h-4 bg-blue-500 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side (Form Area) - Full width on Mobile */}
            <div className="w-full md:w-1/2 p-6 lg:p-10 flex flex-col justify-center relative bg-white/70 dark:bg-[#0b1730]/75 backdrop-blur-md border-t md:border-t-0 md:border-l border-gray-100/30 dark:border-gray-700/30">
              <button 
                onClick={toggleTheme}
                className="absolute top-4 right-4 lg:top-6 lg:right-6 flex items-center gap-1.5 text-[11px] lg:text-xs text-gray-500 dark:text-gray-300 font-semibold bg-gray-50/80 dark:bg-gray-700/80 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all hover:scale-100 active:scale-95 shadow-sm hover:shadow border border-gray-100 dark:border-gray-600 z-10"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-orange-400" /> : <Moon className="w-3.5 h-3.5 text-blue-500" />}
                {isDark ? 'Light' : 'Dark'}
              </button>

              {/* Mobile-only branding logo */}
              <div className="flex md:hidden items-center justify-start mb-6 animate-fade-in-up">
                <div className="w-24">
                  <img
                    src={logoLight?.src || logoLight}
                    alt="Splendin Logo"
                    className="w-full h-auto contrast-[1.12] saturate-[1.18] brightness-[0.93] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
                  />
                </div>
                <img
                  src={logoText?.src || logoText}
                  alt="Splendin"
                  className="h-10 w-auto object-contain ml-1.5 dark:brightness-0 dark:invert"
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1 tracking-tight py-1 pr-2 inline-block">OTP Login</h2>
                <p className="text-gray-500 dark:text-gray-400 text-[11px] lg:text-sm mb-6 lg:mb-8 font-medium tracking-wide">
                  {step === 1 ? "Enter your mobile number to receive OTP" : `OTP sent on ${maskedContact}, please check`}
                </p>
              </div>

              {step === 1 ? (
                <form className="space-y-4 lg:space-y-5" onSubmit={handleSendOTP}>
                  <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <label className="block text-[11px] lg:text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 lg:mb-1.5 transition-colors tracking-wide uppercase">Mobile Number</label>
                    <div className="flex group">
                      <div className="relative border border-gray-100 dark:border-gray-700 border-r-0 rounded-l-xl bg-gray-50/50 dark:bg-gray-900/60 px-2 flex items-center shadow-sm group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
                        <select className="appearance-none bg-transparent outline-none text-[13px] lg:text-sm text-gray-700 dark:text-gray-300 font-medium cursor-pointer w-[68px] pl-1 pr-4 py-2.5 lg:py-3 z-10">
                          <option value="+91" className="bg-white dark:bg-gray-800 text-black dark:text-white">🇮🇳 +91</option>
                          <option value="+1" className="bg-white dark:bg-gray-800 text-black dark:text-white">🇺🇸 +1</option>
                          <option value="+44" className="bg-white dark:bg-gray-800 text-black dark:text-white">🇬🇧 +44</option>
                          <option value="+61" className="bg-white dark:bg-gray-800 text-black dark:text-white">🇦🇺 +61</option>
                          <option value="+81" className="bg-white dark:bg-gray-800 text-black dark:text-white">🇯🇵 +81</option>
                          <option value="+49" className="bg-white dark:bg-gray-800 text-black dark:text-white">🇩🇪 +49</option>
                          <option value="+33" className="bg-white dark:bg-gray-800 text-black dark:text-white">🇫🇷 +33</option>
                          <option value="+971" className="bg-white dark:bg-gray-800 text-black dark:text-white">🇦🇪 +971</option>
                        </select>
                        <div className="absolute right-2 pointer-events-none z-0">
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="block w-full px-3 py-2.5 lg:py-3 border border-gray-100 dark:border-gray-700 rounded-r-xl text-[13px] lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm bg-gray-50/50 dark:bg-gray-900/60 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-900 font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center py-3 lg:py-3.5 px-4 mt-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] text-[13px] lg:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 group tracking-wide uppercase"
                    >
                      Send OTP
                      <Smartphone className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </form>
              ) : (
                <form className="space-y-6 lg:space-y-8" onSubmit={handleVerifyOTP}>
                  <div className="flex justify-between items-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-10 h-12 lg:w-12 lg:h-14 text-center text-xl font-bold border border-gray-100 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm bg-gray-50/50 dark:bg-gray-900/60 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-900"
                        required
                      />
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-3 lg:gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="text-[11px] lg:text-xs font-medium text-gray-500 dark:text-gray-400">
                      Didn't receive the code?{' '}
                      {canResend ? (
                        <button type="button" onClick={handleResendOTP} className="font-bold text-orange-500 hover:text-orange-600 transition-colors">
                          Resend OTP
                        </button>
                      ) : (
                        <span className="font-bold text-gray-400 dark:text-gray-500">
                          Resend in 00:{timer.toString().padStart(2, '0')}s
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-center gap-2 w-full mt-1 border-t border-gray-100 dark:border-gray-800 pt-3">
                       <button type="button" onClick={() => setStep(1)} className="text-[11px] lg:text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                         Change Mobile Number
                       </button>
                       <button type="button" onClick={() => {
                          setMaskedContact('l***@g***.com');
                          setTimer(30);
                          setCanResend(false);
                          setOtp(['', '', '', '', '', '']);
                          toast.success('OTP sent to your registered email!');
                          inputRefs.current[0]?.focus();
                       }} className="text-[11px] lg:text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                         Try other ways (Email)
                       </button>
                    </div>
                  </div>

                  <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center py-3 lg:py-3.5 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] text-[13px] lg:text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 group tracking-wide uppercase"
                    >
                      Verify & Login
                      <Key className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
              
              <div className="relative my-4 lg:my-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-[10px] lg:text-[11px]">
                  <span className="px-3 bg-white dark:bg-gray-800 text-gray-400 uppercase font-bold tracking-widest">Or</span>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  to="/login"
                  className="w-full flex justify-center items-center py-2.5 lg:py-3.5 px-4 border border-gray-100 dark:border-gray-600 rounded-xl shadow-sm text-[13px] lg:text-sm font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md active:translate-y-0 group hover:border-blue-300 dark:hover:border-blue-500/50"
                >
                  <Lock className="w-4 h-4 mr-2 group-hover:text-blue-500 transition-colors" />
                  Login with Password
                </Link>
              </div>

              <div className="mt-6 lg:mt-8 text-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <p className="text-[11px] lg:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Register now
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Features */}
          <div className="w-full max-w-5xl bg-white/50 dark:bg-[#0b1730]/50 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow p-3 md:p-4 grid grid-cols-2 md:grid-cols-4 gap-3 border border-white/30 dark:border-white/5 flex-shrink-0 animate-fade-in-up global-card" style={{ animationDelay: '0.6s' }}>
            {[
              { icon: Lock, title: "Bank-level Security", desc: "256-bit encryption keeps data safe", color: "blue" },
              { icon: Zap, title: "Instant Access", desc: "Secure login in seconds with OTP", color: "orange" },
              { icon: CreditCard, title: "Manage with Ease", desc: "All cards & rewards in one place", color: "blue" },
              { icon: Headphones, title: "24/7 Support", desc: "We're always here to help you", color: "orange" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group cursor-default">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 bg-${feature.color}-500 rounded-lg lg:rounded-xl flex items-center justify-center text-white shrink-0 shadow-md shadow-${feature.color}-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <feature.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-[10px] lg:text-xs mb-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{feature.title}</h4>
                  <p className="text-[9px] lg:text-[10px] text-gray-500 dark:text-gray-400 leading-tight font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginOTP;
