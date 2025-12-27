
export enum DeviceStatus {
  WORKING = 'Working',
  MINOR_ISSUES = 'Minor Issues',
  MAJOR_DAMAGE = 'Major Damage',
  DEAD = 'Dead'
}

export enum RecommendationType {
  REPAIR = 'Repair',
  RESELL = 'Resell',
  RECYCLE = 'Recycle'
}

export interface Device {
  id: string;
  name: string;
  brand: string;
  model: string;
  purchaseYear: number;
  status: DeviceStatus;
  category: string;
  analysis?: DeviceAnalysis;
}

export interface ComponentBreakdown {
  recyclable: string[];
  hazardous: string[];
  repairable: string[];
}

export interface DeviceAnalysis {
  sustainabilityScore: number;
  recommendation: RecommendationType;
  lifecycleStage: string;
  breakdown: ComponentBreakdown;
  indiaSpecificSteps: string[];
  educationalInsight: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  stats: {
    co2Saved: number;
    eWastePrevented: number;
    score: number;
  };
}
