import { userOrderSlice, getOrders, initialState } from './userOrderSlice';

const orders = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945'
    ],
    _id: '6752109fe367de001daf72bf',
    status: 'done',
    name: 'EXAMPLE_NAME',
    createdAt: '2024-12-05T20:44:15.281Z',
    updatedAt: '2024-12-05T20:44:16.136Z',
    number: 61705
  }
];

describe('Проверка появления созданного заказа пользователя', () => {
  describe('Проверка загрузки заказов пользователя', () => {
    test('проверка загрузки', () => {
      // Тест проверки состояния во время загрузки (pending)
      const state = userOrderSlice.reducer(
        initialState,
        getOrders.pending('pending')
      );

      expect(state.isLoading).toBe(true);
    });

    // Тест проверки успешной загрузки (fulfilled)
    test('проверка успешной загрузки', () => {
      const state = userOrderSlice.reducer(
        initialState,
        getOrders.fulfilled(orders, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(orders);
    });

    // Тест проверки ошибки при загрузке (rejected)
    test('проверка ошибки', () => {
      const errorMessage = 'error';
      const state = userOrderSlice.reducer(
        initialState,
        getOrders.rejected(new Error(errorMessage), 'rejected')
      );

      expect(state.isLoading).toBe(false);
    });
  });
});
