import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Donor, donorsMockData } from '@/data/donors.store';
import { DonationDrive, drivesMockData } from '@/data/donationDrives.store';
import { BloodRequest, requestsMockData } from '@/data/requests.store';
import { AnalyticsData, analyticsMockData } from '@/data/analytics.store';
import { HealthMetrics, healthMockData, DonationHistory, donationHistoryMockData, HealthAlert, healthAlertsMockData } from '@/data/health.store';
import { ChatMessage, chatMockData, QuickAction, quickActionsMockData } from '@/data/aiChat.store';

interface AppContextType {
  // Donors
  donors: Donor[];
  setDonors: React.Dispatch<React.SetStateAction<Donor[]>>;
  
  // Drives
  drives: DonationDrive[];
  setDrives: React.Dispatch<React.SetStateAction<DonationDrive[]>>;
  
  // Requests
  requests: BloodRequest[];
  setRequests: React.Dispatch<React.SetStateAction<BloodRequest[]>>;
  
  // Analytics
  analytics: AnalyticsData;
  setAnalytics: React.Dispatch<React.SetStateAction<AnalyticsData>>;
  
  // Health
  health: HealthMetrics;
  setHealth: React.Dispatch<React.SetStateAction<HealthMetrics>>;
  donationHistory: DonationHistory[];
  setDonationHistory: React.Dispatch<React.SetStateAction<DonationHistory[]>>;
  healthAlerts: HealthAlert[];
  setHealthAlerts: React.Dispatch<React.SetStateAction<HealthAlert[]>>;
  
  // Chat
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  quickActions: QuickAction[];
  
  // Current user (donor)
  currentUser: Donor | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Donor | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [donors, setDonors] = useState<Donor[]>(donorsMockData);
  const [drives, setDrives] = useState<DonationDrive[]>(drivesMockData);
  const [requests, setRequests] = useState<BloodRequest[]>(requestsMockData);
  const [analytics, setAnalytics] = useState<AnalyticsData>(analyticsMockData);
  const [health, setHealth] = useState<HealthMetrics>(healthMockData);
  const [donationHistory, setDonationHistory] = useState<DonationHistory[]>(donationHistoryMockData);
  const [healthAlerts, setHealthAlerts] = useState<HealthAlert[]>(healthAlertsMockData);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(chatMockData);
  const [currentUser, setCurrentUser] = useState<Donor | null>(donorsMockData[0]);

  return (
    <AppContext.Provider
      value={{
        donors,
        setDonors,
        drives,
        setDrives,
        requests,
        setRequests,
        analytics,
        setAnalytics,
        health,
        setHealth,
        donationHistory,
        setDonationHistory,
        healthAlerts,
        setHealthAlerts,
        chatMessages,
        setChatMessages,
        quickActions: quickActionsMockData,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
