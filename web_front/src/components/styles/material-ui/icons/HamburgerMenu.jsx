import {styled} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

const HamburgerMenu = styled(MenuIcon)(({theme}) => ({
    display: "unset",
    cursor: "pointer",
    padding: 15,
    fontSize: 30,

    [theme.breakpoints.up('sm')]: {
        display: "none",
    },
}));

export default HamburgerMenu;