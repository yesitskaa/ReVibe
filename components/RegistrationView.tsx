
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface RegistrationViewProps {
  onRegister: (name: string, location: string) => void;
}

const RegistrationView: React.FC<RegistrationViewProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const INDIAN_CITIES = [
    'Bangalore', 'Mumbai', 'Delhi NCR', 'Chennai', 
    'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 
    'Jaipur', 'Lucknow'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && location) {
      onRegister(name, location);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-10 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-6 shadow-lg shadow-emerald-500/20">
            R
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Welcome to ReVibe</h1>
          <p className="text-slate-500 font-medium">Sign in to track your environmental impact</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="Enter your name"
              className="w-full px-6 py-4 rounded-2xl bg-slate-800 text-white placeholder-slate-500 border-none focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Primary Location</label>
            <select 
              required
              className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none appearance-none cursor-pointer"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>Select your city</option>
              {INDIAN_CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <p className="mt-3 text-[10px] text-slate-400 italic font-medium">Location is used to find nearby e-waste partners.</p>
          </div>

          <button 
            type="submit"
            disabled={!name || !location}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all transform active:scale-[0.98] disabled:opacity-50"
          >
            Get Started
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            By continuing, you agree to our <span className="text-emerald-500 cursor-pointer hover:underline">Eco-Terms</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationView;
