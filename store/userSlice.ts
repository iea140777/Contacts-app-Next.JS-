import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserId } from "../utils/types";
import { RootState } from "./store";

interface UserSlice {
  isAuthorized: boolean;
  userId: UserId;
  userName: string;
}

const initialState: UserSlice = {
  isAuthorized: false,
  userId: undefined,
  userName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setUserId: (state, action: PayloadAction<UserId>) => {
      state.userId = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    logout: () => initialState,
  },
});

const { setIsAuthorized, setUserId, setUserName, logout } = userSlice.actions;

const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

export {
  userSlice,
  setIsAuthorized,
  setUserId,
  setUserName,
  logout,
  selectUser,
};
