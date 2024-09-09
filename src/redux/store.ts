import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolio/portfolioSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    user: userSlice,
  },
});

// RootState와 AppDispatch 타입을 추출하여 사용
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
