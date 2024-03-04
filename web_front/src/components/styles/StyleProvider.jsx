import * as React from 'react';
import {createGlobalStyle, ThemeProvider as StyledThemeProvider} from "styled-components";
import {createTheme} from "@mui/material/styles";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from "@mui/material";

const StyleProvider = ({children}) => {
    return (
        <StyledThemeProvider theme={theme}>
            <ThemeProvider theme={materialTheme}>
                <GlobalStyle />
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme="dark"
                />
                {children}
            </ThemeProvider>
        </StyledThemeProvider>
    );
};

export default StyleProvider;

export const theme = {
    bg: "#323232",
    primary: "#3da2f3",
    secondary: "#3f3f3f",
    third: "#f3fff3",
    text_light: "#f3fff3",
    text_dark: "#111",
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body, #root {
    height: 100%;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }

  .Toastify__toast-theme--dark {
    background-color: ${theme.secondary};
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.primary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #105fcc;
  }
  
  fieldset:hover {
    background-color: ${theme.primary};
  }
`

const menuProps = {
    PaperProps: {
        style: {
            backgroundColor: theme.secondary,
            color: theme.text_light,
            '&:hover': {
                color: theme.primary,
            }
        },
    },
};

const materialTheme = createTheme({
    components: {
        MuiSelect: {
            defaultProps: {
                MenuProps: menuProps
            }
        },
        MuiButton: {
            defaultProps: {
                variant: "contained",

            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.primary
                    }
                }
            }
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: theme.primary,
            contrastText: theme.text_light,
        },
        secondary: {
            main: theme.secondary,
            contrastText: theme.text_light,
        },
        bg: {
            main: theme.bg,
            contrastText: theme.text_light,
        }
    },
});