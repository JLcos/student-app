// API Client para futuras integrações com backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class ApiClient {
  private static async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Activities
  static async getActivities() {
    return this.request<any[]>('/activities');
  }

  static async createActivity(activity: any) {
    return this.request('/activities', {
      method: 'POST',
      body: JSON.stringify(activity),
    });
  }

  static async updateActivity(id: string, activity: any) {
    return this.request(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activity),
    });
  }

  static async deleteActivity(id: string) {
    return this.request(`/activities/${id}`, {
      method: 'DELETE',
    });
  }

  // Subjects
  static async getSubjects() {
    return this.request<any[]>('/subjects');
  }

  static async createSubject(subject: any) {
    return this.request('/subjects', {
      method: 'POST',
      body: JSON.stringify(subject),
    });
  }

  // User
  static async getUser() {
    return this.request<any>('/user');
  }

  static async updateUser(user: any) {
    return this.request('/user', {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  }
}

