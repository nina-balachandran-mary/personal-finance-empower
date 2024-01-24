import {Account} from "./types/Account";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {AccountsSummary} from "./AccountsSummary";

export const Accounts = () => {
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
                return (<div>Unable to retrieve Accounts at this time. Please try again later</div>)
            })
    });
    // Assumption: Balances at the user and account level is never non-zero
    const totalBalance = accounts.reduce((acc, curr) => acc + (curr.balances.available || 0), 0);


    return <div>
        <AccountsSummary totalBalance={totalBalance} currencyCode={currencyCode}/>
        <h3>All accounts</h3>
        {accounts.map(account => <div key={account.account_id}>
            <Link to={'/transactions/' + account.account_id}>{account.official_name}
                <p>{account.balances.available} {currencyCode}</p></Link></div>)}
        {accounts.length > MAX_DISPLAYED_ACCOUNTS && <button>View all ({accounts.length})</button>}
    </div>
}