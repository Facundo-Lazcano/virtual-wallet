const Sequelize = require('sequelize')
const UserModel = require('../models/user')
const MovementsModel = require('../models/movements')

const sequelize = new Sequelize('Ki5FXtqGhb', 'Ki5FXtqGhb', 'HIByudzEG6', {
  host: 'remotemysql.com',
  dialect: 'mysql'
})

const User = UserModel(sequelize, Sequelize)
const Movements = MovementsModel(sequelize, Sequelize)

sequelize.sync({ force: false }).then(() => {
  console.log('bd sincronizada')
})

module.exports = {
  User,
  Movements
}
