import {styled} from "@mui/material"
import {LoadingButton} from "@mui/lab";

const Button = styled(LoadingButton)(({theme}) => ({
    textTransform: "none",
    fontSize: 18,

    '&.Mui-disabled': {
        color: theme.palette.primary.contrastText
    },

    '& .MuiButton-startIcon': {
        '&>*:nth-of-type(1)': {
            fontSize: 25,
            [theme.breakpoints.up('sm')]: {
                fontSize: 20
            },
        }
    },

    [theme.breakpoints.up('sm')]: {
        fontSize: 16
    },

}));

export default Button;