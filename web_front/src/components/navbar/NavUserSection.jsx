import React, {useState} from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Menu from "../styles/material-ui/components/menu/Menu";
import MenuItem from "../styles/material-ui/components/menu/MenuItem";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {Divider} from "@mui/material";
import Avatar from "../styles/material-ui/components/avatar/Avatar";
import {checkAuth} from "../../utils/auth/authManager";
import {NavbarLinkStyle} from "../styles/navbar/Navbar";
import PropTypes from "prop-types";

const NavUserSection = ({setOpenHamburgerMenu}) => {
    const [anchorProfile, setAnchorProfile] = useState(null);
    const openProfile = Boolean(anchorProfile);

    const handleClickProfile = (event) => {
        setAnchorProfile(event.currentTarget);
        setOpenHamburgerMenu(false);
    };
    const handleCloseProfile = () => {
        setAnchorProfile(null);
    };

    const handleLogout = () => {
        handleCloseProfile();
        localStorage.removeItem("auth_token");
        localStorage.setItem("toast", "Odhlášení bylo úspěšné");
        window.location.reload();
    }

    return (
        <UserSectionStyle>
            {checkAuth()
                ?
                <>
                    <Avatar onClick={handleClickProfile} />
                    <Menu
                        anchorEl={anchorProfile}
                        open={openProfile}
                        onClose={handleCloseProfile}>
                        <StyledLinkStyle to="/profile">
                            <MenuItem onClick={handleCloseProfile} disableRipple>
                                <AccountBoxIcon />Profil
                            </MenuItem>
                        </StyledLinkStyle>
                        <StyledLinkStyle to="/profile-settings">
                            <MenuItem onClick={handleCloseProfile} disableRipple>
                                <SettingsIcon />Nastavení
                            </MenuItem>
                        </StyledLinkStyle>
                        <Divider />
                        <MenuItem onClick={handleLogout} disableRipple>
                            <LogoutIcon style={{color: "red"}} />
                            <span style={{color: "red"}}> Odhlásit se</span>
                        </MenuItem>
                    </Menu>
                </>
                :
                <NavbarLinkStyle to="/login" className="link-active">
                    Přihlásit se
                </NavbarLinkStyle>
            }
        </UserSectionStyle>
    );
};

NavUserSection.propTypes = {
    setOpenHamburgerMenu: PropTypes.func.isRequired,
}

export default NavUserSection;

const UserSectionStyle = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

export const StyledLinkStyle = styled(NavLink)`
  &:hover {
    background-color: ${p => p.theme.primary};
  }
  
  &:-webkit-any-link {
    color: unset;
    text-decoration: none;
  }
`

