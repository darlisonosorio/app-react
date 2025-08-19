import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('../constants', () => ({
  VITE_API_URL: 'http://localhost:3000',
}));

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { toast } from 'react-toastify';
import LoginPage from './Login';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../services/AuthService');
jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

describe('LoginPage', () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useNavigate as unknown as jest.Mock).mockReturnValue(navigateMock);
  });

  it('toggles password visibility', () => {
    render(<LoginPage />);
    const toggle = screen.getByTestId('toggle-password');
    const passwordInput = screen.getByPlaceholderText('Senha') as HTMLInputElement;

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggle);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggle);
    expect(passwordInput.type).toBe('password');
  });

  it('submits the form successfully', async () => {
    (AuthService.login as jest.Mock).mockResolvedValue({ username: 'john', full_name: 'John Doe', email: 'john@example.com' });
    
    render(<LoginPage />);
    const usernameInput = screen.getByPlaceholderText('Usuário');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByTestId('login-submit');

    fireEvent.change(usernameInput, { target: { value: 'john' } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith({ username: 'john', password: '1234' });
      expect(dispatchMock).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith('/');
      expect(toast.success).toHaveBeenCalledWith('Login realizado com sucesso!');
    });
  });

  it('shows error on failed login', async () => {
    (AuthService.login as jest.Mock).mockRejectedValue(new Error('Invalid'));
    
    render(<LoginPage />);
    const usernameInput = screen.getByPlaceholderText('Usuário');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByTestId('login-submit');

    fireEvent.change(usernameInput, { target: { value: 'wrong' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Usuário ou senha incorretos');
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});
