import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    ContentWrapperStyle,
    SubContentStyle,
    SubMenuStyle,
    SubMenuStyledLink, SubMenuWrapper
} from "../../components/styles/content/Content";
import Person2Icon from "@mui/icons-material/Person2";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import {Navigate, Route, Routes} from "react-router-dom";
import ProfileDetail from "../../components/profile/ProfileDetail";
import ProfileReservations from "../../components/profile/ProfileReservations";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Person3Icon from '@mui/icons-material/Person3';

const AdminPanelPage = () => {

    return (
        <HelmetProvider>
            <ContentWrapperStyle>
                <Helmet>
                    <title>Admin panel</title>
                </Helmet>
                <SubMenuWrapper>
                    <SubMenuStyle>
                        <li>
                            <SubMenuStyledLink
                                to="/admin"
                                className={({isActive}) => isActive ? "link-active" : ""}
                                end
                            >
                                <Person2Icon/>Správa uživatelů
                            </SubMenuStyledLink>
                        </li>
                        <li>
                            <SubMenuStyledLink
                                to="/admin/books"
                                className={({isActive}) => isActive ? "link-active" : ""}
                            >
                                <AutoStoriesIcon/> Správa knih
                            </SubMenuStyledLink>
                        </li>
                        <li>
                            <SubMenuStyledLink
                                to="/admin/authors"
                                className={({isActive}) => isActive ? "link-active" : ""}
                            >
                                <Person3Icon/> Správa autorů
                            </SubMenuStyledLink>
                        </li>
                        <li>
                            <SubMenuStyledLink
                                to="/admin/reservations"
                                className={({isActive}) => isActive ? "link-active" : ""}
                            >
                                <LibraryBooksIcon/> Správa rezervací
                            </SubMenuStyledLink>
                        </li>
                    </SubMenuStyle>
                </SubMenuWrapper>
                <SubContentStyle>
                    <Routes>
                        <Route path="/" element={<ProfileDetail/>}/>
                        <Route path="books" element={<ProfileReservations/>}/>
                        <Route path="authors" element={<ProfileReservations/>}/>
                        <Route path="reservations" element={<ProfileReservations/>}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </SubContentStyle>
            </ContentWrapperStyle>
        </HelmetProvider>
    );
};

export default AdminPanelPage;
