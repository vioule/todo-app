import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type OverlayValue = "create" | "update" | "delete" | null;

export interface IOverlayState {
  value: OverlayValue;
  taskId: string;
  loading: boolean;
}

export const overlayInitialState: IOverlayState = {
  value: null,
  taskId: "",
  loading: false,
};

const overlaySlice = createSlice({
  name: "overlay",
  initialState: overlayInitialState,
  reducers: {
    setOverlayValue(state, action: PayloadAction<OverlayValue>) {
      state.value = action.payload;
      return state;
    },
    setOverlayTaskId(state, action: PayloadAction<string>) {
      state.taskId = action.payload;
      return state;
    },
    setOverlayLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      return state;
    },
  },

  selectors: {
    selectOverlay: (state) => state,
    selectOverlayValue: (state) => state.value,
    selectOverlayTaskId: (state) => state.taskId,
    selectOverlayLoading: (state) => state.loading,
  },
});

export const { setOverlayValue, setOverlayTaskId, setOverlayLoading } =
  overlaySlice.actions;
export const {
  selectOverlay,
  selectOverlayValue,
  selectOverlayTaskId,
  selectOverlayLoading,
} = overlaySlice.selectors;
export default overlaySlice;
