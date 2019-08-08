module.exports = (sequelize, type) => {
    return sequelize.define('payables', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        status: type.STRING,
        payment_date: type.DATE,
        fee: type.FLOAT
    })
}