'use strict'

const { Sequelize } = require('sequelize')
const { mysql, nodeEnv } = require('~/config/environment.config')
const { NODE_ENV_DEV } = require('~/config/constants.config')

let sequelize = null

const connect = async () => {
  const options = {
    host: mysql.host,
    port: mysql.port,
    database: mysql.databaseName,
    username: mysql.username,
    password: mysql.password,
    logging: true,
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    },
    dialect: 'mysql'
  }

  if (nodeEnv !== NODE_ENV_DEV) options.logging = false

  try {
    sequelize = new Sequelize(options)
    await sequelize.authenticate()
    // eslint-disable-next-line no-console
    console.log('Connected to MySQL successfully')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Connection to MySQL failed')
  }
}

const getInstance = () => {
  if (!sequelize) connect()
  return sequelize
}

module.exports = {
  getInstance
}