import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "../utils/api";

export const register = createAsyncThunk(
  "registerAction",
  async (params, { rejectWithValue }) => {
    try {
      const response = await registerAPI(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Thunk failed");
    }
  }
);

export const login = createAsyncThunk(
  "loginAction",
  async (params, { rejectWithValue }) => {
    try {
      const response = await loginAPI(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Thunk failed");
    }
  }
);

const initState = {
  is_authenticated: !!localStorage.getItem("is_authenticated"),
  loading: false,
  payload: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logout(state) {
      state.is_authenticated = false;
      localStorage.removeItem("is_authenticated");
    },
    clearPayload(state) {
      state.payload = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.payload = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.payload = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.payload = action.payload.response.data;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.payload = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.is_authenticated = true;
        localStorage.setItem("is_authenticated", true);

        state.loading = false;
        state.payload = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.payload = action.payload.response.data;
      });
  },
});

export const { logout, clearPayload } = AuthSlice.actions;

export default AuthSlice.reducer;
