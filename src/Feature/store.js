import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice/user-slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'main',
  version: 1,
  storage,
};
const mainReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const localData = persistStore(store);