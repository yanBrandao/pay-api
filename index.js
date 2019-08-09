const express = require('express')
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var creditCardRouter = require('./routes/credit_card');
var clientsRouter = require('./routes/client');
var transactionRouter = require('./routes/transaction');
var payableRouter = require('./routes/payables');
var swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');

// dependencies

const app = express()
app.use(bodyParser.json())

// API ENDPOINTS
app.use('/', indexRouter);
app.use('/api/creditcards', creditCardRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/payables', payableRouter);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})