const request = require('supertest');
var express = require('express');
const bodyParser = require('body-parser');

var transactionRouter = require('../../controllers/transaction');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/transactions', transactionRouter);



describe('GET /api/transactions', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/transactions')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/transactions', function() {
  var body = JSON.parse(JSON.stringify({
    "amount": 500.00,
    "description": "Smartband XYZ 3.0",
    "payment_method": "crebit",
    CreditCard: {
      "name": "FULANO DE TAL",
      "date_validation": "2022-12-08",
      "card_number": "XXXX XXXX XXXX 9999",
      "cvv": "999"
    }
  }));
  it('payment_method must debit or credit method', function(done) {
    request(app)
      .post('/api/transactions')
      .send(body)
      .set({clientId: 1, Accept:'application/json'})
      .expect(500, 'Payment Method invalid.', done);
    });
});


describe('POST /api/transactions', function() {
  var body = JSON.parse(JSON.stringify({
    "amount": 500.00,
    "description": "Smartband XYZ 3.0",
    "payment_method": "debit_card",
    CreditCard: {
      "name": "FULANO DE TAL",
      "date_validation": "2022-12-08",
      "card_number": "XXXX XXXX XXXX 9999",
      "cvv": "999"
    }
  }));
  console.log(body);
  it('transaction must save client, credit card and payable', function(done) {
    request(app)
      .post('/api/transactions')
      .set({clientId: 1, Accept:'application/json'})
      .send(body)
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.createdAt = 'fixed date';
        res.body.updatedAt = 'fixed date';
        res.body.amount = res.body.amount;
        res.body.description = res.body.description;
        res.body.payment_method = res.body.payment_method;
        res.body.clientId = 'fixed clientId';
        res.body.creditCardId = 'fixed creditCardId';
        res.body.payableId = 'fixed payableId';
      })
      .expect(200, {
        id: 'some fixed id',
        amount: 500.00,
        description: "Smartband XYZ 3.0",
        payment_method: "debit_card",
        clientId: 'fixed clientId',
        creditCardId: 'fixed creditCardId',
        payableId: 'fixed payableId',
        createdAt: 'fixed date',
        updatedAt: 'fixed date'
      }, done);
    });
});

describe('POST /api/transactions', function() {
  var body = JSON.parse(JSON.stringify({
    "amount": 500.00,
    "description": "Smartband XYZ 3.0",
    "payment_method": "credit_card",
    CreditCard: {
      "name": "FULANO DE TAL",
      "date_validation": "2022-12-08",
      "card_number": "XXXX XXXX XXXX 9999",
      "cvv": "999"
    }
  }));
  console.log(body);
  it('transaction must have different behaviour when credit_card is setted has payment_method', function(done) {
    request(app)
      .post('/api/transactions')
      .set({clientId: 1, Accept:'application/json'})
      .send(body)
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.createdAt = 'fixed date';
        res.body.updatedAt = 'fixed date';
        res.body.amount = res.body.amount;
        res.body.description = res.body.description;
        res.body.payment_method = res.body.payment_method;
        res.body.clientId = 'fixed clientId';
        res.body.creditCardId = 'fixed creditCardId';
        res.body.payableId = 'fixed payableId';
      })
      .expect(200, {
        id: 'some fixed id',
        amount: 500.00,
        description: "Smartband XYZ 3.0",
        payment_method: "credit_card",
        clientId: 'fixed clientId',
        creditCardId: 'fixed creditCardId',
        payableId: 'fixed payableId',
        createdAt: 'fixed date',
        updatedAt: 'fixed date'
      }, done);
    });
});