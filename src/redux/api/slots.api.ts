import { TSlot } from "../../types/slot.types";
import { baseApi } from "./baseApi";

const SlotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAvailableSlots: build.query({
      query: () => `/slots`,
      providesTags: ["slots"],
    }),
    getSingleSlot: build.query({
      query: (id: string) => `/slot/${id}`,
      providesTags: ["slot"],
    }),
    createSlot: build.mutation({
      query: (data: TSlot) => ({
        url: "/slots/create-slot",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["slots"],
    }),
    updateSlot: build.mutation({
      query: (data: { Slot: TSlot; id: string }) => ({
        url: `/slots/${data.id}`,
        method: "PUT",
        body: data.Slot,
      }),
      invalidatesTags: ["slots", "slot"],
    }),
    deleteSlot: build.mutation({
      query: (id: string) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["slots", "slot"],
    }),
  }),
});

export const {
    useCreateSlotMutation, 
    useDeleteSlotMutation, 
    useUpdateSlotMutation,
    useGetAllAvailableSlotsQuery,
    useGetSingleSlotQuery
} = SlotApi