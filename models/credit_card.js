module.exports = (sequelize, type) => {
var CreditCard = sequelize.define('credit_card', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  card_number: type.STRING(19),
  name: type.STRING,
  cvv: type.STRING(4),
  date_validation: type.DATE
});

CreditCard.beforeCreate(function(model, options){
  var masked = model.card_number.substring(0, model.card_number.length - 4).replace(/[0-9]/g, 'X');
        var lastDigits = model.card_number.substring(model.card_number.length - 4, model.card_number.length);
        model.card_number = masked + lastDigits;
});

    return CreditCard;
}