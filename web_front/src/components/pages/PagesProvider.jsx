import React from 'react';
import styled from "styled-components";
import {Route, Routes} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import BookCatalogPage from "../../pages/project/BookCatalogPage";
import NotFoundPage from "../../pages/abstract/NotFoundPage";
import AuthorCatalogPage from "../../pages/project/AuthorCatalogPage";
import SearchPage from "../../pages/project/SearchPage";
import ProfilePage from "../../pages/project/ProfilePage";
import ProfileSettingsPage from "../../pages/project/ProfileSettingsPage";
import LoginPage from "../../pages/project/LoginPage";
import RegisterPage from "../../pages/project/RegisterPage";
import AdminPanelPage from "../../pages/project/AdminPanelPage";
import {isAdmin, isEditor} from "../../utils/auth/authManager";
import BookDetailPage from "../../pages/project/BookDetailPage";
import AuthorDetailPage from "../../pages/project/AuthorDetailPage";
import ShoppingCartPage from "../../pages/project/ShoppingCartPage";

const PagesProvider = ({loggedUser}) => {
    return (
        <>
            <Navbar loggedUser={loggedUser} />
            <Container>
                <ContentWrapper>
                    <Routes>
                        <Route path="/" element={<BookCatalogPage />} />
                        <Route path="/books/:id" element={<BookDetailPage loggedUser={loggedUser} />} />
                        <Route path="/authors" element={<AuthorCatalogPage />} />
                        <Route path="/authors/:id" element={<AuthorDetailPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/profile/*" element={<ProfilePage loggedUser={loggedUser} />} />
                        <Route path="/profile-settings" element={<ProfileSettingsPage />} />
                        <Route path="/login" element={<LoginPage loggedUser={loggedUser} />} />
                        <Route path="/register" element={<RegisterPage loggedUser={loggedUser} />} />
                        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                        {isEditor(loggedUser) && <Route path="/admin/*" element={<AdminPanelPage loggedUser={loggedUser} />} />}
                    </Routes>
                </ContentWrapper>
            </Container>
        </>
    );
};

export default PagesProvider;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
  background-color: ${p => p.theme.third};  
`

const ContentWrapper = styled.div`
    margin-top: 2em;
    color: ${p => p.theme.text_dark};
    display: flex;
    justify-content: center;
    max-width: 90em;
    width: 100%;
    padding-left: 20px;

    @media (min-width: 768px) {
        justify-content: flex-start;
    }
`
