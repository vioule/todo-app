import { TTask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type OverlayValue = "create" | "update" | "delete" | null;

export interface IOverlayState {
  value: OverlayValue;
  task: TTask | null;
  loading: boolean;
}

export const overlayInitialState: IOverlayState = {
  value: null,
  task: null,
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
    setOverlayTask(state, action: PayloadAction<TTask | null>) {
      state.task = action.payload;
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
    selectOverlayTask: (state) => state.task,
    selectOverlayTaskId: (state) => state.task?._id,
    selectOverlayLoading: (state) => state.loading,
  },
});

export const { setOverlayValue, setOverlayTask, setOverlayLoading } =
  overlaySlice.actions;
export const {
  selectOverlay,
  selectOverlayValue,
  selectOverlayTask,
  selectOverlayTaskId,
  selectOverlayLoading,
} = overlaySlice.selectors;
export default overlaySlice;
