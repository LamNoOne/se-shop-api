'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class PermissionType extends Model {}

PermissionType.init({
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
  modelName: 'PermissionType',
  tableName: 'PermissionType'
})

module.exports = PermissionType