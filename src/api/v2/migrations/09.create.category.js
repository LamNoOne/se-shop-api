"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "Category",
            {
                id: {
                    type: Sequelize.TINYINT.UNSIGNED,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                    unique: true,
                },
                description: {
                    type: Sequelize.STRING(100),
                },
                createdAt: {
                    type: "TIMESTAMP",
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    allowNull: false,
                },
                updatedAt: {
                    type: "TIMESTAMP",
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    allowNull: false,
                },
                imageUrl: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
            },
            {
                charset: "utf8",
            }
        )
    },
    // eslint-disable-next-line no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Category")
    },
}
