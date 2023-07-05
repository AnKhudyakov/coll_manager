import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "theme",
  initialState: { themeColor: "light" },
  reducers: {
    setThemeColor: (state, { payload: mode }) => {
      state.themeColor = mode;
    },
  },
});

export const { setThemeColor } = slice.actions;

export default slice.reducer;

export const selectCurrentThemeColor = (state) => state.auth.themeColor;
