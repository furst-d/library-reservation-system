import React, {useEffect, useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Form from "../../components/form/Form";
import {FormStyle, LeftFormStyle} from "../../components/styles/form/Form";
import {TextField} from "@mui/material";
import ErrorForm, {ErrorItemStyle, ErrorListStyle} from "../../components/form/ErrorForm";
import Button from "../../components/styles/material-ui/components/Button";
import LoginIcon from "@mui/icons-material/Login";
import {axiosPrivate} from "../../api/axios";
import {checkAuth} from "../../utils/auth/authManager";
import {useNavigate} from "react-router-dom";

const ProfileSettingsPage = () => {
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(200);

    const navigate = useNavigate();

    useEffect(() => {
        if(!checkAuth()) {
            navigate("/");
        }
    }, [navigate]);

    const handleError = () => {
        switch (status) {
            case 404:
                return (<ErrorItemStyle>Současné heslo je chybné.</ErrorItemStyle>)
            default:
                return (<ErrorItemStyle>Při zpracování požadavku došlo k chybě.</ErrorItemStyle>)
        }
    }

    const validateRegister = () => {
        let error = false;
        setOldPasswordError(false);
        setNewPasswordError(false);
        setConfirmNewPasswordError(false);
        setErrors([]);

        if(!oldPassword) {
            error = true;
            setErrors(old => [...old, "Původní heslo musí být vyplněno."]);
            setOldPasswordError(true);
        }

        if(!newPassword) {
            error = true;
            setErrors(old => [...old, "Nové heslo musí být vyplněno."]);
            setNewPasswordError(true);
        }

        if(!confirmNewPassword) {
            error = true;
            setErrors(old => [...old, "Potvrzení nového hesla musí být vyplněno."]);
            setConfirmNewPasswordError(true);
        }

        if(newPassword.length < 4) {
            error = true;
            setErrors(old => [...old, "Heslo musí mít alespoň 4 znaky."]);
            setNewPasswordError(true);
        }

        if(confirmNewPassword !== newPassword) {
            error = true;
            setErrors(old => [...old, "Hesla se neshodují."]);
            setNewPasswordError(true);
            setConfirmNewPasswordError(true);
        }

        if(!error) {
            setLoading(true);
            handleChangePassword();
        }
    }

    const handleChangePassword = () => {
        axiosPrivate.post(`/profile/change-password`, {
            oldPassword: oldPassword,
            newPassword: newPassword,
        })
            .then(res => {
                localStorage.setItem("toast", "Heslo bylo úspěšně změněno.");
                window.location.reload();
            })
            .catch((error) => {
                if(error.response) {
                    setStatus(error.response.status);
                    setLoading(false);
                }
            });
    }

    const formSection = () => {
        return (
            <FormStyle>
                <TextField onChange={e => setOldPassword(e.target.value)} error={oldPasswordError} required label="Staré heslo" type="password" />
                <TextField onChange={e => setNewPassword(e.target.value)} error={newPasswordError} required label="Nové heslo"  type="password" />
                <TextField onChange={e => setConfirmNewPassword(e.target.value)} error={confirmNewPasswordError} required label="Nové heslo znovu"  type="password" />
                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorListStyle>
                        {handleError()}
                    </ErrorListStyle>
                )}
                <Button variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validateRegister}>Zaregistrovat se</Button>
            </FormStyle>
        );
    }

    return (
        <HelmetProvider>
            <LeftFormStyle>
                <Helmet>
                    <title>Uživatelské nastavení</title>
                </Helmet>
                <Form header="Změnit heslo" form={formSection()} />
            </LeftFormStyle>
        </HelmetProvider>
    );
};

export default ProfileSettingsPage;
