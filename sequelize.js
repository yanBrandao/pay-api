const Sequelize = require('sequelize')
const ClientModel = require('./models/client')
const CreditCardModel = require('./models/credit_card')
const TransactionModel = require('./models/transaction')
const PayablesModel = require('./models/payables')


const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  port: '5435',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Client = ClientModel(sequelize, Sequelize)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const CreditCard = CreditCardModel(sequelize, Sequelize)
const Transaction = TransactionModel(sequelize, Sequelize)
const Payables = PayablesModel(sequelize, Sequelize)


Transaction.Payables = Transaction.belongsTo(Payables)
Transaction.Client = Transaction.belongsTo(Client)
Transaction.CreditCard = Transaction.belongsTo(CreditCard)

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
    Client,
    CreditCard,
    Transaction,
    Payables
}