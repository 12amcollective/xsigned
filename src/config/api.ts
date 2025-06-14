// API configuration for React frontend

interface ApiConfig {
  baseURL: string;
  headers: Record<string, string>;
  timeout: number;
  isDevelopment: boolean;
  isProduction: boolean;
}

interface RequestOptions {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
}

interface UserData {
  email: string;
  artist_name?: string;
}

const API_CONFIG: ApiConfig = {
  // Use environment variable or fallback to production URL
  baseURL: import.meta.env.VITE_API_URL || 'https://xsigned.ai/api',
  
  // Headers
  headers: {
    'Content-Type': 'application/json',
  },
  
  // Timeout
  timeout: 10000,
  
  // Environment info
  isDevelopment: import.meta.env.VITE_ENV === 'development',
  isProduction: import.meta.env.VITE_ENV === 'production',
};

// Helper function to get the correct API URL
export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || API_CONFIG.baseURL;
};

// API client class
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = getApiUrl();
  }

  async request(endpoint: string, options: RequestOptions = {}): Promise<any> {
    // In development, use relative URLs that will be proxied by Vite
    // In production, use the full baseURL
    const url = API_CONFIG.isDevelopment ? endpoint : `${this.baseURL}${endpoint}`;
    
    console.log('Making API request to:', url);
    console.log('Environment:', API_CONFIG.isDevelopment ? 'development' : 'production');
    console.log('Base URL:', this.baseURL);
    console.log('Request options:', options);
    
    const config: RequestInit = {
      method: options.method || 'GET',
      body: options.body,
      headers: {
        ...API_CONFIG.headers,
        ...(options.headers || {}),
      },
    };

    try {
      const response = await fetch(url, config);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // User endpoints
  async createUser(userData: UserData): Promise<any> {
    return this.request('/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async joinWaitlist(email: string): Promise<any> {
    return this.request('/waitlist/join', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getWaitlistStats(): Promise<any> {
    return this.request('/waitlist/stats');
  }

  async getWaitlistEntries(): Promise<any> {
    return this.request('/waitlist/');
  }

  async waitlistHealthCheck(): Promise<any> {
    return this.request('/waitlist/health');
  }

  async getUser(userId: string): Promise<any> {
    return this.request(`/users/${userId}`);
  }

  // Campaign endpoints
  async createCampaign(campaignData: any): Promise<any> {
    return this.request('/campaigns/', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  }

  async getCampaign(campaignId: string): Promise<any> {
    return this.request(`/campaigns/${campaignId}`);
  }

  async updateCampaignProgress(campaignId: string, progressData: any): Promise<any> {
    return this.request(`/campaigns/${campaignId}/progress`, {
      method: 'PATCH',
      body: JSON.stringify(progressData),
    });
  }

  // Health check
  async healthCheck(): Promise<any> {
    return this.request('/health');
  }
}

export default new ApiClient();
