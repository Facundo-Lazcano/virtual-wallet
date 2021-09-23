const { Sequelize } = require('sequelize')
const UserModel = require('../models/user')
const MovementsModel = require('../models/movements')

const sequelize = new Sequelize('wallet', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

const User = UserModel(sequelize, Sequelize)
const Movements = MovementsModel(sequelize, Sequelize)

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('bd sincronizada')
  })
  .catch(error => {
    console.log(error)
  })

module.exports = {
  User,
  Movements
}
