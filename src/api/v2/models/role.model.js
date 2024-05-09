'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Role extends Model {}

Role.init({
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
  modelName: 'Role',
  tableName: 'Role'
})

module.exports = Role