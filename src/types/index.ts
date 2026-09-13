// Centralized Application Types

export type RoomCardData = {
  id: string;
  occupancy: string;
  title: string;
  badge?: string;
  badgeStyle?: string;
  description: string;
  image: string;
  nonAcPrice: number;
  acPrice: number;
  features: string[];
};

export type SelectedTypesState = {
  [key: string]: 'ac' | 'nonac';
};

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

export type StayItem = {
  tag: string;
  title: string;
  description: string;
  image: string;
};

export type AmenityData = {
  id: string;
  title: string;
  description: string;
};
