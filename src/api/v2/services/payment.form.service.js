'use strict'

const { PaymentForm } = require('~/api/v2/models')
const ApiError = require('~/core/api.error')
const { StatusCodes } = require('http-status-codes')

const createPaymentForm = async ({ name, description }) => {
  try {
    return await PaymentForm.create({ name, description })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create payment form failed')
  }
}

const getAllPaymentForms = async ({ filter, selector, pagination, sorter }) => {
  try {
    return await PaymentForm.findAll({
      where: filter,
      attributes: selector,
      offset: pagination.skip,
      limit: pagination.limit,
      order: sorter
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const getPaymentFormById = async (id) => {
  const paymentForm = await PaymentForm.findByPk(id)
  if (!paymentForm) throw new ApiError(StatusCodes.NOT_FOUND, 'Payment form not found')
  return paymentForm
}

const updatePaymentFormById = async (id, { name, description }) => {
  const paymentForm = await PaymentForm.findOne({
    where: { id }
  })
  if (!paymentForm) throw new ApiError(StatusCodes.NOT_FOUND, 'Payment form not found')
  return await paymentForm.update({ name, description })
}

const deletePaymentFormById = async (id) => {
  const paymentForm = await PaymentForm.findByPk(id)
  if (!paymentForm) throw new ApiError(StatusCodes.NOT_FOUND, 'Payment form not found')
  try {
    await paymentForm.destroy()
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Delete payment form failed')
  }
}

const deletePaymentFormByIds = async (ids) => {
  const numberDeletedItems = await PaymentForm.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No payment forms are deleted')
}

module.exports = {
  createPaymentForm,
  getAllPaymentForms,
  getPaymentFormById,
  updatePaymentFormById,
  deletePaymentFormById,
  deletePaymentFormByIds
}