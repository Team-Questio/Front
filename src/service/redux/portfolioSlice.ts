import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api";
import { PortfolioStateForm, PortfolioDataForm } from "./types";

import { toast } from "react-toastify";
import { Axios, AxiosError, isAxiosError } from "axios";

const handleError = (error: unknown) => {
  console.log(error);
  if (isAxiosError(error)) {
    const errorMessage =
      error.response?.data?.detail || "Undefined Axios error occurred";
    const statusCode = error.response?.data?.status || error.response?.status;
    return { errorMessage, statusCode };
  } else {
    return { errorMessage: "Unexpected error occurred" };
  }
};

// API에서 포트폴리오 데이터를 가져오는 비동기 thunk 생성
export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetchPortfolio",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/portfolio");
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const addPortfolio = createAsyncThunk(
  "portfolio/addPortfolio",
  async (newPortfolio: string, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/portfolio",
        JSON.stringify({ content: newPortfolio })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateFeedback = createAsyncThunk(
  "portfolio/updateFeedback",
  async (
    { questId, feedback }: { questId: number; feedback: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { portfolio: PortfolioStateForm };
      const selectedPortfolioIndex = state.portfolio.selectedPortfolioIndex;
      if (selectedPortfolioIndex === null)
        return rejectWithValue("No selected portfolio");
      const response = await api.patch(`/portfolio/quest/${questId}`, {
        feedback,
      });
      return { questId, feedback, selectedPortfolioIndex, data: response.data };
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const initialState: PortfolioStateForm = {
  portfolio: [],
  selectedPortfolioIndex: null,
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setSelectedPortfolioIndex(state, action: PayloadAction<number | null>) {
      state.selectedPortfolioIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPortfolio.fulfilled,
        (state, action: PayloadAction<PortfolioDataForm[]>) => {
          state.portfolio = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch portfolio";
        toast.error("포트폴리오 데이터를 가져오는데 실패했습니다.");
      })
      .addCase(addPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPortfolio.fulfilled, (state, action) => {
        // state.portfolio.push(action.payload);
        state.loading = false;
      })
      .addCase(addPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("포트폴리오 업로드에 실패했습니다.");
      })
      .addCase(updateFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateFeedback.fulfilled,
        (
          state,
          action: PayloadAction<{
            questId: number;
            feedback: number;
            selectedPortfolioIndex: number;
          }>
        ) => {
          const { questId, feedback, selectedPortfolioIndex } = action.payload;
          const portfolio = state.portfolio.find(
            (p) => p.portfolio.portfolioId === selectedPortfolioIndex
          );
          if (portfolio) {
            const quests = portfolio.quests.map((q) =>
              q.questId === questId ? { ...q, feedback } : q
            );
            portfolio.quests = quests;
          }
          state.loading = false;
        }
      )
      .addCase(updateFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error("피드백 업데이트에 실패했습니다.");
      });
  },
});

export const { setSelectedPortfolioIndex } = portfolioSlice.actions;
export default portfolioSlice.reducer;
