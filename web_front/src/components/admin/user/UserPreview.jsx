import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {Dialog, TableCell} from "@mui/material";
import {AdminDeleteButton, AdminEditButton} from "../../styles/admin/Button";
import ConfirmationDialog from "../../dialog/ConfirmationDialog";
import {toast} from "react-toastify";
import {isAdmin} from "../../../utils/auth/authManager";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';


const UserPreview = ({id, email, firstName, lastName, birthDate, roles, users, setUsers, loggedUser}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const removeUser = () => {
        const updatedList = users.filter((user) => user.id !== id);
        setUsers(updatedList);
        toast.success("Uživatel byl odstraněn");
        setOpenDeleteModal(false);
    }

    return (
        <>
            <TableCell component="th" scope="row"><NavLink to={`/admin/users/${id}`}>{email}</NavLink></TableCell>
            <TableCell align="right">{lastName}, {firstName}</TableCell>
            <TableCell align="right">{roles.map(role => role.authority).join(', ')}</TableCell>
            <TableCell align="right">{birthDate}</TableCell>
            {isAdmin(loggedUser) && (
                <>
                    <TableCell align="right"><AdminEditButton onClick={() => setOpenEditModal(true)}><EditNoteIcon /></AdminEditButton></TableCell>
                    <TableCell align="right"><AdminDeleteButton onClick={() => setOpenDeleteModal(true)}><DeleteIcon /></AdminDeleteButton></TableCell>
                    <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                        <ConfirmationDialog content={`Opravdu si přejete odebrat uživatele ${email} ?`} onAccept={removeUser} onClose={() => setOpenDeleteModal(false)} />
                    </Dialog>
                </>
            )}
        </>
    );
};

UserPreview.propTypes = {
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    setUsers: PropTypes.func.isRequired,
    loggedUser: PropTypes.object.isRequired,
};

export default UserPreview;