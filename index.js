const express = require('express');

const app = express();
app.use(express.json());


const AccountManager = require('./AccountManager');

const accountManager = new AccountManager();

// reset database
app.post('/reset', (req, res) => {
    accountManager.reset();
    res.sendStatus(200);
});

// get balance for account
app.get('/balance', (req, res) => {
    const accountId = req.query.account_id;
    const account = accountManager.getAccount(accountId);
    if (account) {
        res.status(200).send(account.getBalance().toString());
    } else {
        res.status(404).send('0');
    }
});

app.post('/event', (req, res) => {
    // Desctructure the request body
    const { type, destination, origin, amount } = req.body;

    switch (type) {
        case 'deposit': {
            
            const account = accountManager.getOrCreateAccount(destination);
            account.deposit(amount);
            res.status(201).send({ 
                destination: { id: destination, balance: account.getBalance() } 
            });
            break;
        }

        case 'withdraw': {
            const account = accountManager.getAccount(origin);
            if (!account) {
                res.status(404).send('0');
            } else {
                account.withdraw(amount);
                res.status(201).send({ 
                    origin: { id: origin, balance: account.getBalance() } 
                });
            }
            break;
        }

        case 'transfer': {
            const sourceAccount = accountManager.getAccount(origin);
            if (!sourceAccount) {
                res.status(404).send('0');
            } else {
                const destAccount = accountManager.getOrCreateAccount(destination);
                sourceAccount.withdraw(amount);
                destAccount.deposit(amount);
                res.status(201).send({
                    origin: { id: origin, balance: sourceAccount.getBalance() },
                    destination: { id: destination, balance: destAccount.getBalance() }
                });
            }
            break;
        }

        default:
            res.sendStatus(400);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
