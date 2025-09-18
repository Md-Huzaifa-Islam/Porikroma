import { apiClient } from "./apiClient";

// User interfaces
export interface User {
  userId?: number;
  name: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Auth service
export const authService = {
  async login(credentials: LoginRequest): Promise<User> {
    const user = await apiClient.post<User>("/auth/login", credentials);
    if (user) {
      // Store user data (for now, we'll use this as our token)
      this.setCurrentUser(user);
      localStorage.setItem("authToken", "authenticated"); // Simple token for now
    }
    return user;
  },

  async register(userData: RegisterRequest): Promise<User> {
    const user = await apiClient.post<User>("/auth/register", userData);
    if (user) {
      this.setCurrentUser(user);
      localStorage.setItem("authToken", "authenticated"); // Simple token for now
    }
    return user;
  },

  logout() {
    // Clear any stored auth tokens or user data
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  },

  getCurrentUser(): User | null {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  },

  setCurrentUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  },
};

// User service
export const userService = {
  async getAllUsers(): Promise<User[]> {
    return await apiClient.get<User[]>("/users");
  },

  async getUserById(id: number): Promise<User> {
    return await apiClient.get<User>(`/users/${id}`);
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return await apiClient.put<User>(`/users/${id}`, userData);
  },

  async deleteUser(id: number): Promise<void> {
    return await apiClient.delete<void>(`/users/${id}`);
  },
};
