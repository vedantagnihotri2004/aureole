import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    updateUserProfile: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUserProfile,
  setUser,
  clearError
} = authSlice.actions;

export default authSlice.reducer;
