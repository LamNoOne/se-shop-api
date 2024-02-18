'use strict'

const { StatusCodes } = require('http-status-codes')
const resourceService = require('~/api/v1/services/permission.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createPermission = asyncHandling(async (req, res) => {
  const { name, description, api, method, isPrivate, permissionTypeId, resourceId, versionId } = req.body

  const permission = await resourceService.createPermission({ name, description, api, method, isPrivate, permissionTypeId, resourceId, versionId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create permission successfully',
    metadata: { permission }
  }).send(res)
})

const getAllPermissions = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const permissions = await resourceService.getAllPermissions({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get all permissions successfully',
    metadata: { permissions }
  }).send(res)
})

const getPermissionById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const permission = await resourceService.getPermissionById(id)

  new SuccessResponse({
    message: 'Get permission successfully',
    metadata: { permission }
  }).send(res)
})

const updatePermissionById = asyncHandling( async (req, res) => {
  const { id } = req.query
  const { name, description, api, method, isPrivate, permissionTypeId, resourceId, versionId } = req.body

  const permission = await resourceService.updatePermissionById(id, { name, description, api, method, isPrivate, permissionTypeId, resourceId, versionId })

  new SuccessResponse({
    message: 'Update permission successfully',
    metadata: { permission }
  }).send(res)
})

const deletePermissionById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const permissions = await resourceService.deletePermissionById(id)

  new SuccessResponse({
    message: 'Delete permission successfully',
    metadata: { permissions }
  }).send(res)
})

const deletePermissionByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  const permissions = await resourceService.deletePermissionByIds(ids)

  new SuccessResponse({
    message: 'Delete some permissions successfully',
    metadata: { permissions }
  }).send(res)
})

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
  deletePermissionByIds
}