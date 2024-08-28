import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import {
  PortfolioStateForm,
  PortfolioDataForm,
} from "./types";

import { toast } from "react-toastify";

// API에서 포트폴리오 데이터를 가져오는 비동기 thunk 생성
export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetchPortfolio",
  async () => {
    const response = await api.get("/portfolio");
    console.log(response);
    return response.data;
  }
);

const initialState: PortfolioStateForm = {
  portfolio: [],
  selectedPortfolioIndex: null,
  loading: false, // 로딩 상태 추가
  error: null, // 오류 상태 추가
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setPortfolio(state, action: PayloadAction<PortfolioDataForm[]>) {
      state.portfolio = action.payload;
    },
    setSelectedPortfolioIndex(state, action: PayloadAction<number | null>) {
      state.selectedPortfolioIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 로딩 상태를 true로 설정
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // API 호출이 성공하면 데이터 저장 및 로딩 상태를 false로 설정
      .addCase(
        fetchPortfolio.fulfilled,
        (state, action: PayloadAction<PortfolioDataForm[]>) => {
          state.portfolio = action.payload;
          state.loading = false;
        }
      )
      // API 호출이 실패하면 오류 메시지 저장 및 로딩 상태를 false로 설정
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch portfolio";
        toast.error("포트폴리오 데이터를 가져오는데 실패했습니다.");
      });
  },
});

export const { setSelectedPortfolioIndex, setPortfolio } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
