import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { PortfolioStateForm, PortfolioDataForm } from "./PortfolioTypes";

import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { PassThrough } from "stream";

const initialState: PortfolioStateForm = {
  portfolio: [],
  remainToUpload: 3,
  selectedPortfolioIndex: null,
  isFetchingPortfolio: false,
  isAddingPortfolio: false,
  isUpdatingFeedback: false,
  youtubeURL: "https://youtu.be/wPdH7lJ8jf0",
  error: null,
};

const handleError = (error: unknown) => {
  console.log(error);
  if (isAxiosError(error)) {
    switch (error.code) {
      case "G001":
        return {
          errorMessage: "포트폴리오 컨텐츠가 CS와 관련이 없다고 판단되었습니다",
          statusCode: error.code,
        };
      case "G002":
        return {
          errorMessage: "질문 JSON 파싱 중 오류가 발생했습니다",
          statusCode: error.code,
        };
      case "G003":
        return {
          errorMessage: "질문 생성 중 오류가 발생했습니다",
          statusCode: error.code,
        };
      case "P004":
        return {
          errorMessage: "적절하지 않은 피드백입니다",
          statusCode: error.code,
        };
      case "P003":
        return {
          errorMessage: "일치하는 질문을 찾을 수 없습니다",
          statusCode: error.code,
        };
      case "P001":
        return {
          errorMessage: "포트폴리오를 찾을 수 없습니다.",
          statusCode: error.code,
        };
      case "P002":
        return {
          errorMessage: "포트폴리오에 접근할 수 없습니다",
          statusCode: error.code,
        };

      default:
        return {
          errorMessage: "Undefined Axios error occurred",
          statusCode: error.code,
        };
    }
  } else {
    return { errorMessage: "Unexpected error occurred" };
  }
};

export const fetchYoutubeURL = createAsyncThunk(
  "portfolio/fetchYoutubeURL",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/videos/random");
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// API에서 포트폴리오 데이터를 가져오는 비동기 thunk 생성
export const fetchRemaining = createAsyncThunk(
  "portfolio/fetchRemaining",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

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

      let attempts = 0;
      const maxRetries = 3;
      while (attempts < maxRetries) {
        try {
          const response = await api.post(
            "/portfolio",
            JSON.stringify({ content: newPortfolio })
          );

          const response2 = await api.get(
            "/portfolio/" + response.data.portfolioId
          );

          console.log(response);
          console.log(response2);
          let res = {
            remaining: response.data.remaining,
            portfolioId: response.data.portfolioId,
            portfolio: response2.data,
          };
          return res;
        } catch (error) {
          console.log(error);
          if (
            isAxiosError(error) &&
            error.response &&
            (error.response.data.status === "P001" ||
              error.response.data.status === "P002")
          ) {
            throw error;
          }
          if (
            isAxiosError(error) &&
            error.response &&
            (error.response.data.status === "G002" ||
              error.response.data.status === "G003")
          ) {
            console.log("질문 생성 재시도");
            attempts++;
            if (attempts >= maxRetries) {
              throw error;
            }
          } else {
            throw error;
          }
        }
      }
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
      .addCase(fetchYoutubeURL.pending, (state) => {})
      .addCase(
        fetchYoutubeURL.fulfilled,
        (
          state,
          action: PayloadAction<{
            title: string;
            url: string;
          }>
        ) => {
          state.youtubeURL = action.payload.url;
        }
      )
      .addCase(fetchYoutubeURL.rejected, (state, action) => {})
      .addCase(fetchRemaining.pending, (state) => {})
      .addCase(
        fetchRemaining.fulfilled,
        (
          state,
          action: PayloadAction<{
            remaining: number;
          }>
        ) => {
          state.remainToUpload = action.payload.remaining;
        }
      )
      .addCase(fetchRemaining.rejected, (state, action) => {
        state.remainToUpload = 0;
      })
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
      .addCase(addPortfolio.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action.payload);
        state.remainToUpload = action.payload.remaining;
        state.selectedPortfolioIndex = action.payload.portfolioId;
        state.portfolio = [action.payload.portfolio, ...state.portfolio];
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
