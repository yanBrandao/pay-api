const Sequelize = require('sequelize');
const ClientModel = require('./models/client');
const CreditCardModel = require('./models/credit_card');
const TransactionModel = require('./models/transaction');
const PayablesModel = require('./models/payables');
const config = require('./config/config.json');
const express = require('express');
const app = express();

var env = app.get('env');
var envItems = '';
if(env ==  "test"){
  envItems = config.test;
} else {
  envItems = config.development;
  envItems.host = process.env.ADDR;
  console.log(envItems);
}
var database = envItems.database;
var username = envItems.username;
var password = envItems.password;
var host = envItems.host;
var port = envItems.port;
var dialect = envItems.dialect;
var ssl = envItems.ssl;

console.log(host);
const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: dialect,
  dialectOptions: {
    ssl: ssl
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Client = ClientModel(sequelize, Sequelize);
const CreditCard = CreditCardModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);
const Payables = PayablesModel(sequelize, Sequelize);


Transaction.Payables = Transaction.belongsTo(Payables);
Transaction.Client = Transaction.belongsTo(Client);
Transaction.CreditCard = Transaction.belongsTo(CreditCard);

console.log(app.get('env'));
if(app.get('env') == 'development'){
sequelize.sync({force: true})
  .then(() => {
    console.log(`Database & tables created!`);
  });
}

  
module.exports = {
    Client,
    CreditCard,
    Transaction,
    Payables
};