import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SessionUser = {
  id: string;
  email: string;
  username: string;
};

export interface ISessionState {
  user: SessionUser | null;
}

export const initialState: ISessionState = {
  user: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SessionUser>) {
      state.user = action.payload;
      return state;
    },
    disconnect() {
      return initialState;
    },
  },

  selectors: {
    selectUser: (state) => state.user,
  },
});

export const { setUser, disconnect } = sessionSlice.actions;
export const { selectUser } = sessionSlice.selectors;
export default sessionSlice;
