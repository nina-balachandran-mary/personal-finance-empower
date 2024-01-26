import {Link, useParams} from "react-router-dom";
import {Transaction} from "./types/Transaction";
import React, {useEffect, useState} from "react";
import {Alert, Avatar, Box, Button, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export const Transactions = () => {
    const {accountId} = useParams()
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        fetch(`http://localhost:3001/transactions/${accountId}`)
            .then(res => res.json())
            .then(jsonData => setTransactions(jsonData))
    }, [accountId])

    return <Box sx={{p: 4}}>
        {transactions.length > 0 ? <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell width={'30%'}>Merchant name</TableCell>
                        <TableCell align="right" width={'10%'}>Status</TableCell>
                        <TableCell align="right" width={'20%'}>Amount</TableCell>
                        <TableCell align="right" width={'20%'}>Authorized date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow
                            key={transaction.transaction_id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row" width={'30%'}>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Avatar alt="merchant image"
                                            src={transaction.logo_url || transaction.personal_finance_category_icon_url}/>
                                    <Typography variant={"subtitle2"}
                                                marginX={2}>{transaction.merchant_name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="right"
                                       width={'20%'}>{transaction.pending ? 'Pending' : 'Authorized'}</TableCell>
                            <TableCell align="right"
                                       width={'20%'}>{transaction.amount} {transaction.iso_currency_code}</TableCell>
                            <TableCell align="right"
                                       width={'20%'}>{transaction.authorized_date && !transaction.pending ?
                                new Date(transaction.authorized_date).toLocaleDateString() : '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <Alert severity="info">No transactions found for this account.</Alert>}
    </Box>
}