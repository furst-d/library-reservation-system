import React from 'react';
import {formatDate} from "../../utils/date/dateFormatter";
import {ProfileContainer, ProfileIcon, ProfileInfo, ProfileInfoSection, ProfileName} from "../styles/profile/Profile";

const ProfileDetail = ({user}) => {
    return (
        <ProfileContainer>
            <ProfileIcon fontSize="0" />
            <ProfileInfoSection>
                <ProfileName>{user.firstName} {user.lastName}</ProfileName>
                <ProfileInfo>E-mail: {user.email}</ProfileInfo>
                <ProfileInfo>Datum narození: {formatDate(user.birthDate)}</ProfileInfo>
                <ProfileInfo>Role: {user.authorities.map(role => role.authority).join(', ')}</ProfileInfo>
            </ProfileInfoSection>
        </ProfileContainer>
    );
};

export default ProfileDetail;

