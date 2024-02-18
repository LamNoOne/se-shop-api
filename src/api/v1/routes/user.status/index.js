'use strict'

const express = require('express')
const {
  validateCreateUserStatus,
  validateUpdateUserStatusById,
  validateDeleteUserStatusByIds
} = require('~/api/v1/validations/user.status.validation')
const {
  createUserStatus,
  getAllUserStatuses,
  getUserStatusById,
  updateUserStatusById,
  deleteUserStatusById,
  deleteGenderByIds
}= require('~/api/v1/controllers/user.status.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllUserStatuses)
router.get('/get-user-status', getUserStatusById)
router.post('/create', validateCreateUserStatus, createUserStatus)
router.patch('/update-user-status', validateUpdateUserStatusById, updateUserStatusById)
router.delete('/delete-user-status', deleteUserStatusById)
router.delete('/delete-user-statuses', validateDeleteUserStatusByIds, deleteGenderByIds)

module.exports = router