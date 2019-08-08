var express = require('express');
var router = express.Router();

// create a client
router.post('/', (req, res) => {
    CreditCard.create(req.body)
        .then(creditCard => res.json(creditCard))
})
// get all clients
router.get('/', (req, res) => {
    CreditCard.findAll().then(creditCards => res.json(creditCards))
})

module.exports = router;

