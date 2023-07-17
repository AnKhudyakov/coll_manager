import { createSlice } from "@reduxjs/toolkit";
import { setToken,unsetToken } from "@/helpers/auth";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, isAuth: false },
  reducers: {
    setCredentials: (state, { payload: data }) => {
      state.user = data.user;
      setToken(data);
      state.isAuth = true;
    },
    setLogout: (state) => {
      state.user = null;
      unsetToken();
      state.isAuth = false;
    },
  },
});

export const { setCredentials,setLogout} = slice.actions;

export default slice.reducer;

export const selectCurrentAuth = (state) => state.auth.isAuth;
export const selectCurrentUser = (state) => state.auth.user;
