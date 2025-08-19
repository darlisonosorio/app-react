import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import Toolbar from './Toolbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearLoggedUser } from '../store';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Toolbar', () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useNavigate as unknown as jest.Mock).mockReturnValue(navigateMock);
  });

  it('renders title correctly', () => {
    render(<Toolbar title="Dashboard" />);
    expect(screen.getByTestId('toolbar-title')).toHaveTextContent('Dashboard');
  });

  it('calls logout when logout button is clicked', () => {
    render(<Toolbar title="Dashboard" />);
    const logoutButton = screen.getByTestId('logout-icon');
    fireEvent.click(logoutButton);
    expect(dispatchMock).toHaveBeenCalledWith(clearLoggedUser());
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('renders back button if backPage is provided', () => {
    render(<Toolbar title="Dashboard" backPage="/home" />);
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('does not render back button if backPage is not provided', () => {
    render(<Toolbar title="Dashboard" />);
    expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
  });

  it('calls goBack when back button is clicked', () => {
    render(<Toolbar title="Dashboard" backPage="/home" />);
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    expect(navigateMock).toHaveBeenCalledWith('/home');
  });
});
