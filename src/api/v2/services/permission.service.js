'use strict'

const { Permission } = require('~/api/v2/models')
const ApiError = require('~/core/api.error')
const { StatusCodes } = require('http-status-codes')

const createPermission = async ({ name, description, api, method, isPrivate, permissionTypeId, resourceId, versionId }) => {
  try {
    return await Permission.create({ name, description, api, method, isPrivate, permissionTypeId, resourceId, versionId })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create permission failed')
  }
}

const getAllPermissions = async ({ filter = null, selector = null, pagination = null, sorter = null }) => {
  try {
    return await Permission.findAll({
      where: filter,
      attributes: selector,
      offset: pagination?.skip || null,
      limit: pagination?.limit || null,
      order: sorter
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Get all resources failed')
  }
}

const getPermissionById = async (id) => {
  const permission = await Permission.findByPk(id)
  if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
  return permission
}

const updatePermissionById = async (id, { name, description, api, method, isPrivate, permissionTypeId, resourceId, versionId }) => {
  const permission = await Permission.findOne({
    where: { id }
  })
  if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
  return await permission.update({ name, description, api, method, isPrivate, permissionTypeId, resourceId, versionId })
}

const deletePermissionById = async (id) => {
  const permission = await Permission.findByPk(id)
  if (!permission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
  const { dataValues } = await permission.destroy()
  if (!dataValues) throw new ApiError(StatusCodes.BAD_REQUEST, 'Delete permission failed')
}

const deletePermissionByIds = async (ids) => {
  try {
    const numberDeletedItems = await Permission.destroy({
      where: { id: ids }
    })
    const NO_ITEMS_DELETEDS = 0
    if (numberDeletedItems === NO_ITEMS_DELETEDS)
      throw new Error('No permissions are deleted')
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
  deletePermissionByIds
}