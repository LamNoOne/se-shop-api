'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderStatus', {
      id: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    }, {
      charset: 'utf8'
    })
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderStatus')
  }
}