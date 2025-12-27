
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { DeviceStatus, Device } from '../types';
import { X, Save } from 'lucide-react';

interface DeviceFormProps {
  onClose: () => void;
  onSubmit: (device: Partial<Device>) => void;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    category: 'smartphone',
    purchaseYear: new Date().getFullYear(),
    status: DeviceStatus.WORKING,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Register Device</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Start your circular journey</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Brand</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Apple, Samsung"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-700"
                value={formData.brand}
                onChange={e => setFormData({...formData, brand: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Model</label>
              <input 
                required
                type="text" 
                placeholder="e.g. iPhone 12"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-700"
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat.id})}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    formData.category === cat.id 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600' 
                      : 'bg-white border-slate-100 text-slate-400 grayscale'
                  }`}
                >
                  <div className="scale-75">{cat.icon}</div>
                  <span className="text-[10px] font-bold truncate w-full text-center">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Purchase Year</label>
              <select 
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-700 appearance-none"
                value={formData.purchaseYear}
                onChange={e => setFormData({...formData, purchaseYear: parseInt(e.target.value)})}
              >
                {Array.from({length: 15}, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current State</label>
              <select 
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-700 appearance-none"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as DeviceStatus})}
              >
                {Object.values(DeviceStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all transform active:scale-[0.98]"
          >
            <Save size={20} />
            Register Device
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeviceForm;
