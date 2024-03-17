import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const NavbarLinkStyle = styled(NavLink)`
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