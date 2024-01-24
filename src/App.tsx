import React, {useEffect, useState} from 'react';
import {Accounts} from "./Accounts";
import {Account} from "./types/Account";
import {AccountsSummary} from "./AccountsSummary";
import {WeeklyReport} from "./WeeklyReport";
import './App.css';

export const App = () => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [currencyCode, setCurrencyCode] = useState('')
    const [categories, setCategories] = useState<Record<string, Record<string, number>>>({})

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

        fetch('http://localhost:3001/weeklyExpenses')
            .then(res => res.json())
            .then(jsonData => setCategories(jsonData))
            .catch(error => {
                console.error(error)
                return (<div>Unable to generate Weekly expenses chart at this time. Please try again later</div>)
            })

    }, [])

    // Assumption: Balances at the user and account level is never non-zero
    const totalBalance = accounts.reduce((acc, curr) => acc + (curr.balances.available || 0), 0);

    return (
        <div className="App">
            <AccountsSummary totalBalance={totalBalance} currencyCode={currencyCode}/>
            <Accounts allAccounts={accounts} currencyCode={currencyCode}/>
            {/* Assumption: All account currencies is of the same type */}
            {categories.data ? <WeeklyReport categories={categories.data} currency={currencyCode}/> : ''}
        </div>
    );
}

