'use strict'

const { RolePermission } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')
const { StatusCodes } = require('http-status-codes')
const rolePermissionRepo = require('~/api/v1/repositories/role.permission.repo')
const { Op } = require('sequelize')

const assignPermission = async ({ roleId, permissionId, assignerId }) => {
  try {
    return await RolePermission.create({ roleId, permissionId, assignerId })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Assign permission failed')
  }
}

const getAccessControlList = async ({ filter, selector, pagination, sorter }) => {
  try {
    return await rolePermissionRepo.getAllRolePermissions({ filter, selector, pagination, sorter })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Get access control list failed')
  }
}

const getAccessControlByRoleIdPermissionId = async ({ roleId, permissionId }) => {
  const rolePermission = await RolePermission.findOne({
    where: { roleId, permissionId }
  })
  if (!rolePermission) throw new ApiError(StatusCodes.NOT_FOUND, 'Access control not found')
  return rolePermission
}

const getAccessControlListByRoleId = async (roleId, {
  filter,
  selector,
  pagination,
  sorter
}) => {
  return await rolePermissionRepo.getAllRolePermissionsByRoleId(roleId, {
    filter,
    selector,
    pagination,
    sorter
  })
}

const getAccessControlListByPermissionId = async (permissionId, {
  filter,
  selector,
  pagination,
  sorter
}) => {
  filter.permissionId = permissionId
  return await rolePermissionRepo.getAllRolePermissions({
    filter,
    selector,
    pagination,
    sorter
  })
}

const getAccessControlListByAssignerId = async (assignerId, {
  filter,
  selector,
  pagination,
  sorter
}) => {
  filter.assignerId = assignerId
  return await rolePermissionRepo.getAllRolePermissions({
    filter,
    selector,
    pagination,
    sorter
  })
}

const updateAccessControl = async ({ roleId, permissionId }, payload = {}) => {
  const accessControl = await RolePermission.findOne({
    where: { roleId, permissionId }
  })
  if (!accessControl) throw new ApiError(StatusCodes.NOT_FOUND, 'Access Control not found')

  // delete

  // create
}

const unassignPermission = async ({ roleId, permissionId }) => {
  const accessControl = await RolePermission.findOne({
    where: { roleId, permissionId }
  })
  if (!accessControl) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
  try {
    await accessControl.destroy()
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Unassign permission failed')
  }
}

const unassignPermissions = async (ids = []) => {
  let numberUnassignedPermissions = 0
  for (const { roleId, permissionId } of ids) {
    const foundAccessControl = await RolePermission.findOne({
      where: { roleId, permissionId }
    })
    if (foundAccessControl) {
      await foundAccessControl.destroy()
      numberUnassignedPermissions++
    }
  }

  const NO_UNASSIGN_PERMISSION = 0
  if (numberUnassignedPermissions === NO_UNASSIGN_PERMISSION)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'No permissions are unassign')
}

module.exports = {
  assignPermission,
  getAccessControlList,
  getAccessControlByRoleIdPermissionId,
  getAccessControlListByRoleId,
  getAccessControlListByPermissionId,
  getAccessControlListByAssignerId,
  updateAccessControl,
  unassignPermission,
  unassignPermissions
}