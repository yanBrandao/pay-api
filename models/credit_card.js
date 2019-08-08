module.exports = (sequelize, type) => {
    return sequelize.define('credit_card', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        card_number: type.STRING,
        name: type.STRING,
        cvv: type.STRING,
        date_validation: type.DATE
    })
}