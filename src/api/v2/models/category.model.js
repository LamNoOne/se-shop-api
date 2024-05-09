'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')
const Product = require('./product.model')

class Category extends Model {}

Category.init({
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
  modelName: 'Category',
  tableName: 'Category'
})

Category.hasMany(Product, {
  foreignKey: 'categoryId',
  sourceKey: 'id',
  as: 'products'
})

module.exports = Category
