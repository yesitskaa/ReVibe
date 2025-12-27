
import React from 'react';
import { Device, RecommendationType } from '../types';
import { ArrowLeft, CheckCircle2, AlertTriangle, Hammer, RefreshCw, Trash2, MapPin, ExternalLink, Sparkles, Info } from 'lucide-react';

interface AnalysisViewProps {
  device: Device;
  onBack: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ device, onBack }) => {
  const analysis = device.analysis!;

  const getRecommendationIcon = () => {
    switch (analysis.recommendation) {
      case RecommendationType.REPAIR: return <Hammer className="text-blue-500" />;
      case RecommendationType.RESELL: return <RefreshCw className="text-amber-500" />;
      case RecommendationType.RECYCLE: return <Trash2 className="text-rose-500" />;
    }
  };

  const getRecColor = () => {
    switch (analysis.recommendation) {
      case RecommendationType.REPAIR: return 'bg-blue-50 text-blue-700 border-blue-100';
      case RecommendationType.RESELL: return 'bg-amber-50 text-amber-700 border-amber-100';
      case RecommendationType.RECYCLE: return 'bg-rose-50 text-rose-700 border-rose-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold"
      >
        <ArrowLeft size={20} />
        Back to Inventory
      </button>

      {/* Hero Header */}
      <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-8 border-slate-50 flex items-center justify-center text-5xl font-black text-emerald-600 relative z-10">
              {analysis.sustainabilityScore}
              <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-t-transparent animate-spin duration-[3000ms]"></div>
            </div>
            <div className="mt-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-center">
              Eco Score
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{device.brand} {device.model}</h2>
              <p className="text-slate-500 font-medium">Lifecycle Stage: <span className="text-slate-800">{analysis.lifecycleStage}</span></p>
            </div>
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border ${getRecColor()} font-bold`}>
              {getRecommendationIcon()}
              Action Recommended: {analysis.recommendation}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Component Breakdown Cards */}
        {[
          { title: 'Repairable Modules', items: analysis.breakdown.repairable, icon: <Hammer className="text-blue-500" size={18} />, bg: 'bg-blue-50/50' },
          { title: 'Recyclable Parts', items: analysis.breakdown.recyclable, icon: <CheckCircle2 className="text-emerald-500" size={18} />, bg: 'bg-emerald-50/50' },
          { title: 'Hazardous Materials', items: analysis.breakdown.hazardous, icon: <AlertTriangle className="text-rose-500" size={18} />, bg: 'bg-rose-50/50' },
        ].map((section, idx) => (
          <div key={idx} className={`${section.bg} rounded-[32px] p-6 border border-white shadow-sm`}>
            <div className="flex items-center gap-2 mb-4">
              {section.icon}
              <h3 className="font-bold text-slate-800">{section.title}</h3>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* India Specific Next Steps */}
      <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 opacity-10">
          <MapPin size={120} />
        </div>
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Sparkles size={24} />
            </div>
            <h3 className="text-2xl font-bold">Your Next Steps in India</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analysis.indiaSpecificSteps.map((step, i) => (
              <div key={i} className="bg-white/10 hover:bg-white/15 transition-colors p-6 rounded-3xl flex items-start gap-4 border border-white/5">
                <div className="bg-white/10 p-2 rounded-xl text-emerald-400 font-bold shrink-0">{i + 1}</div>
                <div>
                  <p className="font-medium text-slate-200">{step}</p>
                  <button className="mt-3 flex items-center gap-1.5 text-emerald-400 text-xs font-bold hover:underline">
                    Locate Near Me <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Educational Insight */}
      <div className="bg-amber-50 rounded-[32px] p-8 border border-amber-100 flex gap-6 items-start">
        <div className="bg-amber-100 p-3 rounded-2xl text-amber-600 shrink-0">
          <Info size={24} />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 mb-2">ReVibe Insight</h4>
          <p className="text-amber-800 leading-relaxed italic">"{analysis.educationalInsight}"</p>
          <p className="mt-4 text-[10px] text-amber-700 font-bold uppercase tracking-widest">In line with India E-Waste Rules 2022</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
