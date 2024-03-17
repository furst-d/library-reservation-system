import React, {useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ErrorForm, {ErrorItemStyle, ErrorListStyle} from "../../components/form/ErrorForm";
import axios from "../../api/axios";
import {setTokens} from "../../utils/auth/AuthManager";
import {FormStyle, LeftFormStyle} from "../../components/styles/form/Form";
import {TextField} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Button from "../../components/styles/material-ui/components/Button";
import Form from "../../components/form/Form";
import styled from "styled-components";
import {isValidEmail} from "../../utils/validator/Validator";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(200);

    const handleError = () => {
        switch (status) {
            case 401:
            case 400:
                return (<ErrorItemStyle>Chybné uživatelské jméno nebo email.</ErrorItemStyle>)
            default:
                return (<ErrorItemStyle>Při zpracování požadavku došlo k chybě.</ErrorItemStyle>)
        }
    }

    const validateRegister = () => {
        let error = false;
        setUsernameError(false);
        setPasswordError(false);
        setFirstNameError(false);
        setLastNameError(false);
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
        if(password !== passwordConfirm) {
            error = true;
            setErrors(old => [...old, "Hesla se neshodují."]);
            setPasswordError(true);
        }
        if(!firstName) {
            error = true;
            setErrors(old => [...old, "Křestní jméno musí být vyplněno."]);
            setFirstNameError(true);
        }
        if(!lastName) {
            error = true;
            setErrors(old => [...old, "Příjmení musí být vyplněno."]);
            setLastNameError(true);
        }

        if(!error) {
            setLoading(true);
            handleRegister();
        }
    }

    const handleRegister = () => {
        axios.post(`/users/register`, {
            username: username,
            password: password
        })
            .then(res => {
                setTokens(res.data.access_token, res.data.refresh_token);
                localStorage.setItem("toast", "Registrace byla úspěšná");
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
                <TextField onChange={e => setPasswordConfirm(e.target.value)} error={passwordError} required label="Heslo znovu"  type="password" />
                <TextField onChange={e => setFirstName(e.target.value)} error={firstNameError} required label="Křestní jméno" />
                <TextField onChange={e => setLastName(e.target.value)} error={lastNameError} required label="Příjmení" />
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
                    <title>Zaregistrovat se</title>
                </Helmet>
                <Form header="Zaregistrovat se" form={formSection()} />
            </LeftFormStyle>
        </HelmetProvider>
    );
};

export default LoginPage;

const RegistrationLinkStyle = styled.div`
    font-size: 14px;
`
