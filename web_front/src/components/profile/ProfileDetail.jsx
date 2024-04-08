import React from 'react';
import {formatDate} from "../../utils/date/dateFormatter";
import {ProfileContainer, ProfileIcon, ProfileInfo, ProfileInfoSection, ProfileName} from "../styles/profile/Profile";

const ProfileDetail = ({loggedUser}) => {
    console.log(loggedUser);
    return (
        <ProfileContainer>
            <ProfileIcon fontSize="0" />
            <ProfileInfoSection>
                <ProfileName>{loggedUser.firstName} {loggedUser.lastName}</ProfileName>
                <ProfileInfo>E-mail: {loggedUser.email}</ProfileInfo>
                <ProfileInfo>Datum narození: {formatDate(loggedUser.birthDate)}</ProfileInfo>
                <ProfileInfo>Role: {loggedUser.authorities.map(role => role.authority).join(', ')}</ProfileInfo>
            </ProfileInfoSection>
        </ProfileContainer>
    );
};

export default ProfileDetail;

