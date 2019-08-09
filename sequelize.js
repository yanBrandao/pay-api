const Sequelize = require('sequelize')
const ClientModel = require('./models/client')
const CreditCardModel = require('./models/credit_card')
const TransactionModel = require('./models/transaction')
const PayablesModel = require('./models/payables')


const sequelize = new Sequelize('d7aqrv04pv9t70', 'dsdqorvrjmhbcw', '11d792e595a5bf2599a3bc40e49f2778321953f0a60ce04811a8a46ba0529ae6', {
  host: 'ec2-54-227-251-33.compute-1.amazonaws.com',
  port: '5432',
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  },
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


Transaction.belongsTo(Payables)
Transaction.belongsTo(Client)
Transaction.belongsTo(CreditCard)

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
    Client,
    CreditCard,
    Transaction,
    Payables
}