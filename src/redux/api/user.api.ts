import { TUser } from "../../types/user.types";
import { baseApi } from "./baseApi";

export type TQueryArgs = {
  key: string;
  value: string;
};

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (args: TQueryArgs[]) => {
        const params = new URLSearchParams();
        if (args.length) {
          args.forEach((arg) => params.append(`${arg.key}`, `${arg.value}`));
        }

        return {
          url: `/users`,
          method: "GET",
          params,
        };
      },
      providesTags: ["users"],
    }),
    getSingleUser: build.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    
    updateUser: build.mutation({
      query: ({id, formData}:{id:string, formData:FormData}) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["user", "users"],
    }),

    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `/Users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users", "user", "slots"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation
} = userApi;
