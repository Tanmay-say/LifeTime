import apiClient from '@/lib/api';

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  location: string;
  lastDonation: string;
  totalDonations: number;
  reliabilityScore: number;
  status: 'eligible' | 'pending' | 'ineligible' | 'active';
  avatar?: string;
  joinedDate: string;
}

// Map Supabase response to frontend format
function mapDonorFromAPI(data: any): Donor {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    bloodType: data.blood_type,
    location: data.location || '',
    lastDonation: data.last_donation || '',
    totalDonations: data.total_donations || 0,
    reliabilityScore: data.reliability_score || 0,
    status: data.status,
    avatar: data.avatar,
    joinedDate: data.joined_date || data.created_at?.split('T')[0] || '',
  };
}

export const donorsInitialState: Donor[] = [];

// Fetch all donors with optional filters
export const fetchDonors = async (filters?: {
  bloodType?: string;
  status?: string;
  location?: string;
}): Promise<Donor[]> => {
  try {
    const data = await apiClient.get('/donors', filters);
    return data.map(mapDonorFromAPI);
  } catch (error) {
    console.error('Error fetching donors:', error);
    throw error;
  }
};

// Fetch donor by ID
export const fetchDonorById = async (id: string): Promise<Donor | undefined> => {
  try {
    const data = await apiClient.get(`/donors/${id}`);
    return mapDonorFromAPI(data);
  } catch (error) {
    console.error(`Error fetching donor ${id}:`, error);
    return undefined;
  }
};

// Update donor
export const updateDonor = async (id: string, updates: Partial<Donor>): Promise<Donor> => {
  try {
    // Map frontend format to API format
    const apiUpdates: any = {};
    if (updates.name !== undefined) apiUpdates.name = updates.name;
    if (updates.email !== undefined) apiUpdates.email = updates.email;
    if (updates.phone !== undefined) apiUpdates.phone = updates.phone;
    if (updates.bloodType !== undefined) apiUpdates.blood_type = updates.bloodType;
    if (updates.location !== undefined) apiUpdates.location = updates.location;
    if (updates.status !== undefined) apiUpdates.status = updates.status;
    if (updates.avatar !== undefined) apiUpdates.avatar = updates.avatar;
    if (updates.reliabilityScore !== undefined) apiUpdates.reliability_score = updates.reliabilityScore;
    
    const data = await apiClient.put(`/donors/${id}`, apiUpdates);
    return mapDonorFromAPI(data);
  } catch (error) {
    console.error(`Error updating donor ${id}:`, error);
    throw error;
  }
};

// Create new donor
export const createDonor = async (donorData: Omit<Donor, 'id'>): Promise<Donor> => {
  try {
    const apiData = {
      name: donorData.name,
      email: donorData.email,
      phone: donorData.phone,
      blood_type: donorData.bloodType,
      location: donorData.location,
      status: donorData.status || 'eligible',
      avatar: donorData.avatar,
      reliability_score: donorData.reliabilityScore || 0,
      total_donations: donorData.totalDonations || 0,
      joined_date: donorData.joinedDate,
    };
    
    const data = await apiClient.post('/donors', apiData);
    return mapDonorFromAPI(data);
  } catch (error) {
    console.error('Error creating donor:', error);
    throw error;
  }
};

// Delete donor
export const deleteDonor = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/donors/${id}`);
  } catch (error) {
    console.error(`Error deleting donor ${id}:`, error);
    throw error;
  }
};
