"use client";
import { Provider } from "react-redux";
import { RootState, rootReducer } from "@/lib/store/store";
import { configureStore } from "@reduxjs/toolkit";

export default function StoreProvider({
  children,
  preloadedState,
}: Readonly<{
  children: React.ReactNode;
  preloadedState: RootState;
}>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return <Provider store={store}>{children}</Provider>;
}
