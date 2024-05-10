"use strict"

const { StatusCodes } = require("http-status-codes")
const orderStatusService = require("~/api/v2/services/order.status.service")
const SuccessResponse = require("~/core/success.response")
const asyncHandling = require("~/core/async.handling")

const createOrderStatus = asyncHandling(async (req, res) => {
    const { id, name } = req.body

    const orderStatus = await orderStatusService.createOrderStatus({ id, name })

    new SuccessResponse({
        statusCode: StatusCodes.CREATED,
        message: "Create order status successfully",
        metadata: { orderStatus },
    }).send(res)
})

const getAllOrderStatuses = asyncHandling(async (req, res) => {
    const { filter, selector, pagination, sorter } = req

    const orderStatuses = await orderStatusService.getAllOrderStatuses({
        filter,
        selector,
        pagination,
        sorter,
    })

    new SuccessResponse({
        message: "Get all order statuses successfully",
        metadata: { orderStatuses },
    }).send(res)
})

const getOrderStatusById = asyncHandling(async (req, res) => {
    const { id } = req.query

    const orderStatus = await orderStatusService.getOrderStatusById(id)

    new SuccessResponse({
        message: "Get order status successfully",
        metadata: { orderStatus },
    }).send(res)
})

const updateOrderStatusById = asyncHandling(async (req, res) => {
    const { id } = req.query
    const { name } = req.body

    const orderStatus = await orderStatusService.updateOrderStatusById(id, {
        name,
    })

    new SuccessResponse({
        message: "Update order status successfully",
        metadata: { orderStatus },
    }).send(res)
})

const deleteOrderStatusById = asyncHandling(async (req, res) => {
    const { id } = req.query

    await orderStatusService.deleteOrderStatusById(id)

    new SuccessResponse({
        message: "Delete order status successfully",
    }).send(res)
})

const deleteOrderStatusByIds = asyncHandling(async (req, res) => {
    const { ids } = req.body

    const orderStatuses = await orderStatusService.deleteOrderStatusByIds(ids)

    new SuccessResponse({
        message: "Delete order statuses successfully",
        metadata: { orderStatuses },
    }).send(res)
})

module.exports = {
    createOrderStatus,
    getAllOrderStatuses,
    getOrderStatusById,
    updateOrderStatusById,
    deleteOrderStatusById,
    deleteOrderStatusByIds,
}
