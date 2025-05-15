import {
  ingredientSlice,
  getIngredients,
  initialState
} from './ingredientSlice';

const ingredients = [
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  }
];

describe('Проверка работоспособности страницы с ингредиентами', () => {
  describe('Загрузка списка ингредиентов', () => {
    // Тест проверки состояния во время загрузки (pending)
    test('проверка загрузки', () => {
      const state = ingredientSlice.reducer(
        initialState,
        getIngredients.pending('pending')
      );

      expect(state.isLoading).toBe(true);
      expect(state.error).toBe(null);
    });

    // Тест проверки успешной загрузки (fulfilled)
    test('проверка успешной загрузки', () => {
      const state = ingredientSlice.reducer(
        initialState,
        getIngredients.fulfilled(ingredients, 'fulfilled')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.ingredients).toEqual(ingredients);
    });

    // Тест проверки ошибки при загрузке (rejected)
    test('проверка ошибки', () => {
      const errorMessage = 'error';
      const state = ingredientSlice.reducer(
        initialState,
        getIngredients.rejected(new Error(errorMessage), 'rejected')
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(errorMessage);
    });
  });
});
