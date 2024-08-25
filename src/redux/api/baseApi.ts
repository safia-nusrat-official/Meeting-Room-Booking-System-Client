import {
    createApi,
    fetchBaseQuery
  } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({baseUrl:`https://meeting-room-booking-system-phi.vercel.app/api/`}),
    endpoints: () => ({}),
    tagTypes: [
      "bookings",
      "booking",
  
      "slots",
      "slot",
  
      "rooms",
      "room",
  
      "users",
      "user"
    ],
  });
  