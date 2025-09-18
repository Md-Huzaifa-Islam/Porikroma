import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Phone,
  Clock,
  DollarSign,
  Car,
  Camera,
  Utensils,
  Bed,
  Shield,
  Filter,
  Search,
  ExternalLink
} from 'lucide-react';
import Navbar from '../layout/Navbar';

const LocalServices = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('Cox\'s Bazar');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Services', icon: MapPin },
    { id: 'accommodation', name: 'Hotels', icon: Bed },
    { id: 'restaurant', name: 'Restaurants', icon: Utensils },
    { id: 'transport', name: 'Local Transport', icon: Car },
    { id: 'guide', name: 'Tour Guides', icon: Camera },
    { id: 'emergency', name: 'Emergency', icon: Shield }
  ];

  const locations = [
    'Cox\'s Bazar',
    'Sylhet',
    'Sajek Valley',
    'Sundarban',
    'Bandarban',
    'Saint Martin'
  ];

  const services = [
    // Cox's Bazar Services
    {
      id: '1',
      name: 'Hotel Sea Crown',
      category: 'accommodation',
      location: 'Cox\'s Bazar',
      rating: 4.5,
      reviews: 324,
      price: '৳4,500/night',
      contact: '+880-1711-123456',
      hours: '24/7',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      description: 'Beachfront hotel with stunning ocean views',
      features: ['Beach Access', 'AC Rooms', 'Restaurant', 'WiFi'],
      address: 'Marine Drive, Cox\'s Bazar'
    },
    {
      id: '2',
      name: 'Jhawban Restaurant',
      category: 'restaurant',
      location: 'Cox\'s Bazar',
      rating: 4.3,
      reviews: 128,
      price: '৳500-800/meal',
      contact: '+880-1712-234567',
      hours: '11:00 AM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      description: 'Authentic Bengali cuisine with fresh seafood',
      features: ['Seafood', 'Bengali Cuisine', 'Sea View', 'AC'],
      address: 'Kolatoli Beach, Cox\'s Bazar'
    },
    {
      id: '3',
      name: 'Beach Bike Rental',
      category: 'transport',
      location: 'Cox\'s Bazar',
      rating: 4.7,
      reviews: 89,
      price: '৳300-500/day',
      contact: '+880-1713-345678',
      hours: '6:00 AM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1544191696-15693072fb6d?w=400&h=300&fit=crop',
      description: 'Motorcycle and bicycle rentals for beach exploration',
      features: ['Motorcycles', 'Bicycles', 'Helmets', 'Insurance'],
      address: 'Near Main Beach, Cox\'s Bazar'
    },
    {
      id: '4',
      name: 'Rashid Tour Guide',
      category: 'guide',
      location: 'Cox\'s Bazar',
      rating: 4.9,
      reviews: 156,
      price: '৳1,500/day',
      contact: '+880-1714-456789',
      hours: '7:00 AM - 7:00 PM',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      description: 'Experienced local guide with 10+ years experience',
      features: ['English Speaking', 'Photography', 'Local Knowledge', 'Transport'],
      address: 'Cox\'s Bazar Tourist Area'
    },
    // Sylhet Services
    {
      id: '5',
      name: 'Tea Resort & Spa',
      category: 'accommodation',
      location: 'Sylhet',
      rating: 4.6,
      reviews: 267,
      price: '৳3,800/night',
      contact: '+880-1715-567890',
      hours: '24/7',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      description: 'Luxury resort surrounded by tea gardens',
      features: ['Tea Garden View', 'Spa', 'Restaurant', 'WiFi'],
      address: 'Sreemangal, Sylhet'
    },
    {
      id: '6',
      name: 'Hill View Restaurant',
      category: 'restaurant',
      location: 'Sylhet',
      rating: 4.2,
      reviews: 94,
      price: '৳400-600/meal',
      contact: '+880-1716-678901',
      hours: '10:00 AM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      description: 'Traditional cuisine with panoramic hill views',
      features: ['Hill View', 'Local Cuisine', 'Tea Service', 'Garden Seating'],
      address: 'Jaflong, Sylhet'
    },
    // Emergency Services
    {
      id: '7',
      name: 'Cox\'s Bazar Hospital',
      category: 'emergency',
      location: 'Cox\'s Bazar',
      rating: 4.0,
      reviews: 45,
      price: 'Emergency Services',
      contact: '999',
      hours: '24/7',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      description: 'Main government hospital with emergency services',
      features: ['Emergency', '24/7', 'Ambulance', 'ICU'],
      address: 'Hospital Road, Cox\'s Bazar'
    },
    {
      id: '8',
      name: 'Tourist Police',
      category: 'emergency',
      location: 'Cox\'s Bazar',
      rating: 4.1,
      reviews: 23,
      price: 'Free Service',
      contact: '+880-1769-123456',
      hours: '24/7',
      image: 'https://images.unsplash.com/photo-1583829916865-5fb6a8a3be43?w=400&h=300&fit=crop',
      description: 'Dedicated tourist assistance and safety services',
      features: ['Tourist Help', 'Emergency Response', 'Language Support', 'Safety'],
      address: 'Tourist Area, Cox\'s Bazar'
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesLocation = service.location === selectedLocation;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesLocation && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : MapPin;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      accommodation: 'text-blue-600 bg-blue-50',
      restaurant: 'text-orange-600 bg-orange-50',
      transport: 'text-green-600 bg-green-50',
      guide: 'text-purple-600 bg-purple-50',
      emergency: 'text-red-600 bg-red-50'
    };
    return colors[category] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Local Services & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find trusted local services, guides, and emergency contacts for your destination
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          {/* Location Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Location</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedLocation === location
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Service Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredServices.length} services in {selectedLocation}
            {selectedCategory !== 'all' && ` for ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => {
            const CategoryIcon = getCategoryIcon(service.category);
            const categoryColors = getCategoryColor(service.category);
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-4 left-4 flex items-center space-x-1 px-2 py-1 rounded-full ${categoryColors}`}>
                    <CategoryIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      {categories.find(c => c.id === service.category)?.name}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {service.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">
                        {service.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{service.address}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>{service.price}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{service.hours}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{service.contact}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {service.reviews} reviews
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${service.contact}`}
                      className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </a>
                    <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No services found
            </h3>
            <p className="text-gray-500">
              Try adjusting your location or search criteria
            </p>
          </motion.div>
        )}

        {/* Emergency Contact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-800">Emergency Contacts</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-red-700">
              <p className="font-medium">National Emergency</p>
              <p>999 (Fire, Police, Medical)</p>
            </div>
            <div className="text-red-700">
              <p className="font-medium">Tourist Helpline</p>
              <p>+880-2-9898888</p>
            </div>
            <div className="text-red-700">
              <p className="font-medium">Tourist Police</p>
              <p>+880-1769-123456</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LocalServices;