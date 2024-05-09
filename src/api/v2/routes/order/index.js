'use strict'

const express = require('express')
const { getOrder, updateOrderStatus, deleteOrder, getAllOrders } = require('~/api/v2/controllers/order.controller')
const queryStringMiddleware = require('~/api/v2/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllOrders)
router.get('/get-order', getOrder)
router.patch('/update-order-status', updateOrderStatus)
router.delete('/delete-order', deleteOrder)

module.exports = router