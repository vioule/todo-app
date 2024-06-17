import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type OverlayValue = "create" | "update" | "delete" | null;

export interface IOverlayState {
  value: OverlayValue;
  loading: boolean;
}

export const overlayInitialState: IOverlayState = {
  value: null,
  loading: false,
};

const overlaySlice = createSlice({
  name: "overlay",
  initialState: overlayInitialState,
  reducers: {
    setValue(state, action: PayloadAction<OverlayValue>) {
      state.value = action.payload;
      return state;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      return state;
    },
  },

  selectors: {
    selectOverlay: (state) => state,
    selectValue: (state) => state.value,
    selectLoading: (state) => state.loading,
  },
});

export const { setValue, setLoading } = overlaySlice.actions;
export const { selectOverlay, selectValue, selectLoading } =
  overlaySlice.selectors;
export default overlaySlice;
