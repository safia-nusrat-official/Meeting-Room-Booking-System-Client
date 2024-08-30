export interface TBooking {
  date: string;
  slots: string[];
  room: string;
  user: string;
  totalAmount?: number;
  isConfirmed?: "confirmed" | "unconfirmed" | "canceled";
  isDeleted?: boolean;
  _id?:string;
}
export type TBookingStatus = "confirmed" | "unconfirmed" | "canceled";
export type TStatusMap = {
  [key in TBookingStatus]: {
    [key in TBookingStatus]?: boolean;
  };
};
