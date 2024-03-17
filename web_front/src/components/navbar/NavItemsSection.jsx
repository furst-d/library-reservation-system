import React from 'react';
import styled from "styled-components";
import HamburgerMenu from "../styles/material-ui/icons/HamburgerMenu";
import BurgerNavStyle from "../styles/navbar/BurgerNav";
import CloseButton from "../styles/material-ui/icons/CloseButton";
import {NavbarLinkStyle} from "../styles/navbar/Navbar";
import PropTypes from "prop-types";

const NavItemsSection = ({openHamburgerMenu, setOpenHamburgerMenu}) => {
    const mapPages = () => {
        return (
            <>
                <li>
                    <NavbarLinkStyle to="/" onClick={() => setOpenHamburgerMenu(false)}
                                     className="link-active">
                        Seznam knih
                    </NavbarLinkStyle>
                </li>
                <li>
                    <NavbarLinkStyle to="/authors" onClick={() => setOpenHamburgerMenu(false)}
                                     className="link-active">
                        Seznam autorů
                    </NavbarLinkStyle>
                </li>
            </>
        );
    }

    return (
        <HeaderStyle>
            <HamburgerMenu onClick={() => {
                setOpenHamburgerMenu(true);
            }}/>
            <BurgerNavStyle $show={openHamburgerMenu}>
            <CloseButtonWrapperStyle>
                    <CloseButton onClick={() => setOpenHamburgerMenu(false)} />
                </CloseButtonWrapperStyle>
                {mapPages()}
            </BurgerNavStyle>
            <MenuStyle>
                {mapPages()}
            </MenuStyle>
        </HeaderStyle>
    );
};

NavItemsSection.propTypes = {
    openHamburgerMenu: PropTypes.bool.isRequired,
    setOpenHamburgerMenu: PropTypes.func.isRequired,
}

export default NavItemsSection;

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
`

const MenuStyle = styled.ul`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    list-style-type: none;
  }
`
const CloseButtonWrapperStyle = styled.div`
  display: flex;
  justify-content: flex-end;
`
