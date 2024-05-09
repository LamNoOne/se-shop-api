'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      orderStatusId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'OrderStatus',
          key: 'id'
        }
      },
      paymentFormId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'PaymentForm',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      shipAddress: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.STRING(11),
        allowNull: true
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
    await queryInterface.dropTable('Order')
  }
}