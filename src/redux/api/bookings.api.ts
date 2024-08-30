import { TBooking } from "../../types/booking.types";
import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBookings: build.query({
      query: () => `/bookings`,
      providesTags: ["bookings"],
    }),
    getASingleBooking: build.query({
      query: (id: string) => `/bookings/${id}`,
      providesTags: ["booking"],
    }),
    getMyBookings: build.query({
      query: () => `/bookings/my-bookings?isDeleted=false`,
      providesTags: ["my-bookings"],
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
      query: (data: { booking: TBooking; id: string }) => ({
        url: `/bookings/${data.id}`,
        method: "PUT",
        body: data.booking,
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
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useGetASingleBookingQuery
} = bookingApi;
