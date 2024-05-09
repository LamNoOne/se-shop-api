'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Permission extends Model {}

Permission.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  api: {
    type: DataTypes.STRING
  },
  method: {
    type: DataTypes.STRING
  },
  isPrivate: {
    type: DataTypes.BOOLEAN
  },
  permissionTypeId: {
    type: DataTypes.TINYINT.UNSIGNED
  },
  resourceId: {
    type: DataTypes.TINYINT.UNSIGNED
  },
  versionId: {
    type: DataTypes.TINYINT.UNSIGNED
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'Permission',
  tableName: 'Permission'
})

module.exports = Permission