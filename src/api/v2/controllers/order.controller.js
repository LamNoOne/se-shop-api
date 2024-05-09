'use strict'

const SuccessResponse = require('~/core/success.response')
const orderService = require('~/api/v2/services/order.service')
const asyncHandling = require('~/core/async.handling')

const getOrder = asyncHandling( async (req, res) => {
  const { orderId } = req.query

  const order = await orderService.getOrder(orderId)

  new SuccessResponse({
    message: 'Get order successfully',
    metadata: { order }
  }).send(res)
})

const updateOrderStatus = asyncHandling( async (req, res) => {
  const { id } = req.query
  const { orderStatusId } = req.body

  const order = await orderService.updateOrder(id, { orderStatusId })

  new SuccessResponse({
    metadata: { order }
  }).send(res)
})

// const updateOrderStatus = asyncHandling( async (req, res) => {
//   const { id } = req.query

//   const { orderStatusId }

//   const order = await orderService.updateOrder(id, req.body)

//   new SuccessResponse({
//     metadata: { order }
//   }).send(res)
// })

const deleteOrder = asyncHandling( async (req, res) => {
  const { id } = req.query

  await orderService.deleteOrder(id)

  new SuccessResponse({
    message: 'Delete order successfully'
  }).send(res)
})

const getAllOrders = asyncHandling( async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const allOrdersPromise = orderService.getAllOrders({filter})
  const ordersPromise = orderService.getAllOrders({ filter, selector, pagination, sorter })
  const [allOrders, orders] = await Promise.all([allOrdersPromise, ordersPromise])

  const total = allOrders.length
  const limit = pagination?.limit
  const totalPage = limit <= total ? Math.ceil(total / limit) : 1

  new SuccessResponse({
    message: 'Get all orders successfully',
    metadata: { page: pagination.skip / pagination.limit + 1, total, totalPage, orders }
  }).send(res)
})

module.exports = {
  getOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
}