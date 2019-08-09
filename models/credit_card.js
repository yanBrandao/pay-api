module.exports = (sequelize, type) => {
    return sequelize.define('credit_card', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        card_number: type.STRING(19),
        name: type.STRING,
        cvv: type.STRING(4),
        date_validation: type.DATE
    })
}