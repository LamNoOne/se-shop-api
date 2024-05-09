'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class Product extends Model {}

Product.init({
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
  imageUrl: {
    type: DataTypes.STRING
  },
  screen: {
    type: DataTypes.STRING
  },
  operatingSystem: {
    type: DataTypes.STRING
  },
  processor: {
    type: DataTypes.STRING
  },
  ram: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  storageCapacity: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  dimensions: {
    type: DataTypes.STRING
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2).UNSIGNED
  },
  batteryCapacity: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  frontCameraResolution: {
    type: DataTypes.STRING
  },
  rearCameraResolution: {
    type: DataTypes.STRING
  },
  connectivity: {
    type: DataTypes.STRING
  },
  color: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.BIGINT.UNSIGNED
  },
  stockQuantity: {
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
  modelName: 'Product',
  tableName: 'Product'
})

module.exports = Product