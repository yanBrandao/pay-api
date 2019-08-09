const request = require('supertest');
var express = require('express');

var creditCardRouter = require('../routes/credit_card');
var clientsRouter = require('../routes/client');
var transactionRouter = require('../routes/transaction');
var payableRouter = require('../routes/payables');

var app = express();

app.use('/api/creditcards', creditCardRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/payables', payableRouter);



describe('GET /api/creditcards', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/creditcards')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  })
});

describe('POST /api/creditcards', function() {
  it('creditcard.number should be at least 16 characters', function(done) {
    request(app)
      .post('/api/creditcards')
      .send({
        'card_number': '0000 0000 0000 0000'
      }) 
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.card_number = res.body.card_number;
      })
      .expect(200, {
        id: 'some fixed id',
        card_number: 'XXXX XXXX XXXX 0000'
      }, done);
  });
});