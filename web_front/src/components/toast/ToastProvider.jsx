import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {toast} from "react-toastify";

const ToastProvider = ({children}) => {
    useEffect(() => {
        const toastMessage = localStorage.getItem("toast");
        if(toastMessage) {
            toast.success(toastMessage);
            localStorage.removeItem("toast");
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
