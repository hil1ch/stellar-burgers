import { newOrderSlice, createNewOrder, initialState } from './newOrderSlice';

const order = {
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
};

describe('Проверка работоспособности создания заказа', () => {
  describe('Проверка создания', () => {
    // Тест проверки состояния во время отправки запроса (pending)
    test('проверка загрузки запроса на создание заказа', () => {
      const state = newOrderSlice.reducer(
        initialState,
        createNewOrder.pending('pending', [])
      );

      expect(state.orderRequest).toBe(true);
    });

    // Тест проверки успешного создания заказа (fulfilled)
    test('проверка успешного создания заказа', () => {
      const state = newOrderSlice.reducer(
        initialState,
        createNewOrder.fulfilled(
          { order, success: true, name: '' },
          'fulfilled',
          []
        )
      );

      expect(state.orderModal).toBe(order);
      expect(state.error).toBe(undefined);
    });

    // Тест проверки ошибки при создании заказа (rejected)
    test('проверка ошибки создания заказа', () => {
      const errorMessage = 'error';
      const state = newOrderSlice.reducer(
        initialState,
        createNewOrder.rejected(new Error(errorMessage), 'rejected', [])
      );

      expect(state.error).toEqual(errorMessage);
    });
  });
});
