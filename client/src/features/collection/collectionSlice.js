import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "collection",
  initialState: { userCollections: [], isUpdateItems: false },
  reducers: {
    setUserCollections: (state, { payload: userCollections }) => {
      state.userCollections = userCollections;
    },
    setUpdateItems: (state) => {
      state.isUpdateItems = !state.isUpdateItems;
    },
  },
});

export const { setUserCollections, setUpdateItems } = slice.actions;

export default slice.reducer;

export const selectUserCollections = (state) =>
  state.collection.userCollections;
export const selectIsUpdateItems = (state) => state.collection.isUpdateItems;
