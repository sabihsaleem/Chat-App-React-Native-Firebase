// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { logout, signIn, } from '../actions/AuthActions';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    // authData: null,
    // authToken: null,
    // showSplash: true,
    // error: null
  },
  reducers: {
    setAuthData: (state, action) => {
      // const authData = action.payload;
      // state.authData = authData;
      // if (authData && authData.Token) {
      //   const token = authData ? authData.Token.AccessToken : null;
      //   state.authToken = token;
      // }
      // state.showSplash = false
    },

  },
  extraReducers: {
    // signin action types
    // [signIn.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [signIn.fulfilled]: (state, action) => {
    //   if (action.payload) {
    //     state.authData = action.payload;
    //     state.authToken = action.payload.Token.AccessToken;
    //   }
    //   state.isLoading = false;
    // },
    // [signIn.rejected]: (state, action) => {
    //   state.authData = null;
    //   state.isLoading = false;
    //   state.error = action.payload
    // },
  }

})

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer
