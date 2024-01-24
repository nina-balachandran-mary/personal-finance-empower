import React, {useEffect, useState} from 'react';
import {Accounts} from "./Accounts";
import {WeeklyReport} from "./WeeklyReport";
import {WeeklyReport as WReport} from "./types/WeeklyReport";
import './App.css';

export const App = () => {
    const [categories, setCategories] = useState<WReport>({data: {}, iso_currency_code: null})

    useEffect(() => {
        fetch('http://localhost:3001/weeklyExpenses')
            .then(res => res.json())
            .then(jsonData => setCategories(jsonData))
            .catch(error => {
                console.error(error)
                return (<div>Unable to generate Weekly expenses chart at this time. Please try again later</div>)
            })

    }, [])

    return (
        <div className="App">
            <Accounts/>
            {/* Assumption: All account currencies is of the same type */}
            {categories.data ? <WeeklyReport categories={categories.data} currencyCode={categories.iso_currency_code}/> : ''}
        </div>
    );
}

