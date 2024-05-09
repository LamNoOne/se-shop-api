'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class OrderStatus extends Model {}

OrderStatus.init({
  id: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'OrderStatus',
  tableName: 'OrderStatus'
})

module.exports = OrderStatus
