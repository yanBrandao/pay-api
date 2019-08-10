module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        amount: type.FLOAT,
        description: type.STRING,
        payment_method: type.STRING
    });
};