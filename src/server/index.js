const express = require('express')
const cors = require('cors')

// importing local data for accounts and transactions
const data = require('../data/mockData.json')

// Setting up PORT, hardcoded for the purpose of this exercise
const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


/**
 * API definitions
 */

app.get('/accounts', (req, res) => {
    res.send(data.accounts)
})

app.get('/transactions/:accountId', (req, res) => {
    const accountId = req.params.accountId
    if (!accountId) {
        res.write([])
    } else {
        const transactions = data.transactions.filter(t => t.account_id === accountId)
        res.write(transactions)
    }
    res.end()
})

app.get('/weeklyExpenses', (req, res) => {
    // Filter transactions in the last week and sum them up against a personal_finance_category
    let categories = {}
    const prevWeek = Date.now() - 604800000 //ms in a week
    for (let c = 0; c < data.transactions.length; c += 1) {
        const category = data.transactions[c].personal_finance_category.primary
        const purchaseDate = Date.parse(data.transactions[c].date)
        if (prevWeek > purchaseDate) {
            continue
        }
        if (!categories[category]) {
            categories[category] = 0
        }
        categories[category] += data.transactions[c].amount
    }
    res.send({data: categories})
})
