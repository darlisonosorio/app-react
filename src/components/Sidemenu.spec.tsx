import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import Sidemenu from './Sidemenu';
import * as router from 'react-router-dom';

// Mock do react-router-dom
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  Link: ({ children, to, ...props }: any) => <a {...props}>{children}</a>,
}));

describe('Sidemenu', () => {
  const useLocationMock = router.useLocation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders menu expanded by default', () => {
    useLocationMock.mockReturnValue({ pathname: '/users' });

    render(<Sidemenu />);
    expect(screen.getByText('Usuários')).toBeInTheDocument();
    expect(screen.getByText('Finanças')).toBeInTheDocument();
  });


  it('toggles menu when clicking the toggle button', () => {
    useLocationMock.mockReturnValue({ pathname: '/users' });

    render(<Sidemenu />);
    const toggleButton = screen.getByTestId('expand-button');

    // Collapse
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Usuários')).not.toBeInTheDocument();
    expect(screen.queryByText('Finanças')).not.toBeInTheDocument();

    // Expand again
    fireEvent.click(toggleButton);
    expect(screen.getByText('Usuários')).toBeInTheDocument();
    expect(screen.getByText('Finanças')).toBeInTheDocument();
  });


  it('highlights active route based on location', () => {
    useLocationMock.mockReturnValue({ pathname: '/finance' });

    render(<Sidemenu />);
    const financeLink = screen.getByText('Finanças').closest('a');
    const usersLink = screen.getByText('Usuários').closest('a');

    expect(financeLink).toHaveClass('highlight');
    expect(usersLink).not.toHaveClass('highlight');
  });


  it('shows labels only when expanded', () => {
    useLocationMock.mockReturnValue({ pathname: '/users' });

    render(<Sidemenu />);
    const toggleButton = screen.getByTestId('expand-button');

    // Collapse menu
    fireEvent.click(toggleButton);
    expect(screen.queryByText('Usuários')).not.toBeInTheDocument();
    expect(screen.queryByText('Finanças')).not.toBeInTheDocument();
  });
});
