import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { UserStateForm } from "./userTypes";

import { isAxiosError } from "axios";

const initialState: UserStateForm = {
  userEmail: "test@test.com",
  isFetchingUser: false,
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

export const fetchUser = createAsyncThunk(
  "portfolio/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/username");
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const portfolioSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {})
      .addCase(
        fetchUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            username: string;
          }>
        ) => {
          state.userEmail = action.payload.username;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {});
  },
});

export const {} = portfolioSlice.actions;
export default portfolioSlice.reducer;
