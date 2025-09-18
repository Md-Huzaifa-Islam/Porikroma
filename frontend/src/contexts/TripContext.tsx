import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { tripService, Trip as BackendTrip } from "../services/tripService";

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  participants: string[];
  status: "planning" | "booked" | "completed";
  image: string;
  description: string;
  expenses: Expense[];
  bookings: Booking[];
  groupMessages: Message[];
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  paidBy: string;
  splitAmong: string[];
  date: string;
}

export interface Booking {
  id: string;
  type: "transport" | "accommodation" | "activity";
  title: string;
  provider: string;
  amount: number;
  status: "pending" | "confirmed" | "cancelled";
  details: any;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  type: "text" | "poll" | "expense";
}

interface TripContextType {
  trips: Trip[];
  currentTrip: Trip | null;
  loading: boolean;
  addTrip: (trip: Omit<Trip, "id">) => Promise<void>;
  updateTrip: (id: string, updates: Partial<Trip>) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  setCurrentTrip: (trip: Trip | null) => void;
  refreshTrips: () => Promise<void>;
  addExpense: (tripId: string, expense: Omit<Expense, "id">) => void;
  addBooking: (tripId: string, booking: Omit<Booking, "id">) => void;
  addMessage: (tripId: string, message: Omit<Message, "id">) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);

  // Convert backend trip to frontend trip format
  const convertBackendTrip = (backendTrip: BackendTrip): Trip => ({
    id: backendTrip.tripId?.toString() || "",
    title: backendTrip.title,
    destination: "Various", // Backend doesn't have single destination field
    startDate: backendTrip.startDate,
    endDate: backendTrip.endDate,
    budget: backendTrip.totalBudget,
    participants:
      backendTrip.users?.map((u) => u.userId?.toString() || "") || [],
    status: "planning" as const,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
    description: `Trip to ${backendTrip.title}`,
    expenses: [],
    bookings: [],
    groupMessages: [],
  });

  // Convert frontend trip to backend format
  const convertToBackendTrip = (
    trip: Omit<Trip, "id">
  ): Omit<BackendTrip, "tripId"> => ({
    title: trip.title,
    startDate: trip.startDate,
    endDate: trip.endDate,
    totalBudget: trip.budget,
  });

  // Load trips from backend
  const refreshTrips = async () => {
    try {
      setLoading(true);
      const backendTrips = await tripService.getAllTrips();
      const convertedTrips = backendTrips.map(convertBackendTrip);
      setTrips(convertedTrips);
    } catch (error) {
      console.error("Failed to fetch trips:", error);
      // Fallback to empty array on error
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  // Load trips on component mount
  useEffect(() => {
    refreshTrips();
  }, []);

  const addTrip = async (trip: Omit<Trip, "id">) => {
    try {
      setLoading(true);
      const backendTripData = convertToBackendTrip(trip);
      const createdTrip = await tripService.createTrip(backendTripData);
      const convertedTrip = convertBackendTrip(createdTrip);
      setTrips((prev) => [...prev, convertedTrip]);
    } catch (error) {
      console.error("Failed to create trip:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTrip = async (id: string, updates: Partial<Trip>) => {
    try {
      setLoading(true);
      const backendUpdates: Partial<BackendTrip> = {};
      if (updates.title) backendUpdates.title = updates.title;
      if (updates.startDate) backendUpdates.startDate = updates.startDate;
      if (updates.endDate) backendUpdates.endDate = updates.endDate;
      if (updates.budget) backendUpdates.totalBudget = updates.budget;

      const updatedTrip = await tripService.updateTrip(
        Number(id),
        backendUpdates
      );
      const convertedTrip = convertBackendTrip(updatedTrip);

      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === id ? { ...trip, ...convertedTrip } : trip
        )
      );
    } catch (error) {
      console.error("Failed to update trip:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id: string) => {
    try {
      setLoading(true);
      await tripService.deleteTrip(Number(id));
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
      if (currentTrip && currentTrip.id === id) {
        setCurrentTrip(null);
      }
    } catch (error) {
      console.error("Failed to delete trip:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addExpense = (tripId: string, expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? { ...trip, expenses: [...trip.expenses, newExpense] }
          : trip
      )
    );
  };

  const addBooking = (tripId: string, booking: Omit<Booking, "id">) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
    };
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? { ...trip, bookings: [...trip.bookings, newBooking] }
          : trip
      )
    );
  };

  const addMessage = (tripId: string, message: Omit<Message, "id">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
    };
    setTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId
          ? { ...trip, groupMessages: [...trip.groupMessages, newMessage] }
          : trip
      )
    );
  };

  return (
    <TripContext.Provider
      value={{
        trips,
        currentTrip,
        loading,
        addTrip,
        updateTrip,
        deleteTrip,
        setCurrentTrip,
        refreshTrips,
        addExpense,
        addBooking,
        addMessage,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrips = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrips must be used within a TripProvider");
  }
  return context;
};
