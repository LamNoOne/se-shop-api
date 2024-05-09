'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class RolePermission extends Model {}

RolePermission.init({
  roleId: {
    type: DataTypes.TINYINT.UNSIGNED,
    primaryKey: true
  },
  permissionId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  assignerId: {
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
  modelName: 'RolePermission',
  tableName: 'RolePermission'
})

module.exports = RolePermission