import React, { useState } from 'react';
import { Tag, Plane, Coffee, ShoppingCart, Percent, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Offers = () => {
  const [claimingId, setClaimingId] = useState(null);

  const handleClaim = (id) => {
    setClaimingId(id);
    setTimeout(() => {
      setClaimingId(null);
      toast.success('Offer claimed successfully! Promo code sent to email.');
    }, 1500);
  };

  const offers = [
    { id: 1, title: "10X Rewards on Flights", desc: "Book flights on MakeMyTrip and earn 10X reward points.", icon: Plane, color: "text-blue-500", bg: "bg-blue-100", border: "border-blue-200" },
    { id: 2, title: "20% Off on Dining", desc: "Get flat 20% off at premium restaurants across India.", icon: Coffee, color: "text-orange-500", bg: "bg-orange-100", border: "border-orange-200" },
    { id: 3, title: "₹1,000 Cashback", desc: "Spend ₹10,000 on Amazon and get ₹1,000 cashback instantly.", icon: ShoppingCart, color: "text-green-500", bg: "bg-green-100", border: "border-green-200" },
    { id: 4, title: "No Cost EMI", desc: "Convert electronics purchases above ₹15,000 to No Cost EMI.", icon: Percent, color: "text-purple-500", bg: "bg-purple-100", border: "border-purple-200" }
  ];

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 mb-2.5 uppercase tracking-widest animate-fade-in-up">
            <a href="/dashboard" className="hover:text-blue-500 dark:hover:text-[#00E5FF] cursor-pointer transition-colors">Dashboard</a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white flex items-center gap-1.5">Exclusive Offers</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-1 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shadow-sm border border-teal-200">
               <Tag className="w-5 h-5"/>
            </div>
            Exclusive Offers
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Claim special discounts and rewards tailored just for you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className={`bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border-2 transition-all hover:shadow-md flex flex-col justify-between h-full ${offer.border} dark:border-gray-700 global-card`}>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${offer.bg} ${offer.color} dark:bg-gray-700`}>
                  <offer.icon className="w-6 h-6" />
                </div>
                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Limited Time</span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{offer.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{offer.desc}</p>
            </div>
            <button 
              onClick={() => handleClaim(offer.id)}
              disabled={claimingId === offer.id}
              className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
            >
              {claimingId === offer.id ? <Loader2 className="w-4 h-4 animate-spin"/> : null}
              {claimingId === offer.id ? 'Claiming...' : 'Claim Offer'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Offers;
