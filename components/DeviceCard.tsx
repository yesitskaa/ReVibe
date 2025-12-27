
import React from 'react';
import { Device, DeviceStatus, RecommendationType } from '../types';
import { Smartphone, Laptop, Tablet, Tv, Speaker, Watch, Camera, ChevronRight, Info, AlertTriangle, CheckCircle, RefreshCcw } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onAnalyze: (id: string) => void;
  isLoading: boolean;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onAnalyze, isLoading }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'smartphone': return <Smartphone className="text-emerald-500" />;
      case 'laptop': return <Laptop className="text-blue-500" />;
      case 'tablet': return <Tablet className="text-indigo-500" />;
      case 'tv': return <Tv className="text-rose-500" />;
      case 'audio': return <Speaker className="text-amber-500" />;
      case 'wearable': return <Watch className="text-purple-500" />;
      case 'camera': return <Camera className="text-cyan-500" />;
      default: return <Smartphone className="text-slate-500" />;
    }
  };

  const getStatusColor = (status: DeviceStatus) => {
    switch (status) {
      case DeviceStatus.WORKING: return 'bg-emerald-100 text-emerald-700';
      case DeviceStatus.MINOR_ISSUES: return 'bg-amber-100 text-amber-700';
      case DeviceStatus.MAJOR_DAMAGE: return 'bg-orange-100 text-orange-700';
      case DeviceStatus.DEAD: return 'bg-rose-100 text-rose-700';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner">
            {getIcon(device.category)}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg leading-tight">{device.brand} {device.model}</h3>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mt-1">Purchased {device.purchaseYear}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(device.status)}`}>
          {device.status}
        </span>
      </div>

      {device.analysis ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-medium">Eco Score</span>
              <span className="text-2xl font-black text-emerald-600">{device.analysis.sustainabilityScore}/100</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium">Verdict</span>
              <div className="flex items-center gap-1.5 justify-end text-emerald-700 font-bold uppercase text-xs">
                {device.analysis.recommendation === RecommendationType.REPAIR && <CheckCircle size={14} />}
                {device.analysis.recommendation === RecommendationType.RESELL && <RefreshCcw size={14} />}
                {device.analysis.recommendation === RecommendationType.RECYCLE && <Recycle size={14} />}
                {device.analysis.recommendation}
              </div>
            </div>
          </div>
          
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-1000" 
              style={{ width: `${device.analysis.sustainabilityScore}%` }}
            ></div>
          </div>

          <button 
            onClick={() => onAnalyze(device.id)}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-2xl font-bold text-sm hover:bg-slate-700 transition-colors"
          >
            View Full Report
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div className="py-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <Info size={24} />
          </div>
          <p className="text-sm text-slate-500 mb-6 max-w-[200px]">ReVibe hasn't analyzed this device lifecycle yet.</p>
          <button 
            onClick={() => onAnalyze(device.id)}
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Consulting AI...' : 'Analyze Lifecycle'}
          </button>
        </div>
      )}
    </div>
  );
};

const Recycle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <path d="M11 21a5 5 0 0 0 10-10h-2" />
    <path d="M21 11a5 5 0 0 0-10 0" />
    <path d="M13 11a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
    <path d="M3 11a5 5 0 0 0 10 10" />
  </svg>
);

export default DeviceCard;
