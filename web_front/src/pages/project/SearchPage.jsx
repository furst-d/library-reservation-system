import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {useLocation} from "react-router-dom";

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
                Hledám: {searchTerm}
            </div>
        </HelmetProvider>
    );
};

export default SearchPage;
