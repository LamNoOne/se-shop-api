'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Resource extends Model {}

Resource.init({
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
  modelName: 'Resource',
  tableName: 'Resource'
})

module.exports = Resource