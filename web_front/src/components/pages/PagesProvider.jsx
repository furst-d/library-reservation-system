import React from 'react';
import styled from "styled-components";
import {Route, Routes} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import BookCatalogPage from "../../pages/project/BookCatalogPage";
import NotFoundPage from "../../pages/abstract/NotFoundPage";
import AuthorCatalogPage from "../../pages/project/AuthorCatalogPage";
import SearchPage from "../../pages/project/SearchPage";

const PagesProvider = () => {
    return (
        <>
            <Navbar />
            <Container>
                <ContentWrapper>
                    <Routes>
                        <Route path="/"  element={<BookCatalogPage />} />
                        <Route path="/authors"  element={<AuthorCatalogPage />} />
                        <Route path="/search"  element={<SearchPage />} />
                        <Route path="*"  element={<NotFoundPage />} />
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
`
