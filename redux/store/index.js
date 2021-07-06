import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import AuthReducer from '../reducers/AuthReducer';

const logger = createLogger({
    duration: false,// print the duration of each action?
    timestamp: false, // print the timestamp with each action?,
});

export default configureStore({
    reducer: {
        Auth: AuthReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  })