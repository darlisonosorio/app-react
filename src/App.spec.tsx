import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';

jest.mock('./constants', () => ({
  VITE_API_URL: 'http://localhost:3000',
}));

jest.mock('./Routes', () => ({
  __esModule: true,
  default: () => <div data-testid="app-routes-mock" />,
}));

import App from './App';

describe('App', () => {
  it('renders AppRoutes and ToastContainer', () => {
    render(<App />);

    expect(screen.getByTestId('app-routes-mock')).toBeInTheDocument();

    const toastContainer = document.querySelector('.Toastify');
    expect(toastContainer).toBeInTheDocument();
  });
});
