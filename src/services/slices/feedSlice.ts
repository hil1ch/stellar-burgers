import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

export interface IFeedState {
  orders: Array<TOrder>;
  totalFeeds: number;
  totalFeedsToday: number;
  isLoading: boolean;
  error: string | undefined;
}

export const getFeeds = createAsyncThunk('orders/feeds', getFeedsApi);

export const initialState: IFeedState = {
  orders: [],
  totalFeeds: 0,
  totalFeedsToday: 0,
  isLoading: true,
  error: undefined
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},

  selectors: {
    getFeedsList: (state) => state.orders,
    getTotalFeeds: (state) => state.totalFeeds,
    getTotalTodayFeeds: (state) => state.totalFeedsToday
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })

      .addCase(getFeeds.rejected, (state, action) => {
        state.orders = [];
        state.totalFeeds = 0;
        state.totalFeedsToday = 0;
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalFeeds = action.payload.total;
        state.totalFeedsToday = action.payload.totalToday;
        state.isLoading = false;
      });
  }
});

export const { getFeedsList, getTotalFeeds, getTotalTodayFeeds } =
  feedSlice.selectors;
