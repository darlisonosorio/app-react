import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import WelcomePage from './Welcome';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('WelcomePage', () => {
  const navigateMock = jest.fn();
  const userMock = { full_name: 'John Doe', email: 'john@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as unknown as jest.Mock).mockReturnValue(navigateMock);
  });

  it('redirects to /login if no user is logged', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(null);
    render(<WelcomePage />);
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('renders welcome message with user first name', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(userMock);
    render(<WelcomePage />);
    const title = screen.getByTestId('welcome-title');
    expect(title).toHaveTextContent('Bem-vindo, John');
  });

  it('renders user email if user exists', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(userMock);
    render(<WelcomePage />);
    const email = screen.getByTestId('welcome-email');
    expect(email).toHaveTextContent('john@example.com');
  });
});
