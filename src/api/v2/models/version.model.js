'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Version extends Model {}

Version.init({
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
  modelName: 'Version',
  tableName: 'Version'
})

module.exports = Version