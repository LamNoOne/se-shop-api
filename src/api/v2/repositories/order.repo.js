"use strict"

const {
    User,
    Order,
    OrderStatus,
    PaymentForm,
    OrderDetail,
    Product,
} = require("~/api/v2/models")

const createOrder = async ({
    shipAddress,
    phoneNumber,
    userId,
    paymentFormId,
    orderStatusId,
}) => {
    return await Order.create(
        {
            shipAddress,
            phoneNumber,
            userId,
            paymentFormId,
            orderStatusId,
        },
        {
            raw: true,
        }
    )
}

// eslint-disable-next-line no-unused-vars
const getAllOrders = async ({ filter, selector, pagination, sorter }) => {
    return await Order.findAll({
        where: filter,
        attributes: {
            exclude: ["orderStatusId", "paymentFormId", "userId"],
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: OrderStatus,
                as: "orderStatus",
                attributes: ["id", "name"],
                // where: filter?.orderStatusName ? { name: filter.orderStatusName } : null
            },
            {
                model: PaymentForm,
                as: "paymentForm",
                attributes: ["id", "name"],
                where: filter?.paymentFormName
                    ? { name: filter.paymentFormName }
                    : null,
            },
            {
                model: OrderDetail,
                as: "products",
                attributes: {
                    exclude: ["orderId", "productId", "createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: ["id", "name", "description", "imageUrl"],
                    },
                ],
            },
        ],
        offset: pagination?.skip,
        limit: pagination?.limit,
        order: sorter,
    })
}

// eslint-disable-next-line no-unused-vars
const getAllOrdersForCustomer = async (
    userId,
    { filter, selector, pagination, sorter }
) => {
    if (!userId) return null

    let newFilter = { ...filter }

    if(filter?.name || filter?.orderStatusName) {
        const { name, orderStatusName, ...restFilter } = filter
        newFilter = restFilter
    }
    
    return await Order.findAll({
        where: (filter?.name || filter?.orderStatusName) ? { userId, ...newFilter } : { userId, ...filter },
        attributes: {
            exclude: ["orderStatusId", "paymentFormId", "userId"],
        },
        include: [
            {
                model: User,
                as: "user",
                attributes: ["firstName", "lastName", "email"],
            },
            {
                model: OrderStatus,
                as: "orderStatus",
                attributes: ["name"],
                where: filter?.orderStatusName ? { name: filter.orderStatusName } : null
            },
            {
                model: PaymentForm,
                as: "paymentForm",
                attributes: ["name"],
                where: filter?.paymentFormName
                    ? { name: filter.paymentFormName }
                    : null,
            },
            {
                model: OrderDetail,
                as: "products",
                attributes: {
                    exclude: ["orderId", "productId", "createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: ["id", "name", "description", "imageUrl"],
                        where: filter?.name ? { name: filter.name } : null,
                    },
                ],
            },
        ],
        offset: pagination?.skip,
        limit: pagination?.limit,
        order: sorter,
    })
}

const getOrderWithQuery = async (query = {}) => {
    return Order.findOne(query)
}

const getOrderById = async (id) => {
    return await Order.findOne({
        where: { id },
    })
}

const deleteOrder = async ({ userId, orderId }) => {
    const order = await Order.findOne({
        where: { userId, id: orderId },
    })
    if (!order) return null
    return await order.destroy()
}

const deleteOrderById = async (id) => {
    const order = await Order.findOne({
        where: { id },
    })
    if (!order) return null
    return await order.destroy()
}

module.exports = {
    createOrder,
    getAllOrders,
    getAllOrdersForCustomer,
    getOrderWithQuery,
    getOrderById,
    deleteOrder,
    deleteOrderById,
}
