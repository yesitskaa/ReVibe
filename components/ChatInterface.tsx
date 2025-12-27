
import React, { useState, useRef, useEffect } from 'react';
import { Send, User as UserIcon, Bot, Sparkles, Trash2 } from 'lucide-react';
import { getQuickAdvice } from '../services/gemini';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Namaste! I'm ReVibe, your personal e-waste consultant. How can I help you be more circular today? ♻️" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const botResponse = await getQuickAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">ReVibe AI Consultant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Expertise: India E-Waste 2022</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'bot', text: "Namaste! I'm ReVibe, your personal e-waste consultant. How can I help you be more circular today? ♻️" }])}
          className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {msg.role === 'user' ? <UserIcon size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-4 rounded-[24px] text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-700 rounded-tl-none shadow-sm border border-slate-200'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Bot size={14} />
              </div>
              <div className="p-4 rounded-[24px] bg-slate-100 rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 pt-4">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Ask about recycling centres in Bangalore, EPR rules, or battery disposal..."
            className="w-full pl-6 pr-14 py-5 rounded-[24px] bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/10 transition-all outline-none text-slate-700 shadow-inner"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-3 top-3 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20 active:scale-90"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 text-center">
          Powered by Gemini AI • Always verify authorized recyclers on CPCB website
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
