import { TRoom } from "../../types/room.types";
import { baseApi } from "./baseApi";

export type TQueryArgs = {
  key: string;
  value: string;
};

const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAvailableRooms: build.query({
      query: (args: TQueryArgs[]) => {
        const params = new URLSearchParams();
        if (args.length) {
          args.forEach((arg) => params.append(`${arg.key}`, `${arg.value}`));
        }

        return {
          url: `/rooms`,
          method: "GET",
          params,
        };
      },
      providesTags: ["rooms"],
    }),
    getSingleRoom: build.query({
      query: (id: string) => ({
        url: `/rooms/${id}`,
        method: "GET",
      }),
      providesTags: ["room"],
    }),
    createRoom: build.mutation({
      query: (data: TRoom) => ({
        url: "/rooms/create-room",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rooms", "slots", "slot"],
    }),
    updateRoom: build.mutation({
      query: (data: { room: TRoom; id: string }) => ({
        url: `/rooms/${data.id}`,
        method: "PUT",
        body: data.room,
      }),
      invalidatesTags: ["room", "rooms"],
    }),
    deleteRoom: build.mutation({
      query: (id: string) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rooms", "room", "slots"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
  useGetAllAvailableRoomsQuery,
  useGetSingleRoomQuery,
} = roomApi;
