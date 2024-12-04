import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import api from '../api/axios';
import HotelCard from '../components/HotelCard';
import SearchFilters from '../components/SearchFilters';

const HomePage = () => {
  const [filters, setFilters] = useState({
    search: '',
    priceRange: '',
    rating: '',
  });

  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: () => api.get('/hotels').then(res => res.data),
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredHotels = hotels?.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(filters.search.toLowerCase());
    
    let matchesPrice = true;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      matchesPrice = max ? 
        (hotel.pricePerNight >= min && hotel.pricePerNight <= max) :
        hotel.pricePerNight >= min;
    }

    let matchesRating = true;
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      matchesRating = hotel.rating >= minRating;
    }

    return matchesSearch && matchesPrice && matchesRating;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-indigo-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl opacity-90">
            Discover amazing hotels around the world
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <SearchFilters onFilterChange={handleFilterChange} />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredHotels?.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HotelCard hotel={hotel} />
            </motion.div>
          ))}
        </motion.div>

        {filteredHotels?.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-600">
              No hotels found matching your criteria
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
