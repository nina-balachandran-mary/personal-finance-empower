import React, {useEffect, useState} from 'react';
import {Accounts} from "./Accounts";
import {WeeklyReport} from "./WeeklyReport";
import {WeeklyReport as WReport} from "./types/WeeklyReport";
import {Alert, Box} from "@mui/material";

export const App = () => {
    const [categories, setCategories] = useState<WReport>({data: {}, iso_currency_code: null})

    useEffect(() => {
        fetch('http://localhost:3001/weeklyExpenses')
            .then(res => res.json())
            .then(jsonData => setCategories(jsonData))
            .catch(error => {
                console.error(error)
            })

    }, [])

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
            <Box sx={{width: '50%'}}><Accounts showAllAccounts={false}/></Box>
            {/* Assumption: All account currencies is of the same type */}
            <Box sx={{minWidth: 800}}>{categories.data ?
                <WeeklyReport categories={categories.data} currencyCode={categories.iso_currency_code}/> :
                <Alert severity={"info"}>Unable to generate Weekly expenses chart at this time. Please try again
                    later</Alert>}
            </Box>
        </Box>
    );
}

