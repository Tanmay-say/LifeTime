import apiClient from '@/lib/api';

export interface DonationDrive {
  id: string;
  title: string;
  hospital: string;
  location: string;
  date: string;
  time: string;
  bloodTypesNeeded: string[];
  currentUnits: number;
  goalUnits: number;
  urgency: 'critical' | 'high' | 'moderate' | 'low';
  distance: number;
  image?: string;
  aiRecommended?: boolean;
  description: string;
}

// Map Supabase response to frontend format
function mapDriveFromAPI(data: any): DonationDrive {
  return {
    id: data.id,
    title: data.title,
    hospital: data.hospital,
    location: data.location,
    date: data.date,
    time: data.time || '',
    bloodTypesNeeded: data.blood_types_needed || [],
    currentUnits: data.current_units || 0,
    goalUnits: data.goal_units,
    urgency: data.urgency,
    distance: data.distance || 0,
    image: data.image,
    aiRecommended: data.ai_recommended || false,
    description: data.description || '',
  };
}

export const drivesInitialState: DonationDrive[] = [];

// Fetch all drives with optional filters
export const fetchDrives = async (filters?: {
  urgency?: string;
  bloodType?: string;
  upcoming?: boolean;
}): Promise<DonationDrive[]> => {
  try {
    const params: any = {};
    if (filters?.urgency) params.urgency = filters.urgency;
    if (filters?.bloodType) params.bloodType = filters.bloodType;
    if (filters?.upcoming) params.upcoming = 'true';
    
    const data = await apiClient.get('/drives', params);
    return data.map(mapDriveFromAPI);
  } catch (error) {
    console.error('Error fetching drives:', error);
    throw error;
  }
};

// Fetch drive by ID
export const fetchDriveById = async (id: string): Promise<DonationDrive | undefined> => {
  try {
    const data = await apiClient.get(`/drives/${id}`);
    return mapDriveFromAPI(data);
  } catch (error) {
    console.error(`Error fetching drive ${id}:`, error);
    return undefined;
  }
};

// Register donor for drive
export const registerForDrive = async (driveId: string, donorId: string): Promise<boolean> => {
  try {
    await apiClient.post(`/drives/${driveId}/register`, { donorId });
    return true;
  } catch (error) {
    console.error(`Error registering for drive ${driveId}:`, error);
    return false;
  }
};

// Create new drive
export const createDrive = async (driveData: Omit<DonationDrive, 'id'>): Promise<DonationDrive> => {
  try {
    const apiData = {
      title: driveData.title,
      hospital: driveData.hospital,
      location: driveData.location,
      date: driveData.date,
      time: driveData.time,
      blood_types_needed: driveData.bloodTypesNeeded,
      current_units: driveData.currentUnits || 0,
      goal_units: driveData.goalUnits,
      urgency: driveData.urgency,
      distance: driveData.distance,
      image: driveData.image,
      ai_recommended: driveData.aiRecommended || false,
      description: driveData.description,
    };
    
    const data = await apiClient.post('/drives', apiData);
    return mapDriveFromAPI(data);
  } catch (error) {
    console.error('Error creating drive:', error);
    throw error;
  }
};

// Update drive
export const updateDrive = async (id: string, updates: Partial<DonationDrive>): Promise<DonationDrive> => {
  try {
    const apiUpdates: any = {};
    if (updates.title !== undefined) apiUpdates.title = updates.title;
    if (updates.hospital !== undefined) apiUpdates.hospital = updates.hospital;
    if (updates.location !== undefined) apiUpdates.location = updates.location;
    if (updates.date !== undefined) apiUpdates.date = updates.date;
    if (updates.time !== undefined) apiUpdates.time = updates.time;
    if (updates.bloodTypesNeeded !== undefined) apiUpdates.blood_types_needed = updates.bloodTypesNeeded;
    if (updates.currentUnits !== undefined) apiUpdates.current_units = updates.currentUnits;
    if (updates.goalUnits !== undefined) apiUpdates.goal_units = updates.goalUnits;
    if (updates.urgency !== undefined) apiUpdates.urgency = updates.urgency;
    if (updates.description !== undefined) apiUpdates.description = updates.description;
    
    const data = await apiClient.put(`/drives/${id}`, apiUpdates);
    return mapDriveFromAPI(data);
  } catch (error) {
    console.error(`Error updating drive ${id}:`, error);
    throw error;
  }
};

// Delete drive
export const deleteDrive = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/drives/${id}`);
  } catch (error) {
    console.error(`Error deleting drive ${id}:`, error);
    throw error;
  }
};
