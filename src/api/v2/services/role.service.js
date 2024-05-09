'use strict'

const { Role } = require('~/api/v2/models')
const ApiError = require('~/core/api.error')
const { StatusCodes } = require('http-status-codes')

const createRole = async ({ id, name, description }) => {
  try {
    return await Role.create({ id, name, description })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create role failed')
  }
}

const getRoleById = async ({ id }) => {
  const role = await Role.findByPk(id)
  if (!role) throw new ApiError(StatusCodes.NOT_FOUND, 'Role not found')
  return role
}

const getAllRoles = async ({ filter, selector, pagination, sorter }) => {
  try {
    return await Role.findAll({
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

const updateRoleById = async ({ id, name, description }) => {
  const role = await Role.findOne({
    where: { id }
  })
  if (!role) throw new ApiError(StatusCodes.NOT_FOUND, 'Role not found')
  return await role.update({ name, description })
}

const deleteRoleById = async ({ id }) => {
  const role = await Role.findByPk(id)
  if (!role) throw new ApiError(StatusCodes.NOT_FOUND, 'Role not found')
  try {
    await role.destroy()
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Delete role failed')
  }
}

const deleteRoleByIds = async ({ ids }) => {
  try {
    const numberDeletedItems = await Role.destroy({
      where: { id: ids }
    })
    const NO_ITEMS_DELETEDS = 0
    if (numberDeletedItems === NO_ITEMS_DELETEDS)
      throw new Error('No roles are deleted')
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

module.exports = {
  createRole,
  getRoleById,
  getAllRoles,
  updateRoleById,
  deleteRoleById,
  deleteRoleByIds
}