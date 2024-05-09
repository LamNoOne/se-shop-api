'use strict'

const express = require('express')
const {
  createOrderStatus,
  getAllOrderStatuses,
  getOrderStatusById,
  updateOrderStatusById,
  deleteOrderStatusById,
  deleteOrderStatusByIds
} = require('~/api/v2/controllers/order.status.controller')
const queryStringMiddleware = require('~/api/v2/middlewares/query.string.middleware')
const router = express.Router()

router.get('/', queryStringMiddleware, getAllOrderStatuses)
router.get('/get-order-status', getOrderStatusById)
router.post('/create', createOrderStatus)
router.patch('/update-order-status', updateOrderStatusById)
router.delete('/delete-order-status', deleteOrderStatusById)
router.delete('/delete-order-statuses', deleteOrderStatusByIds)

module.exports = router