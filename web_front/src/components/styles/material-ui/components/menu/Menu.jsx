import {Menu as MenuOrig, styled} from "@mui/material";

const Menu = styled((props) => (
    <MenuOrig
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.secondary.main,

        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 20,
                color: theme.palette.primary.contrastText,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: theme.palette.primary.main
            },
            '&:hover': {
                backgroundColor: theme.palette.primary.main
            },
        },
    },
}));

export default Menu;