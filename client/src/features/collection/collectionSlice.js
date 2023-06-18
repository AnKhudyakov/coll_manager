import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "collection",
  initialState: { userCollections: [] },
  reducers: {
    setUserCollections: (state, { payload: userCollections }) => {
      state.userCollections = userCollections;
    },
  },
});

export const { setUserCollections } = slice.actions;

export default slice.reducer;

export const selectUserCollections = (state) =>
  state.collection.userCollections;
