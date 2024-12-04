import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaBed } from 'react-icons/fa';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      <div className="relative">
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name}
          className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full backdrop-blur-sm">
          <span className="flex items-center text-amber-500">
            <FaStar className="mr-1" />
            {hotel.rating}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>{hotel.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <FaBed className="mr-2" />
          <span>{hotel.availableRooms} rooms available</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold text-indigo-600">${hotel.pricePerNight}</span>
            <span className="text-gray-500 ml-1">/night</span>
          </div>
          <button
            onClick={() => navigate(`/hotel/${hotel.id}`)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;