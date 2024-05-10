"use strict"

const { OrderDetail } = require("~/api/v2/models")

const createOrderDetail = async ({ quantity, price, orderId, productId }) => {
    return await OrderDetail.create({
        quantity,
        price,
        orderId,
        productId,
    })
}

const deleteOrderDetailByOrderId = async (orderId) => {
    const orderDetails = await OrderDetail.findAll({
        where: { orderId },
    })

    const deletedOrderDetails = []
    for (const orderDetail of orderDetails) {
        deletedOrderDetails.push(await orderDetail.destroy())
    }
    return deletedOrderDetails
}

module.exports = {
    createOrderDetail,
    deleteOrderDetailByOrderId,
}
