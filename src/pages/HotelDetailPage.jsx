import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaBed } from 'react-icons/fa';
import api from '../api/axios';
import BookingForm from '../components/BookingForm';

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: hotel, isLoading } = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => api.get(`/hotels/${id}`).then(res => res.data),
  });

  if (isLoading || !hotel) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100"
    >
      <div className="relative h-[60vh]">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold mb-4">{hotel.name}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {hotel.location}
              </div>
              <div className="flex items-center">
                <FaStar className="mr-2 text-yellow-400" />
                {hotel.rating} / 5.0
              </div>
              <div className="flex items-center">
                <FaBed className="mr-2" />
                {hotel.availableRooms} rooms available
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-4">About the Hotel</h2>
              <p className="text-gray-600">
                Experience luxury and comfort at {hotel.name}. Located in the heart of {hotel.location},
                our hotel offers stunning views and world-class amenities to make your stay unforgettable.
              </p>
              {/* Add more hotel details here */}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Book Your Stay</h2>
            <div className="text-3xl font-bold text-indigo-600 mb-6">
              ${hotel.pricePerNight} <span className="text-lg text-gray-500">/night</span>
            </div>
            <BookingForm hotel={hotel} onSuccess={() => navigate('/')} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelDetailPage;