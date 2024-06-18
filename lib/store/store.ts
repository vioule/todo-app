import { combineSlices, configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./features/session/sessionSlice";
import overlaySlice from "./features/overlay/overlaySlice";

export const rootReducer = combineSlices(sessionSlice, overlaySlice);

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
