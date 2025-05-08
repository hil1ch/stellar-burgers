import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export interface INewOrderState {
  orderRequest: boolean;
  orderModal: TOrder | null;
  error: string | undefined;
}

export const createNewOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

const initialState: INewOrderState = {
  orderRequest: false,
  orderModal: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,

  reducers: {
    resetOrder: () => initialState
  },

  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModal: (state) => state.orderModal
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
      })

      .addCase(createNewOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModal = action.payload.order;
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const { getOrderRequest, getOrderModal } = newOrderSlice.selectors;
