import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { productReducer } from './slices/products';
import { detailReducer } from './slices/details';
import { authReducer } from './slices/auth';

const rootReducer = combineReducers({
  product: productReducer,
  detail: detailReducer,
  auth: authReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
