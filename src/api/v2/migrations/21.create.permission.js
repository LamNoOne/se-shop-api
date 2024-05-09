'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permission', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      api: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      method: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      isPrivate: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      permissionTypeId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'PermissionType',
          key: 'id'
        }
      },
      resourceId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Resource',
          key: 'id'
        }
      },
      versionId: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Version',
          key: 'id'
        }
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

    await queryInterface.addIndex('Permission', {
      fields: ['api', 'method'],
      type: 'unique',
      name: 'Permission_unique_api-method'
    })
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Permission')
  }
}