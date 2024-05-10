"use strict"

const { Role } = require("~/api/v2/models")
const { Op } = require("sequelize")

const getAllRoles = async () => {
    return await Role.findAll()
}

const getRoleByName = async (name = "") => {
    return await Role.findOne({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    })
}

module.exports = {
    getAllRoles,
    getRoleByName,
}
