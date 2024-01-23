const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

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

// Setting up in memory storage for trackers
function createTables(db) {
    db.exec(`
    create table trackers (
        name text not null,
        amount real not null,
        personal_finance_category text not null,
        created_at text
    );
    insert into trackers (name, amount, personal_finance_category, created_at)
        values ('Games', 70, 'ENTERTAIMENT', CURRENT_TIMESTAMP)
    `);
}


let db = new sqlite3.Database('', (err) => {
    if (err) {
        console.error("Getting error " + err);
        return;
    }
    createTables(db);
});

// end of db initialization

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

app.get('/tracker/get', async (req, res) => {
    await db.all("SELECT *, row_number() over(order by '') as 'tracker_id' FROM trackers", (err, rows) => {
        if (rows) {
            res.send(rows)
        }
    });
})

app.post('/tracker/create', (req, res) => {
    const trackerDetails = req.body
    let status = 200
    db.run("INSERT INTO trackers (name, amount, personal_finance_category, created_at) VALUES(?,?,?, datetime('now','localtime'))", [trackerDetails.name, trackerDetails.amount, trackerDetails.personal_finance_category], (err) => {
        if (err) {
            status = 400
        }
        res.sendStatus(status)
    });
})

app.post('/tracker/update', async (req, res) => {
    let status = 200

    db.run("UPDATE trackers SET name = $name, amount = $amount, personal_finance_category = $category WHERE rowid = $id", {
        $id: req.body.tracker_id,
        $name: req.body.name,
        $amount: req.body.amount,
        $category: req.body.personal_finance_category
    }, (err) => {
        if (err) {
            status = 400
        }
        res.sendStatus(status)
    })
})

app.post('/tracker/delete', (req, res) => {
    let status = 200
    db.run("DELETE from trackers WHERE rowid = ?", req.body.tracker_id, (err) => {
        if (err) {
            status = 400
        }
        res.sendStatus(status)
    })
})