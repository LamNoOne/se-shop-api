'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class PaymentForm extends Model {}

PaymentForm.init({
  id: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
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
  modelName: 'PaymentForm',
  tableName: 'PaymentForm'
})

module.exports = PaymentForm
