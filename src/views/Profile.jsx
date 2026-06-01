import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, Clock, ShieldCheck, Edit3, Camera, FileText,
  User, Calendar, Users, CreditCard, Briefcase, IndianRupee, Heart,
  Phone, Mail, MapPin, Map, Shield, Smartphone, Laptop,
  Activity, Monitor, ShieldAlert, Sliders, Check, Bell, 
  AlertCircle, TrendingUp, Sparkles, X, Save
} from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const fileInputRef = useRef(null);

  // Live user profile state loaded dynamically from localStorage or neobank defaults
  const [profileData, setProfileData] = useState({
    fullName: localStorage.getItem('splendin_username') || "Rahul Sharma",
    aadhaar: "XXXX XXXX 9876",
    dob: "1990-05-14",
    occupation: "Senior Manager",
    gender: "Male",
    income: "₹24,00,000",
    pan: "ABZPS1234C",
    maritalStatus: "Married",
    phone: "+91 98765 43210",
    altPhone: "+91 91234 56789",
    email: "rahul.sharma@splendin.com",
    addressLine1: "45, Park Avenue, Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400058"
  });

  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('splendin_user_photo') || "https://i.pravatar.cc/300?img=11");
  const [profileCompletion, setProfileCompletion] = useState(85);
  const [bankingPrefsCompleted, setBankingPrefsCompleted] = useState(false);

  // Edit Modes State
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Temporary Edit Buffers
  const [personalBuffer, setPersonalBuffer] = useState({ ...profileData });
  const [contactBuffer, setContactBuffer] = useState({ ...profileData });
  const [profileBuffer, setProfileBuffer] = useState({ ...profileData });

  // Preferences toggles
  const [marketingOpt, setMarketingOpt] = useState(true);
  const [autoPay, setAutoPay] = useState(true);
  const [statementDelivery, setStatementDelivery] = useState("Online");
  const [language, setLanguage] = useState("English");

  // Loading States
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);

  // Sync profile data dynamically if updated in another tab/component
  useEffect(() => {
    const handleProfileUpdate = () => {
      const storedName = localStorage.getItem('splendin_username');
      const storedPhoto = localStorage.getItem('splendin_user_photo');
      if (storedName) {
        setProfileData(prev => ({ ...prev, fullName: storedName }));
      }
      if (storedPhoto) {
        setAvatarUrl(storedPhoto);
      }
    };
    window.addEventListener('profile-updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);
    return () => {
      window.removeEventListener('profile-updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  // Handle Photo Update - trigger computer file picker
  const handlePhotoUpdate = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file choice from computer and scale/compress it to base64 for persistent localStorage
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUpdatingPhoto(true);
    const tid = toast.loading("Processing and updating your profile photo...");

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to resize image to 300x300 for premium performance & localstorage storage
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 DataURL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        setTimeout(() => {
          setAvatarUrl(dataUrl);
          localStorage.setItem('splendin_user_photo', dataUrl);
          window.dispatchEvent(new Event('profile-updated'));
          toast.dismiss(tid);
          toast.success("Profile photo updated successfully!");
          setUpdatingPhoto(false);
          // Boost completion if it wasn't full
          if (profileCompletion < 90) {
            setProfileCompletion(90);
          }
        }, 1000);
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      toast.dismiss(tid);
      toast.error("Failed to read the file.");
      setUpdatingPhoto(false);
    };
    reader.readAsDataURL(file);
  };

  // Save Handlers
  const savePersonalDetails = (e) => {
    e.preventDefault();
    setSavingPersonal(true);
    const tid = toast.loading("Saving personal details securely...");
    
    setTimeout(() => {
      const newName = personalBuffer.fullName;
      setProfileData(prev => ({
        ...prev,
        fullName: newName,
        dob: personalBuffer.dob,
        occupation: personalBuffer.occupation,
        gender: personalBuffer.gender,
        income: personalBuffer.income,
        pan: personalBuffer.pan,
        maritalStatus: personalBuffer.maritalStatus
      }));
      // Set to localStorage and dispatch event
      localStorage.setItem('splendin_username', newName);
      window.dispatchEvent(new Event('profile-updated'));
      
      toast.dismiss(tid);
      toast.success("Personal details updated successfully!");
      setIsEditingPersonal(false);
      setSavingPersonal(false);
    }, 1200);
  };

  const saveContactInfo = (e) => {
    e.preventDefault();
    setSavingContact(true);
    const tid = toast.loading("Saving contact details securely...");
    
    setTimeout(() => {
      setProfileData(prev => ({
        ...prev,
        phone: contactBuffer.phone,
        altPhone: contactBuffer.altPhone,
        email: contactBuffer.email,
        addressLine1: contactBuffer.addressLine1,
        city: contactBuffer.city,
        state: contactBuffer.state,
        zipCode: contactBuffer.zipCode
      }));
      toast.dismiss(tid);
      toast.success("Contact information updated successfully!");
      setIsEditingContact(false);
      setSavingContact(false);
    }, 1200);
  };

  const saveProfileHeader = (e) => {
    e.preventDefault();
    setSavingProfile(true);
    const tid = toast.loading("Updating profile details...");
    
    setTimeout(() => {
      const newName = profileBuffer.fullName;
      setProfileData(prev => ({
        ...prev,
        fullName: newName
      }));
      // Set to localStorage and dispatch event
      localStorage.setItem('splendin_username', newName);
      window.dispatchEvent(new Event('profile-updated'));

      toast.dismiss(tid);
      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
      setSavingProfile(false);
    }, 1000);
  };

  // Preferences change handler with immediate toast feedback
  const handlePrefChange = (type, value) => {
    if (type === 'marketing') {
      setMarketingOpt(value);
      toast.success(`Marketing Preferences set to: ${value ? 'Subscribed' : 'Unsubscribed'}`);
    } else if (type === 'autopay') {
      setAutoPay(value);
      toast.success(`AutoPay set to: ${value ? 'Enabled' : 'Disabled'}`);
    } else if (type === 'statement') {
      setStatementDelivery(value);
      toast.success(`Statement Delivery set to: ${value}`);
      if (!bankingPrefsCompleted) {
        setBankingPrefsCompleted(true);
        setProfileCompletion(100);
      }
    } else if (type === 'language') {
      setLanguage(value);
      toast.success(`System Language updated to: ${value}`);
    }
  };

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up font-sans text-gray-900 dark:text-gray-100 max-w-[1600px] mx-auto min-h-screen flex flex-col">
      
      {/* Top Breadcrumb & Header Nav */}
      <div className="flex justify-between items-center mb-6">
         <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">My Profile</span>
          </div>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-1">My Profile</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage your personal details, security and account preferences</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs font-bold">
           <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-xl border border-green-100 dark:border-green-500/20">
             <ShieldCheck className="w-4 h-4 text-green-500 dark:text-green-400" /> Verified Account
           </div>
           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
             <Clock className="w-4 h-4 text-blue-500 dark:text-[#00E5FF]" /> Last login: Today, 10:24 AM
           </div>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-[#00E5FF] animate-pulse"></span>
             <span className="text-gray-600 dark:text-gray-350">Status: <span className="bg-green-100 text-green-700 dark:bg-[#00E5FF]/10 dark:text-[#00E5FF] px-2.5 py-0.5 rounded-xl ml-1 border border-green-200/50 dark:border-[#00E5FF]/20">Active</span></span>
           </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Main Content Area (Left 71%) */}
        <div className="xl:w-[71%] space-y-6">
          
          {/* Hero Profile Card */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-white/10 relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8 group global-card">
            {/* Background subtle gradient */}
            <div className="absolute top-0 right-0 w-[50%] h-[150%] bg-gradient-to-bl from-blue-50/50 to-transparent dark:from-[#00E5FF]/5 pointer-events-none -z-0"></div>
            
            <div className="relative z-10 shrink-0 select-none">
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileChange} 
                 accept="image/*" 
                 className="hidden" 
               />
               <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-blue-100/30 relative group/avatar">
                 {updatingPhoto ? (
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-10">
                     <Clock className="w-8 h-8 text-white animate-spin" />
                   </div>
                 ) : (
                   <div 
                     onClick={handlePhotoUpdate}
                     className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center cursor-pointer transition-opacity z-10 duration-300"
                   >
                     <p className="text-[10px] text-white font-extrabold uppercase tracking-wider text-center px-1">Upload New</p>
                   </div>
                 )}
                 <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-500" />
               </div>
               <button 
                 onClick={handlePhotoUpdate}
                 className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-md transition-transform hover:scale-110 active:scale-95 duration-200"
               >
                 <Camera className="w-4 h-4" />
               </button>
            </div>

            <div className="relative z-10 flex-1 w-full text-center md:text-left flex flex-col h-full">
               <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mb-4">
                 <div>
                   <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                     {isEditingProfile ? (
                       <input 
                         type="text"
                         value={profileBuffer.fullName}
                         onChange={(e) => setProfileBuffer({ ...profileBuffer, fullName: e.target.value })}
                         className="text-lg font-bold bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-xl px-3 py-1 outline-none text-gray-900 dark:text-white"
                         autoFocus
                       />
                     ) : (
                       <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">{profileData.fullName}</h3>
                     )}
                     <CheckCircle2 className="w-5 h-5 text-blue-500 fill-current shrink-0" />
                   </div>
                   <div className="flex items-center justify-center md:justify-start gap-1 text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-[#00E5FF] px-2.5 py-0.5 rounded-full w-max mx-auto md:mx-0 mb-3 border border-blue-100 dark:border-blue-900/40">
                     <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" /> PLATINUM MEMBER
                   </div>
                   <p className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">Customer since May 2021 <span className="mx-2">•</span> ID: CMAX12345678</p>
                 </div>
                 
                 {/* Shield Badge */}
                 <div className="hidden lg:flex w-16 h-16 bg-blue-50 dark:bg-[#00E5FF]/5 rounded-2xl items-center justify-center border border-blue-100 dark:border-[#00E5FF]/10 shrink-0 shadow-sm relative hover:scale-100 transition-transform">
                    <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-lg"></div>
                    <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-[#00E5FF]" />
                 </div>
               </div>

               <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                 {isEditingProfile ? (
                   <>
                     <button 
                       onClick={saveProfileHeader}
                       className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                     >
                       <Save className="w-3.5 h-3.5"/> Save Name
                     </button>
                     <button 
                       onClick={() => setIsEditingProfile(false)}
                       className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2 px-5 rounded-xl text-xs transition-all active:scale-95"
                     >
                       Cancel
                     </button>
                   </>
                 ) : (
                   <button 
                     onClick={() => {
                       setProfileBuffer({ ...profileData });
                       setIsEditingProfile(true);
                     }} 
                     className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl text-xs transition-all shadow-sm active:scale-95"
                   >
                     Edit Name
                   </button>
                 )}
                 <button onClick={handlePhotoUpdate} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 font-bold py-2 px-5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 active:scale-95 global-card">
                   <Camera className="w-3.5 h-3.5 text-orange-600" /> Update Photo
                 </button>
                 <button onClick={() => toast.success("KYC documents are in active secure vault!")} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 font-bold py-2 px-5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 active:scale-95 global-card">
                   <FileText className="w-3.5 h-3.5 text-teal-600" /> View KYC
                 </button>
               </div>
               
               <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 w-full md:w-2/3">
                 <div className="flex justify-between text-xs font-bold mb-2">
                   <span className="text-gray-700 dark:text-gray-350">Profile Completion</span>
                   <span className="text-blue-600 dark:text-[#00E5FF]">{profileCompletion}%</span>
                 </div>
                 <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-1">
                   <div className="h-full bg-blue-700 dark:bg-gradient-to-r dark:from-blue-500 dark:to-[#00E5FF] rounded-full transition-all duration-500" style={{ width: `${profileCompletion}%` }}></div>
                 </div>
                 <div className="flex justify-between items-center">
                   <p className="text-[10px] text-gray-600 dark:text-gray-400">Complete your preferences to reach 100%</p>
                   <button className="text-[10px] font-bold text-blue-600 dark:text-[#00E5FF] hover:underline">View Details</button>
                 </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Personal Details Panel */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-white/10 relative hover:scale-[1.002] transition-transform duration-300 global-card">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-[15px] flex items-center gap-2">Personal Details <User className="w-4 h-4 text-blue-500"/></h3>
                 {isEditingPersonal ? (
                   <div className="flex gap-2">
                     <button 
                       onClick={savePersonalDetails}
                       className="flex items-center gap-1 text-[11px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                     >
                       Save
                     </button>
                     <button 
                       onClick={() => setIsEditingPersonal(false)}
                       className="flex items-center gap-1 text-[11px] font-bold text-gray-600 dark:text-gray-350 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                     >
                       Cancel
                     </button>
                   </div>
                 ) : (
                   <button 
                     onClick={() => {
                       setPersonalBuffer({ ...profileData });
                       setIsEditingPersonal(true);
                     }}
                     className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-[#00E5FF] px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100/50 transition-colors"
                   >
                     <Edit3 className="w-3.5 h-3.5" /> Edit
                   </button>
                 )}
               </div>
               
               <form onSubmit={savePersonalDetails} className="grid grid-cols-2 gap-y-5 gap-x-4">
                 {[
                   { id: "fullName", icon: User, label: "Full Name", editable: true },
                   { id: "aadhaar", icon: CreditCard, label: "Aadhaar Number", editable: false },
                   { id: "dob", icon: Calendar, label: "Date of Birth", type: "date", editable: true },
                   { id: "occupation", icon: Briefcase, label: "Occupation", editable: true },
                   { id: "gender", icon: Users, label: "Gender", type: "select", options: ["Male", "Female", "Other"], editable: true },
                   { id: "income", icon: IndianRupee, label: "Annual Income", editable: true },
                   { id: "pan", icon: FileText, label: "PAN Number", editable: false },
                   { id: "maritalStatus", icon: Heart, label: "Marital Status", type: "select", options: ["Single", "Married", "Divorced", "Widowed"], editable: true }
                 ].map((item) => (
                   <div key={item.id} className="flex gap-3 items-start group">
                     <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#0A0F1D]/55 flex items-center justify-center shrink-0 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF] group-hover:bg-blue-50 dark:group-hover:bg-[#00E5FF]/5 transition-colors border border-gray-100 dark:border-white/5 shadow-inner">
                       <item.icon className="w-3.5 h-3.5" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{item.label}</p>
                       
                       {isEditingPersonal && item.editable ? (
                         item.type === "select" ? (
                           <select
                             value={personalBuffer[item.id]}
                             onChange={(e) => setPersonalBuffer({ ...personalBuffer, [item.id]: e.target.value })}
                             className="w-full text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1 focus:border-blue-500 outline-none"
                           >
                             {item.options.map(o => <option key={o} value={o}>{o}</option>)}
                           </select>
                         ) : (
                           <input
                             type={item.type || "text"}
                             value={personalBuffer[item.id]}
                             onChange={(e) => setPersonalBuffer({ ...personalBuffer, [item.id]: e.target.value })}
                             className="w-full text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1 focus:border-blue-500 outline-none"
                           />
                         )
                       ) : (
                         <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{profileData[item.id]}</p>
                       )}
                     </div>
                   </div>
                 ))}
               </form>
            </div>

            {/* Contact Information Panel */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-white/10 relative hover:scale-[1.002] transition-transform duration-300 global-card">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-[15px] flex items-center gap-2">Contact Information <Mail className="w-4 h-4 text-blue-500"/></h3>
                 {isEditingContact ? (
                   <div className="flex gap-2">
                     <button 
                       onClick={saveContactInfo}
                       className="flex items-center gap-1 text-[11px] font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                     >
                       Save
                     </button>
                     <button 
                       onClick={() => setIsEditingContact(false)}
                       className="flex items-center gap-1 text-[11px] font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                     >
                       Cancel
                     </button>
                   </div>
                 ) : (
                   <button 
                     onClick={() => {
                       setContactBuffer({ ...profileData });
                       setIsEditingContact(true);
                     }}
                     className="flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-[#00E5FF] px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-100/50 transition-colors"
                   >
                     <Edit3 className="w-3.5 h-3.5" /> Edit
                   </button>
                 )}
               </div>
               
               <form onSubmit={saveContactInfo} className="space-y-4">
                 
                 {/* Mobile */}
                 <div className="flex gap-3 items-start group">
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#0A0F1D]/55 flex items-center justify-center shrink-0 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF] group-hover:bg-blue-50 dark:group-hover:bg-[#00E5FF]/5 transition-colors border border-gray-100 dark:border-white/5">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 flex justify-between items-center min-w-0">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Mobile Number</p>
                        {isEditingContact ? (
                          <input
                            type="text"
                            value={contactBuffer.phone}
                            onChange={(e) => setContactBuffer({ ...contactBuffer, phone: e.target.value })}
                            className="w-full text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1 outline-none focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{profileData.phone}</p>
                        )}
                      </div>
                      <span className="text-[9px] font-extrabold text-green-600 bg-green-50 dark:bg-green-950/20 dark:text-green-400 px-2 py-0.5 rounded-lg border border-green-200/40 shrink-0 whitespace-nowrap">Verified</span>
                    </div>
                 </div>

                 {/* Alt Mobile */}
                 <div className="flex gap-3 items-start group">
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#0A0F1D]/55 flex items-center justify-center shrink-0 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF] group-hover:bg-blue-50 dark:group-hover:bg-[#00E5FF]/5 transition-colors border border-gray-100 dark:border-white/5">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 flex justify-between items-center min-w-0">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Alternate Number</p>
                        {isEditingContact ? (
                          <input
                            type="text"
                            value={contactBuffer.altPhone}
                            onChange={(e) => setContactBuffer({ ...contactBuffer, altPhone: e.target.value })}
                            className="w-full text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1 outline-none focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{profileData.altPhone}</p>
                        )}
                      </div>
                      <span className="text-[9px] font-extrabold text-green-600 bg-green-50 dark:bg-green-950/20 dark:text-green-400 px-2 py-0.5 rounded-lg border border-green-200/40 shrink-0 whitespace-nowrap">Verified</span>
                    </div>
                 </div>

                 {/* Email */}
                 <div className="flex gap-3 items-start group">
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#0A0F1D]/55 flex items-center justify-center shrink-0 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF] group-hover:bg-blue-50 dark:group-hover:bg-[#00E5FF]/5 transition-colors border border-gray-100 dark:border-white/5">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 flex justify-between items-center min-w-0">
                      <div className="flex-1 min-w-0 pr-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Email Address</p>
                        {isEditingContact ? (
                          <input
                            type="email"
                            value={contactBuffer.email}
                            onChange={(e) => setContactBuffer({ ...contactBuffer, email: e.target.value })}
                            className="w-full text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1 outline-none focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{profileData.email}</p>
                        )}
                      </div>
                      <span className="text-[9px] font-extrabold text-green-600 bg-green-50 dark:bg-green-950/20 dark:text-green-400 px-2 py-0.5 rounded-lg border border-green-200/40 shrink-0 whitespace-nowrap">Verified</span>
                    </div>
                 </div>

                 <div className="w-full h-px bg-gray-100 dark:bg-white/5"></div>

                 {/* Address */}
                 <div className="flex gap-3 items-start group">
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#0A0F1D]/55 flex items-center justify-center shrink-0 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-[#00E5FF] group-hover:bg-blue-50 dark:group-hover:bg-[#00E5FF]/5 transition-colors border border-gray-100 dark:border-white/5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1 shrink-0">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Residential Address</p>
                      </div>
                      
                      {isEditingContact ? (
                        <div className="space-y-2 mt-1">
                          <input
                            type="text"
                            value={contactBuffer.addressLine1}
                            placeholder="Address Line 1"
                            onChange={(e) => setContactBuffer({ ...contactBuffer, addressLine1: e.target.value })}
                            className="w-full text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1.5 outline-none focus:border-blue-500"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <input
                              type="text"
                              value={contactBuffer.city}
                              placeholder="City"
                              onChange={(e) => setContactBuffer({ ...contactBuffer, city: e.target.value })}
                              className="text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1 outline-none focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={contactBuffer.state}
                              placeholder="State"
                              onChange={(e) => setContactBuffer({ ...contactBuffer, state: e.target.value })}
                              className="text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1 outline-none focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={contactBuffer.zipCode}
                              placeholder="ZIP"
                              onChange={(e) => setContactBuffer({ ...contactBuffer, zipCode: e.target.value })}
                              className="text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-white/10 rounded-lg p-1 outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs font-bold text-gray-900 dark:text-white mb-2 leading-relaxed">
                            {profileData.addressLine1}<br/>
                            {profileData.city}, {profileData.state} - {profileData.zipCode}
                          </p>
                          <div className="flex flex-wrap gap-2">
                             <span className="text-[9px] text-gray-600 bg-gray-50 dark:bg-[#0A0F1D]/55 dark:text-gray-400 px-2 py-1 rounded-lg border border-gray-100 dark:border-white/5">{profileData.city}</span>
                             <span className="text-[9px] text-gray-600 bg-gray-50 dark:bg-[#0A0F1D]/55 dark:text-gray-400 px-2 py-1 rounded-lg border border-gray-100 dark:border-white/5">{profileData.state}</span>
                             <span className="text-[9px] text-gray-600 bg-gray-50 dark:bg-[#0A0F1D]/55 dark:text-gray-400 px-2 py-1 rounded-lg border border-gray-100 dark:border-white/5">{profileData.zipCode}</span>
                          </div>
                        </>
                      )}
                    </div>
                 </div>

               </form>
            </div>

          </div>

          {/* Security & Login and Banking Preferences */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Security & Login Panel */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.002] transition-transform duration-300 global-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[15px] flex items-center gap-2">Security & Login <Shield className="w-4 h-4 text-blue-500"/></h3>
                <button 
                  onClick={() => toast.success("Opening Advanced Vault Controls...")}
                  className="text-[11px] font-bold text-blue-600 dark:text-[#00E5FF] hover:underline"
                >
                  Manage Security
                </button>
              </div>

              <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-800/40 rounded-2xl p-4 flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-800/50 flex items-center justify-center text-green-600 shrink-0 border border-green-200/20 shadow-inner">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 dark:text-gray-500 uppercase font-extrabold tracking-wider">Security Health Score</p>
                  <p className="text-sm font-extrabold text-green-700 dark:text-green-400">GOOD <span className="text-xs font-medium text-green-600/70 dark:text-green-500/80 ml-1">Account Secure</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                
                <div 
                  onClick={() => toast.success("Password reset link sent to email!")}
                  className="border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0F1D]/25 rounded-2xl p-3 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/15 hover:border-blue-200 dark:hover:border-[#00E5FF]/20 hover:scale-100 active:scale-95 transition-all duration-300 group"
                >
                  <ShieldAlert className="w-5 h-5 text-gray-400 mb-2 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF]" />
                  <p className="text-[9px] font-bold text-gray-900 dark:text-white mb-0.5 leading-none">Change Password</p>
                  <p className="text-[8px] text-gray-500 mt-1">Last changed<br/>30 days ago</p>
                </div>

                <div 
                  onClick={() => toast.success("Two-Factor Auth configurations are active!")}
                  className="border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0F1D]/25 rounded-2xl p-3 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/15 hover:border-blue-200 dark:hover:border-[#00E5FF]/20 hover:scale-100 active:scale-95 transition-all duration-300 group"
                >
                  <Smartphone className="w-5 h-5 text-gray-400 mb-2 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF]" />
                  <p className="text-[9px] font-bold text-gray-900 dark:text-white mb-0.5 leading-none">Two-Factor Auth</p>
                  <p className="text-[8px] text-green-500 dark:text-[#00E5FF] font-extrabold mt-1">ENABLED</p>
                </div>

                <div 
                  onClick={() => toast.success("Biometric details are matched with Mobile App!")}
                  className="border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0F1D]/25 rounded-2xl p-3 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/15 hover:border-blue-200 dark:hover:border-[#00E5FF]/20 hover:scale-100 active:scale-95 transition-all duration-300 group"
                >
                  <Activity className="w-5 h-5 text-gray-400 mb-2 group-hover:text-blue-500 dark:group-hover:text-[#00E5FF]" />
                  <p className="text-[9px] font-bold text-gray-900 dark:text-white mb-0.5 leading-none">Biometric Login</p>
                  <p className="text-[8px] text-green-500 dark:text-[#00E5FF] font-extrabold mt-1">ENABLED</p>
                </div>

                <div 
                  onClick={() => toast.success("Loading Active Session Monitor...")}
                  className="border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0F1D]/25 rounded-2xl p-3 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/15 hover:border-blue-200 dark:hover:border-[#00E5FF]/20 hover:scale-100 active:scale-95 transition-all duration-300 group"
                >
                  <Monitor className="w-5 h-5 text-gray-400 mb-2 group-hover:text-blue-600 dark:group-hover:text-[#00E5FF]" />
                  <p className="text-[9px] font-bold text-gray-900 dark:text-white mb-0.5 leading-none">Manage Devices</p>
                  <p className="text-[8px] text-gray-500 mt-1">3 Devices<br/>active</p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button 
                  onClick={() => toast.success("Opening secure logs...")}
                  className="flex items-center gap-2 border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0F1D]/20 hover:bg-gray-100 dark:hover:bg-[#0A0F1D]/60 rounded-xl p-3 text-[10px] font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                >
                  <Clock className="w-3.5 h-3.5 text-blue-500" /> 
                  <div className="text-left leading-tight"><span>Login Activity</span><br/><span className="text-[8px] text-gray-400 font-medium">Recent login logs</span></div>
                </button>
                <button 
                  onClick={() => toast.success("Active sessions are synchronized.")}
                  className="flex items-center gap-2 border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0F1D]/20 hover:bg-gray-100 dark:hover:bg-[#0A0F1D]/60 rounded-xl p-3 text-[10px] font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                >
                  <Monitor className="w-3.5 h-3.5 text-purple-500" /> 
                  <div className="text-left leading-tight"><span>Active Sessions</span><br/><span className="text-[8px] text-gray-400 font-medium">2 Active sessions</span></div>
                </button>
                <button 
                  onClick={() => toast.success("Opening Trusted Hardware Panel...")}
                  className="flex items-center gap-2 border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-[#0A0F1D]/20 hover:bg-gray-100 dark:hover:bg-[#0A0F1D]/60 rounded-xl p-3 text-[10px] font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> 
                  <div className="text-left leading-tight"><span>Trusted Devices</span><br/><span className="text-[8px] text-gray-400 font-medium">Manage hardware</span></div>
                </button>
              </div>

            </div>

            {/* Banking Preferences Panel */}
            <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-white/10 flex flex-col hover:scale-[1.002] transition-transform duration-300 global-card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-[15px] flex items-center gap-2">Banking Preferences <Sliders className="w-4 h-4 text-blue-500"/></h3>
                <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-[#00E5FF] px-2 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900/30">Live Sync</span>
              </div>
              
              <div className="space-y-4 flex-1">
                 
                 {/* Statement Delivery Selector */}
                 <div className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white">Statement Delivery</span>
                    </div>
                    <select
                      value={statementDelivery}
                      onChange={(e) => handlePrefChange('statement', e.target.value)}
                      className="text-xs font-bold text-gray-800 dark:text-gray-250 bg-gray-50 dark:bg-[#0A0F1D]/55 border border-gray-100 dark:border-white/5 rounded-xl px-2.5 py-1.5 outline-none cursor-pointer focus:border-blue-500"
                    >
                      <option value="Online">Online Statement (Email)</option>
                      <option value="Physical">Physical Statement (Post)</option>
                      <option value="Both">Both Delivery Modes</option>
                    </select>
                 </div>
                 <div className="w-full h-px bg-gray-100 dark:bg-white/5"></div>

                 {/* System Language Preference */}
                 <div className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white">Language Preference</span>
                    </div>
                    <select
                      value={language}
                      onChange={(e) => handlePrefChange('language', e.target.value)}
                      className="text-xs font-bold text-gray-800 dark:text-gray-250 bg-gray-50 dark:bg-[#0A0F1D]/55 border border-gray-100 dark:border-white/5 rounded-xl px-2.5 py-1.5 outline-none cursor-pointer focus:border-blue-500"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (Hinglish)</option>
                      <option value="Marathi">Marathi</option>
                    </select>
                 </div>
                 <div className="w-full h-px bg-gray-100 dark:bg-white/5"></div>

                 {/* Marketing Opt-In Custom Pill Switch */}
                 <div className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white">Promotional Emails</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">Emails & Offers</span>
                      <button 
                        onClick={() => handlePrefChange('marketing', !marketingOpt)}
                        className={`w-9 h-5 rounded-full relative transition-colors ${marketingOpt ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-teal-400 dark:to-emerald-500' : 'bg-gray-250 dark:bg-gray-800'}`}
                      >
                        <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${marketingOpt ? 'left-[18px]' : 'left-0.5'}`}/>
                      </button>
                    </div>
                 </div>
                 <div className="w-full h-px bg-gray-100 dark:bg-white/5"></div>

                 {/* AutoPay Custom Pill Switch */}
                 <div className="flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white">AutoPay Preferences</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium">Active (2 Cards)</span>
                      <button 
                        onClick={() => handlePrefChange('autopay', !autoPay)}
                        className={`w-9 h-5 rounded-full relative transition-colors ${autoPay ? 'bg-blue-600 dark:bg-gradient-to-r dark:from-teal-400 dark:to-emerald-500' : 'bg-gray-250 dark:bg-gray-800'}`}
                      >
                        <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${autoPay ? 'left-[18px]' : 'left-0.5'}`}/>
                      </button>
                    </div>
                 </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Sidebar Widgets (29%) */}
        <div className="xl:w-[29%] space-y-6">
          
          {/* Profile Completion Card */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.01] transition-transform duration-300 global-card">
            <h4 className="text-[14px] font-bold text-gray-900 dark:text-white mb-6">Profile Completion</h4>
            
            <div className="flex items-center justify-between mb-8">
               <div>
                 <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-none">{profileCompletion}%</h2>
                 <p className="text-[9px] font-black text-gray-400 dark:text-gray-600 uppercase mt-2 tracking-widest">Completed</p>
               </div>
               <div className="w-16 h-16 relative">
                 <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                   <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="12" />
                   <circle 
                     cx="50" cy="50" r="40" 
                     fill="transparent" 
                     stroke="#2563EB" 
                     strokeWidth="12" 
                     strokeDasharray="251.2" 
                     strokeDashoffset={(251.2 - (251.2 * profileCompletion) / 100)} 
                     className="transition-all duration-700 stroke-blue-700 dark:stroke-[#00E5FF]"
                   />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600 dark:text-[#00E5FF]" />
                 </div>
               </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 fill-current" /> Personal Details</span>
                <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 fill-current" /> Contact Information</span>
                <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 fill-current" /> KYC Verification</span>
                <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
              </div>
              
              <div className="flex items-center justify-between text-xs font-bold text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  {bankingPrefsCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 fill-current animate-pulse" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                  )}
                  Banking Preferences
                </span>
                {bankingPrefsCompleted ? (
                  <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                ) : (
                  <span className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
                )}
              </div>
            </div>

            {!bankingPrefsCompleted ? (
              <button 
                onClick={() => {
                  toast.success("Syncing Banking preferences!");
                  handlePrefChange('statement', 'Online');
                }}
                className="w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-blue-950/20 dark:text-[#00E5FF] dark:hover:bg-[#00E5FF] dark:hover:text-black font-extrabold py-3 rounded-xl transition-all text-xs border border-blue-100 dark:border-blue-900/40 hover:scale-[1.02] active:scale-95 shadow-sm"
              >
                Complete Preferences (reach 100%)
              </button>
            ) : (
              <div className="text-center text-xs font-bold text-emerald-600 dark:text-[#00E5FF] bg-emerald-50 dark:bg-[#00E5FF]/5 py-2.5 rounded-xl border border-emerald-100 dark:border-[#00E5FF]/10 animate-bounce">
                🎉 Profile is 100% Completed!
              </div>
            )}
          </div>

          {/* KYC Status Card */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 flex justify-between items-center hover:scale-[1.01] transition-transform duration-300 global-card">
            <div>
               <h4 className="text-[14px] font-bold text-gray-900 dark:text-white mb-2 leading-none">KYC Verification</h4>
               <div className="flex items-center gap-2 mb-1.5 mt-2">
                 <span className="bg-green-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">Verified</span>
                 <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">KYC Level: Full</span>
               </div>
               <p className="text-[9px] text-gray-400">Last updated: 12 May 2026</p>
            </div>
            <div className="w-12 h-12 bg-green-50 dark:bg-green-950/20 rounded-xl flex items-center justify-center border border-green-100 dark:border-green-900/30 shrink-0 shadow-inner">
               <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-455" />
            </div>
          </div>

          {/* Credit Score Snapshot Card */}
          <div className="bg-white/90 dark:bg-[#071426]/75 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 hover:scale-[1.01] transition-transform duration-300 global-card">
            <h4 className="text-[14px] font-bold text-gray-900 dark:text-white mb-6">Credit Score Snapshot</h4>
            
            <div className="relative w-48 h-24 mx-auto overflow-hidden mb-2">
               <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-sm">
                 <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#F3F4F6" strokeWidth="20" strokeLinecap="round"/>
                 <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="url(#scoreGradient)" strokeWidth="20" strokeDasharray="282" strokeDashoffset="50" strokeLinecap="round"/>
                 <defs>
                   <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#EF4444" />
                     <stop offset="50%" stopColor="#F59E0B" />
                     <stop offset="100%" stopColor="#10B981" />
                   </linearGradient>
                 </defs>
               </svg>
               <div className="absolute bottom-0 left-0 w-full text-center">
                 <h2 className="text-4.5xl font-black text-gray-900 dark:text-white leading-none">782</h2>
                 <p className="text-[11px] font-black text-green-600 dark:text-green-400 mt-1 uppercase tracking-wider">EXCELLENT</p>
               </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
               <p className="text-[9px] text-gray-400 font-medium">Updated 5 days ago</p>
               <button onClick={() => toast.success("Fetching advanced bureau details...")} className="text-[10px] font-bold text-blue-600 dark:text-[#00E5FF] hover:underline">View Details</button>
            </div>
          </div>

          {/* AI Suggestion Promo */}
          <div className="bg-gradient-to-br from-[#0B1F5E] to-[#123FAF] preserve-gradient rounded-3xl p-6 text-white relative overflow-hidden shadow-xl border border-blue-800/50 hover:scale-[1.01] transition-transform duration-300">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                 <h4 className="font-bold text-[13px]">AI Financial Suggestion</h4>
                 <span className="text-[8px] bg-blue-500/40 border border-blue-400/50 px-1.5 py-0.5 rounded font-bold tracking-widest animate-pulse">NEW</span>
              </div>
              <p className="text-[10px] text-blue-200 mb-5 leading-relaxed pr-6">You can save up to ₹18,000 annually by optimizing your credit card utilization.</p>
              <button 
                onClick={() => toast.success("Opening AI command engine...")}
                className="bg-blue-600 hover:bg-blue-500 border border-blue-400/30 font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-sm active:scale-95"
              >
                View Suggestions
              </button>
            </div>
            <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 pointer-events-none opacity-80">
              <TrendingUp className="w-16 h-16 text-blue-400/30 absolute bottom-4 right-4 drop-shadow-lg" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-gray-250 dark:border-white/5 flex flex-wrap justify-between gap-6 text-left pb-4">
        {[
          { icon: ShieldCheck, title: "Secure Profile", desc: "Your data is protected with 256-bit encryption", color: "text-green-600 bg-green-50 dark:bg-green-950/20 border-green-100/50" },
          { icon: User, title: "Verified Identity", desc: "Your identity is verified and secure", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20 border-blue-100/50" },
          { icon: Shield, title: "Encrypted Data", desc: "Bank-grade security for your information", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20 border-teal-100/50" },
          { icon: Clock, title: "24x7 Protection", desc: "Round-the-clock account monitoring", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/20 border-purple-100/50" }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 text-gray-500 dark:text-gray-400 flex-1 min-w-[200px] group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${item.color} dark:border-white/5 group-hover:scale-100 transition-all shadow-sm`}>
                <item.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-extrabold text-gray-900 dark:text-gray-300 mb-0.5">{item.title}</span>
              <span className="block text-[9px] leading-tight pr-2">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Profile;
