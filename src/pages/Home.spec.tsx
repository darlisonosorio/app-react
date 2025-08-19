import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('../components/Sidemenu', () => () => <div data-testid="side-menu">SideMenu</div>);
jest.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet" />,
}));

describe('Home', () => {
  it('renders SideMenu and Outlet correctly', () => {
    render(<Home />);
    expect(screen.getByTestId('side-menu')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});
