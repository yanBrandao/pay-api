var express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();

// dependencies
const { Payables, Transaction } = require('../sequelize');

// get Payable from a Client
router.get('/', (req, res) => {
    Transaction.findAll({
        includeIgnoreAttributes: false,
        where: {
            clientId: req.headers.clientid
        },
        attributes: [[Sequelize.fn('sum', Sequelize.literal('amount - (amount * fee / 100)')), 'amount'],
         [Sequelize.literal('case when "transaction"."payment_method" = \'credit_card\' then \'waiting_funds\' when "transaction"."payment_method" = \'debit_card\' then \'available\' end'), 'status']],
        include: [
            {
                model: Payables,
                as: 'payable',
                attributes: []
            }
        ],
        group: ['payment_method', 'clientId']
    }).then(payables =>{
        console.log(payables);
         res.json(payables);});
});

module.exports = router;

