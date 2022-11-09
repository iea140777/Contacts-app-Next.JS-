import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import loaderReducer from "./loaderSlice";
import { userApi } from "./UserApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
