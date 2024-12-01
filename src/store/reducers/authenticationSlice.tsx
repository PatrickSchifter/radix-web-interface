import { createSlice } from "@reduxjs/toolkit";

export interface IAuthenticationState {
  user_id: number | null;
  access_token: string | null;
  expires_at: number;
}

const initialState = {
  user_id: null,
  access_token: null,
  expires_at: new Date().getTime(),
} as IAuthenticationState;

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      if (action.payload.access_token) {
        state.user_id = action.payload.user_id;
        state.access_token = action.payload.access_token;
        state.expires_at = action.payload.expires_at;
      } else {
        state.user_id = null;
        state.access_token = null;
        state.expires_at = new Date().getTime();
      }
    },
    removeAccessToken: (state) => {
      state.user_id = null;
      state.access_token = null;
      state.expires_at = new Date().getTime();
    },
  },
});

export const { setAccessToken, removeAccessToken } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
