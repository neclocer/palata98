const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка запроса');
    }

    return response.json();
  }

  // Admin
  async adminLogin(password: string) {
    const data = await this.request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    this.token = data.token;
    localStorage.setItem('admin_token', data.token);
    return data;
  }

  async adminVerify() {
    return this.request('/api/admin/verify');
  }

  adminLogout() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  // Products
  async getProducts() {
    return this.request('/api/products');
  }

  async getProduct(id: string) {
    return this.request(`/api/products/${id}`);
  }

  async createProduct(product: any) {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: any) {
    return this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async getOrders() {
    return this.request('/api/orders');
  }

  async createOrder(order: any) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request(`/api/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Customers
  async getCustomers() {
    return this.request('/api/customers');
  }

  async getCustomerStats() {
    return this.request('/api/customers/stats');
  }
}

export const api = new ApiService();
