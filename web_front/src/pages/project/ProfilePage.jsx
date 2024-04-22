import React, {useEffect, useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    ContentWrapperStyle,
    SubContentStyle,
    SubMenuStyle,
    SubMenuStyledLink, SubMenuWrapper
} from "../../components/styles/content/Content";
import ProfileDetail from "../../components/profile/ProfileDetail";
import Person2Icon from '@mui/icons-material/Person2';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import ProfileReservations from "../../components/profile/ProfileReservations";
import {checkAuth} from "../../utils/auth/authManager";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const ProfilePage = ({loggedUser}) => {
    const navigate = useNavigate();
    const permitted = checkAuth();

    useEffect(() => {
        if(!permitted) {
            navigate("/");
        }
    }, [navigate]);

    console.log("Jsem zde 2");

    return (
        <>
            {permitted && (
                <HelmetProvider>
                    <ContentWrapperStyle>
                        <Helmet>
                            <title>Profil</title>
                        </Helmet>
                        <SubMenuWrapper>
                            <SubMenuStyle>
                                <li>
                                    <SubMenuStyledLink
                                        to="/profile"
                                        className={({isActive}) => isActive ? "link-active" : ""}
                                        end
                                    >
                                        <Person2Icon/>Profil
                                    </SubMenuStyledLink>
                                </li>
                                <li>
                                    <SubMenuStyledLink
                                        to="/profile/reservations"
                                        className={({isActive}) => isActive ? "link-active" : ""}
                                    >
                                        <LibraryBooksIcon/> Moje rezervace
                                    </SubMenuStyledLink>
                                </li>
                            </SubMenuStyle>
                        </SubMenuWrapper>
                        <SubContentStyle>
                            <Routes>
                                <Route path="/" element={<ProfileDetail loggedUser={loggedUser} />} />
                                <Route path="reservations" element={<ProfileReservations />} />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </SubContentStyle>
                    </ContentWrapperStyle>
                </HelmetProvider>
            )}
        </>
    );
};

export default ProfilePage;