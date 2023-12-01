import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import store from './store/index'


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#130f14',
      light: '#c4c8e0',
      dark: '#14247b',
      contrastText: '#dacdcd',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#d6e8db',
      paper: '#daacac',
    },
    text: {
      primary: 'rgba(43,40,39,0.87)',
      secondary: 'rgba(129,118,89,0.6)',
      disabled: 'rgba(103,83,83,0.38)',
      hint: '#565269',
    },
  },
  typography: {
    fontFamily: 'Oswald',
    fontSize: 12,
    fontWeightLight: 1000,
    fontWeightRegular: 100,
    h1: {
      fontFamily: 'Oswald',
    },
  },
  link: {
    color: '#FFFFFF',
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#ecf0f1',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c3e50',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: '#ecf0f1',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '4px solid #bdc3c7',
          boxShadow: '0 2px 4px rgba(1, 1, 1, 1.1)',
        },
        head: {
          color: '#111111',
          fontWeight: 'bold',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: '#ecf0f1',
          },
          
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '3px solid #111111', // Añade el borde al Paper
        },
      },
    },
    
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/