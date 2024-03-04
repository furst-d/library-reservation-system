import React, {useState} from 'react';
import NavItemsSection from "./NavItemsSection";
import styled from "styled-components";
import NavUserSection from "./NavUserSection";

const Navbar = () => {
    const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false);

    const updateOpenHamburgerMenu = (value) => {
        setOpenHamburgerMenu(value);
    }

    return (
        <NavWrapperStyle>
            <NavItemsSection openHamburgerMenu={openHamburgerMenu} setOpenHamburgerMenu={updateOpenHamburgerMenu}/>
            <NavUserSection setOpenHamburgerMenu={updateOpenHamburgerMenu}/>
        </NavWrapperStyle>
    );
};

export default Navbar;

const NavWrapperStyle = styled.div`
    border-bottom: 2px solid ${p => p.theme.primary};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
`
