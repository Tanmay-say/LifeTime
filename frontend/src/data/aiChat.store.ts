import apiClient from '@/lib/api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}

// Map API response to frontend format
function mapMessageFromAPI(data: any): ChatMessage {
  return {
    id: data.id,
    role: data.role,
    content: data.content,
    timestamp: data.created_at,
    suggestions: data.suggestions || [],
  };
}

export const chatInitialState: ChatMessage[] = [];

// Fetch chat history for a donor
export const fetchChatHistory = async (donorId: string, limit: number = 50): Promise<ChatMessage[]> => {
  try {
    const data = await apiClient.get(`/ai-chat/history/${donorId}`, { limit });
    return data.map(mapMessageFromAPI);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

// Send message and get AI response
export const sendMessage = async (
  message: string,
  donorId?: string,
  sessionId?: string
): Promise<{ userMessage: ChatMessage; assistantMessage: ChatMessage }> => {
  try {
    const response = await apiClient.post('/ai-chat/message', {
      message,
      donorId,
      sessionId: sessionId || 'default',
    });
    
    return {
      userMessage: mapMessageFromAPI(response.userMessage),
      assistantMessage: mapMessageFromAPI(response.assistantMessage),
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Clear chat history
export const clearChatHistory = async (donorId: string): Promise<void> => {
  try {
    await apiClient.delete(`/ai-chat/history/${donorId}`);
  } catch (error) {
    console.error('Error clearing chat history:', error);
    throw error;
  }
};

// Fetch quick actions
export const fetchQuickActions = async (): Promise<QuickAction[]> => {
  try {
    return await apiClient.get('/ai-chat/quick-actions');
  } catch (error) {
    console.error('Error fetching quick actions:', error);
    // Return fallback quick actions
    return [
      {
        id: '1',
        label: 'Check Eligibility',
        icon: 'check_circle',
        prompt: 'Am I eligible to donate blood right now?',
      },
      {
        id: '2',
        label: 'Prepare for Donation',
        icon: 'fitness_center',
        prompt: 'How should I prepare for my upcoming blood donation?',
      },
      {
        id: '3',
        label: 'Find Nearby Drives',
        icon: 'location_on',
        prompt: 'Show me blood donation drives near my location.',
      },
      {
        id: '4',
        label: 'Health Tips',
        icon: 'favorite',
        prompt: 'Give me tips to maintain good health for regular blood donation.',
      },
      {
        id: '5',
        label: 'Iron-Rich Foods',
        icon: 'restaurant',
        prompt: 'What are the best iron-rich foods to eat before donating blood?',
      },
      {
        id: '6',
        label: 'Donation History',
        icon: 'history',
        prompt: 'Show me my donation history and impact.',
      },
    ];
  }
};
