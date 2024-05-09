'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartDetail', {
      cartId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Cart',
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
        type: Sequelize.INTEGER,
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
      ALTER TABLE CartDetail
      ADD CONSTRAINT CartDetail_check_quantity
      CHECK (quantity > 0);
    `)
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartDetail')
  }
}