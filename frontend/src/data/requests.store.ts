import apiClient from '@/lib/api';

export interface DonationRequest {
  id: string;
  hospitalName: string;
  bloodTypeNeeded: string;
  unitsNeeded: number;
  urgencyLevel: 'critical' | 'high' | 'moderate' | 'low';
  patientCondition?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  status: 'pending' | 'in_progress' | 'fulfilled' | 'cancelled';
  isUrgent: boolean;
  requiredBy?: string;
  createdAt: string;
}

// Map API response to frontend format
function mapRequestFromAPI(data: any): DonationRequest {
  return {
    id: data.id,
    hospitalName: data.hospital_name,
    bloodTypeNeeded: data.blood_type_needed,
    unitsNeeded: data.units_needed,
    urgencyLevel: data.urgency_level,
    patientCondition: data.patient_condition,
    contactName: data.contact_name,
    contactPhone: data.contact_phone,
    contactEmail: data.contact_email,
    status: data.status,
    isUrgent: data.is_urgent || false,
    requiredBy: data.required_by,
    createdAt: data.created_at,
  };
}

export const requestsInitialState: DonationRequest[] = [];

// Fetch all donation requests with optional filters
export const fetchRequests = async (filters?: {
  status?: string;
  bloodType?: string;
  urgent?: boolean;
}): Promise<DonationRequest[]> => {
  try {
    const params: any = {};
    if (filters?.status) params.status = filters.status;
    if (filters?.bloodType) params.bloodType = filters.bloodType;
    if (filters?.urgent) params.urgent = 'true';
    
    const data = await apiClient.get('/requests', params);
    return data.map(mapRequestFromAPI);
  } catch (error) {
    console.error('Error fetching donation requests:', error);
    return [];
  }
};

// Fetch request by ID
export const fetchRequestById = async (id: string): Promise<DonationRequest | undefined> => {
  try {
    const data = await apiClient.get(`/requests/${id}`);
    return mapRequestFromAPI(data);
  } catch (error) {
    console.error(`Error fetching request ${id}:`, error);
    return undefined;
  }
};

// Create donation request
export const createRequest = async (
  requestData: Omit<DonationRequest, 'id' | 'createdAt' | 'status'>
): Promise<DonationRequest> => {
  try {
    const apiData = {
      hospital_name: requestData.hospitalName,
      blood_type_needed: requestData.bloodTypeNeeded,
      units_needed: requestData.unitsNeeded,
      urgency_level: requestData.urgencyLevel,
      patient_condition: requestData.patientCondition,
      contact_name: requestData.contactName,
      contact_phone: requestData.contactPhone,
      contact_email: requestData.contactEmail,
      is_urgent: requestData.isUrgent,
      required_by: requestData.requiredBy,
    };
    
    const data = await apiClient.post('/requests', apiData);
    return mapRequestFromAPI(data);
  } catch (error) {
    console.error('Error creating donation request:', error);
    throw error;
  }
};

// Update request
export const updateRequest = async (
  id: string,
  updates: Partial<DonationRequest>
): Promise<DonationRequest> => {
  try {
    const apiUpdates: any = {};
    if (updates.status !== undefined) apiUpdates.status = updates.status;
    if (updates.unitsNeeded !== undefined) apiUpdates.units_needed = updates.unitsNeeded;
    if (updates.urgencyLevel !== undefined) apiUpdates.urgency_level = updates.urgencyLevel;
    if (updates.isUrgent !== undefined) apiUpdates.is_urgent = updates.isUrgent;
    
    const data = await apiClient.put(`/requests/${id}`, apiUpdates);
    return mapRequestFromAPI(data);
  } catch (error) {
    console.error(`Error updating request ${id}:`, error);
    throw error;
  }
};

// Delete request
export const deleteRequest = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/requests/${id}`);
  } catch (error) {
    console.error(`Error deleting request ${id}:`, error);
    throw error;
  }
};
