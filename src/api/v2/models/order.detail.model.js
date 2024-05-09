'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class OrderDetail extends Model {}

OrderDetail.init({
  orderId: {
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
  price: {
    type: DataTypes.BIGINT.UNSIGNED
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'OrderDetail',
  tableName: 'OrderDetail'
})

module.exports = OrderDetail
