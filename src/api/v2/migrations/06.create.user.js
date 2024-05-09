'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userStatusId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'UserStatus',
          key: 'id'
        }
      },
      roleId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Role',
          key: 'id'
        }
      },
      genderId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Gender',
          key: 'id'
        }
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      publicKey: {
        type: Sequelize.STRING(800),
        allowNull: false
      },
      privateKey: {
        type: Sequelize.STRING(3400),
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
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User')
  }
}