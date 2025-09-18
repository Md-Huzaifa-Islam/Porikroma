import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tripService, Trip, Expense } from "../services/tripService";

// Query keys
export const tripKeys = {
  all: ["trips"] as const,
  lists: () => [...tripKeys.all, "list"] as const,
  list: (filters: string) => [...tripKeys.lists(), { filters }] as const,
  details: () => [...tripKeys.all, "detail"] as const,
  detail: (id: number) => [...tripKeys.details(), id] as const,
};

// Hooks for trips
export const useTrips = () => {
  return useQuery({
    queryKey: tripKeys.lists(),
    queryFn: tripService.getAllTrips,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTrip = (id: number) => {
  return useQuery({
    queryKey: tripKeys.detail(id),
    queryFn: () => tripService.getTripById(id),
    enabled: !!id,
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tripData: Omit<Trip, "tripId">) =>
      tripService.createTrip(tripData),
    onSuccess: () => {
      // Invalidate and refetch trips list
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Trip> }) =>
      tripService.updateTrip(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific trip and trips list
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tripService.deleteTrip(id),
    onSuccess: () => {
      // Invalidate trips list
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
};

// Hooks for trip expenses
export const useTripExpenses = (tripId: number) => {
  return useQuery({
    queryKey: [...tripKeys.all, "expenses", tripId],
    queryFn: () => tripService.getExpensesByTripId(tripId),
    enabled: !!tripId,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expenseData: Omit<Expense, "expenseId">) =>
      tripService.createExpense(expenseData),
    onSuccess: () => {
      // Invalidate expenses queries
      queryClient.invalidateQueries({
        queryKey: [...tripKeys.all, "expenses"],
      });
    },
  });
};

// Hook for date range trips
export const useTripsByDateRange = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: [...tripKeys.all, "dateRange", { startDate, endDate }],
    queryFn: () => tripService.getTripsByDateRange(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};
