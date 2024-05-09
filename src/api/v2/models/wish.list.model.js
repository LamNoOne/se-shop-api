'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class WishList extends Model {}

WishList.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  userId: {
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
  modelName: 'WishList',
  tableName: 'WishList'
})

module.exports = WishList
