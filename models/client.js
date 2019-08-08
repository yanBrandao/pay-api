module.exports = (sequelize, type) => {
    return sequelize.define('client', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING
    })
}