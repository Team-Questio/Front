import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolioSlice";

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
});

// RootState와 AppDispatch 타입을 추출하여 사용
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
