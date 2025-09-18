import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Star,
  TrendingUp,
  Clock,
  DollarSign
} from 'lucide-react';
import Navbar from '../layout/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { useTrips } from '../../contexts/TripContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { trips } = useTrips();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    preferences: {
      travelType: user?.preferences?.travelType || 'adventure',
      budgetRange: user?.preferences?.budgetRange || 'medium',
      destinations: user?.preferences?.destinations || []
    }
  });

  const travelTypes = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'business', label: 'Business' },
    { value: 'family', label: 'Family' }
  ];

  const budgetRanges = [
    { value: 'budget', label: 'Budget (< ৳15,000)' },
    { value: 'medium', label: 'Medium (৳15,000 - ৳30,000)' },
    { value: 'luxury', label: 'Luxury (> ৳30,000)' }
  ];

  const handleSave = () => {
    if (!editData.name.trim() || !editData.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    updateProfile({
      name: editData.name,
      email: editData.email,
      preferences: editData.preferences
    });
    
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      preferences: {
        travelType: user?.preferences?.travelType || 'adventure',
        budgetRange: user?.preferences?.budgetRange || 'medium',
        destinations: user?.preferences?.destinations || []
      }
    });
    setIsEditing(false);
  };

  // Calculate user stats
  const totalTrips = trips.length;
  const completedTrips = trips.filter(t => t.status === 'completed').length;
  const totalBudget = trips.reduce((sum, trip) => sum + trip.budget, 0);
  const totalExpenses = trips.reduce((sum, trip) => 
    sum + trip.expenses.reduce((expSum, exp) => expSum + exp.amount, 0), 0
  );

  const stats = [
    {
      title: 'Total Trips',
      value: totalTrips,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Completed',
      value: completedTrips,
      icon: Star,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Total Budget',
      value: `৳${totalBudget.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Expenses',
      value: `৳${totalExpenses.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  const recentTrips = trips.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and travel preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mt-4">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Travel Type</span>
                    <span className="font-medium text-gray-800 capitalize">
                      {user?.preferences?.travelType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Budget Range</span>
                    <span className="font-medium text-gray-800 capitalize">
                      {user?.preferences?.budgetRange}
                    </span>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Type
                    </label>
                    <select
                      value={editData.preferences.travelType}
                      onChange={(e) => setEditData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, travelType: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {travelTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={editData.preferences.budgetRange}
                      onChange={(e) => setEditData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, budgetRange: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {budgetRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Travel Stats</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                      </div>
                      <div className={`p-2 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Trips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Trips</h3>
              
              {recentTrips.length > 0 ? (
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                    >
                      <img
                        src={trip.image}
                        alt={trip.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{trip.title}</h4>
                        <p className="text-sm text-gray-600">{trip.destination}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{trip.startDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3" />
                            <span>৳{trip.budget.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          trip.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                          trip.status === 'booked' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No trips yet. Start planning your first adventure!</p>
                </div>
              )}
            </motion.div>

            {/* Favorite Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Favorite Destinations</h3>
              
              {user?.preferences?.destinations && user.preferences.destinations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.preferences.destinations.map((destination) => (
                    <span
                      key={destination}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{destination}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No favorite destinations yet. Explore and add some!</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;