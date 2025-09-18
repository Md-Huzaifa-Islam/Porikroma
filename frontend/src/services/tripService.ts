import { apiClient } from "./apiClient";

// Trip interfaces
export interface Trip {
  tripId?: number;
  title: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  users?: User[];
}

export interface User {
  userId?: number;
  name: string;
  email: string;
}

export interface Expense {
  expenseId?: number;
  category: string;
  amount: number;
  date: string;
}

// Trip service
export const tripService = {
  async getAllTrips(): Promise<Trip[]> {
    return await apiClient.get<Trip[]>("/trips");
  },

  async getTripById(id: number): Promise<Trip> {
    return await apiClient.get<Trip>(`/trips/${id}`);
  },

  async createTrip(tripData: Omit<Trip, "tripId">): Promise<Trip> {
    return await apiClient.post<Trip>("/trips", tripData);
  },

  async updateTrip(id: number, tripData: Partial<Trip>): Promise<Trip> {
    return await apiClient.put<Trip>(`/trips/${id}`, tripData);
  },

  async deleteTrip(id: number): Promise<void> {
    return await apiClient.delete<void>(`/trips/${id}`);
  },

  async getTripsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<Trip[]> {
    return await apiClient.get<Trip[]>(
      `/trips/date-range?startDate=${startDate}&endDate=${endDate}`
    );
  },

  // Expense management
  async getExpensesByTripId(tripId: number): Promise<Expense[]> {
    return await apiClient.get<Expense[]>(`/expenses/trip/${tripId}`);
  },

  async createExpense(
    expenseData: Omit<Expense, "expenseId">
  ): Promise<Expense> {
    return await apiClient.post<Expense>("/expenses", expenseData);
  },

  async getExpenseById(id: number): Promise<Expense> {
    return await apiClient.get<Expense>(`/expenses/${id}`);
  },
};
