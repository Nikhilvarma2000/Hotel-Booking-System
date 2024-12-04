export interface Hotel {
    id: number;
    name: string;
    location: string;
    price: number;
    description: string;
    image: string;
  }
  
  export interface Booking {
    id?: number;
    hotelId: number;
    guestName: string;
    checkInDate: string;
    checkOutDate: string;
    bookingDate: string;
  }