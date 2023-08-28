import { configureStore , combineReducers} from '@reduxjs/toolkit';
import authReducer from "./features/auth/user.slice";
import productReducer from "./features/products/product.slice";

import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore, createTransform } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage:storageSession,
}

const rootReducer = combineReducers({ 
  auth:authReducer,
    product:productReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
  })
});

export const persistor = persistStore(store)