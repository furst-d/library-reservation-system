import React, {useEffect} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    ContentWrapperStyle,
    SubContentStyle,
    SubMenuStyle,
    SubMenuStyledLink
} from "../../components/styles/content/Content";
import styled from "styled-components";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ProfileDetail from "../../components/profile/ProfileDetail";
import Person2Icon from '@mui/icons-material/Person2';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import ProfileReservations from "../../components/profile/ProfileReservations";
import {checkAuth} from "../../utils/auth/authManager";

const ProfilePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!checkAuth()) {
            navigate("/");
        }
    }, [navigate]);

    return (
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
                                <AutoStoriesIcon/> Moje rezervace
                            </SubMenuStyledLink>
                        </li>
                    </SubMenuStyle>
                </SubMenuWrapper>
                <SubContentStyle>
                    <Routes>
                        <Route path="/" element={<ProfileDetail />} />
                        <Route path="reservations" element={<ProfileReservations />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </SubContentStyle>
            </ContentWrapperStyle>
        </HelmetProvider>
    );
};

export default ProfilePage;

const SubMenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;

    @media (min-width: 768px) {
      gap: 50px;
    }
`
