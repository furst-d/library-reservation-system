import React, {useEffect, useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ErrorForm, {ErrorItemStyle, ErrorListStyle} from "../../components/form/ErrorForm";
import axios from "../../api/axios";
import {checkAuth, setTokens} from "../../utils/auth/authManager";
import {FormStyle, LeftFormStyle} from "../../components/styles/form/Form";
import {TextField} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Button from "../../components/styles/material-ui/components/Button";
import Form from "../../components/form/Form";
import styled from "styled-components";
import {NavLink, useNavigate} from "react-router-dom";
import {isValidEmail} from "../../utils/validator/Validator";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(200);
    const navigate = useNavigate();

    useEffect(() => {
        if(checkAuth()) {
            navigate("/");
        }
    }, [navigate]);

    const handleError = () => {
        switch (status) {
            case 401:
                return (<ErrorItemStyle>Přihlášení se nezdařilo.</ErrorItemStyle>)
            default:
                return (<ErrorItemStyle>Při zpracování požadavku došlo k chybě.</ErrorItemStyle>)
        }
    }

    const validateLogin = () => {
        let error = false;
        setUsernameError(false);
        setPasswordError(false);
        setErrors([]);

        if(!username) {
            error = true;
            setErrors(old => [...old, "Přihlašovací jméno musí být vyplněno."]);
            setUsernameError(true);
        }
        if(!isValidEmail(username)) {
            error = true;
            setErrors(old => [...old, "Přihlašovací jméno musí být email."]);
            setUsernameError(true);
        }
        if(!password) {
            error = true;
            setErrors(old => [...old, "Heslo musí být vyplněno."]);
            setPasswordError(true);
        }

        if(!error) {
            setLoading(true);
            handleLogin();
        }
    }

    const handleLogin = () => {
        axios.post(`/users/login`, {
            email: username,
            password: password
        })
            .then(res => {
                setTokens(res.data.payload.token);
                localStorage.setItem("toast", "Přihlášení bylo úspěšné");
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
                <TextField onChange={e => setUsername(e.target.value)} error={usernameError} required label="Email" />
                <TextField onChange={e => setPassword(e.target.value)} error={passwordError} required label="Heslo"  type="password" />
                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorListStyle>
                        {handleError()}
                    </ErrorListStyle>
                )}
                <RegistrationLinkStyle>
                    Nemáte účet? <NavLink to="/register">Zaregistrovat se</NavLink>
                </RegistrationLinkStyle>
                <Button variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validateLogin}>Přihlásit se</Button>
            </FormStyle>
        );
    }

    return (
        <HelmetProvider>
            <LeftFormStyle>
                <Helmet>
                    <title>Přihlásit se</title>
                </Helmet>
                <Form header="Přihlásit se" form={formSection()} />
            </LeftFormStyle>
        </HelmetProvider>
    );
};

export default LoginPage;

const RegistrationLinkStyle = styled.div`
    font-size: 14px;
`
