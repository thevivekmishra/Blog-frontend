// store/index.jsx
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
