const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface RequirementPayload {
  event: {
    name: string;
    type: string;
    startDate: string;
    endDate?: string;
    location: string;
    venue?: string;
  };
  category: 'planner' | 'performer' | 'crew';
  details: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export const createRequirement = async (
  payload: RequirementPayload
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/requirements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create requirement');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getRequirements = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/requirements`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch requirements');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};