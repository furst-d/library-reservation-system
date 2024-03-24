import React, {Children, cloneElement, useEffect, useState} from 'react';
import {axiosPrivate} from "../../api/axios";
import LoadingSpinner from "../styles/material-ui/components/LoadingSpinner";
import PropTypes from "prop-types";
import ToastProvider from "../toast/ToastProvider";

const AuthProvider = ({children}) => {
    const [isPending, setIsPending] = useState(true);
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        axiosPrivate.get(`/profile`)
            .then(res => {
                setLoggedUser(res.data.payload);
                setIsPending(false);
            })
            .catch(() => {
                setIsPending(false);
            });
    }, []);

    const enhancedChildren = isPending
        ? null
        : Children.map(children, child => {
            return cloneElement(child, { loggedUser });
        });

    return (
        <>
            {isPending ? <LoadingSpinner /> : enhancedChildren}
        </>
    );
};

ToastProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;

