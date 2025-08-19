import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import UserFinanceLogo from './logo';

describe('UserFinanceLogo', () => {
  it('renders SVG with default width and height', () => {
    render(<UserFinanceLogo />);
    const svg = screen.getByTestId('user-finance-logo');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '200');
    expect(svg).toHaveAttribute('height', '50');
  });

  it('renders custom width and height', () => {
    render(<UserFinanceLogo width={300} height={75} />);
    const svg = screen.getByTestId('user-finance-logo');
    expect(svg).toHaveAttribute('width', '300');
    expect(svg).toHaveAttribute('height', '75');
  });

  it('contains the correct text', () => {
    render(<UserFinanceLogo />);
    const text = screen.getByText('UserFinance');
    expect(text).toBeInTheDocument();
  });
});
