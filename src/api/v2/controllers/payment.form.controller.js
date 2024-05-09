'use strict'

const { StatusCodes } = require('http-status-codes')
const paymentFormService = require('~/api/v2/services/payment.form.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createPaymentForm = asyncHandling(async (req, res) => {
  const { name, description } = req.body

  const paymentForm = await paymentFormService.createPaymentForm({ name, description })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create payment form successfully',
    metadata: { paymentForm }
  }).send(res)
})

const getAllPaymentForms = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const paymentForms = await paymentFormService.getAllPaymentForms({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get payment forms successfully',
    metadata: { paymentForms }
  }).send(res)
})

const getPaymentFormById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const paymentForm = await paymentFormService.getPaymentFormById(id)

  new SuccessResponse({
    message: 'Get payment form successfully',
    metadata: { paymentForm }
  }).send(res)
})

const updatePaymentFormById = asyncHandling( async (req, res) => {
  const { id } = req.query
  const { name, description } = req.body

  const paymentForm = await paymentFormService.updatePaymentFormById(id, { name, description })

  new SuccessResponse({
    message: 'Update payment form successfully',
    metadata: { paymentForm }
  }).send(res)
})

const deletePaymentFormById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const paymentForms = await paymentFormService.deletePaymentFormById(id)

  new SuccessResponse({
    message: 'Delete payment form successfully',
    metadata: { paymentForms }
  }).send(res)
})

const deletePaymentFormByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  const paymentForms = await paymentFormService.deletePaymentFormByIds(ids)

  new SuccessResponse({
    message: 'Delete payment forms successfully',
    metadata: { paymentForms }
  }).send(res)
})

module.exports = {
  createPaymentForm,
  getAllPaymentForms,
  getPaymentFormById,
  updatePaymentFormById,
  deletePaymentFormById,
  deletePaymentFormByIds
}