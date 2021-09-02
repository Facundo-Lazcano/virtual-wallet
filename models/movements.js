'use strict'
const { Model } = require('sequelize')
const user = require('./user')
module.exports = (sequelize, DataTypes) => {
  class movements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  movements.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      movement_type: {
        allowNull: false,
        type: DataTypes.STRING
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'movements'
    }
  )
  return movements
}
