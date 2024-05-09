'use strict'

const { Model, DataTypes } = require('sequelize')
const { mysql } = require('~/databases')

class User extends Model {}

User.init({
  userStatusId: {
    type: DataTypes.TINYINT.UNSIGNED
  },
  roleId: {
    type: DataTypes.TINYINT.UNSIGNED
  },
  genderId: {
    type: DataTypes.TINYINT.UNSIGNED
  },
  lastName: {
    type: DataTypes.STRING
  },
  firstName: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  publicKey: {
    type: DataTypes.STRING
  },
  privateKey: {
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
  modelName: 'User',
  tableName: 'User'
})

module.exports = User