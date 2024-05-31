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

    const setOfAllOrders = await orderRepo.getAllOrders({
        filter,
        selector,
        pagination,
        sorter,
    })

    const formattedAllOrders = setOfAllOrders.map((orderItem) => {
        // Calculate total amount for each order product
    orderItem.products.forEach((product) => {
        product.totalAmount = product.quantity * product.price
    })

    // Calculate total amount for the entire order
    const totalAmount = orderItem.products.reduce((total, product) => {
        return total + product.totalAmount
    }, 0)

    // Map the products to the desired format
    const orderProducts = orderItem.products.map((product) => ({
        quantity: product.quantity,
        product: {
            id: product.product.id,
            name: product.product.name,
            description: product.product.description,
            imageUrl: product.product.imageUrl,
            price: product.price,
        },
        totalAmount: product.totalAmount,
    }))

    // Construct the final formatted object
    return {
        orderId: orderItem.id,
        shipAddress: orderItem.shipAddress,
        phoneNumber: orderItem.phoneNumber,
        orderStatus: orderItem.orderStatus.name,
        orderProducts: orderProducts,
        totalAmount: totalAmount }
    })

    return formattedAllOrders
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
                attributes: ["name"],
            },
            {
                model: PaymentForm,
                as: "paymentForm",
                attributes: ["name"],
            },
            {
                model: User,
                as: "user",
                attributes: ["lastName", "firstName"],
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
                        attributes: ["id", "name", "imageUrl", "description"],
                    },
                ],
            },
        ],
    })
    if (!foundOrder)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Order not found")

    // Calculate total amount for each order product
    foundOrder.products.forEach((product) => {
        product.totalAmount = product.quantity * product.price
    })

    // Calculate total amount for the entire order
    const totalAmount = foundOrder.products.reduce((total, product) => {
        return total + product.totalAmount
    }, 0)

    // Map the products to the desired format
    const orderProducts = foundOrder.products.map((product) => ({
        quantity: product.quantity,
        product: {
            id: product.product.id,
            name: product.product.name,
            description: product.product.description,
            imageUrl: product.product.imageUrl,
            price: product.price,
        },
        totalAmount: product.totalAmount,
    }))

    // Construct the final formatted object
    const formattedOrder = {
        orderId: foundOrder.id,
        transactionId: foundOrder.transactionId,
        name: `${foundOrder.user.lastName} ${foundOrder.user.firstName}`,
        shipAddress: foundOrder.shipAddress,
        phoneNumber: foundOrder.phoneNumber,
        orderStatus: foundOrder.orderStatus.name,
        orderProducts: orderProducts,
        totalAmount: totalAmount,
    }

    return formattedOrder
}

const getOrderByTransaction = async (transactionId) => {
    const bannedFieldsOfOrderDetails = [
        "orderId",
        "productId",
        "createdAt",
        "updatedAt",
    ]

    const foundOrder = await Order.findOne({
        where: { transactionId: transactionId },
        attributes: {
            exclude: ["orderStatusId", "paymentFormId", "userId"],
        },
        include: [
            {
                model: OrderStatus,
                as: "orderStatus",
                attributes: ["name"],
            },
            {
                model: PaymentForm,
                as: "paymentForm",
                attributes: ["name"],
            },
            {
                model: User,
                as: "user",
                attributes: ["lastName", "firstName"],
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
                        attributes: ["id", "name", "imageUrl", "description"],
                    },
                ],
            },
        ],
    })
    if (!foundOrder)
        throw new ApiError(StatusCodes.BAD_REQUEST, "Order not found")

    // Calculate total amount for each order product
    foundOrder.products.forEach((product) => {
        product.totalAmount = product.quantity * product.price
    })

    // Calculate total amount for the entire order
    const totalAmount = foundOrder.products.reduce((total, product) => {
        return total + product.totalAmount
    }, 0)

    // Map the products to the desired format
    const orderProducts = foundOrder.products.map((product) => ({
        quantity: product.quantity,
        product: {
            id: product.product.id,
            name: product.product.name,
            description: product.product.description,
            imageUrl: product.product.imageUrl,
            price: product.price,
        },
        totalAmount: product.totalAmount,
    }))

    // Construct the final formatted object
    const formattedOrder = {
        orderId: foundOrder.id,
        transactionId: foundOrder.transactionId,
        name: `${foundOrder.user.lastName} ${foundOrder.user.firstName}`,
        shipAddress: foundOrder.shipAddress,
        phoneNumber: foundOrder.phoneNumber,
        orderStatus: foundOrder.orderStatus.name,
        orderProducts: orderProducts,
        totalAmount: totalAmount,
        createdAt: foundOrder.createdAt,
        updatedAt: foundOrder.updatedAt,
    }

    return formattedOrder
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
    getOrderByTransaction,
    updateOrder,
    deleteOrder,
}
