import { createSlice } from "@reduxjs/toolkit";

// initalState

const initialState = {
  accessToken: undefined,
  user: undefined,
};

//  create auth Slice

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    UserLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    UserLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { UserLoggedIn, UserLoggedOut } = authSlice.actions;

export default authSlice.reducer;
