var express = require('express');
var router = express.Router();


// dependencies
const { Transaction } = require('../sequelize')
const { Payables } = require('../sequelize')
const { CreditCard } = require('../sequelize')

// create a transaction
router.post('/', (req, res) => {
  var transaction = req.body;
  var payable = new Payables();

  console.log(req.headers);

  transaction.clientId = req.headers.clientid;

  if(transaction.payment_method === 'debit_card') {
    payable.status = 'paid';
    payable.fee = 3.0;
    payable.payment_date = new Date();
  } else if(transaction.payment_method === 'credit_card') {
    payable.status = 'waiting_funds';
    payable.fee = 5.0;
    var date = new Date();
    date.setDate(date.getDate() + 30);
    payable.payment_date = date;
  } else {
    res.status(500).send('Payment Method invalid.');
  }
  CreditCard.create(transaction.CreditCard).then( creditCard => {
    transaction.creditCardId = creditCard.dataValues.id;
    console.log(payable.dataValues);
    Payables.create(payable.dataValues).then(payable => {
      transaction.payableId = payable.dataValues.id;
      Transaction.create(transaction)
        .then(transac => res.json(transac))
    });
  });
})
// get all clients
router.get('/', (req, res) => {
  Transaction.findAll().then(clients => res.json(clients))
})

module.exports = router;
