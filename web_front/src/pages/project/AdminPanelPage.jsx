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
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Person3Icon from '@mui/icons-material/Person3';
import UserManagement from "../../components/admin/user/UserManagement";
import BookManagement from "../../components/admin/BookManagement";
import AuthorManagement from "../../components/admin/AuthorManagement";
import ReservationManagement from "../../components/admin/ReservationManagement";
import PropTypes from "prop-types";

const AdminPanelPage = ({loggedUser}) => {

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
                        <Route path="/" element={<UserManagement loggedUser={loggedUser}/>}/>
                        <Route path="books" element={<BookManagement/>}/>
                        <Route path="authors" element={<AuthorManagement/>}/>
                        <Route path="reservations" element={<ReservationManagement />}/>
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </SubContentStyle>
            </ContentWrapperStyle>
        </HelmetProvider>
    );
};

AdminPanelPage.propTypes = {
    loggedUser: PropTypes.object,
};

export default AdminPanelPage;
