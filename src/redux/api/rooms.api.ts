import { TRoom } from "../../types/room.types";
import { baseApi } from "./baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllAvailableRooms: build.query({
      query: () => `/rooms`,
      providesTags: ["rooms"],
    }),
    getSingleRoom: build.query({
      query: (id: string) => `/room/${id}`,
      providesTags: ["room"],
    }),
    createRoom: build.mutation({
      query: (data: TRoom) => ({
        url: "/rooms/create-room",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rooms"],
    }),
    updateRoom: build.mutation({
      query: (data: { room: TRoom; id: string }) => ({
        url: `/rooms/${data.id}`,
        method: "PUT",
        body: data.room,
      }),
      invalidatesTags: ["rooms", "room"],
    }),
    deleteRoom: build.mutation({
      query: (id: string) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rooms", "room"],
    }),
  }),
});

export const {
    useCreateRoomMutation, 
    useDeleteRoomMutation, 
    useUpdateRoomMutation,
    useGetAllAvailableRoomsQuery,
    useGetSingleRoomQuery
} = roomApi