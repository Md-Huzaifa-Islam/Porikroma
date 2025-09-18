import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar, DollarSign, Users, ArrowRight } from "lucide-react";
import Navbar from "../layout/Navbar";
import { useCurrentUser } from "../../hooks/useAuth";
import { useTrips } from "../../hooks/useTrips";

const Dashboard = () => {
  const { data: user } = useCurrentUser();
  const { data: trips = [], isLoading: tripsLoading } = useTrips();

  const stats = [
    {
      title: "Total Trips",
      value: trips.length,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Budget",
      value: `৳${trips
        .reduce((sum, trip) => sum + (trip.totalBudget || 0), 0)
        .toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "This Year",
      value: trips.filter((trip) => {
        const year = new Date(trip.startDate).getFullYear();
        return year === new Date().getFullYear();
      }).length,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Upcoming",
      value: trips.filter((trip) => {
        return new Date(trip.startDate) > new Date();
      }).length,
      icon: MapPin,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  const recentActivities = [
    {
      id: "1",
      type: "trip_created",
      message: "Cox's Bazar Beach Trip planned",
      time: "2 hours ago",
      icon: Calendar,
    },
    {
      id: "2",
      type: "expense_added",
      message: "Transport expense added (৳5,000)",
      time: "5 hours ago",
      icon: DollarSign,
    },
    {
      id: "3",
      type: "member_joined",
      message: "Faizul joined your trip",
      time: "1 day ago",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="absolute top-0 right-0 transform rotate-12 translate-x-4 -translate-y-4">
              <div className="w-32 h-32 bg-white opacity-10 rounded-full"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name?.split(" ")[0]}! 👋
              </h1>
              <p className="text-blue-100 mb-6">
                Ready to plan your next adventure? Let's make it memorable!
              </p>
              <Link
                to="/destinations"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <MapPin className="w-5 h-5" />
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Trips */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Trips
                </h2>
                <Link
                  to="/trip-planner"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>Plan New Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {tripsLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading trips...
                  </div>
                ) : (
                  trips.slice(0, 3).map((trip) => (
                    <div
                      key={trip.tripId}
                      className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=64&h=64&fit=crop"
                        alt={trip.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {trip.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trip.startDate).toLocaleDateString()} -{" "}
                          {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          ৳{(trip.totalBudget || 0).toLocaleString()}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            new Date(trip.startDate) > new Date()
                              ? "bg-blue-100 text-blue-800"
                              : new Date(trip.endDate) >= new Date()
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {new Date(trip.startDate) > new Date()
                            ? "Upcoming"
                            : new Date(trip.endDate) >= new Date()
                            ? "Active"
                            : "Completed"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {trips.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No trips planned yet</p>
                  <Link
                    to="/trip-planner"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Plan your first trip →
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Activity Feed */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <activity.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/trip-planner"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-800 font-medium">
                    Plan New Trip
                  </span>
                </Link>
                <Link
                  to="/budget"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
                >
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-gray-800 font-medium">
                    Manage Budget
                  </span>
                </Link>
                <Link
                  to="/groups"
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
                >
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-800 font-medium">Group Chat</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
