import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './redux/store';
import { SnackbarProvider } from 'notistack';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider } from '@mui/material';

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Zoom from '@mui/material/Zoom';
import Splash from "./scenes/splash";



const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin]
});



const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: "#ffc700"
    },
    mainTextColor: {
      main: '#111111',
    },
  },
  typography: {
    fontFamily: "'Vazir FD', 'Vazir'",
    fontSize: 14,
    color: "mainTextColor"
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: 30,

          ...(
            ownerState.variant === 'contained' && ownerState.color === 'primary' && {
              background: "linear-gradient(215.33deg, #FFE600 0, #FFC700 70.74%) !important",
              color: "#111111",
            }
          ),
          ...(
            ownerState.variant === 'contained' && ownerState.color === 'inherit' && {
              background: "#CECECE !important",
              color: "#111111",
            }
          ),
          ...(
            ownerState.size === 'large' && {
              height: "50px",
              fontSize: "1.2rem",
              fontWeight: 500,
            }
          ),

        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "30px !important",
          background: "white !important",
          boxShadow: "0px 0px 20px - 10px rgba(0, 0, 0, 0.25)",
          "& fieldset": {
            border: "none"
          },
          "& .MuiInputLabel-root": {
            color: "#111111 !important"
          },
          ...(
            !ownerState.multiline && {
              height: "50px",
            }
          ),
        }),
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          color: "#111111 !important",
          fontSize: "1rem",

        }),
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          boxShadow: "0px 0px 20px - 10px rgba(0, 0, 0, 0.25)",
          borderRadius: "30px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px !important"
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(229, 229, 229) !important",
          boxShadow: "none",
          color: "#111111",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          background: "linear-gradient(215.33deg, #FFE600 0, #FFC700 70.74%) !important",
          color: "#111111",
          height: "50px",
          borderRadius: "30px",
          boxShadow: "0px 0px 20px - 10px rgba(0, 0, 0, 0.25)",
          ...(
            ownerState.color === 'primary' && {
              background: "linear-gradient(215.33deg, #FFE600 0, #FFC700 70.74%) !important",
            }
          ),
          ...(
            ownerState.color === 'default' && {
              background: "#FFF !important",
            }
          ),
        }),
      },
    },
  },
});



ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Splash />
  </ThemeProvider>,
  document.getElementById('splash-root')
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={5}
            TransitionComponent={Zoom}
          >
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider >
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);






serviceWorker.register();

reportWebVitals();
