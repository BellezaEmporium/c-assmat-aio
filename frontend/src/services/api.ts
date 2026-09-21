import axios, { AxiosInstance } from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

class Api {
  private axios: AxiosInstance;

    constructor() {
      this.axios = axios.create({
        baseURL: `${API_BASE}/api`,
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }

  // --------------------
  // Auth
  // --------------------

  async login(email: string, password: string): Promise<Response> {
    // Sanctum endpoint is outside /api
    const baseUrl = API_BASE.replace(/\/api\/?$/, '');

    await axios.get(`${baseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });

    const resp = await this.axios.post('/login', {
      email,
      password,
    });

    return resp.data;
  }

  async logout(): Promise<void> {
    await this.axios.post('/logout');
  }

  async me(): Promise<User> {
    const resp = await this.axios.get('/me');
    return resp.data;
  }

  // --------------------
  // Children
  // --------------------
  async getChildren() {
    const resp = await this.axios.get('/me/children');
    return resp.data;
  }

  async addChild(child: { name: string; birthdate: string; notes?: string }) {
    const resp = await this.axios.post('/me/children', child);
    return resp.data;
  }

  async updateChild(id: string, child: { name?: string; birthdate?: string; notes?: string }) {
    const resp = await this.axios.put(`/me/children/${id}`, child);
    return resp.data;
  }

  async deleteChild(id: string) {
    const resp = await this.axios.delete(`/me/children/${id}`);
    return resp.data;
  }

  // --------------------
  // Planning
  // --------------------
  async getPlanning() {
    const resp = await this.axios.get('/me/planning');
    return resp.data;
  }

  async addPlanning(planning: { child_id: string; date: string; start_time: string; end_time: string }) {
    const resp = await this.axios.post('/me/planning', planning);
    return resp.data;
  }

  // --------------------
  // Payroll
  // --------------------
  async getPayroll() {
    const resp = await this.axios.get('/me/payroll');
    return resp.data;
  }

  async generatePayroll(month: string) {
    const resp = await this.axios.post('/me/payroll', { month });
    return resp.data;
  }

  async exportPayroll(payroll_id: string) {
    const resp = await this.axios.post('/me/payroll/export', { payroll_id });
    return resp.data;
  }
}

export default new Api();
