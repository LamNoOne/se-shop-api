"use strict"

const { StatusCodes } = require("http-status-codes")
const ApiError = require("~/core/api.error")
const {
    Order,
    OrderStatus,
    PaymentForm,
    User,
    OrderDetail,
    Product,
} = require("~/api/v2/models")
const orderRepo = require("~/api/v2/repositories/order.repo")
const orderDetailRepo = require("~/api/v2/repositories/order.detail.repo")

const getAllOrders = async ({ filter, selector, pagination, sorter }) => {
    return await orderRepo.getAllOrders({
        filter,
        selector,
        pagination,
        sorter,
    })
}

const getOrder = async (orderId) => {
    const bannedFieldsOfOrderDetails = [
        "orderId",
        "productId",
        "createdAt",
        "updatedAt",
    ]

    const foundOrder = await Order.findOne({
        where: { id: orderId },
        attributes: {
            exclude: ["orderStatusId", "paymentFormId", "userId"],
        },
        include: [
            {
                model: OrderStatus,
                as: "orderStatus",
                attributes: ["id", "name"],
            },
            {
                model: PaymentForm,
                as: "paymentForm",
                attributes: ["id", "name"],
            },
            {
                model: User,
                as: "user",
                attributes: ["id", "lastName", "firstName"],
            },
            {
                model: OrderDetail,
                as: "products",
                attributes: {
                    exclude: bannedFieldsOfOrderDetails,
                },
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: ["id", "name", "imageUrl"],
                    },
                ],
            },
        ],
    })
    if (!foundOrder)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Order not found")
    return foundOrder
}

const updateOrder = async (id, reqBody) => {
    const foundOrder = await Order.findOne({
        where: { id },
    })
    if (!foundOrder)
        throw new ApiError(StatusCodes.NOT_FOUND, "Order not found")
    try {
        return await foundOrder.update(reqBody)
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Update order failed")
    }
}

const deleteOrder = async (id) => {
    await orderDetailRepo.deleteOrderDetailByOrderId(id)
    const deletedOrder = await orderRepo.deleteOrderById(id)
    if (!deletedOrder)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Delete order failed")
}

module.exports = {
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
}
