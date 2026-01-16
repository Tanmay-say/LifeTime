import apiClient from '@/lib/api';

export interface AnalyticsOverview {
  totalDonors: number;
  totalDonations: number;
  activeDrives: number;
  monthlyDonations: number;
}

export interface BloodTypeDistribution {
  [key: string]: number;
}

export interface DonationTrends {
  [date: string]: number;
}

export interface DonorStats {
  [status: string]: number;
}

// Fetch analytics overview
export const fetchAnalyticsOverview = async (): Promise<AnalyticsOverview> => {
  try {
    return await apiClient.get('/analytics/overview');
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    return {
      totalDonors: 0,
      totalDonations: 0,
      activeDrives: 0,
      monthlyDonations: 0,
    };
  }
};

// Fetch blood type distribution
export const fetchBloodTypeDistribution = async (): Promise<BloodTypeDistribution> => {
  try {
    return await apiClient.get('/analytics/blood-types');
  } catch (error) {
    console.error('Error fetching blood type distribution:', error);
    return {};
  }
};

// Fetch donation trends
export const fetchDonationTrends = async (period: number = 30): Promise<DonationTrends> => {
  try {
    return await apiClient.get('/analytics/trends', { period });
  } catch (error) {
    console.error('Error fetching donation trends:', error);
    return {};
  }
};

// Fetch donor statistics
export const fetchDonorStats = async (): Promise<DonorStats> => {
  try {
    return await apiClient.get('/analytics/donors/stats');
  } catch (error) {
    console.error('Error fetching donor stats:', error);
    return {};
  }
};

// Log analytics event
export const logAnalyticsEvent = async (eventType: string, eventData: any): Promise<void> => {
  try {
    await apiClient.post('/analytics/events', {
      event_type: eventType,
      event_data: eventData,
    });
  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
};
