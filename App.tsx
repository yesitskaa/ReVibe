
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ImpactDashboard from './components/ImpactDashboard';
import DeviceCard from './components/DeviceCard';
import DeviceForm from './components/DeviceForm';
import AnalysisView from './components/AnalysisView';
import ChatInterface from './components/ChatInterface';
import RegistrationView from './components/RegistrationView';
import { Device, DeviceStatus, User } from './types';
import { MOCK_USER } from './constants';
import { Plus, Info, Scale } from 'lucide-react';
import { analyzeDevice } from './services/gemini';

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User>(MOCK_USER);
  const [devices, setDevices] = useState<Device[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [viewingAnalysis, setViewingAnalysis] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('revibe_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsRegistered(true);
    }

    const savedDevices = localStorage.getItem('revibe_devices');
    if (savedDevices) {
      setDevices(JSON.parse(savedDevices));
    } else {
      const initial: Device[] = [
        { id: '1', name: 'OnePlus 7 Pro', brand: 'OnePlus', model: '7 Pro', category: 'smartphone', purchaseYear: 2019, status: DeviceStatus.WORKING },
        { id: '2', name: 'Dell XPS 13', brand: 'Dell', model: 'XPS 13', category: 'laptop', purchaseYear: 2018, status: DeviceStatus.MAJOR_DAMAGE }
      ];
      setDevices(initial);
      localStorage.setItem('revibe_devices', JSON.stringify(initial));
    }
  }, []);

  const handleRegister = (name: string, location: string) => {
    const newUser: User = {
      ...MOCK_USER,
      name,
      id: Math.random().toString(36).substr(2, 9),
    };
    setUser(newUser);
    setIsRegistered(true);
    localStorage.setItem('revibe_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    localStorage.removeItem('revibe_user');
    setIsRegistered(false);
    setViewingAnalysis(null);
    setActiveTab('dashboard');
  };

  const handleAddDevice = (deviceData: Partial<Device>) => {
    const newDevice: Device = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${deviceData.brand || ''} ${deviceData.model || ''}`.trim() || 'New Device',
      brand: deviceData.brand || '',
      model: deviceData.model || '',
      category: deviceData.category || 'smartphone',
      purchaseYear: deviceData.purchaseYear || 2024,
      status: deviceData.status || DeviceStatus.WORKING,
    };
    const updated = [newDevice, ...devices];
    setDevices(updated);
    localStorage.setItem('revibe_devices', JSON.stringify(updated));
    setShowAddModal(false);
  };

  const handleAnalyze = async (id: string) => {
    const device = devices.find(d => d.id === id);
    if (!device) return;

    if (device.analysis) {
      setViewingAnalysis(id);
      return;
    }

    setAnalyzingId(id);
    try {
      const result = await analyzeDevice(device);
      const updatedDevices = devices.map(d => 
        d.id === id ? { ...d, analysis: result } : d
      );
      setDevices(updatedDevices);
      localStorage.setItem('revibe_devices', JSON.stringify(updatedDevices));
      setViewingAnalysis(id);
      
      const updatedUser = {
        ...user,
        stats: {
          ...user.stats,
          score: user.stats.score + 15
        }
      };
      setUser(updatedUser);
      localStorage.setItem('revibe_user', JSON.stringify(updatedUser));
    } catch (err) {
      alert("Failed to analyze device. Please check your API key.");
    } finally {
      setAnalyzingId(null);
    }
  };

  if (!isRegistered) {
    return <RegistrationView onRegister={handleRegister} />;
  }

  const renderContent = () => {
    if (viewingAnalysis) {
      const device = devices.find(d => d.id === viewingAnalysis);
      return device ? (
        <AnalysisView device={device} onBack={() => setViewingAnalysis(null)} />
      ) : null;
    }

    switch (activeTab) {
      case 'dashboard':
        return <ImpactDashboard user={user} />;
      
      case 'devices':
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Your Ecosystem</h3>
                <p className="text-slate-500 font-medium">Keep your device inventory updated to track sustainability.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <Plus size={20} />
                Register New Device
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
              {devices.map(device => (
                <DeviceCard 
                  key={device.id} 
                  device={device} 
                  onAnalyze={handleAnalyze}
                  isLoading={analyzingId === device.id}
                />
              ))}
              <div 
                onClick={() => setShowAddModal(true)}
                className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 group cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/30 transition-all"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-500 transition-all mb-4">
                  <Plus size={24} />
                </div>
                <p className="font-bold text-slate-400 group-hover:text-emerald-600 transition-all">Add another device</p>
              </div>
            </div>
          </div>
        );

      case 'consultant':
        return <ChatInterface />;

      case 'rules':
        return (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
             <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                   <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                      <Scale size={28} />
                   </div>
                   <h2 className="text-3xl font-black text-slate-800 tracking-tight">E-Waste Management Rules, 2022</h2>
                </div>
                
                <div className="grid gap-6">
                   {[
                      { title: "Extended Producer Responsibility (EPR)", content: "Producers, importers, and brand owners are legally responsible for the end-of-life collection and recycling of their products in India." },
                      { title: "Categorization of E-Waste", content: "The new rules cover a wider range of items including Solar PV modules, tablets, smartphones, and many other IoT devices." },
                      { title: "Recycling Targets", content: "Compulsory recycling targets have been set for manufacturers, increasing annually to ensure minimal leakage into landfills." },
                      { title: "Authorized Recyclers Only", content: "It is illegal to sell or give e-waste to unorganized 'Kabadiwalas' who use toxic smelting methods. Only CPCB-authorized recyclers should handle e-waste." }
                   ].map((item, i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-black text-indigo-600 shadow-sm shrink-0">{i+1}</div>
                         <div>
                            <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{item.content}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="bg-emerald-50 rounded-3xl p-8 flex items-start gap-4">
                   <Info className="text-emerald-600 shrink-0 mt-1" />
                   <div>
                      <p className="text-emerald-800 font-medium">ReVibe helps you comply with these rules by guiding you to authorized collection points and verified resale platforms like Cashify and Attero.</p>
                   </div>
                </div>
             </div>
          </div>
        );

      default:
        return <div className="p-20 text-center text-slate-400 font-bold">Coming Soon</div>;
    }
  };

  return (
    <Layout user={user} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
      {showAddModal && <DeviceForm onClose={() => setShowAddModal(false)} onSubmit={handleAddDevice} />}
    </Layout>
  );
};

export default App;
