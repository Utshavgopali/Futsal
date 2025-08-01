import React, { useState, useEffect } from 'react';
import { MapPin, Star, Users, Filter, Search } from 'lucide-react';

const CourtsPage = ({ courts, selectCourtForBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');

  // Debounce search input by 300ms to improve performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Extract unique locations from courts data
  const locations = [...new Set(courts.map(court => court.location.split(', ')[1]))];

  const filteredCourts = courts.filter(court => {
    const matchesSearch =
      court.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      court.location.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesLocation = filterLocation === 'all' || court.location.includes(filterLocation);
    const matchesPrice =
      filterPrice === 'all' ||
      (filterPrice === 'low' && court.price <= 1200) ||
      (filterPrice === 'medium' && court.price > 1200 && court.price <= 1600) ||
      (filterPrice === 'high' && court.price > 1600);

    return matchesSearch && matchesLocation && matchesPrice;
  });

  if (!courts || courts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading courts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Futsal Courts in Kathmandu</h1>
          <p className="text-xl text-gray-600">Find the perfect court for your game</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Prices</option>
              <option value="low">Under Rs. 1200</option>
              <option value="medium">Rs. 1200 - 1600</option>
              <option value="high">Above Rs. 1600</option>
            </select>

            <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Courts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
            >
              <img
                src={court.image || "/default-court.jpg"}
                alt={court.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{court.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{court.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{court.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">{court.capacity}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{court.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {court.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-green-600">Rs. {court.price}</span>
                    <span className="text-gray-500 text-sm">/hour</span>
                  </div>
                  <button
                    aria-label={`Book ${court.name}`}
                    onClick={() => selectCourtForBooking(court)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No courts found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterLocation('all');
                setFilterPrice('all');
              }}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourtsPage;
