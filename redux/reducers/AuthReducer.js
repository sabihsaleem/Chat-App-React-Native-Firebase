// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { logout, signIn, } from '../actions/AuthActions';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    authData: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      const authData = action.payload;
      state.authData = authData;
      state.isLoading = true;
    },

  },
  // extraReducers: {
  //   // signin action types
  //   [signIn.fulfilled]: (state, action) => {
  //     if (action.payload) {
  //       state.authData = action.payload;
  //     }
  //     state.isLoading = true;
  //   },
  // }
  
})

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer
