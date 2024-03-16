import React from 'react';
import styled from "styled-components";
import HamburgerMenu from "../styles/material-ui/icons/HamburgerMenu";
import BurgerNavStyle from "../styles/navbar/BurgerNav";
import CloseButton from "../styles/material-ui/icons/CloseButton";
import {NavLink} from "react-router-dom";

const NavItemsSection = ({openHamburgerMenu, setOpenHamburgerMenu}) => {
    const mapPages = () => {
        return (
            <>
                <li>
                    <StyledLinkStyle to="/" onClick={() => setOpenHamburgerMenu(false)}
                                     className="link-active">
                        Seznam knih
                    </StyledLinkStyle>
                </li>
                <li>
                    <StyledLinkStyle to="/authors" onClick={() => setOpenHamburgerMenu(false)}
                                     className="link-active">
                        Seznam autorů
                    </StyledLinkStyle>
                </li>
            </>
        );
    }

    return (
        <HeaderStyle>
            <HamburgerMenu onClick={() => {
                setOpenHamburgerMenu(true);
            }}/>
            <BurgerNavStyle show={openHamburgerMenu}>
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

export const StyledLinkStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 12px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${p => p.theme.primary};
  }
  
  &:-webkit-any-link {
    color: unset;
    text-decoration: none;
  }
  
  &.active {
    background: ${p => p.theme.primary};
  }
`
