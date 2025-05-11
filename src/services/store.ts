import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { userSlice } from './slices/userSlice';
import { userOrderSlice } from './slices/userOrderSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { newOrderSlice } from './slices/newOrderSlice';
import { feedSlice } from './slices/feedSlice';
import { ingredientSlice } from './slices/ingredientSlice';

// Корневой редьюсер, объединяющего все слайсы
const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userOrderSlice.name]: userOrderSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [ingredientSlice.name]: ingredientSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
