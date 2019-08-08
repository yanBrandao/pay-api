const express = require('express')
const bodyParser = require('body-parser')
// dependencies
const { Client, Payables, CreditCard, Transaction } = require('./sequelize')

const app = express()
app.use(bodyParser.json())

// API ENDPOINTS

// create a client
app.post('/api/clients', (req, res) => {
    Client.create(req.body)
        .then(client => res.json(client))
})
// get all clients
app.get('/api/clients', (req, res) => {
    Client.findAll().then(clients => res.json(clients))
})

// create a client
app.post('/api/credit_cards', (req, res) => {
    CreditCard.create(req.body)
        .then(creditCard => res.json(creditCard))
})
// get all clients
app.get('/api/credit_cards', (req, res) => {
    CreditCard.findAll().then(creditCards => res.json(creditCards))
})

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})