const request = require('supertest');
var express = require('express');
const bodyParser = require('body-parser');

var clientRouter = require('../../controllers/client');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/clients', clientRouter);



describe('GET /api/clients', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/clients')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /api/clients', function() {
  it('check if client is created', function(done) {
    request(app)
      .post('/api/clients')
      .type('form')
      .set('Accept', 'application/json')
      .send({
        "name": "FULANO DE TAL"
      }) 
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.name = res.body.name;
        res.body.createdAt = 'fixed date';
        res.body.updatedAt = 'fixed date';
      })
      .expect(200, {
        id: 'some fixed id',
        name: "FULANO DE TAL",
        createdAt: 'fixed date',
        updatedAt: 'fixed date'
      }, done);
  });
});