var express = require('express');
var router = express.Router();

// dependencies
const { CreditCard } = require('../sequelize');

// create a credit card
router.post('/', (req, res) => {
    var item = req.body;
    console.log((item.card_number.match(new RegExp(/[0-9]/g, "g")) || []).length);
    if((item.card_number.match(new RegExp(/[0-9]/g, "g")) || []).length < 16){
        res.status(500).send('Credit Card number invalid.');
    } else {
        CreditCard.create(item)
        .then(creditCard => res.json(creditCard));
    }
});
// get all credit cards
router.get('/', (req, res) => {
    CreditCard.findAll().then(creditCards => res.json(creditCards));
});

module.exports = router;

