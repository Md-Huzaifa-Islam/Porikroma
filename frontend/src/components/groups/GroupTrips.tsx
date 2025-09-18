import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, DollarSign } from "lucide-react";
import Navbar from "../layout/Navbar";
import { useTrips } from "../../hooks/useTrips";
import { useCurrentUser } from "../../hooks/useAuth";

const GroupTrips = () => {
  const { data: user } = useCurrentUser();
  const { data: trips = [], isLoading } = useTrips();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading trips...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Group Trips</h1>
          <p className="text-gray-600">Manage and collaborate on group trips</p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Coming Soon:</strong> Group messaging and collaboration
              features!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <motion.div
              key={trip.tripId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {trip.title}
                  </h3>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {trip.startDate} - {trip.endDate}
                    </span>
                  </div>

                  {trip.totalBudget && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>Budget: ${trip.totalBudget}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Personal Trip</span>
                    <span>Planning</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {trips.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No trips yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first trip to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupTrips;
