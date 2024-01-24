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

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route element={<App/>}
                       path="/"/>
                <Route element={<Accounts allAccounts={[]} currencyCode={''}/>}
                       path="/accounts"/>
                <Route element={<Transactions/>}
                       path="/transactions/:accountId"/>
                <Route element={<Trackers/>}
                       path="/trackers"/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
