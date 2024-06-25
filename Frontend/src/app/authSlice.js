import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  fullName: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.fullName = action.payload.fullName;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.fullName = '';
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
