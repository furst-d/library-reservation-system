import React, {useEffect, useState} from 'react';
import {
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem,
    Select,
    TextField
} from "@mui/material";
import ErrorForm, {ErrorItemStyle, ErrorListStyle} from "../../form/ErrorForm";
import Button from "../../styles/material-ui/components/Button";
import LoginIcon from "@mui/icons-material/Login";
import axios, {axiosPrivate} from "../../../api/axios";
import PropTypes from "prop-types";
import {formatToISO} from "../../../utils/date/dateFormatter";

const AuthorDialog = ({authorId, nationalities, setOpenModel}) => {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [birthDate, setBirthDate] = useState("");
    const [birthDateError, setBirthDateError] = useState(false);
    const [nationality, setNationality] = useState(1);

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(200);
    const isEdit = authorId !== undefined;

    useEffect(() => {
        if(isEdit) {
            axios.get(`/authors/${authorId}`)
                .then(res => {
                    const data = res.data.payload;
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setBirthDate(data.publicationYear);
                    setBirthDate(formatToISO(data.birthDate));
                    setNationality(data.nationality.id);
                })
                .catch(() => {
                    setOpenModel(false);
                });
        }
    }, [isEdit, authorId, setOpenModel]);

    const handleError = () => {
        return (<ErrorItemStyle>Při zpracování požadavku došlo k chybě.</ErrorItemStyle>)
    }

    const validate = () => {
        let error = false;
        setFirstNameError(false);
        setLastNameError(false);
        setBirthDateError(false);

        setErrors([]);

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
        axiosPrivate.post(`/authors`, {
            firstName: firstName,
            lastName: lastName,
            nationalityId: nationality,
            birthDate: birthDate,
        })
            .then(res => {
                localStorage.setItem("toast", "Autor byl přidán");
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
        axiosPrivate.put(`/authors/${authorId}`, {
            firstName: firstName,
            lastName: lastName,
            nationalityId: nationality,
            birthDate: birthDate,
        })
            .then(res => {
                localStorage.setItem("toast", "Autor byl upraven");
                window.location.reload();
            })

            .catch((error) => {
                if(error.response) {
                    setStatus(error.response.status);
                    setLoading(false);
                }
            });
    }

    const handleNationalitySelectBoxChange = (e) => {
        setNationality(e.target.value);
    };

    return (
        <>
            <DialogTitle>{isEdit ? "Upravit autora" : "Vložit autora"}</DialogTitle>
            <DialogContent>
                <TextField value={firstName} onChange={e => setFirstName(e.target.value)} error={firstNameError} required label="Křestní jméno" fullWidth margin="dense" />
                <TextField value={lastName} onChange={e => setLastName(e.target.value)} error={lastNameError} required label="Příjmení" fullWidth margin="dense" />
                <TextField value={birthDate} onChange={e => setBirthDate(e.target.value)} error={birthDateError} required InputLabelProps={{ shrink: true }} label="Datum narození" type="date" fullWidth margin="dense" />
                <FormControl fullWidth key={"nationalities"} variant="outlined" margin="normal">
                    <InputLabel id={"nationalities-label"}>{"Národnost"}</InputLabel>
                    <Select labelId={"nationalities-label"} value={nationality} onChange={handleNationalitySelectBoxChange} label="Národnost" fullWidth margin="dense">
                        {nationalities.map(nationality => (
                            <MenuItem key={nationality.value} value={nationality.value}>{nationality.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorListStyle>
                        {handleError()}
                    </ErrorListStyle>
                )}
                <DialogActions>
                    <Button type="submit" variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validate}>{isEdit ? "Upravit autora" : "Vložit autora"}</Button>
                    <Button onClick={() => setOpenModel(false)} variant="outlined">Zavřít</Button>
                </DialogActions>
            </DialogContent>
        </>
    );
};

AuthorDialog.propTypes = {
    authorId: PropTypes.number,
    nationalities: PropTypes.array.isRequired,
    setOpenModel: PropTypes.func.isRequired,
};

export default AuthorDialog;
