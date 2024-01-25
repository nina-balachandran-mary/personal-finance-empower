import {Account} from "./types/Account";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {AccountsSummary} from "./AccountsSummary";
import {Button, Alert, Box} from "@mui/material";
import './Accounts.css';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

interface AccountsProps {
    showAllAccounts: boolean
}

export const Accounts = ({showAllAccounts}: AccountsProps) => {
    const MAX_DISPLAYED_ACCOUNTS = 3
    const [accounts, setAccounts] = useState<Account[]>([])
    const [currencyCode, setCurrencyCode] = useState('')
    const navigate = useNavigate()

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

    return <Box sx={{p: 4}}>
        <AccountsSummary totalBalance={totalBalance} currencyCode={currencyCode}/>

        {accounts.length > 0 ? <TableContainer component={Paper} sx={{marginTop: 4}}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell width={'30%'}>Name</TableCell>
                        <TableCell align="right" width={'10%'}>Account ending in</TableCell>
                        <TableCell align="right" width={'20%'}>Type</TableCell>
                        <TableCell align="right" width={'20%'}>Current</TableCell>
                        <TableCell align="right" width={'20%'}>Available</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.slice(0, showAllAccounts ? accounts.length : MAX_DISPLAYED_ACCOUNTS).map((account) => (
                        <TableRow
                            key={account.account_id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}, textDecoration: 'none'}}
                            onClick={() => navigate('/transactions/' + account.account_id)}
                        >
                            <TableCell component="th" scope="row" width={'30%'}>
                                {account.official_name}
                            </TableCell>
                            <TableCell align="right" width={'20%'}>{account.mask}</TableCell>
                            <TableCell align="right" width={'20%'}>{account.subtype}</TableCell>
                            <TableCell align="right"
                                       width={'20%'}>{account.balances.current} {account.balances.iso_currency_code}</TableCell>
                            <TableCell align="right"
                                       width={'20%'}>{account.balances.available} {account.balances.iso_currency_code}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <Alert severity="info">No accounts found.</Alert>}
        {(accounts.length > MAX_DISPLAYED_ACCOUNTS && (!showAllAccounts)) ?
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}><Button variant="contained" component={Link}
                                                                            to={'/accounts'} sx={{marginTop: 4}}>View
                all accounts
                ({accounts.length})</Button> </Box> : ''}
    </Box>
}