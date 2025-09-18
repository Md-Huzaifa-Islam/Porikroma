import { apiClient } from "./apiClient";

// Destination interfaces
export interface Destination {
  destinationId?: number;
  name: string;
  location: string;
  description?: string;
}

// Accommodation interfaces
export interface Accommodation {
  hotelId?: number;
  name: string;
  type: string;
  pricePerNight: number;
  rating: number;
}

// Transportation interfaces
export interface Transportation {
  transportationId?: number;
  type: string;
  provider: string;
  price: number;
  availability: boolean;
}

// Local Service interfaces
export interface LocalService {
  serviceId?: number;
  name: string;
  type: string;
  contact?: string;
}

// Destination service
export const destinationService = {
  async getAllDestinations(): Promise<Destination[]> {
    return await apiClient.get<Destination[]>("/destinations");
  },

  async getDestinationById(id: number): Promise<Destination> {
    return await apiClient.get<Destination>(`/destinations/${id}`);
  },

  async createDestination(
    destinationData: Omit<Destination, "destinationId">
  ): Promise<Destination> {
    return await apiClient.post<Destination>("/destinations", destinationData);
  },

  async updateDestination(
    id: number,
    destinationData: Partial<Destination>
  ): Promise<Destination> {
    return await apiClient.put<Destination>(
      `/destinations/${id}`,
      destinationData
    );
  },

  async deleteDestination(id: number): Promise<void> {
    return await apiClient.delete<void>(`/destinations/${id}`);
  },

  async searchDestinations(
    name?: string,
    location?: string
  ): Promise<Destination[]> {
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (location) params.append("location", location);

    return await apiClient.get<Destination[]>(
      `/destinations/search?${params.toString()}`
    );
  },
};

// Accommodation service
export const accommodationService = {
  async getAllAccommodations(): Promise<Accommodation[]> {
    return await apiClient.get<Accommodation[]>("/accommodations");
  },

  async getAccommodationById(id: number): Promise<Accommodation> {
    return await apiClient.get<Accommodation>(`/accommodations/${id}`);
  },
};

// Transportation service
export const transportationService = {
  async getAllTransportation(): Promise<Transportation[]> {
    return await apiClient.get<Transportation[]>("/transportations");
  },

  async getTransportationById(id: number): Promise<Transportation> {
    return await apiClient.get<Transportation>(`/transportations/${id}`);
  },
};

// Local service service
export const localServiceService = {
  async getAllLocalServices(): Promise<LocalService[]> {
    return await apiClient.get<LocalService[]>("/local-services");
  },

  async getLocalServiceById(id: number): Promise<LocalService> {
    return await apiClient.get<LocalService>(`/local-services/${id}`);
  },
};
