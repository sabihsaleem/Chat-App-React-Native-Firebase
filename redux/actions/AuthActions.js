import React from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';



export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload, thunkAPI) => {
    console.log('payload: ', payload);
    AsyncStorage.getItem('@User').then(value => {
      let data = JSON.parse(value);
      let dataList = [];
      for (const element in data) {
        value = {...data[element], element};
        dataList.push(value);
      }
      console.log('dataList...', dataList);
    });
    let payload = dataList
    return payload;
  
    // return thunkAPI.rejectWithValue(msg)
  }
)


export const logout = createAsyncThunk(
  'auth/logout',
  async () => null
)
