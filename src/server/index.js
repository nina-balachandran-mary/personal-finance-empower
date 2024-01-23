const express = require('express')

// importing local data for accounts and transactions
const data = require('../data/mockData.json')

// Setting up PORT, hardcoded for the purpose of this exercise
const PORT = 3001;

const app = express();
app.use(express.json());


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
