import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Calendar,
  Users,
  Search,
  Heart,
  Camera,
  Mountain,
  Waves,
} from "lucide-react";
import Navbar from "../layout/Navbar";
import { destinationService } from "../../services/travelService";

const DestinationBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);

  // Demo destinations as fallback
  const demoDestinations = [
    {
      id: "1",
      name: "Cox's Bazar",
      location: "Chittagong, Bangladesh",
      category: "beach",
      rating: 4.8,
      reviews: 2453,
      price: 15000,
      duration: "3-4 days",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      description: "World's longest natural sea beach with stunning sunsets",
      highlights: [
        "120km beach",
        "Sunset views",
        "Fresh seafood",
        "Beach resorts",
      ],
    },
    {
      id: "2",
      name: "Sylhet Tea Gardens",
      location: "Sylhet, Bangladesh",
      category: "nature",
      rating: 4.7,
      reviews: 1876,
      price: 12000,
      duration: "2-3 days",
      image:
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=600&h=400&fit=crop",
      description: "Rolling hills covered in lush green tea plantations",
      highlights: [
        "Tea estates",
        "Hills & valleys",
        "Fresh air",
        "Photography",
      ],
    },
    {
      id: "3",
      name: "Sajek Valley",
      location: "Rangamati, Bangladesh",
      category: "mountain",
      rating: 4.9,
      reviews: 3241,
      price: 18000,
      duration: "2-3 days",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      description: "Queen of hills with breathtaking cloud views",
      highlights: ["Cloud views", "Sunrise", "Tribal culture", "Adventure"],
    },
    {
      id: "4",
      name: "Sundarban Mangrove",
      location: "Khulna, Bangladesh",
      category: "nature",
      rating: 4.6,
      reviews: 1523,
      price: 20000,
      duration: "3-4 days",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
      description:
        "World's largest mangrove forest and UNESCO World Heritage Site",
      highlights: [
        "Royal Bengal Tiger",
        "Mangrove forest",
        "Boat safari",
        "Wildlife",
      ],
    },
    {
      id: "5",
      name: "Saint Martin Island",
      location: "Cox's Bazar, Bangladesh",
      category: "beach",
      rating: 4.5,
      reviews: 987,
      price: 25000,
      duration: "2-3 days",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
      description: "Bangladesh's only coral island with crystal clear waters",
      highlights: [
        "Coral island",
        "Clear waters",
        "Coconut trees",
        "Snorkeling",
      ],
    },
    {
      id: "6",
      name: "Bandarban Hills",
      location: "Bandarban, Bangladesh",
      category: "mountain",
      rating: 4.7,
      reviews: 2156,
      price: 16000,
      duration: "3-4 days",
      image:
        "https://images.unsplash.com/photo-1464822759844-d150baec013c?w=600&h=400&fit=crop",
      description: "Highest peaks and indigenous culture in Bangladesh",
      highlights: ["Keokradong peak", "Tribal culture", "Waterfalls", "Hiking"],
    },
  ];

  // Load destinations from backend
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const backendDest = await destinationService.getAllDestinations();

        // Convert backend destinations to frontend format with demo data as fallback
        const convertedDestinations = backendDest.map((dest, index) => ({
          id: dest.destinationId?.toString() || `backend-${index}`,
          name: dest.name,
          location: dest.location,
          category: "nature", // Default category since backend doesn't have this
          rating: 4.5, // Default rating
          reviews: Math.floor(Math.random() * 3000) + 500, // Random reviews
          price: Math.floor(Math.random() * 20000) + 10000, // Random price
          duration: "2-3 days", // Default duration
          image: `https://images.unsplash.com/photo-${Math.floor(
            Math.random() * 1000000000
          )}?w=600&h=400&fit=crop&auto=format`, // Random image
          description: dest.description || `Visit the beautiful ${dest.name}`,
          highlights: [
            "Scenic views",
            "Local culture",
            "Adventure",
            "Photography",
          ],
        }));

        // Combine with demo destinations for richer experience
        setDestinations([...demoDestinations, ...convertedDestinations]);
      } catch (error) {
        console.error("Failed to load destinations:", error);
        // Fallback to demo destinations
        setDestinations(demoDestinations);
      }
    };

    loadDestinations();
  }, []);

  const categories = [
    { id: "all", name: "All Destinations", icon: MapPin },
    { id: "beach", name: "Beach", icon: Waves },
    { id: "mountain", name: "Mountain", icon: Mountain },
    { id: "nature", name: "Nature", icon: Camera },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || dest.category === selectedCategory;
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "budget" && dest.price < 15000) ||
      (priceRange === "mid" && dest.price >= 15000 && dest.price <= 20000) ||
      (priceRange === "luxury" && dest.price > 20000);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleFavorite = (destId: string) => {
    setFavorites((prev) =>
      prev.includes(destId)
        ? prev.filter((id) => id !== destId)
        : [...prev, destId]
    );
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
            Discover Amazing Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore beautiful places across Bangladesh and plan your perfect
            getaway
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Budget Range
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "all", label: "All Budgets" },
                { id: "budget", label: "Budget (<৳15K)" },
                { id: "mid", label: "Mid-range (৳15-20K)" },
                { id: "luxury", label: "Premium (>৳20K)" },
              ].map((range) => (
                <button
                  key={range.id}
                  onClick={() => setPriceRange(range.id)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    priceRange === range.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDestinations.length} destinations
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(destination.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(destination.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-800">
                    ৳{destination.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {destination.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">
                      {destination.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {destination.location}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{destination.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights
                    .slice(0, 2)
                    .map((highlight: string) => (
                      <span
                        key={highlight}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  {destination.highlights.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      +{destination.highlights.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Plan Trip
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No destinations found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DestinationBrowser;
