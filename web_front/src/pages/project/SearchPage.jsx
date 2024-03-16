import React from 'react';
import {Helmet} from "react-helmet";
import {useLocation} from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPage = props => {
    const query = useQuery();
    const searchTerm = query.get('phrase');

    return (
        <>
            <Helmet>
                <title>Výsledky hledání</title>
            </Helmet>
            <div>
                Hledám: {searchTerm}
            </div>
        </>
    );
};

export default SearchPage;
