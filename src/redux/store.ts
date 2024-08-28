import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER } from "redux-persist";
import authReducer from "./features/authSlice"
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};
const persistAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:[FLUSH, REHYDRATE, PERSIST, PAUSE, PURGE, REGISTER]
      }
    }).concat(baseApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const persistor = persistStore(store)