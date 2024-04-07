import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {toast} from "react-toastify";

const ToastProvider = ({children}) => {
    useEffect(() => {
        const toastMessage = localStorage.getItem("toast");
        if(toastMessage) {
            toast.success(toastMessage, {
                onClose: () => localStorage.removeItem("toast")
            });
        }

        const toastErrorMessage = localStorage.getItem("toast-error");
        if(toastErrorMessage) {
            toast.error(toastErrorMessage, {
                onClose: () => localStorage.removeItem("toast-error")
            });
        }
    }, []);

    return (
        <>
            {children}
        </>
    );
};

ToastProvider.propTypes = {
    children: PropTypes.node
};

export default ToastProvider;
