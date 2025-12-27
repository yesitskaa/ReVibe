
import React from 'react';
import { Smartphone, Laptop, Tablet, Tv, Speaker, Watch, Camera } from 'lucide-react';

export const CATEGORIES = [
  { id: 'smartphone', name: 'Smartphone', icon: <Smartphone className="w-5 h-5" /> },
  { id: 'laptop', name: 'Laptop', icon: <Laptop className="w-5 h-5" /> },
  { id: 'tablet', name: 'Tablet', icon: <Tablet className="w-5 h-5" /> },
  { id: 'tv', name: 'Television', icon: <Tv className="w-5 h-5" /> },
  { id: 'audio', name: 'Audio Device', icon: <Speaker className="w-5 h-5" /> },
  { id: 'wearable', name: 'Wearable', icon: <Watch className="w-5 h-5" /> },
  { id: 'camera', name: 'Camera', icon: <Camera className="w-5 h-5" /> },
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Aravind Sharma',
  email: 'aravind.s@example.com',
  avatar: 'https://picsum.photos/seed/user123/150/150',
  stats: {
    co2Saved: 124.5, // kg
    eWastePrevented: 12.8, // kg
    score: 850
  }
};
