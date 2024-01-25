import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Tracker} from "./types/Tracker";
import {Alert, IconButton, Tooltip} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {TrackerProgress} from "./TrackerProgress";
import {WeeklyReport} from "./types/WeeklyReport";

interface TrackerTableProps {
    trackers: Tracker[]
    expenses: WeeklyReport
    onUpdate: (tracker: Tracker) => void
    onMutate: () => void
}

export const TrackerTable = ({trackers, expenses, onUpdate, onMutate}: TrackerTableProps) => {
    const deleteTracker = (id: number) => {
        fetch('http://localhost:3001/tracker/delete', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                tracker_id: id
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    onMutate()
                }
            }, error => {
                console.error('Unable to delete tracker', error)
            })
    }

    const getTrackerValue = (current: number, total: number) => {
        return Math.round(((current ?? 0) * 100) / total)
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell width={'30%'}>Name</TableCell>
                        <TableCell align="right" width={'20%'}>Amount</TableCell>
                        <TableCell align="right" width={'20%'}>Category</TableCell>
                        <TableCell align="right" width={'20%'}>Progress</TableCell>
                        <TableCell align="right" width={'10%'}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trackers.map((tracker) => (
                        <TableRow
                            key={tracker.tracker_id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row" width={'30%'}>
                                {tracker.name}
                            </TableCell>
                            <TableCell align="right" width={'20%'}>{tracker.amount} {expenses.iso_currency_code}</TableCell>
                            <TableCell align="right" width={'20%'}>{tracker.personal_finance_category}</TableCell>
                            <TableCell align="right" width={'20%'}>
                                {expenses.data !== null ?
                                    expenses.data[tracker.personal_finance_category] ?
                                        expenses.data[tracker.personal_finance_category] <= tracker.amount ?
                                            <TrackerProgress
                                                value={getTrackerValue(expenses.data[tracker.personal_finance_category], tracker.amount)}/> :
                                            <Alert severity="info">Exceeded weekly budget for this tracker.</Alert> :
                                        <Alert severity="info">No expenses this week.</Alert> :
                                    ''}
                            </TableCell>
                            <TableCell align="right" width={'10%'}>
                                <Tooltip title="Update">
                                    <IconButton onClick={() => onUpdate(tracker)}>
                                        <Edit/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton onClick={() => deleteTracker(tracker.tracker_id)}>
                                        <Delete/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
