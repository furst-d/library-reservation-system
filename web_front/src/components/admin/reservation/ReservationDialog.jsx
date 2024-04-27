import React, {useEffect, useState} from 'react';
import {
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import ErrorForm, {ErrorItemStyle, ErrorListStyle} from "../../form/ErrorForm";
import Button from "../../styles/material-ui/components/Button";
import LoginIcon from "@mui/icons-material/Login";
import {axiosPrivate} from "../../../api/axios";
import PropTypes from "prop-types";
import {formatToISO} from "../../../utils/date/dateFormatter";

const ReservationDialog = ({reservationId, setOpenModel}) => {
    const [loading, setLoading] = useState(false);
    const [reservationDate, setReservationDate] = useState("");
    const [reservationDateError, setReservationDateError] = useState(false);
    const [returnDate, setReturnDate] = useState("");
    const [returnDateError, setReturnDateError] = useState(false);
    const [returnedAtDate, setReturnedAtDate] = useState("");
    const [returnedAtDateError, setReturnedAtDateError] = useState(false);
    const [penaltyAmount, setPenaltyAmount] = useState(0);
    const [penaltyAmountError, setPenaltyAmountError] = useState(false);
    const [penaltyCreationDate, setPenaltyCreationDate] = useState("");
    const [penaltyCreationDateError, setPenaltyCreationDateError] = useState(false);
    const [penaltyPaymentDate, setPenaltyPaymentDate] = useState("");
    const [penaltyPaymentDateError, setPenaltyPaymentDateError] = useState(false);
    const [books, setBooks] = useState([]);

    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(200);
    const isEdit = reservationId !== undefined;

    useEffect(() => {
        if(isEdit) {
            axiosPrivate.get(`/reservations/${reservationId}`)
                .then(res => {
                    const data = res.data.payload;
                    setReservationDate(formatToISO(data.reservationDate));
                    setReturnDate(formatToISO(data.returnDate));
                    setReturnedAtDate(data.returnedAt ? formatToISO(data.returnedAt) : "");
                    setPenaltyAmount(data.penalty ? data.penalty.amountCzk : 0);
                    setPenaltyCreationDate(data.penalty ? formatToISO(data.penalty.creationDate) : "");
                    setPenaltyPaymentDate(data.penalty ? formatToISO(data.penalty.paymentDate) : "");
                    setBooks(data.books);
                })
                .catch(() => {
                    setOpenModel(false);
                });
        }
    }, [isEdit, reservationId, setOpenModel]);

    const handleError = () => {
        return (<ErrorItemStyle>Při zpracování požadavku došlo k chybě.</ErrorItemStyle>)
    }

    const validate = () => {
        let error = false;
        setReservationDateError(false);
        setReturnDateError(false);
        setReturnedAtDateError(false);
        setPenaltyAmountError(false);
        setPenaltyCreationDateError(false);
        setPenaltyPaymentDateError(false);

        setErrors([]);

        if(!reservationDate) {
            error = true;
            setErrors(old => [...old, "Datum rezervace musí být vyplněn."]);
            setReservationDateError(true);
        }

        if(!returnDate) {
            error = true;
            setErrors(old => [...old, "Datum vrácení musí být vyplněn."]);
            setReturnDateError(true);
        }

        if(returnedAtDate && returnedAtDate < reservationDate) {
            error = true;
            setErrors(old => [...old, "Datum vrácení nemůže být dříve než datum rezervace."]);
            setReturnedAtDateError(true);
        }

        if(penaltyAmount < 0) {
            error = true;
            setErrors(old => [...old, "Pokuta nemůže být záporná."]);
            setPenaltyAmountError(true);
        }

        if (penaltyCreationDate && penaltyCreationDate < reservationDate) {
            error = true;
            setErrors(old => [...old, "Datum vytvoření pokuty nemůže být dříve než datum rezervace."]);
            setPenaltyCreationDateError(true);
        }

        if (penaltyPaymentDate && penaltyPaymentDate < penaltyCreationDate) {
            error = true;
            setErrors(old => [...old, "Datum platby pokuty nemůže být dříve než datum vytvoření pokuty."]);
            setPenaltyPaymentDateError(true);
        }

        if(!error) {
            setLoading(true);
            handleUpdate();
        }
    }

    const handleUpdate = () => {
        axiosPrivate.put(`/reservations/${reservationId}`, {
            reservationDate: reservationDate,
            returnDate: returnDate,
            returnedAt: returnedAtDate,
            bookIds: books.map(book => book.id),
            penaltyAmountCzk: penaltyAmount,
            penaltyCreationDate: penaltyCreationDate || null,
            penaltyPaymentDate: penaltyPaymentDate || null,
        })
            .then(res => {
                localStorage.setItem("toast", "Rezervace byla upraven");
                window.location.reload();
            })
            .catch((error) => {
                if(error.response) {
                    setStatus(error.response.status);
                    setLoading(false);
                }
            });
    }

    return (
        <>
            <DialogTitle>{isEdit ? "Upravit rezervaci" : "Vložit rezervaci"}</DialogTitle>
            <DialogContent>
                <TextField value={reservationDate} onChange={e => setReservationDate(e.target.value)} error={reservationDateError} required InputLabelProps={{ shrink: true }} label="Datum rezervace" type="date" fullWidth margin="dense" />
                <TextField value={returnDate} onChange={e => setReturnDate(e.target.value)} error={returnDateError} required InputLabelProps={{ shrink: true }} label="Vrátit do" type="date" fullWidth margin="dense" />
                <TextField value={returnedAtDate} onChange={e => setReturnedAtDate(e.target.value)} error={returnedAtDateError} InputLabelProps={{ shrink: true }} label="Datum vrácení" type="date" fullWidth margin="dense" />
                <TextField value={penaltyAmount} onChange={e => setPenaltyAmount(e.target.value)} error={penaltyAmountError} required label="Pokuta [Kč]" type="number" fullWidth margin="dense" />
                <TextField value={penaltyCreationDate} onChange={e => setPenaltyCreationDate(e.target.value)} error={penaltyCreationDateError} InputLabelProps={{ shrink: true }} label="Datum vytvoření pokuty" type="date" fullWidth margin="dense" />
                <TextField value={penaltyPaymentDate} onChange={e => setPenaltyPaymentDate(e.target.value)} error={penaltyPaymentDateError} InputLabelProps={{ shrink: true }} label="Datum platby pokuty" type="date" fullWidth margin="dense" />

                <ErrorForm errors={errors} />
                {status !== 200 && (
                    <ErrorListStyle>
                        {handleError()}
                    </ErrorListStyle>
                )}
                <DialogActions>
                    <Button type="submit" variant="contained" loading={loading} startIcon={<LoginIcon />} loadingPosition="start" onClick={validate}>{isEdit ? "Upravit rezervaci" : "Vložit rezervaci"}</Button>
                    <Button onClick={() => setOpenModel(false)} variant="outlined">Zavřít</Button>
                </DialogActions>
            </DialogContent>
        </>
    );
};

ReservationDialog.propTypes = {
    reservationId: PropTypes.number,
    setOpenModel: PropTypes.func.isRequired,
};

export default ReservationDialog;
