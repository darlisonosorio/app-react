import "@testing-library/jest-dom";
import { store, setLoggedUser, clearLoggedUser, type RootState } from './index';
import type { UserDetail } from '../models/userDetails';

describe('loggedUserSlice', () => {
  const user: UserDetail = {
    username: 'johndoe',
    email: 'john@example.com',
    full_name: 'John Doe',
    token: 'fake-token-123',
  };

  beforeEach(() => {
    localStorage.clear();
    store.dispatch(clearLoggedUser());
  });

  it('should set logged user', () => {
    store.dispatch(setLoggedUser(user));
    const state: RootState = store.getState();
    expect(state.loggedUser).toEqual(user);
    expect(localStorage.getItem('loggedUser')).toEqual(JSON.stringify(user));
  });

  it('should clear logged user', () => {
    store.dispatch(setLoggedUser(user));
    store.dispatch(clearLoggedUser());
    const state: RootState = store.getState();
    expect(state.loggedUser).toBeNull();
    expect(localStorage.getItem('loggedUser')).toBeNull();
  });
});
