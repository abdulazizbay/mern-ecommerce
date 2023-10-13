import {toast} from "react-hot-toast";

export const CustomToast = () => {

    const customToastStyle = {

    };

    const customToastOptions = {
        duration: 5000,
    };

    const LoadingToast = () => {
        toast.loading("Fetching data...", customToastOptions);
    };

    const SuccessToast = (message) => {
        toast.success(message, customToastOptions);
    };

    const ErrorToast = (errorMessage) => {
        toast.error(errorMessage, customToastOptions);
    };

    return {
        LoadingToast,
        SuccessToast,
        ErrorToast
    }

};