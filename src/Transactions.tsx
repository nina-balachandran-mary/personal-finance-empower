import {useParams} from "react-router-dom";
import {Transaction} from "./types/Transaction";
import {useEffect, useState} from "react";
import {Alert} from "@mui/material";

export const Transactions = () => {
    const {accountId} = useParams()
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        fetch(`http://localhost:3001/transactions/${accountId}`)
            .then(res => res.json())
            .then(jsonData => setTransactions(jsonData))
    }, [accountId])

    return <div>{transactions.length > 0 ? transactions.map((t: Transaction) => <div key={t.transaction_id}>
            {t.logo_url ? <img src={t.logo_url!}/> : ''}<span>{t.merchant_name}</span>{t.pending ?
            <span>Pending</span> : <span>{t.date}</span>}<span>{t.amount}</span></div>) :
        <Alert severity="info">No transactions found for this account.</Alert>}
    </div>
}