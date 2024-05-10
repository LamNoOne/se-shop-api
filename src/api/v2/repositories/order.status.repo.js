"use strict"

const { OrderStatus } = require("~/api/v2/models")

const getOrderStatusById = async (id) => {
    return await OrderStatus.findOne({
        where: { id },
    })
}

const getOrderStatusByName = async (name) => {
    return await OrderStatus.findOne({
        where: { name },
    })
}

module.exports = {
    getOrderStatusById,
    getOrderStatusByName,
}
