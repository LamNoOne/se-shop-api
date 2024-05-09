'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Gender extends Model {}

Gender.init({
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
  modelName: 'Gender',
  tableName: 'Gender'
})

module.exports = Gender