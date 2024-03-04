import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Menu from "../styles/material-ui/components/menu/Menu";
import MenuItem from "../styles/material-ui/components/menu/MenuItem";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {Divider} from "@mui/material";
import Avatar from "../styles/material-ui/components/avatar/Avatar";

const NavUserSection = ({setOpenHamburgerMenu}) => {

    const [anchorProfile, setAnchorProfile] = React.useState(null);
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
    }

    return (
        <UserSectionStyle>
            {/*{avatar*/}
            {/*    ?*/}
            {/*    <Avatar src={process.env.REACT_APP_BASE_URL + "/images/" + avatar} onClick={handleClickProfile} />*/}
            {/*    :*/}
            {/*    <Avatar onClick={handleClickProfile} />*/}
            {/*}*/}
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
        </UserSectionStyle>
    );
};

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
