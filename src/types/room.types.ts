export interface TRoom {
  name: string;
  roomImages: string[];
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted?: boolean;
  _id?:string;
}
