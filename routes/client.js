var express = require('express');
var router = express.Router();

// create a client
router.post('/', (req, res) => {
    Client.create(req.body)
        .then(client => res.json(client))
})
// get all clients
router.get('/', (req, res) => {
    Client.findAll().then(clients => res.json(clients))
})

module.exports = router;
