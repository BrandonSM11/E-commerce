import { ToastContainer, toast } from 'react-toastify';

export const notification = (
    text: string,
    type: "success" | "error" | "warning",
    time: number = 5000
                            ) => {

    if (type == "success") {
        toast.success(text, {
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    } else if (type == "error") {

        toast.error(text, {
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    } else if (type == "warning") {
        toast.warning(text, {
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    } else {
        console.error("el tipo de la alerta no es válido")
    }

}