import React from 'react';
import { FaSearch, FaDollarSign, FaStar } from 'react-icons/fa';

const SearchFilters = ({ onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search hotels..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => onFilterChange('priceRange', e.target.value)}
        >
          <option value="">Price Range</option>
          <option value="0-100">$0 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201+">$201+</option>
        </select>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => onFilterChange('rating', e.target.value)}
        >
          <option value="">Rating</option>
          <option value="4.5+">4.5+ ⭐</option>
          <option value="4+">4.0+ ⭐</option>
          <option value="3+">3.0+ ⭐</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters