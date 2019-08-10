const request = require('supertest');
var express = require('express');
const bodyParser = require('body-parser');

var creditCardRouter = require('../../controllers/credit_card');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/creditcards', creditCardRouter);



describe('GET /api/creditcards', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/creditcards')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/creditcards', function() {
  it('creditcard.number should be save only 4 last digits', function(done) {
    request(app)
      .post('/api/creditcards')
      .type('form')
      .set('Accept', 'application/json')
      .send({
        "name": "FULANO DE TAL",
        "date_validation": "2022-12-08",
        "card_number": "1243 5678 2460 3232",
        "cvv": "999"
      }) 
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.createdAt = 'fixed date';
        res.body.updatedAt = 'fixed date';
        res.body.card_number = res.body.card_number;
        res.body.name = res.body.name;
        res.body.cvv = res.body.cvv;
        res.body.date_validation = res.body.date_validation;
      })
      .expect(200, {
        id: 'some fixed id',
        card_number: 'XXXX XXXX XXXX 3232',
        cvv: "999",
        date_validation: "2022-12-08T00:00:00.000Z",
        name: "FULANO DE TAL",
        createdAt: 'fixed date',
        updatedAt: 'fixed date'
      }, done);
  });
});

describe('POST /api/creditcards', function() {
  it('creditcard.number with no empty spaces', function(done) {
    request(app)
      .post('/api/creditcards')
      .type('form')
      .set('Accept', 'application/json')
      .send({
        "name": "FULANO DE TAL",
        "date_validation": "2022-12-08",
        "card_number": "1243567824603232",
        "cvv": "999"
      }) 
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.createdAt = 'fixed date';
        res.body.updatedAt = 'fixed date';
        res.body.card_number = res.body.card_number;
        res.body.name = res.body.name;
        res.body.cvv = res.body.cvv;
        res.body.date_validation = res.body.date_validation;
      })
      .expect(200, {
        id: 'some fixed id',
        card_number: 'XXXXXXXXXXXX3232',
        cvv: "999",
        date_validation: "2022-12-08T00:00:00.000Z",
        name: "FULANO DE TAL",
        createdAt: 'fixed date',
        updatedAt: 'fixed date'
      }, done);
  });
});

describe('POST /api/creditcards', function() {
  var body = {
    "name": "FULANO DE TAL",
    "date_validation": "2022-12-08",
    "card_number": "1243 5678 2460 329",
    "cvv": "999"
  };
  it('Credit Card Number must have 16 numbers', function(done) {
    request(app)
      .post('/api/creditcards')
      .send(body)
      .set({Accept:'application/json'})
      .expect(500, 'Credit Card number invalid.', done);
    });
});