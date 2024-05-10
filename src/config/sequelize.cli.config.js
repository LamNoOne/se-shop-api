"use strict"

const { mysql } = require("./environment.config")

module.exports = {
    development: {
        username: mysql.username,
        password: mysql.password,
        database: mysql.databaseName,
        host: mysql.host,
        port: mysql.port,
        dialect: "mysql",
        dialectOptions: {
            charset: "utf8",
            collate: "utf8_general_ci",
        },
        logging: false,
    },
    test: {
        username: mysql.username,
        password: mysql.password,
        database: mysql.databaseName,
        host: mysql.host,
        port: mysql.port,
        dialect: "mysql",
        dialectOptions: {
            bigNumberStrings: true,
        },
        logging: false,
    },
    production: {
        username: mysql.username,
        password: mysql.password,
        database: mysql.databaseName,
        host: mysql.host,
        port: mysql.port,
        dialect: "mysql",
        dialectOptions: {
            bigNumberStrings: true,
        },
        logging: false,
    },
}
