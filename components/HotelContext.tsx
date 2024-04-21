import React, { createContext, useState } from 'react';
import { Hotel } from './Interface';

// Määrittele tyypit
type HotelContextType = {
  hotels: Hotel[];
  setHotels: React.Dispatch<React.SetStateAction<Hotel[]>>;
};

// Luo Context
export const HotelContext = createContext<HotelContextType>({
  hotels: [],
  setHotels: () => {},
});