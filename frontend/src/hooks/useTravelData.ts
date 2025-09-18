import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  destinationService,
  accommodationService,
  transportationService,
  localServiceService,
  Destination,
  Accommodation,
  Transportation,
  LocalService,
} from "../services/travelService";

// Query keys
export const destinationKeys = {
  all: ["destinations"] as const,
  lists: () => [...destinationKeys.all, "list"] as const,
  list: (filters: string) => [...destinationKeys.lists(), { filters }] as const,
  details: () => [...destinationKeys.all, "detail"] as const,
  detail: (id: number) => [...destinationKeys.details(), id] as const,
  search: (params: { name?: string; location?: string }) =>
    [...destinationKeys.all, "search", params] as const,
};

export const accommodationKeys = {
  all: ["accommodations"] as const,
  lists: () => [...accommodationKeys.all, "list"] as const,
  details: () => [...accommodationKeys.all, "detail"] as const,
  detail: (id: number) => [...accommodationKeys.details(), id] as const,
};

export const transportationKeys = {
  all: ["transportation"] as const,
  lists: () => [...transportationKeys.all, "list"] as const,
  details: () => [...transportationKeys.all, "detail"] as const,
  detail: (id: number) => [...transportationKeys.details(), id] as const,
};

export const localServiceKeys = {
  all: ["localServices"] as const,
  lists: () => [...localServiceKeys.all, "list"] as const,
  details: () => [...localServiceKeys.all, "detail"] as const,
  detail: (id: number) => [...localServiceKeys.details(), id] as const,
};

// Destination hooks
export const useDestinations = () => {
  return useQuery({
    queryKey: destinationKeys.lists(),
    queryFn: destinationService.getAllDestinations,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useDestination = (id: number) => {
  return useQuery({
    queryKey: destinationKeys.detail(id),
    queryFn: () => destinationService.getDestinationById(id),
    enabled: !!id,
  });
};

export const useCreateDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (destinationData: Omit<Destination, "destinationId">) =>
      destinationService.createDestination(destinationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationKeys.lists() });
    },
  });
};

export const useUpdateDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Destination> }) =>
      destinationService.updateDestination(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: destinationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: destinationKeys.lists() });
    },
  });
};

export const useDeleteDestination = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => destinationService.deleteDestination(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: destinationKeys.lists() });
    },
  });
};

export const useSearchDestinations = (name?: string, location?: string) => {
  return useQuery({
    queryKey: destinationKeys.search({ name, location }),
    queryFn: () => destinationService.searchDestinations(name, location),
    enabled: !!name || !!location,
  });
};

// Accommodation hooks
export const useAccommodations = () => {
  return useQuery({
    queryKey: accommodationKeys.lists(),
    queryFn: accommodationService.getAllAccommodations,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useAccommodation = (id: number) => {
  return useQuery({
    queryKey: accommodationKeys.detail(id),
    queryFn: () => accommodationService.getAccommodationById(id),
    enabled: !!id,
  });
};

// Transportation hooks
export const useTransportation = () => {
  return useQuery({
    queryKey: transportationKeys.lists(),
    queryFn: transportationService.getAllTransportation,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useTransportationById = (id: number) => {
  return useQuery({
    queryKey: transportationKeys.detail(id),
    queryFn: () => transportationService.getTransportationById(id),
    enabled: !!id,
  });
};

// Local Services hooks
export const useLocalServices = () => {
  return useQuery({
    queryKey: localServiceKeys.lists(),
    queryFn: localServiceService.getAllLocalServices,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useLocalService = (id: number) => {
  return useQuery({
    queryKey: localServiceKeys.detail(id),
    queryFn: () => localServiceService.getLocalServiceById(id),
    enabled: !!id,
  });
};
