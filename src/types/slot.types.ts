export interface TSlot {
  room: string | any;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
  isDeleted?: boolean;
  _id?: string;
}
