
interface ConfirmModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ open, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-base-200 rounded-2xl shadow-xl max-w-sm w-full p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Confirmação
        </h2>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal