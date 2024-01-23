import React, {useEffect, useState} from 'react';
import {Accounts} from "./Accounts";
import {Account} from "./types/Account";
import {AccountsSummary} from "./AccountsSummary";
import './App.css';

function App() {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [currencyCode, setCurrencyCode] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/accounts')
            .then(res => res.json())
            .then(jsonData => {
                setAccounts(jsonData)
                setCurrencyCode(jsonData[0].balances.iso_currency_code)
            })
            .catch(error => {
                console.error(error)
                return (<div>Unable to retrieve Accounts at this time. Please try again later</div>)
            })
    }, [])

    // Assumption: Balances at the user and account level is never non-zero
    const totalBalance = accounts.reduce((acc, curr) => acc + (curr.balances.available || 0), 0);

    return (
        <div className="App">
            <AccountsSummary totalBalance={totalBalance} currencyCode={currencyCode}/>
            <Accounts allAccounts={accounts} currencyCode={currencyCode}/>
        </div>
    );
}

export default App;
