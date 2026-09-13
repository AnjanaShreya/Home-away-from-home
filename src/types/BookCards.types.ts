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
