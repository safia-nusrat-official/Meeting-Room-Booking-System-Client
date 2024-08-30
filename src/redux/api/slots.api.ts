import { TSlot } from "../../types/slot.types";
import { baseApi } from "./baseApi";
import { TQueryArgs } from "./rooms.api";

const SlotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAvailableSlots: build.query({
      query: (args: TQueryArgs[]) => {
        const params = new URLSearchParams();
        if (args.length) {
          args.forEach((arg) => params.append(`${arg.key}`, `${arg.value}`));
        }

        return {
          url: `/slots/availability`,
          method: "GET",
          params,
        };
      },
      providesTags: ["slots"],
    }),
    getAllSlots: build.query({
      query: (args: TQueryArgs[]) => {
        const params = new URLSearchParams();
        if (args.length) {
          args.forEach((arg) => params.append(`${arg.key}`, `${arg.value}`));
        }

        return {
          url: `/slots`,
          method: "GET",
          params,
        };
      },
      providesTags: ["slots"],
    }),
    getSlotsOfARoom: build.query({
      query: ({
        id,
        isBooked,
        args,
      }: {
        id: string;
        args?: TQueryArgs[];
        isBooked?: string | boolean;
      }) => {
        const params = new URLSearchParams();

        params.append("room", id);
        isBooked && params.append("isBooked", `${isBooked}`);
        
        if(args && args.filter(item=>item.key==="date").length && !(args.filter(item=>item.key==="date")[0].value)){
          args = args.filter(item=>item.key!=="date")
        }

        if (args && args.length) {
          args.forEach((arg) => {
            params.append(`${arg.key}`, `${arg.value}`);
          });
        }
        
        return {
          url: `/slots/availability`,
          method: "GET",
          params,
        };
      },
      providesTags: ["slot"],
    }),

    getSingleSlot: build.query({
      query: (id: string) => `/slots/${id}`,
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
      query: (data: { slot: TSlot; id: string }) => ({
        url: `/slots/${data.id}`,
        method: "PUT",
        body: data.slot,
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
  useGetAllSlotsQuery,
  useGetSlotsOfARoomQuery,
  useGetSingleSlotQuery,
} = SlotApi;
