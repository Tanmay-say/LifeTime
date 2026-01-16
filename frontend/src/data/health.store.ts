import apiClient from '@/lib/api';

export interface HealthRecord {
  id: string;
  donorId: string;
  hemoglobin: number;
  ironLevel: number;
  bloodPressure: string;
  weight: number;
  healthScore: number;
  notes?: string;
  recordedAt: string;
}

// Map API response to frontend format
function mapHealthRecordFromAPI(data: any): HealthRecord {
  return {
    id: data.id,
    donorId: data.donor_id,
    hemoglobin: data.hemoglobin || 0,
    ironLevel: data.iron_level || 0,
    bloodPressure: data.blood_pressure || '',
    weight: data.weight || 0,
    healthScore: data.health_score || 0,
    notes: data.notes,
    recordedAt: data.recorded_at || data.created_at,
  };
}

// Fetch health records for a donor
export const fetchHealthRecords = async (donorId: string): Promise<HealthRecord[]> => {
  try {
    const data = await apiClient.get(`/health/${donorId}`);
    return data.map(mapHealthRecordFromAPI);
  } catch (error) {
    console.error(`Error fetching health records for donor ${donorId}:`, error);
    return [];
  }
};

// Fetch latest health record for a donor
export const fetchLatestHealthRecord = async (donorId: string): Promise<HealthRecord | null> => {
  try {
    const data = await apiClient.get(`/health/${donorId}/latest`);
    if (!data || Object.keys(data).length === 0) return null;
    return mapHealthRecordFromAPI(data);
  } catch (error) {
    console.error(`Error fetching latest health record for donor ${donorId}:`, error);
    return null;
  }
};

// Create health record
export const createHealthRecord = async (
  healthData: Omit<HealthRecord, 'id' | 'recordedAt'>
): Promise<HealthRecord> => {
  try {
    const apiData = {
      donor_id: healthData.donorId,
      hemoglobin: healthData.hemoglobin,
      iron_level: healthData.ironLevel,
      blood_pressure: healthData.bloodPressure,
      weight: healthData.weight,
      health_score: healthData.healthScore,
      notes: healthData.notes,
    };
    
    const data = await apiClient.post('/health', apiData);
    return mapHealthRecordFromAPI(data);
  } catch (error) {
    console.error('Error creating health record:', error);
    throw error;
  }
};

// Update health record
export const updateHealthRecord = async (
  id: string,
  updates: Partial<HealthRecord>
): Promise<HealthRecord> => {
  try {
    const apiUpdates: any = {};
    if (updates.hemoglobin !== undefined) apiUpdates.hemoglobin = updates.hemoglobin;
    if (updates.ironLevel !== undefined) apiUpdates.iron_level = updates.ironLevel;
    if (updates.bloodPressure !== undefined) apiUpdates.blood_pressure = updates.bloodPressure;
    if (updates.weight !== undefined) apiUpdates.weight = updates.weight;
    if (updates.healthScore !== undefined) apiUpdates.health_score = updates.healthScore;
    if (updates.notes !== undefined) apiUpdates.notes = updates.notes;
    
    const data = await apiClient.put(`/health/${id}`, apiUpdates);
    return mapHealthRecordFromAPI(data);
  } catch (error) {
    console.error(`Error updating health record ${id}:`, error);
    throw error;
  }
};
