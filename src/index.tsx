import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Transactions} from "./Transactions";
import {Accounts} from "./Accounts";
import {Trackers} from "./Trackers";
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },

    {
        path: "/accounts",
        element: <Accounts/>,
    },

    {
        path: "/transactions/:accountId",
        element: <Transactions/>,
    },

    {
        path: "/trackers",
        element: <Trackers/>,
    },
])

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
