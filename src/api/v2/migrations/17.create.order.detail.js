'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetail', {
      orderId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Order',
          key: 'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Product',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      price: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
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
    })

    await queryInterface.sequelize.query(`
      ALTER TABLE OrderDetail
      ADD CONSTRAINT OrderDetail_check_quantity
      CHECK (quantity > 0);
    `)

    await queryInterface.sequelize.query(`
      ALTER TABLE OrderDetail
      ADD CONSTRAINT OrderDetail_check_price
      CHECK (price >= 0);
    `)
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderDetail')
  }
}