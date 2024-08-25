import { TLoginData } from "../../types/user.types";
import { TUser } from "../features/authSlice";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login:build.mutation({
        query:(data:TLoginData)=>({
            url:`/auth/login`,
            method:"POST",
            body:data
        })
    }),
    signup:build.mutation({
        query:(data:TUser)=>({
            url:`/auth/signup`,
            method:"POST",
            body:data
        })
    }),
    logout:build.query({
        query:()=>`/auth/logout`
    }),
  }),
});

export const {
    useLoginMutation,
    useLogoutQuery,
    useSignupMutation
} = authApi