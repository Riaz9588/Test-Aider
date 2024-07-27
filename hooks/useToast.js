import { toast } from 'react-hot-toast';

const useToast = () => {
  const showToast = (message, type = 'success') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  return { showToast };
};

export default useToast;
