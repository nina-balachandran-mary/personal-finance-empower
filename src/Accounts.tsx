import {Account} from "./types/Account";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {AccountsSummary} from "./AccountsSummary";
import {Button, Alert, Box} from "@mui/material";
import './Accounts.css';

interface AccountsProps {
    showAllAccounts: boolean
}

export const Accounts = ({showAllAccounts}: AccountsProps) => {
    const MAX_DISPLAYED_ACCOUNTS = 10
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
                return (
                    <Alert severity="error">Unable to retrieve Accounts at this time. Please try again later</Alert>)
            })
    }, []);

    // Assumption: Balances at the user and account level is never non-zero
    const totalBalance = accounts.reduce((acc, curr) => acc + (curr.balances.available || 0), 0);

    return <div>
        <AccountsSummary totalBalance={totalBalance} currencyCode={currencyCode}/>
        <h3>All accounts</h3>
        {accounts.length > 0 ? accounts.map((account, index) => <Box key={account.account_id}
                                                                     className={`${((index + 1 > MAX_DISPLAYED_ACCOUNTS) && (!showAllAccounts)) && 'hidden'}`}
                                                                     component={Link}
                                                                     to={'/transactions/' + account.account_id}>
            {account.official_name}
            <p>{account.balances.available} {currencyCode}</p>
        </Box>) : <Alert severity="info">No accounts found.</Alert>}
        {(accounts.length > MAX_DISPLAYED_ACCOUNTS && (!showAllAccounts)) ?
            <Button variant="contained" component={Link} to={'/accounts'}>View all ({accounts.length})</Button> : ''}
    </div>
}