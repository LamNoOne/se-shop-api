'use strict'

const SuccessResponse = require('~/core/success.response')
const checkoutService = require('~/api/v1/services/checkout.service')
const asyncHandling = require('~/core/async.handling')

const review = asyncHandling(async (req, res) => {
  const { orderProducts } = req.body

  new SuccessResponse({
    metadata: await checkoutService.review({ orderProducts })
  }).send(res)
})

const order = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { shipAddress, paymentFormId, orderProducts } = req.body

  new SuccessResponse({
    metadata: await checkoutService.order({ userId: id, shipAddress, paymentFormId, orderProducts })
  }).send(res)
})

const getAllOrders = asyncHandling(async (req, res) => {
  const { id } = req.user
  const { status } = req.query

  new SuccessResponse({
    metadata: await checkoutService.getAllOrders({ userId: id, orderStatusName: status })
  }).send(res)
})

module.exports = {
  review,
  order,
  getAllOrders
}