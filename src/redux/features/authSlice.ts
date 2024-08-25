import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import LogoutFromLS from "../../utility/authUtils/LogoutFromLS";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
export interface IAuthState {
  user: null | TUser;
  token: null | string;
}
const initialState: IAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      LogoutFromLS();
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const getAccessToken = (state: RootState) => state.auth.token;
export const getUser = (state: RootState) => state.auth.user;
