import { toast } from 'react-toastify';

const NotifToast = (message, type) => {
  toast[type](message, {
    position: 'top-center',
    autoClose: 2000, // Waktu (ms) sebelum toast otomatis hilang
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default NotifToast;