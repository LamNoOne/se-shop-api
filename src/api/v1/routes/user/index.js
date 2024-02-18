'use strict'

const express = require('express')
const {
  getAllUsers,
  getUserInfo,
  getUserById,
  createUser,
  updateUserItseft,
  updateStatus,
  deleteUserById,
  deleteUsersbyIds
} = require('~/api/v1/controllers/user.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')
const { uploadAvatarMiddleware } = require('~/api/v1/middlewares/upload.cloud.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllUsers)
router.get('/get-info', getUserInfo)
router.get('/get-user', getUserById)
router.post('/create', createUser)
router.patch('/update-profile', uploadAvatarMiddleware, updateUserItseft)
router.patch('/update-status', updateStatus)
router.delete('/delete-user', deleteUserById)
router.delete('/delete-users', deleteUsersbyIds)

module.exports = router