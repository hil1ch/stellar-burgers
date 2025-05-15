import { feedSlice, getFeeds, initialState } from './feedSlice';

const feedsValue = {
  orders: [],
  total: 1,
  totalToday: 1,
  success: true
};

describe('Проверка работоспособности страницы со всеми заказами', () => {
  describe('Загрузка списка заказов', () => {
    // Тест проверки состояния во время загрузки (pending)
    test('Проверка загрузки', () => {
      const state = feedSlice.reducer(
        initialState,
        getFeeds.pending('pending')
      );

      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(undefined);
    });

    // Тест проверки успешной загрузки (fulfilled)
    test('Проверка успешной загрузки', () => {
      const state = feedSlice.reducer(
        initialState,
        getFeeds.fulfilled(feedsValue, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(undefined);
      expect(state.orders).toEqual(feedsValue.orders);
      expect(state.totalFeeds).toEqual(feedsValue.total);
      expect(state.totalFeedsToday).toEqual(feedsValue.totalToday);
    });

    // Тест проверки ошибки при загрузке (rejected)
    test('Проверка ошибки', () => {
      const errorMessage = 'error';
      const state = feedSlice.reducer(
        initialState,
        getFeeds.rejected(new Error(errorMessage), 'rejected')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(errorMessage);
    });
  });
});
