import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { AuthStateForm } from "./AuthType";

const initialState: AuthStateForm = {
  accessToken: "",
  refreshToken: "",
  authLoading: false,
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

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const {} = AuthSlice.actions;
export default AuthSlice.reducer;
