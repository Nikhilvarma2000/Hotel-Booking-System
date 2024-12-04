import { create } from 'zustand';

const useHotelStore = create((set) => ({
  selectedHotel: null,
  bookingDetails: null,
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
  setBookingDetails: (details) => set({ bookingDetails: details }),
  clearBooking: () => set({ selectedHotel: null, bookingDetails: null }),
}));

export default useHotelStore;