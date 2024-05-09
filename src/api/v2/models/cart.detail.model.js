'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class CartDetail extends Model {}

CartDetail.init({
  cartId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  quantity: {
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
  modelName: 'CartDetail',
  tableName: 'CartDetail'
})

module.exports = CartDetail