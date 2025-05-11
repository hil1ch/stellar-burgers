import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export interface IIngredientState {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  error: string | null | undefined;
}

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

const initialState: IIngredientState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},

  selectors: {
    getIngredientsList: (state) => state.ingredients,
    getIngredientsState: (state) => state,
    getIngerdientsLoading: (state) => state.isLoading
  },

  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  getIngredientsState,
  getIngredientsList,
  getIngerdientsLoading
} = ingredientSlice.selectors;
