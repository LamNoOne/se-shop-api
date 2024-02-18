'use strict'

const bcrypt = require('bcrypt')
const { User, Role, UserStatus, Gender } = require('~/api/v1/models')
const { createKeyPairRsa } = require('~/api/v1/utils/auth.util')
const { app: { saltRounds } } = require('~/config/environment.config')

const getUser = async (query = {}) => {
  return await User.findOne(query)
}

const getUserByUsername = async (username = '') => {
  return await User.findOne({
    where: { username }
  })
}

const getUserById = async (id = '') => {
  return await User.findOne({
    where: { id }
  })
}

const createUser = async({
  roleId, userStatusId, genderId, lastName, firstName,
  imageUrl, phoneNumber, email, address, username, password
}) => {
  const { publicKey, privateKey } = createKeyPairRsa()
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = (await User.create({
    roleId, userStatusId, genderId, lastName, firstName, imageUrl, phoneNumber,
    email, address, username, password: passwordHash, publicKey, privateKey
  })).dataValues
  delete user.password
  delete user.publicKey
  delete user.privateKey
  return user
}

module.exports = {
  getUser,
  getUserById,
  getUserByUsername,
  createUser
}