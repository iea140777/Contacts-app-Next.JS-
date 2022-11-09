import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface LoaderSlice {
  isLoading: boolean;
}

const initialState: LoaderSlice = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

const { setIsLoading } = loaderSlice.actions;

const selectLoader = (state: RootState) => state.loader;

export default loaderSlice.reducer;

export { loaderSlice, setIsLoading, selectLoader };
