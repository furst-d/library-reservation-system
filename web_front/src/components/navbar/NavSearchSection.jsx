import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";

const NavSearchSection = ({setOpenHamburgerMenu}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setOpenHamburgerMenu(false);
        setSearchTerm(e.target.value);
    };

    const handleFocus = () => {
        setOpenHamburgerMenu(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Zabráníme výchozímu chování formuláře
        navigate(`/search?phrase=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <SearchFormStyle type="search" onSubmit={handleSubmit}>
            <SearchIconStyle />
            <SearchInputStyle type="search" placeholder="Hledat..." value={searchTerm} onFocus={handleFocus} onChange={handleInputChange} />
            <SearchButtonStyle type="submit">Hledat</SearchButtonStyle>
        </SearchFormStyle>
    );
};

NavSearchSection.propTypes = {
    setOpenHamburgerMenu: PropTypes.func.isRequired,
}

export default NavSearchSection;

const SearchFormStyle = styled.form`
    display: flex;
    align-items: center;
    height: 3rem;

    @media (max-width: 768px) {
        width: 100%;
        box-sizing: border-box; // Zabráníme přetečení kvůli paddingu
    }
`

const SearchInputStyle = styled.input`
    outline: none;
    font-size: 16px;
    flex-grow: 1;
    min-width: 12em;
    border-radius: 1.375em 0 0 1.375em;
    padding: 0 1.25em 0 3em;
    background: #f4f4f4;
    line-height: 1.5;
    height: 2rem;
    border: 2px solid #f4f4f4;
    
    &:focus {
        border-color: ${p => p.theme.primary};
        background: #fff;
    }
`

const SearchButtonStyle = styled.button`
    background: ${p => p.theme.primary};
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 0 1.375em 1.375em 0;
    flex-shrink: 0;
    justify-content: center;
    padding: 0 1.5em 0 1.25em;
    height: 2rem;
    border: 2px solid ${p => p.theme.primary};
`

const SearchIconStyle = styled(SearchIcon)`
    position: relative;
    left: 1.25em;
    color: #474747;
`