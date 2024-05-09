'use strict'

const { OrderStatus } = require('~/api/v2/models')
const ApiError = require('~/core/api.error')
const { StatusCodes } = require('http-status-codes')

const createOrderStatus = async ({ id, name }) => {
  try {
    return await OrderStatus.create({ id, name })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create order status failed')
  }
}

const getAllOrderStatuses = async ({ filter, selector, pagination, sorter }) => {
  try {
    return await OrderStatus.findAll({
      where: filter,
      attributes: selector,
      offset: pagination.skip,
      limit: pagination.limit,
      order: sorter
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Get all order statuses failed')
  }
}

const getOrderStatusById = async (id) => {
  const orderStatus = await OrderStatus.findByPk(id)
  if (!orderStatus) throw new ApiError(StatusCodes.NOT_FOUND, 'Order status not found')
  return orderStatus
}

const updateOrderStatusById = async (id, { name }) => {
  const orderStatus = await OrderStatus.findOne({
    where: { id }
  })
  if (!orderStatus) throw new ApiError(StatusCodes.NOT_FOUND, 'Order status not found')
  return await orderStatus.update({ name })
}

const deleteOrderStatusById = async (id) => {
  const orderStatus = await OrderStatus.findByPk(id)
  if (!orderStatus) throw new ApiError(StatusCodes.NOT_FOUND, 'Order status not found')
  try {
    await orderStatus.destroy()
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Delete order status failed')
  }
}

const deleteOrderStatusByIds = async (ids) => {
  const numberDeletedItems = await OrderStatus.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No order statuses are deleted')
}

module.exports = {
  createOrderStatus,
  getAllOrderStatuses,
  getOrderStatusById,
  updateOrderStatusById,
  deleteOrderStatusById,
  deleteOrderStatusByIds
}