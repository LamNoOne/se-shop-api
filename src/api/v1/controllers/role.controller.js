'use strict'

const { StatusCodes } = require('http-status-codes')
const roleService = require('~/api/v1/services/role.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createRole = asyncHandling(async (req, res) => {
  const { id, name, description } = req.body

  const role = await roleService.createRole({ id, name, description })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create role successfully',
    metadata: { role }
  }).send(res)
})

const getAllRoles = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const roles = await roleService.getAllRoles({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get all roles successfully',
    metadata: { roles }
  }).send(res)
})

const getRoleById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const role = await roleService.getRoleById({ id })

  new SuccessResponse({
    message: 'Get role successfully',
    metadata: { role }
  }).send(res)
})

const updateRoleById = asyncHandling( async (req, res) => {
  const { id } = req.query
  const { name, description } = req.body

  const role = await roleService.updateRoleById({ id, name, description })

  new SuccessResponse({
    message: 'Update role successfully',
    metadata: { role }
  }).send(res)
})

const deleteRoleById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const roles = await roleService.deleteRoleById({ id })

  new SuccessResponse({
    message: 'Delete role successfully',
    metadata: { roles }
  }).send(res)
})

const deleteRoleByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  const roles = await roleService.deleteRoleByIds({ ids })

  new SuccessResponse({
    message: 'Delete roles successfully',
    metadata: { roles }
  }).send(res)
})

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  deleteRoleByIds
}