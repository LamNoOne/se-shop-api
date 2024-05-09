'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class WishListDetail extends Model {}

WishListDetail.init({
  wishListId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize: mysql.getInstance(),
  modelName: 'WishListDetail',
  tableName: 'WishListDetail'
})

module.exports = WishListDetail