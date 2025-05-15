import { TUser } from '@utils-types';
import {
  login,
  register,
  IUserState,
  userSlice,
  apiGetUser,
  updateUser,
  logout,
  initialState
} from './userSlice';

// Моковые данные пользователя
const mockUserData: TUser = {
  email: 'example@mail.ru',
  name: 'User'
};

// Моковый объект ошибки
const mockError = {
  message: 'Error message'
};

describe('Тестирование действий пользователя', () => {
  beforeAll(() => {
    // Моки функций localStorage
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  // Функция для проверки состояния
  const checkState = (testState: IUserState, expectedState: IUserState) => {
    expect(testState).toEqual(expectedState);
  };

  describe('Проверка работоспособности регистрации пользователя', () => {
    // Тест состояния pending при регистрации
    test('register.pending', () => {
      const action = { type: register.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, error: '' });
    });

    // Тест успешной регистрации (fulfilled)
    test('register.fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: { user: mockUserData }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserData,
        isAuthChecked: true,
        error: ''
      });
    });

    // Тест ошибки регистрации (rejected)
    test('register.rejected', () => {
      const action = {
        type: register.rejected.type,
        error: { message: mockError.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        error: mockError.message
      });
    });
  });

  describe('Проверка работоспособности авторизации пользователя', () => {
    // Тест состояния pending при авторизации
    test('login.pending', () => {
      const action = { type: login.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, error: '' });
    });

    // Тест успешной авторизации (fulfilled)
    test('login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: mockUserData }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: mockUserData,
        isAuthChecked: true,
        error: ''
      });
    });

    // Тест ошибки авторизации (rejected)
    test('login.rejected', () => {
      const action = {
        type: login.rejected.type,
        error: { message: mockError.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: mockError.message
      });
    });
  });

  describe('Проверка получения данных пользователя', () => {
    // Тест успешного получения данных (fulfilled)
    test('apiGetUser.fulfilled', () => {
      const action = {
        type: apiGetUser.fulfilled.type,
        payload: { user: mockUserData }
      };
      const newState = userSlice.reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        user: mockUserData,
        isAuthChecked: true
      });
    });

    // Тест ошибки при получении данных (rejected)
    test('apiGetUser.rejected', () => {
      const action = {
        type: apiGetUser.rejected.type,
        error: { message: mockError.message }
      };
      const newState = userSlice.reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: false,
        error: mockError.message
      });
    });
  });

  describe('Проверка обновления данных пользователя', () => {
    // Тест состояния pending при обновлении данных
    test('updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      expect(newState).toEqual({ ...initialState, error: '' });
    });

    // Тест успешного обновления данных (fulfilled)
    test('updateUser.fulfilled', () => {
      const updatedUser = { ...mockUserData, name: 'Updated Name' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: updatedUser }
      };
      const newState = userSlice.reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        user: updatedUser,
        isAuthChecked: true
      });
    });

    // Тест ошибки при обновлении данных (rejected)
    test('updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: mockError.message }
      };
      const newState = userSlice.reducer(initialState, action);
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: false,
        error: mockError.message
      });
    });
  });

  describe('Проверка выхода из системы', () => {
    // Тест успешного выхода (fulfilled)
    test('logout.fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUserData,
        isAuthChecked: true
      };
      const action = { type: logout.fulfilled.type };
      const newState = userSlice.reducer(stateWithUser, action);
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: false,
        user: { email: '', name: '' }
      });
    });
  });
});
