import {
  addItem,
  deleteItem,
  clearAll,
  updateAll,
  burgerConstructorSlice,
  initialState
} from './burgerConstructorSlice';

// Тестовые данные для булки
const testBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

// Тестовые данные для первого ингредиента
const ingredientFirst = {
  calories: 4242,
  carbohydrates: 242,
  fat: 142,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  name: 'Биокотлета из марсианской Магнолии',
  price: 424,
  proteins: 420,
  type: 'main',
  __v: 0,
  _id: '643d69a5c3f7b9001cfa0941'
};

// Тестовые данные для второго ингредиента
const ingredientSecond = {
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
};

describe('Проверка работоспособности создания бургера', () => {
  describe('Добавление ингредиента', () => {
    test('проверка добавления булки', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        addItem(testBun)
      );
      // Проверяем, что булка добавилась
      expect(state.bun).toEqual(testBun);
      expect(state.ingredients).toHaveLength(0);
    });

    test('проверка добавления ингредиента', () => {
      const state = burgerConstructorSlice.reducer(
        initialState,
        addItem(ingredientFirst)
      );
      expect(state.bun).toBe(null);

      // Проверяем, что ингредиент добавился в массив
      expect(state.ingredients).toEqual([ingredientFirst]);
    });
  });

  describe('Удаление ингредиетна', () => {
    test('проверка на отсутствие ингредиентов', () => {
      const state = burgerConstructorSlice.reducer(
        {
          ...initialState,
          ingredients: [ingredientFirst]
        },
        deleteItem(ingredientFirst)
      );
      // Проверяем, что массив ингредиентов пуст
      expect(state.ingredients).toEqual([]);
    });
  });

  describe('Порядок ингредиентов', () => {
    test('проверка на изменение порядка ингредиентов', () => {
      const state = burgerConstructorSlice.reducer(
        {
          ...initialState,
          ingredients: [ingredientFirst, ingredientSecond]
        },
        updateAll([ingredientSecond, ingredientFirst])
      );
      // Проверяем, что порядок изменился
      expect(state.ingredients).toEqual([ingredientSecond, ingredientFirst]);
    });
  });

  describe('Очистка', () => {
    test('проверка очистки', () => {
      const state = burgerConstructorSlice.reducer(
        {
          ...initialState,
          ingredients: [ingredientFirst, ingredientSecond]
        },
        clearAll()
      );
      // Проверяем, что состояние вернулось к начальному
      expect(state).toEqual(initialState);
    });
  });
});
