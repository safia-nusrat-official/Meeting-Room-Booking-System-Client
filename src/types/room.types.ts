export interface TRoom {
  name: string;
  description: string;
  roomImages: string[];
  roomNo: number;
  rating: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted?: boolean;
  _id?: string;
}
