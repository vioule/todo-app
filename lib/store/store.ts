import { combineSlices, configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./features/session/sessionSlice";

export const rootReducer = combineSlices(sessionSlice);

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
