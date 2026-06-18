import { FaTimes } from 'react-icons/fa';
import Button from './Button.jsx';

const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
      <div className="panel w-full max-w-2xl p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <Button variant="secondary" className="px-3" onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
