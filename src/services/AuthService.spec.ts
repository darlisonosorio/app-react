import "@testing-library/jest-dom";

jest.mock('../constants', () => ({
  VITE_API_URL: 'http://localhost:3000',
}));

import AuthService from './AuthService';
import type { Login } from '../models/login';
import type { UserDetail } from '../models/userDetails';
import BaseService from './BaseService';

describe('AuthService login', () => {
  it('returns user data', async () => {
    const mockUser: UserDetail = {
      username: 'johndoe',
      email: 'john@example.com',
      full_name: 'John Doe',
      created_at: new Date(),
      updated_at: new Date(),
      token: 'fake-token',
    };

    const postMock = jest
      .spyOn(BaseService.prototype as any, 'post')
      .mockResolvedValue({ data: mockUser } as any);

    const loginData: Partial<Login> = { username: 'johndoe', password: '1234' };
    const response = await AuthService.login(loginData);

    expect(postMock).toHaveBeenCalledWith('/login', loginData);
    expect(response).toEqual(mockUser);

    postMock.mockRestore();
  });
});
