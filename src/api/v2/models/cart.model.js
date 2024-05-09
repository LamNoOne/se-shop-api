'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Cart extends Model {}

Cart.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Cart',
  tableName: 'Cart'
})

module.exports = Cart
