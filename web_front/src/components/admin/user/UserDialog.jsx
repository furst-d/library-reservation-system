import React, {useEffect, useState} from 'react';
import {Checkbox, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField} from "@mui/material";
import ErrorForm, {ErrorItemStyle, ErrorListStyle} from "../../form/ErrorForm";
import Button from "../../styles/material-ui/components/Button";
import LoginIcon from "@mui/icons-material/Login";
import {isValidEmail} from "../../../utils/validator/Validator";
import axios, {axiosPrivate} from "../../../api/axios";
import PropTypes from "prop-types";
import {formatToISO} from "../../../utils/date/dateFormatter";

const UserDialog = ({userId, setOpenModel}) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [birthDate, setBirthDate] = useState("");
    const [birthDateError, setBirthDateError] = useState(false);
    const [userRoles, setUserRoles] = useState(['USER']);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(200);
    const [roles, setRoles] = useState([]);
    const isEdit = userId !== undefined;

    useEffect(() => {
        axios.get("/roles")
            .then(res => {
                setRoles(res.data.payload);

                if(isEdit) {
                    axiosPrivate.get(`/users/${userId}`)
                        .then(res => {
                            setUsername(res.data.payload.email);
                            setFirstName(res.data.payload.firstName);
                            setLastName(res.data.payload.lastName);
                            setBirthDate(formatToISO(res.data.payload.birthDate));
                            setUserRoles(res.data.payload.authorities.map(auth => auth.authority));
                        })
                        .catch(() => {
                            setOpenModel(false);
                        });
                }
            })
            .catch(() => {
                setOpenModel(false);
            });
    }, [isEdit, userId, setOpenModel]);

    const handleError = () => {
        switch (status) {
            case 401:
                return (<ErrorItemStyle>Chybné uživatelské jméno nebo email.</ErrorItemStyle>)
            case 403:
                return (<ErrorItemStyle>Účet s tímto emailem již existuje.</ErrorItemStyle>)
            default:
                return (<ErrorItemStyle>Při zpracování požadavku došlo k chybě.</ErrorItemStyle>)
        }
    }

    const validate = () => {
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
        if(!birthDate) {
            error = true;
            setErrors(old => [...old, "Datum narození musí být vyplněno."]);
            setBirthDateError(true);
        }

        if(!error) {
            setLoading(true);
            if(isEdit) {
                handleUpdate();
            } else {
                handleAdd();
            }
        }
    }

    const handleAdd = () => {
        axiosPrivate.post(`/users`, {
            email: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            roles: userRoles
        })
            .then(res => {
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

    const handleUpdate = () => {
        axiosPrivate.put(`/users/${userId}`, {
            email: username,
            firstName: firstName,
            lastName: lastName,
            password: password,
            birthDate: birthDate,
            roles: userRoles
        })
            .then(() => {
                setOpenModel(false);
                localStorage.setItem("toast", "Uživatel byl upraven");
                window.location.reload();
            })
            .catch((error) => {
                if(error.response) {
                    setStatus(error.response.status);
                    setLoading(false);
                }
            });
    }

    const handleCheckboxChange = (role) => {
        setUserRoles(prev => {
            if (prev.includes(role)) {
                return prev.filter(r => r !== role);
            } else {
                return [...prev, role];
            }
        });
    };

    return (
        <>
            <DialogTitle>{isEdit ? "Upravit uživatele" : "Zaregistrovat uživatele"}</DialogTitle>
            <DialogContent>
                <TextField value={username} onChange={e => setUsername(e.target.value)} error={usernameError} required label="Email" fullWidth margin="dense" />
                <TextField value={password} onChange={e => setPassword(e.target.value)} error={passwordError} required label="Heslo"  type="password" fullWidth margin="dense" />
                <TextField value={firstName} onChange={e => setFirstName(e.target.value)} error={firstNameError} required label="Křestní jméno" fullWidth margin="dense" />
                <TextField value={lastName} onChange={e => setLastName(e.target.value)} error={lastNameError} required label="Příjmení" fullWidth margin="dense" />
                <TextField value={birthDate} onChange={e => setBirthDate(e.target.value)} error={birthDateError} required InputLabelProps={{ shrink: true }} label="Datum narození" type="date" fullWidth margin="dense" />
                {roles.map(role => (
                    <FormControlLabel
                        key={role.id}
                        control={
                            <Checkbox
                                checked={userRoles.includes(role.name) || role.name === 'USER'}
                                disabled={role.name === 'USER'}
                                onChange={() => handleCheckboxChange(role.name)}
                            />
                        }
                        label={role.name}
                    />
                ))}

                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorListStyle>
                        {handleError()}
                    </ErrorListStyle>
                )}
                <DialogActions>
                    <Button type="submit" variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validate}>{isEdit ? "Upravit uživatele" : "Zaregistrovat uživatele"}</Button>
                    <Button onClick={() => setOpenModel(false)} variant="outlined">Zavřít</Button>
                </DialogActions>
            </DialogContent>
        </>
    );
};

UserDialog.propTypes = {
    setOpenModel: PropTypes.func.isRequired,
    userId: PropTypes.number
};

export default UserDialog;
