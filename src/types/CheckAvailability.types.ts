import { ReactNode } from 'react';

export type RoomOption = {
  id: string;
  name: string;
  occupancy: string;
  acType: 'Air-conditioned' | 'Non-AC';
  rate: number;
  image: string;
  badge: string;
  features: string[];
};

export type SearchFilter = {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
};

export type SelectedRoom = {
  room: RoomOption;
  nights: number;
  totalPrice: number;
} | null;

export type CustomQuoteFormData = {
  checkIn: Date | null;
  checkOut: Date | null;
  name: string;
  email: string;
  phone: string;
  people: number;
  reason: string;
};

export type CheckAvailabilityProps = {
  className?: string;
  children?: ReactNode;
};
