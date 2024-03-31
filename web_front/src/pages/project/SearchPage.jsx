import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {useLocation} from "react-router-dom";
import SearchResults from "../../components/search/SearchResults";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPage = props => {
    const query = useQuery();
    const searchTerm = query.get('phrase');

    return (
        <HelmetProvider>
            <Helmet>
                <title>Výsledky hledání</title>
            </Helmet>
            <div>
                <h2>Výsledky dotazu: {searchTerm}</h2>
                <SearchResults phrase={searchTerm}/>
            </div>
        </HelmetProvider>
    );
};

export default SearchPage;
