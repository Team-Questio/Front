import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { PortfolioStateForm, PortfolioDataForm } from "./PortfolioTypes";

import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const initialState: PortfolioStateForm = {
  portfolio: [],
  remainToUpload: 3,
  selectedPortfolioIndex: null,
  isFetchingPortfolio: false,
  isAddingPortfolio: false,
  isUpdatingFeedback: false,
  error: null,
};

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
  async (newPortfolio: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { portfolio: PortfolioStateForm };
      if (state.portfolio.remainToUpload < 1) {
        return rejectWithValue({
          errorMessage: "업로드 횟수를 모두 사용했어요",
        });
      }

      const response = await api.post(
        "/portfolio",
        JSON.stringify({ content: newPortfolio })
      );
      console.log(response);
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
        state.isFetchingPortfolio = true;
        state.error = null;
      })
      .addCase(
        fetchPortfolio.fulfilled,
        (state, action: PayloadAction<PortfolioDataForm[]>) => {
          state.portfolio = action.payload;
          state.isFetchingPortfolio = false;
        }
      )
      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.isFetchingPortfolio = false;
        state.error = action.error.message || "Failed to fetch portfolio";
        toast.error(state.error);
      })
      .addCase(addPortfolio.pending, (state) => {
        state.isAddingPortfolio = true;
        state.error = null;
      })
      .addCase(addPortfolio.fulfilled, (state, action) => {
        // TODO: 업로드된 포폴 내용 및 질문 업데이트
        state.remainToUpload -= 1;
        state.isAddingPortfolio = false;
      })
      .addCase(addPortfolio.rejected, (state, action) => {
        state.isAddingPortfolio = false;
        state.error = action.error || "Failed to fetch portfolio";
      })
      .addCase(updateFeedback.pending, (state) => {
        state.isUpdatingFeedback = true;
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
              q.questId === questId
                ? {
                    ...q,
                    feedback:
                      feedback === 1
                        ? "GOOD"
                        : feedback === -1
                        ? "BAD"
                        : undefined,
                  }
                : q
            );
            portfolio.quests = quests;
          }
          state.isUpdatingFeedback = false;
        }
      )
      .addCase(updateFeedback.rejected, (state, action) => {
        state.isUpdatingFeedback = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedPortfolioIndex } = portfolioSlice.actions;
export default portfolioSlice.reducer;
