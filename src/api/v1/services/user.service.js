'use strict'

const lodash = require('lodash')
const { Op } = require('sequelize')
const { User, UserStatus, Role, Gender } = require('~/api/v1/models')
const { StatusCodes } = require('http-status-codes')
const cloudinaryProvider = require('~/api/v1/providers/cloudinary.provider')
const userRepo = require('~/api/v1/repositories/user.repo')
const cartRepo = require('~/api/v1/repositories/cart.repo')
const tokenService = require('~/api/v1/services/token.service')
const refreshTokenUsedService = require('~/api/v1/services/refresh.token.used.sevice')
const ApiError = require('~/core/api.error')

const createUser = async ({
  roleId, userStatusId, genderId, lastName, firstName,
  phoneNumber, email, address, username, password
}) => {
  const foundUser = await userRepo.getUser({
    where: {
      [Op.or]: [
        { username },
        { email },
        { phoneNumber }
      ]
    }
  })

  if (foundUser) {
    let isExist = foundUser.username === username
    if (isExist) throw new ApiError(StatusCodes.BAD_REQUEST, 'Username already exists')

    isExist = foundUser.email === email
    if (isExist) throw new ApiError(StatusCodes.BAD_REQUEST, 'Email has been used')

    isExist = foundUser.phoneNumber === phoneNumber
    if (isExist) throw new ApiError(StatusCodes.BAD_REQUEST, 'Phone number has been used')
    return
  }

  try {
    return await userRepo.createUser({
      roleId, userStatusId, genderId, lastName, firstName,
      phoneNumber, email, address, username, password
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create user failed')
  }
}

const getAllUsers = async ({ filter, selector, pagination, sorter }) => {
  const bannedFields = ['userStatusId', 'roleId', 'genderId', 'password', 'publicKey', 'privateKey']
  lodash.remove(selector, (field) => {
    return bannedFields.includes(field)
  })

  try {
    return await User.findAll({
      where: filter,
      attributes: selector?.length > 0 ? selector : {
        exclude: bannedFields
      },
      include: [
        { model: UserStatus, as: 'userStatus', attributes: ['id', 'name'] },
        { model: Role, as: 'role', attributes: ['id', 'name'] },
        { model: Gender, as: 'gender', attributes: ['id', 'name'] }
      ],
      offset: pagination.skip,
      limit: pagination.limit,
      order: sorter
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const getUserById = async (id) => {
  const bannedFields = ['userStatusId', 'roleId', 'genderId', 'password', 'publicKey', 'privateKey']

  const user = await User.findByPk(id, {
    attributes: {
      exclude: bannedFields
    }
  })
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
  return user
}

const getUserByUsername = async ({ username }) => {
  const user = await User.findOne({
    where: { username }
  })
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return user
}

const getUserByEmail = async ({ email }) => {
  return await User.findOne({
    where: { email }
  })
}

const updateUserById = async (id, payload = {}) => {
  const user = await getUserById(id)
  if (!user) throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found')

  // cannot change this fields
  delete payload.username
  delete payload.roleId
  delete payload.userStatusId
  delete payload.publicKey
  delete payload.privateKey
  delete payload.createdAt
  delete payload.updatedAt

  if (payload.imageUrl) {
    try {
      await cloudinaryProvider.destroyFile(user.imageUrl)
      return await user.update(payload)
    } catch (error) {
      throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
    }
  }

  return await user.update(payload)
}

const updateStatus = async ({ id, userStatusId }) => {
  const user = await getUserById(id)
  if (!user) throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found')

  try {
    await user.update({ userStatusId })
    return user
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Update status failed')
  }
}

const deleteUserById = async (id) => {
  const user = await userRepo.getUserById(id)
  if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

  await cartRepo.deleteCartByUserId(id)

  try {
    await user.destroy({ force: true })
  } catch (error) {
    throw new ApiError(StatusCodes.CONFLICT, 'Delete user failed')
  }
}

const deleteUsersbyIds = async(ids = []) => {
  try {
    await tokenService.deleteByUsersIds(ids)
    await refreshTokenUsedService.deleteByUserIds(ids)
    await User.destroy({
      where: { id: ids }
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Delete users failed')
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getAllUsers,
  updateUserById,
  updateStatus,
  deleteUserById,
  deleteUsersbyIds
}