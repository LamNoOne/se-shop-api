'use strict'

const { StatusCodes } = require('http-status-codes')
const { PermissionType, Permission, Version } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')

const getPermissionWithQuery = async (query = {}) => {
  return await Permission.findOne(query)
}

const getPermissionByApiMethodVersion = async ({ api = '', method = '', version = '' }) => {
  try {
    const foundPermission = await Permission.findOne({
      include: [
        {
          model: Version,
          as: 'version',
          attributes: ['id', 'name'],
          where: { name: version }
        },
        {
          model: PermissionType,
          as: 'permissionType',
          attributes: ['id', 'name']
        }
      ],
      attributes: {
        exclude: ['versionId', 'permissionTypeId']
      },
      where: { api, method },
      plain: true,
      nest: true
    })
    if (!foundPermission) throw new ApiError(StatusCodes.NOT_FOUND, 'Permission not found')
    return foundPermission
  } catch (error) {
    if (!error.statusCode) error.message = 'Get permission failed'
    throw error
  }
}

const getPermissionById = async (id) => {
  return await Permission.findOne({
    where: { id }
  })
}

module.exports = {
  getPermissionWithQuery,
  getPermissionByApiMethodVersion,
  getPermissionById
}