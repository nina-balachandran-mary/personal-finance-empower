import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {Transactions} from "./Transactions";
import {Accounts} from "./Accounts";
import {Trackers} from "./Trackers";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigation} from "./Navigation";
import {ThemeProvider, createTheme} from "@mui/material";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const theme = createTheme({
    typography: {
        "fontFamily": `"Figtree", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
})

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navigation/>
                <Routes>
                    <Route element={<App/>}
                           path="/"/>
                    <Route element={<Accounts showAllAccounts={true}/>}
                           path="/accounts"/>
                    <Route element={<Transactions/>}
                           path="/transactions/:accountId"/>
                    <Route element={<Trackers/>}
                           path="/trackers"/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
