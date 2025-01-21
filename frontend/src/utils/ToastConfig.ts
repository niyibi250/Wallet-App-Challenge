import { ToastContainerProps, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProps: ToastContainerProps = {
  position: 'top-right',
  autoClose: 7000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
};

const customToastOptionError: ToastOptions = {
  className: 'bg-white-400 text-sm text-black p-4 rounded shadow-lg',
};

const customToastOptionSuccess: ToastOptions = {
  className: 'bg-white-400 text-primary text-sm p-4 rounded shadow-lg',
};

const customToastOptionInfo: ToastOptions = {
  className: 'bg-blue-400 text-sm text-white p-4 rounded shadow-lg',
};

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...customToastOptionSuccess, ...options });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...customToastOptionError, ...options });
};

export const showInfoToast = (message: string, options?: ToastOptions) => {
  toast.info(message, { ...customToastOptionInfo, ...options });
};

export default ToastProps;
