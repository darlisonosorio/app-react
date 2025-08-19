import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from './ConfirmModal';

describe('ConfirmModal', () => {
  const message = 'Deseja realmente excluir este item?';
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('does not render when open is false', () => {
    const { container } = render(
      <ConfirmModal open={false} message={message} onConfirm={onConfirm} onCancel={onCancel} />
    );

    expect(container).toBeEmptyDOMElement();
  });


  it('renders correctly when open is true', () => {
    render(<ConfirmModal open={true} message={message} onConfirm={onConfirm} onCancel={onCancel} />);

    expect(screen.getByText('Confirmação')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });


  it('calls onCancel when clicking the Cancel button', () => {
    render(<ConfirmModal open={true} message={message} onConfirm={onConfirm} onCancel={onCancel} />);

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  
  it('calls onConfirm when clicking the Confirm button', () => {
    render(<ConfirmModal open={true} message={message} onConfirm={onConfirm} onCancel={onCancel} />);

    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
