import { toast } from 'react-toastify';

const toastOptions = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'colored',
};

export const showToast = {
	success: message => toast.success(message, toastOptions),
	error: message => toast.error(message, toastOptions),
	info: message => toast.info(message, toastOptions),
	warning: message => toast.warning(message, toastOptions),
};
