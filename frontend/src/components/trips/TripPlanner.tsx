import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Plus,
  X,
  Check,
} from "lucide-react";
import Navbar from "../layout/Navbar";
import { useCreateTrip } from "../../hooks/useTrips";
import { useCurrentUser } from "../../hooks/useAuth";
import { useDestinations } from "../../hooks/useTravelData";
import toast from "react-hot-toast";

const TripPlanner = () => {
  const { data: user } = useCurrentUser();
  const createTripMutation = useCreateTrip();
  const { data: backendDestinations, isLoading: destinationsLoading } =
    useDestinations();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    participants: [user?.userId?.toString() || ""],
    description: "",
    image: "",
  });
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [inviteEmail, setInviteEmail] = useState("");

  const staticDestinations = [
    {
      id: "coxs-bazar",
      name: "Cox's Bazar",
      location: "Chittagong, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      avgCost: 15000,
    },
    {
      id: "sylhet",
      name: "Sylhet Tea Gardens",
      location: "Sylhet, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=400&h=300&fit=crop",
      avgCost: 12000,
    },
    {
      id: "sajek",
      name: "Sajek Valley",
      location: "Rangamati, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      avgCost: 18000,
    },
    {
      id: "sundarban",
      name: "Sundarban Mangrove",
      location: "Khulna, Bangladesh",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      avgCost: 20000,
    },
  ];

  // Combine static destinations with backend destinations for display
  const destinations = [
    ...staticDestinations,
    ...(backendDestinations || []).map((dest) => ({
      id: `backend-${dest.destinationId}`,
      name: dest.name,
      location: dest.location,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      avgCost: 15000,
    })),
  ];

  const handleDestinationSelect = (dest: any) => {
    setSelectedDestination(dest);
    setTripData((prev) => ({
      ...prev,
      destination: `${dest.name}, ${dest.location}`,
      image: dest.image,
      budget: dest.avgCost.toString(),
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setTripData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addParticipant = () => {
    if (inviteEmail && !tripData.participants.includes(inviteEmail)) {
      setTripData((prev) => ({
        ...prev,
        participants: [...prev.participants, inviteEmail],
      }));
      setInviteEmail("");
      toast.success("Participant added!");
    }
  };

  const removeParticipant = (email: string) => {
    if (email !== user?.userId?.toString()) {
      setTripData((prev) => ({
        ...prev,
        participants: prev.participants.filter((p) => p !== email),
      }));
    }
  };

  const handleSubmit = async () => {
    if (
      !tripData.title ||
      !tripData.destination ||
      !tripData.startDate ||
      !tripData.endDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createTripMutation.mutateAsync({
        title: tripData.title,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        totalBudget: parseInt(tripData.budget) || 0,
      });

      toast.success("Trip planned successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create trip:", error);
      toast.error("Failed to create trip. Please try again.");
    }
  };

  const steps = [
    { id: 1, title: "Destination", icon: MapPin },
    { id: 2, title: "Details", icon: Calendar },
    { id: 3, title: "Budget", icon: DollarSign },
    { id: 4, title: "Participants", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Plan Your Perfect Trip
          </h1>
          <p className="text-gray-600">
            Let's create an amazing travel experience together
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div
                  className={`flex items-center space-x-3 ${
                    step >= stepItem.id ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= stepItem.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > stepItem.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <stepItem.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-medium hidden sm:block">
                    {stepItem.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-4 ${
                      step > stepItem.id ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          {/* Step 1: Destination */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Choose Your Destination
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => handleDestinationSelect(dest)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                      selectedDestination?.id === dest.id
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {dest.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {dest.location}
                      </p>
                      <p className="text-sm text-gray-500">
                        Avg. cost: ৳{dest.avgCost.toLocaleString()}
                      </p>
                    </div>
                    {selectedDestination?.id === dest.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Trip Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Title *
                  </label>
                  <input
                    type="text"
                    value={tripData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Cox's Bazar Beach Trip"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={tripData.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      value={tripData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={tripData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your trip plans..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Set Your Budget
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Budget (৳)
                  </label>
                  <input
                    type="number"
                    value={tripData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your total budget"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">
                    Budget Breakdown
                  </h3>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex justify-between">
                      <span>Transportation (30%)</span>
                      <span>
                        ৳
                        {Math.round(
                          (parseInt(tripData.budget) || 0) * 0.3
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accommodation (40%)</span>
                      <span>
                        ৳
                        {Math.round(
                          (parseInt(tripData.budget) || 0) * 0.4
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Food & Activities (30%)</span>
                      <span>
                        ৳
                        {Math.round(
                          (parseInt(tripData.budget) || 0) * 0.3
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Participants */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Invite Participants
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Participants
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                    <button
                      onClick={addParticipant}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Trip Participants ({tripData.participants.length})
                  </h3>
                  <div className="space-y-2">
                    {tripData.participants.map((participant) => (
                      <div
                        key={participant}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {participant === user?.userId?.toString()
                                ? user?.name?.charAt(0)
                                : participant.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-800">
                            {participant === user?.userId?.toString()
                              ? `${user?.name} (You)`
                              : participant}
                          </span>
                        </div>
                        {participant !== user?.userId?.toString() && (
                          <button
                            onClick={() => removeParticipant(participant)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedDestination) ||
                  (step === 2 &&
                    (!tripData.title ||
                      !tripData.startDate ||
                      !tripData.endDate))
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Trip
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TripPlanner;
