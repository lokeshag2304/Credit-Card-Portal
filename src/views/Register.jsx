import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Smartphone, Mail, FileText, Shield, Lock, Moon, Sun, CreditCard, Zap, Headphones } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
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
      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent animate-pulse tracking-tight">Creating your account...</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium tracking-wide">Setting up your secure profile</p>
    </div>
  </div>
);

const Register = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call and redirect
    setTimeout(() => {
      setIsLoading(false);
      console.log('Redirecting to dashboard or login...');
      navigate('/dashboard'); 
    }, 10); // Instant register
  };

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <FlowBackground />
      

        

      <div className="min-h-screen w-full flex flex-col items-center justify-center p-3 md:p-4 font-sans overflow-y-auto select-none relative py-6 md:py-4">
        {/* Main Container */}
        <div className="w-full max-w-5xl flex flex-col justify-center my-auto py-2">
        
          {/* Main Card */}
          <div className="bg-white/40 dark:bg-[#0b1730]/40 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl shadow-blue-950/10 w-full flex flex-col md:flex-row overflow-hidden relative flex-shrink-0 min-h-[500px] animate-fade-in-up global-card">
            
            {/* Left Side (Deep Royal Blue Area) - Hidden on Mobile */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#0b1f5e]/85 to-[#123faf]/85 dark:from-[#0b1f5e]/45 dark:to-[#123faf]/55 p-6 lg:p-8 flex flex-col relative overflow-hidden text-white group backdrop-blur-md">
              {/* Abstract glow effects / particles */}
              <div className="absolute top-[60%] left-1/4 w-2 h-2 bg-white rounded-full blur-[1px] animate-pulse"></div>
              <div className="absolute top-[50%] right-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[1px] animate-pulse delay-700"></div>
              <div className="absolute bottom-[30%] left-1/3 w-2.5 h-2.5 bg-blue-400 rounded-full blur-[2px] animate-float"></div>
              <div className="absolute bottom-[20%] right-1/3 w-2 h-2 bg-white rounded-full blur-[1px] animate-float-delayed"></div>
              
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[300px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse-glow"></div>

              {/* Logo */}
              <div className="z-10 flex items-center mb-6 lg:mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-28 lg:w-32">
                   <img 
                     src={logoLight?.src || logoLight} 
                     alt="Splendin Logo" 
                     className="w-full h-auto cursor-pointer transition-transform duration-500 hover:scale-110 hover:-rotate-2 contrast-[1.12] saturate-[1.18] brightness-[0.93] drop-shadow-[0_1px_2.5px_rgba(0,0,0,0.2)] origin-left" 
                   />
                </div>
                <img 
                  src={logoText?.src || logoText} 
                  alt="Splendin Text Logo" 
                  className="h-40 lg:h-23 w-auto object-contain brightness-0 invert" 
                  style={{ marginLeft: '10px' }}
                />
              </div>

              {/* Heading Text */}
              <div className="z-10 relative mb-4 lg:mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-[24px] lg:text-[28px] leading-tight font-bold mb-0.5 tracking-tight">
                  Create your
                </h2>
                <h2 className="text-[24px] lg:text-[28px] leading-tight font-extrabold text-[#ff981a] drop-shadow-md mb-2 lg:mb-3">
                  account
                </h2>
                <p className="text-blue-100 text-[13px] lg:text-sm max-w-[280px] leading-relaxed font-medium tracking-wide opacity-90">
                  Join Splendin and experience seamless credit card management
                </p>
              </div>

              {/* Steps Timeline */}
              <div className="flex flex-col gap-4 lg:gap-5 z-10 relative mt-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {/* Connecting Line */}
                <div className="absolute left-[15px] lg:left-[19px] top-4 bottom-8 w-[2px] bg-blue-500/40 z-0"></div>
                
                {[
                  { icon: User, title: "Personal Details", desc: "Tell us about yourself", active: true },
                  { icon: Smartphone, title: "Verify Mobile", desc: "Secure OTP verification", active: false },
                  { icon: Lock, title: "Set Password", desc: "Create a strong password", active: false }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 lg:gap-4 group/step hover:-translate-y-1 transition-transform cursor-default relative z-10">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 bg-[#1f69f8] shadow-[0_0_15px_rgba(31,105,248,0.5)] border-2 border-blue-400/20 group-hover/step:scale-110 transition-all duration-300">
                      <step.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white" fill={idx === 0 ? "currentColor" : "none"} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] lg:text-[15px] text-white tracking-wide">{step.title}</h4>
                      <p className="text-[11px] lg:text-[12px] text-blue-200 font-medium opacity-80 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Illustration Area */}
              <div className="mt-auto pt-6 lg:pt-8 flex justify-center relative z-10">
                {/* Glowing rings platform */}
                <div className="absolute bottom-2 w-40 lg:w-48 h-8 lg:h-12 border-[3px] border-blue-400/80 rounded-[100%] shadow-[0_0_30px_rgba(59,130,246,0.8),inset_0_0_20px_rgba(59,130,246,0.5)] animate-pulse-glow z-0"></div>
                <div className="absolute bottom-0 w-52 lg:w-60 h-12 lg:h-16 border border-blue-300/30 rounded-[100%] z-0"></div>
                {/* Orange swoosh ring */}
                <div className="absolute bottom-4 w-36 lg:w-44 h-10 lg:h-14 border-t-[3px] border-r-[3px] border-orange-400/70 rounded-[100%] transform -rotate-12 z-20 opacity-80 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]"></div>
                
                {/* Phone Illustration */}
                <div className="w-20 lg:w-24 h-36 lg:h-44 bg-gradient-to-b from-blue-300 to-blue-600 rounded-[24px] p-[2px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] relative z-10 transform -translate-y-2 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.8)] transition-all duration-500 animate-float">
                   <div className="w-full h-full rounded-[24px] overflow-hidden relative flex items-center justify-center border-4 border-[#0f172a] bg-gradient-to-b from-[#2563eb] to-[#1e3a8a]">
                      {/* Notch */}
                      <div className="absolute top-0 w-10 h-3 bg-[#0f172a] rounded-b-xl z-20"></div>
                      
                      {/* Shield inside phone */}
                      <div className="w-14 h-16 lg:w-16 lg:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center relative shadow-2xl hover:scale-110 transition-all duration-500 z-10 border border-blue-300/30">
                         <Shield className="w-10 h-10 lg:w-12 lg:h-12 text-white fill-blue-500 drop-shadow-md" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                               <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                         </div>
                      </div>
                      
                      {/* Screen reflection */}
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent transform -skew-y-12"></div>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Side (Form Area) - Full width on Mobile */}
            <div className="w-full md:w-1/2 p-6 lg:p-8 flex flex-col justify-center relative bg-white/70 dark:bg-[#0b1730]/75 backdrop-blur-md border-t md:border-t-0 md:border-l border-gray-100/30 dark:border-gray-700/30">
              <button 
                onClick={toggleTheme}
                className="absolute top-4 right-4 lg:top-5 lg:right-5 flex items-center gap-1.5 text-[11px] lg:text-xs text-gray-500 dark:text-gray-300 font-semibold bg-gray-50/80 dark:bg-gray-700/80 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all hover:scale-100 active:scale-95 shadow-sm hover:shadow border border-gray-100 dark:border-gray-600 z-10"
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
                <h2 className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1 mt-1 tracking-tight py-1 pr-2 inline-block">Register</h2>
                <p className="text-gray-500 dark:text-gray-400 text-[11px] lg:text-sm mb-4 lg:mb-5 font-medium tracking-wide">Create your account in just a few simple steps</p>
              </div>

              <form className="space-y-5" onSubmit={handleRegister}>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <label className="block text-[11px] lg:text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 lg:mb-2 transition-colors uppercase tracking-wide">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="block w-full pl-9 lg:pl-10 pr-3 py-2 lg:py-2.5 border border-gray-100 dark:border-gray-600 rounded-xl text-[13px] lg:text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm bg-white dark:bg-gray-700/50 dark:text-white hover:border-gray-300 dark:hover:border-gray-500 hover:bg-white dark:hover:bg-gray-700 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <label className="block text-[11px] lg:text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 lg:mb-2 uppercase tracking-wide">Mobile Number</label>
                    <div className="flex group">
                      <div className="relative border border-gray-100 dark:border-gray-700 border-r-0 rounded-l-xl bg-white dark:bg-gray-900/60 px-2 flex items-center shadow-sm group-hover:bg-gray-50 dark:group-hover:bg-gray-800 transition-colors">
                        <select className="appearance-none bg-transparent outline-none text-[13px] lg:text-sm text-gray-700 dark:text-gray-300 font-medium cursor-pointer w-[68px] pl-1 pr-4 py-2 lg:py-2.5 z-10">
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
                      placeholder="Enter mobile number"
                      className="block w-full px-3 py-2 lg:py-2.5 border border-gray-100 dark:border-gray-700 rounded-r-xl text-[13px] lg:text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm bg-white dark:bg-gray-900/60 dark:text-white hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-900 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <label className="block text-[11px] lg:text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 lg:mb-2 uppercase tracking-wide">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="block w-full pl-9 lg:pl-10 pr-3 py-2 lg:py-2.5 border border-gray-100 dark:border-gray-600 rounded-xl text-[13px] lg:text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm bg-white dark:bg-gray-700/50 dark:text-white hover:border-gray-300 dark:hover:border-gray-500 hover:bg-white dark:hover:bg-gray-700 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <label className="block text-[11px] lg:text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 lg:mb-2 uppercase tracking-wide">PAN Number (Optional)</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter PAN number"
                      className="block w-full pl-9 lg:pl-10 pr-3 py-2 lg:py-2.5 border border-gray-100 dark:border-gray-600 rounded-xl text-[13px] lg:text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm bg-white dark:bg-gray-700/50 dark:text-white hover:border-gray-300 dark:hover:border-gray-500 hover:bg-white dark:hover:bg-gray-700 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-start mt-2 lg:mt-3 pt-1 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-orange-500 focus:ring-orange-500 border-gray-300 dark:border-gray-600 rounded cursor-pointer mt-0.5 bg-white dark:bg-gray-700 transition-colors hover:border-orange-400"
                      required
                    />
                  </div>
                  <div className="ml-2 text-[11px] lg:text-xs">
                    <label htmlFor="terms" className="text-gray-600 dark:text-gray-400 font-medium">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 dark:text-blue-400 font-bold hover:underline hover:text-orange-500 transition-colors">Terms & Conditions</a>
                      {' '}and{' '}
                      <a href="#" className="text-blue-600 dark:text-blue-400 font-bold hover:underline hover:text-orange-500 transition-colors">Privacy Policy</a>
                    </label>
                  </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-2.5 lg:py-3 px-4 mt-1 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] text-[13px] lg:text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 group uppercase tracking-wide"
                  >
                    Register
                    <svg className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>

              <div className="mt-4 lg:mt-5 text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <p className="text-[11px] lg:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Login now
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Features */}
          <div className="w-full max-w-5xl bg-white/50 dark:bg-[#0b1730]/50 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-shadow p-3 md:p-4 grid grid-cols-2 md:grid-cols-4 gap-3 border border-white/30 dark:border-white/5 flex-shrink-0 animate-fade-in-up mt-4 global-card" style={{ animationDelay: '0.6s' }}>
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

export default Register;
