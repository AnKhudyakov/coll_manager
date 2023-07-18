import { unsetToken } from "@/helpers/auth";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, isAuth: false, refresh: false, relogin: false },
  reducers: {
    setCredentials: (state, { payload: data }) => {
      state.user = data.user;
      state.isAuth = true;
    },
    setLogout: (state) => {
      state.user = null;
      unsetToken();
      state.isAuth = false;
    },
    setRefresh: (state, { payload: refresh }) => {
      state.refresh = refresh;
    },
    setRelogin: (state, { payload: relogin }) => {
      state.relogin = relogin;
    },
  },
});

export const { setCredentials, setLogout, setRefresh, setRelogin } =
  slice.actions;

export default slice.reducer;

export const selectCurrentAuth = (state) => state.auth.isAuth;
export const selectCurrentUser = (state) => state.auth.user;
export const selectRelogin = (state) => state.auth.relogin;
export const selectRefresh = (state) => state.auth.refresh;
