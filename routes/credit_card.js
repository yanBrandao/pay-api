var express = require('express');
var router = express.Router();

// dependencies
const { CreditCard } = require('../sequelize')

// create a client
router.post('/', (req, res) => {
    var item = req.body;
    if(item.card_number.lenght < 16){
        res.status(500).send('Credit Card number invalid.');
    } else {
        var masked = card_number.substring(0, card_number.lenght - 4).replace(/\d/g, "X");
        var lastDigits = card_number.substring(card_number.lenght - 4);
        item.card_number = masked + lastDigits;
        CreditCard.create(item)
        .then(creditCard => res.json(creditCard))
    }
})
// get all clients
router.get('/', (req, res) => {
    CreditCard.findAll().then(creditCards => res.json(creditCards))
})

module.exports = router;

