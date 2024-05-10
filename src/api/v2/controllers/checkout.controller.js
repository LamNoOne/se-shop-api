"use strict"

const SuccessResponse = require("~/core/success.response")
const checkoutService = require("~/api/v2/services/checkout.service")
const asyncHandling = require("~/core/async.handling")
const {
    app: { paySuccessUrl, payFailUrl },
} = require("~/config/environment.config")

const review = asyncHandling(async (req, res) => {
    const { orderProducts } = req.body

    const result = await checkoutService.review({ orderProducts })

    new SuccessResponse({
        message: "Get review product successfully",
        metadata: { ...result },
    }).send(res)
})

const order = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null
    const { shipAddress, phoneNumber, paymentFormId, orderProduct } = req.body

    const result = await checkoutService.order({
        userId,
        shipAddress,
        phoneNumber,
        paymentFormId,
        orderProduct,
    })

    new SuccessResponse({
        message: "Order successfully",
        metadata: { ...result },
    }).send(res)
})

const orderFromCart = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null
    const { shipAddress, phoneNumber, paymentFormId, cartId, orderProducts } =
        req.body

    const result = await checkoutService.orderFromCart({
        cartId,
        userId,
        shipAddress,
        phoneNumber,
        paymentFormId,
        orderProducts,
    })

    new SuccessResponse({
        message: "Order successfully",
        metadata: { ...result },
    }).send(res)
})

const getAllOrders = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null
    const { filter, selector, pagination, sorter } = req

    const orders = await checkoutService.getAllOrder(userId, {
        filter,
        selector,
        pagination,
        sorter,
    })

    new SuccessResponse({
        message: "Get all orders successfully",
        metadata: { orders },
    }).send(res)
})

const cancelOrder = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null
    const { orderId } = req.query

    await checkoutService.cancelOrder({ userId, orderId })

    new SuccessResponse({
        message: "Cancel order successfully",
    }).send(res)
})

const getOrder = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null
    const { orderId } = req.query

    const order = await checkoutService.getOrder({ userId, orderId })

    new SuccessResponse({
        message: "Get order successfully",
        metadata: { order },
    }).send(res)
})

const pay = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null
    const { orderId, bankCode } = req.body
    const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

    const paymentUrl = await checkoutService.createPaymentUrl({
        userId,
        bankCode,
        orderId,
        ipAddr,
    })
    // res.redirect(paymentUrl)
    new SuccessResponse({
        message: "Create payurl paySuccessUrl",
        metadata: { paymentUrl },
    }).send(res)
})

const checkPay = asyncHandling(async (req, res) => {
    const vnpParams = req.query
    const isSuccess = await checkoutService.checkPay(vnpParams)
    if (isSuccess) return res.redirect(paySuccessUrl)
    return res.redirect(payFailUrl)
})

module.exports = {
    review,
    order,
    orderFromCart,
    getAllOrders,
    cancelOrder,
    getOrder,
    pay,
    checkPay,
}
