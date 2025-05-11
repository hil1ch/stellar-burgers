import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export interface IOrderState {
  orders: Array<TOrder>;
  isLoading: boolean;
}

export const getOrders = createAsyncThunk('order/byUser', getOrdersApi);

const initialState: IOrderState = {
  orders: [],
  isLoading: true
};

export const userOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},

  selectors: {
    getOrdersList: (state) => state.orders
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  }
});

export const { getOrdersList } = userOrderSlice.selectors;
