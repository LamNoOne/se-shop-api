'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      categoryId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(1000),
        allowNull: true
      },
      imageUrl: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      screen: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      operatingSystem: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      processor: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      ram: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      storageCapacity : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      dimensions: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      weight : {
        type: Sequelize.DECIMAL(5, 2).UNSIGNED,
        allowNull: true
      },
      batteryCapacity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      },
      frontCameraResolution: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      rearCameraResolution  : {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      connectivity: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      color: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      price: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false
      },
      stockQuantity: {
        type: Sequelize.INTEGER.UNSIGNED,
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
    }, {
      charset: 'utf8'
    })

    await queryInterface.sequelize.query(`
      ALTER TABLE Product
      ADD CONSTRAINT product_check_ram
      CHECK (ram > 0);
    `)

    await queryInterface.sequelize.query(`
      ALTER TABLE Product
      ADD CONSTRAINT product_check_storageCapacity
      CHECK (storageCapacity > 0);
    `)

    await queryInterface.sequelize.query(`
      ALTER TABLE Product
      ADD CONSTRAINT product_check_weight
      CHECK (weight > 0);
    `)

    await queryInterface.sequelize.query(`
      ALTER TABLE Product
      ADD CONSTRAINT product_check_batteryCapacity
      CHECK (batteryCapacity > 0);
    `)

    await queryInterface.sequelize.query(`
      ALTER TABLE Product
      ADD CONSTRAINT product_check_stockQuantity
      CHECK (stockQuantity >= 0);
    `)

    await queryInterface.sequelize.query(`
      ALTER TABLE Product
      ADD CONSTRAINT product_check_price
      CHECK (price >= 0);
    `)
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product')
  }
}