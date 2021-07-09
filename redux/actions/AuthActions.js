import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload, thunkAPI) => {
    console.log('payload: ', payload);
    return payload;
  
    // return thunkAPI.rejectWithValue(msg)
  }
)


export const logout = createAsyncThunk(
  'auth/logout',
  async () => null
)
