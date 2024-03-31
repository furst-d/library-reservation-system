import React from 'react';
import PropTypes from 'prop-types';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ConfirmationDialog = ({content, onAccept, onClose}) => {
    return (
        <>
            <DialogTitle>Potvrzení</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Ne</Button>
                <Button variant="contained" onClick={onAccept} autoFocus>Ano</Button>
            </DialogActions>
        </>
    );
};

ConfirmationDialog.propTypes = {
    content: PropTypes.string.isRequired,
    onAccept: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ConfirmationDialog;