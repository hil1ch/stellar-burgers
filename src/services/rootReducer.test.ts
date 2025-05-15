import { expect, test } from '@jest/globals';
import store from './store';

describe('Проверка корректности работы root-reducer', () => {
  test('Проверка состояния по умолчанию', () => {
    const initialState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: undefined });

    expect(store.getState()).toEqual(initialState);
  });
});
