import {MenuItem as MenuItemOrig, styled} from "@mui/material"

const MenuItem = styled(MenuItemOrig)(({theme}) => ({
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,

        '&:hover': {
            backgroundColor: theme.palette.primary.main
        },
    }
}));

export default MenuItem;