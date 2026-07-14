import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "@/interfaces/IUser";

interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
const userDataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, logout } = userDataSlice.actions;
export default userDataSlice.reducer;
