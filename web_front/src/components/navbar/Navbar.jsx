import React, {useState} from 'react';
import NavItemsSection from "./NavItemsSection";
import styled from "styled-components";
import NavUserSection from "./NavUserSection";
import NavSearchSection from "./NavSearchSection";

const Navbar = ({loggedUser}) => {
    const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false);

    const updateOpenHamburgerMenu = (value) => {
        setOpenHamburgerMenu(value);
    }

    return (
        <NavWrapperStyle>
            <TopRowStyle>
                <NavItemsSection openHamburgerMenu={openHamburgerMenu} setOpenHamburgerMenu={updateOpenHamburgerMenu} loggedUser={loggedUser}/>
                <NavSearchWrapperStyle>
                    <NavSearchSection setOpenHamburgerMenu={updateOpenHamburgerMenu} />
                </NavSearchWrapperStyle>
                <NavUserSection setOpenHamburgerMenu={updateOpenHamburgerMenu}/>
            </TopRowStyle>
        </NavWrapperStyle>
    );
};

export default Navbar;

const NavWrapperStyle = styled.div`
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch; // Vynutí, aby potomci zabírali celou šířku
    border-bottom: 2px solid ${p => p.theme.primary};

    @media (min-width: 768px) {
        flex-direction: row; // Na velkých obrazovkách se vrátíme k řádkovému uspořádání
        justify-content: space-between; // Položky roztáhne napříč celou šířkou
        align-items: center;
    }
`;

const TopRowStyle = styled.div`
    display: flex;
    align-items: center;
    width: 100%; // Zabere celou šířku

    @media (max-width: 768px) {
        // Na malých obrazovkách chceme zachovat původní chování
        justify-content: space-between; // Roztáhne položky napříč celou šířkou
        flex-wrap: wrap; // Umožní položkám zabalení pokud není dostatek prostoru
    }
`;

const NavSearchWrapperStyle = styled.div`
    margin-left: auto; // Posune vyhledávací pole doprava vedle uživatelského nastavení
    margin-right: 1em;

    @media (max-width: 768px) {
        order: 3; // Přesun vyhledávání na konec
        width: 100%; // Zabere celou šířku na malých obrazovkách
        margin-left: 0; // Zrušíme margin-left pro zarovnání na šířku
    }
`;


