'use strict'

const { StatusCodes } = require('http-status-codes')
const userStatusService = require('~/api/v2/services/user.status.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createUserStatus = asyncHandling(async (req, res) => {
  const { id, name } = req.body

  const userStatus = await userStatusService.createUserStatus({ id, name })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create user status successfully',
    metadata: { userStatus }
  }).send(res)
})

const getAllUserStatuses = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const userStatuses = await userStatusService.getAllUserStatuses({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get all user statuses successfully',
    metadata: { userStatuses }
  }).send(res)
})

const getUserStatusById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const userStatus = await userStatusService.getUserStatusById({ id })

  new SuccessResponse({
    message: 'Get user status successfully',
    metadata: { userStatus }
  }).send(res)
})

const updateUserStatusById = asyncHandling( async (req, res) => {
  const { id } = req.query
  const { name } = req.body

  const userStatus = await userStatusService.updateUserStatusById({ id, name })

  new SuccessResponse({
    message: 'Update user status successfully',
    metadata: { userStatus }
  }).send(res)
})

const deleteUserStatusById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const userStatuses = await userStatusService.deleteUserStatusById({ id })

  new SuccessResponse({
    message: 'Delete user status successfully',
    metadata: { userStatuses }
  }).send(res)
})

const deleteGenderByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  const userStatuses = await userStatusService.deleteUserStatusByIds({ ids })

  new SuccessResponse({
    message: 'Delete some user statuses successfully',
    metadata: { userStatuses }
  }).send(res)
})

module.exports = {
  createUserStatus,
  getAllUserStatuses,
  getUserStatusById,
  updateUserStatusById,
  deleteUserStatusById,
  deleteGenderByIds
}