import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'; // Missing import
import userReducer from './user/userSlice';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Good to keep if using redux-persist
    }),
});

export const persistor = persistStore(store);
