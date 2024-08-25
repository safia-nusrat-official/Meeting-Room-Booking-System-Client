import { TBooking } from "../../types/booking.types";
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAvailableBookings: build.query({
      query: () => `/bookings`,
      providesTags: ["bookings"],
    }),
    getSingleBooking: build.query({
      query: (id: string) => `/booking/${id}`,
      providesTags: ["booking"],
    }),
    createBooking: build.mutation({
      query: (data: TBooking) => ({
        url: "/bookings/create-booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    updateBooking: build.mutation({
      query: (data: { Booking: TBooking; id: string }) => ({
        url: `/bookings/${data.id}`,
        method: "PUT",
        body: data.Booking,
      }),
      invalidatesTags: ["bookings", "booking"],
    }),
    deleteBooking: build.mutation({
      query: (id: string) => ({
        url: `/Bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookings", "booking"],
    }),
  }),
});

export const {
    useCreateBookingMutation, 
    useDeleteBookingMutation, 
    useUpdateBookingMutation,
    useGetAllAvailableBookingsQuery,
    useGetSingleBookingQuery
} = bookingApi