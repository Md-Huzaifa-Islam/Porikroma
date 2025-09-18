import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bus,
  Train,
  Plane,
  Car,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Filter,
  ArrowRight,
  Star,
  Wifi,
  Coffee,
  AirVent
} from 'lucide-react';
import Navbar from '../layout/Navbar';
import { useTrips } from '../../contexts/TripContext';
import toast from 'react-hot-toast';

const TransportBooking = () => {
  const { trips, addBooking } = useTrips();
  const [selectedTrip, setSelectedTrip] = useState(trips[0] || null);
  const [transportType, setTransportType] = useState('bus');
  const [searchData, setSearchData] = useState({
    from: 'Chittagong',
    to: selectedTrip?.destination.split(',')[0] || '',
    date: selectedTrip?.startDate || '',
    passengers: selectedTrip?.participants.length || 1
  });
  const [showFilters, setShowFilters] = useState(false);

  const transportTypes = [
    { id: 'bus', name: 'Bus', icon: Bus, color: 'text-blue-600' },
    { id: 'train', name: 'Train', icon: Train, color: 'text-green-600' },
    { id: 'plane', name: 'Flight', icon: Plane, color: 'text-purple-600' },
    { id: 'car', name: 'Private Car', icon: Car, color: 'text-orange-600' }
  ];

  const mockTransportData = {
    bus: [
      {
        id: 'bus-1',
        operator: 'Green Line Paribahan',
        departure: '08:00 AM',
        arrival: '02:00 PM',
        duration: '6h 00m',
        price: 800,
        seats: 28,
        type: 'AC Sleeper',
        rating: 4.5,
        amenities: ['AC', 'WiFi', 'Charging Port', 'Entertainment'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop'
      },
      {
        id: 'bus-2',
        operator: 'Shohagh Paribahan',
        departure: '10:30 AM',
        arrival: '04:30 PM',
        duration: '6h 00m',
        price: 650,
        seats: 35,
        type: 'AC Business',
        rating: 4.3,
        amenities: ['AC', 'Charging Port', 'Blanket'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop'
      },
      {
        id: 'bus-3',
        operator: 'Ena Transport',
        departure: '11:45 PM',
        arrival: '06:00 AM+1',
        duration: '6h 15m',
        price: 750,
        seats: 22,
        type: 'AC Sleeper',
        rating: 4.7,
        amenities: ['AC', 'WiFi', 'Meal', 'Entertainment'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop'
      }
    ],
    train: [
      {
        id: 'train-1',
        operator: 'Bangladesh Railway',
        departure: '06:30 AM',
        arrival: '01:15 PM',
        duration: '6h 45m',
        price: 450,
        seats: 56,
        type: 'Shovan Chair',
        rating: 4.1,
        amenities: ['Fan', 'Charging Port'],
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=300&h=200&fit=crop'
      },
      {
        id: 'train-2',
        operator: 'Bangladesh Railway',
        departure: '02:00 PM',
        arrival: '08:45 PM',
        duration: '6h 45m',
        price: 680,
        seats: 42,
        type: 'AC Chair',
        rating: 4.4,
        amenities: ['AC', 'Charging Port', 'Meal'],
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=300&h=200&fit=crop'
      }
    ],
    plane: [
      {
        id: 'flight-1',
        operator: 'US-Bangla Airlines',
        departure: '09:15 AM',
        arrival: '10:30 AM',
        duration: '1h 15m',
        price: 8500,
        seats: 12,
        type: 'Economy',
        rating: 4.2,
        amenities: ['Meal', 'Entertainment', '20kg Baggage'],
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop'
      },
      {
        id: 'flight-2',
        operator: 'Biman Bangladesh',
        departure: '03:45 PM',
        arrival: '05:00 PM',
        duration: '1h 15m',
        price: 9200,
        seats: 8,
        type: 'Economy',
        rating: 4.0,
        amenities: ['Meal', 'Entertainment', '20kg Baggage'],
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop'
      }
    ],
    car: [
      {
        id: 'car-1',
        operator: 'Pathao Car',
        departure: 'On Demand',
        arrival: '6h later',
        duration: '6h 00m',
        price: 4500,
        seats: 3,
        type: 'AC Sedan',
        rating: 4.6,
        amenities: ['AC', 'Music', 'WiFi Hotspot'],
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop'
      },
      {
        id: 'car-2',
        operator: 'Uber Premium',
        departure: 'On Demand',
        arrival: '6h later',
        duration: '6h 00m',
        price: 5200,
        seats: 3,
        type: 'Premium SUV',
        rating: 4.8,
        amenities: ['AC', 'Premium Sound', 'Leather Seats'],
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop'
      }
    ]
  };

  const currentTransportData = mockTransportData[transportType as keyof typeof mockTransportData] || [];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'ac': return <AirVent className="w-4 h-4" />;
      case 'meal': return <Coffee className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleBooking = (transport: any) => {
    if (!selectedTrip) {
      toast.error('Please select a trip first');
      return;
    }

    addBooking(selectedTrip.id, {
      type: 'transport',
      title: `${transport.operator} - ${transportType}`,
      provider: transport.operator,
      amount: transport.price * searchData.passengers,
      status: 'confirmed',
      details: {
        transportType,
        departure: transport.departure,
        arrival: transport.arrival,
        duration: transport.duration,
        passengers: searchData.passengers,
        from: searchData.from,
        to: searchData.to,
        date: searchData.date
      }
    });

    toast.success(`${transport.operator} booking confirmed!`);
  };

  if (trips.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              No trips available for booking
            </h2>
            <p className="text-gray-500 mb-8">
              Create a trip first to book transportation
            </p>
            <button
              onClick={() => window.location.href = '/trip-planner'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Plan Your First Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Book Transportation</h1>
          <p className="text-gray-600">Find and book the best transport options for your trip</p>
        </motion.div>

        {/* Trip Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Trip</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => {
                  setSelectedTrip(trip);
                  setSearchData(prev => ({
                    ...prev,
                    to: trip.destination.split(',')[0],
                    date: trip.startDate,
                    passengers: trip.participants.length
                  }));
                }}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedTrip?.id === trip.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-800">{trip.title}</h3>
                <p className="text-sm text-gray-600">{trip.destination}</p>
                <p className="text-sm text-gray-500">{trip.participants.length} travelers</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          {/* Transport Type Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Transport Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {transportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTransportType(type.id)}
                  className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                    transportType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className={`w-6 h-6 ${
                    transportType === type.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                  <span className={`font-medium ${
                    transportType === type.id ? 'text-blue-600' : 'text-gray-800'
                  }`}>
                    {type.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchData.from}
                  onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchData.to}
                  onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  value={searchData.passengers}
                  onChange={(e) => setSearchData(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Available {transportType} options ({currentTransportData.length})
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          <div className="space-y-6">
            {currentTransportData.map((transport, index) => (
              <motion.div
                key={transport.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex space-x-6 flex-1">
                    <img
                      src={transport.image}
                      alt={transport.operator}
                      className="w-24 h-20 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {transport.operator}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{transport.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{transport.type}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Departure</p>
                          <p className="font-semibold text-gray-800">{transport.departure}</p>
                          <p className="text-sm text-gray-600">{searchData.from}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-semibold text-gray-800">{transport.duration}</p>
                          <ArrowRight className="w-4 h-4 text-gray-400 mx-auto mt-1" />
                        </div>
                        
                        <div className="text-right md:text-left">
                          <p className="text-sm text-gray-500">Arrival</p>
                          <p className="font-semibold text-gray-800">{transport.arrival}</p>
                          <p className="text-sm text-gray-600">{searchData.to}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {transport.amenities.slice(0, 4).map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                          >
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-gray-800">
                        ৳{(transport.price * searchData.passengers).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        ৳{transport.price}/person
                      </p>
                      <p className="text-sm text-gray-500">
                        {transport.seats} seats available
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleBooking(transport)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {currentTransportData.length === 0 && (
            <div className="text-center py-12">
              <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No {transportType} options available
              </h3>
              <p className="text-gray-500">
                Try selecting a different transport type or adjust your search criteria
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TransportBooking;