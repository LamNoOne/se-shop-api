'use strict'

const express = require('express')
const {
  validateCreateRole,
  validateUpdateRoleById,
  validateDeleteRoleByIds
} = require('~/api/v1/validations/role.validation')
const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
  deleteRoleByIds
}= require('~/api/v1/controllers/role.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllRoles)
router.get('/get-role', getRoleById)
router.post('/create', validateCreateRole, createRole)
router.patch('/update-role', validateUpdateRoleById, updateRoleById)
router.delete('/delete-role', deleteRoleById)
router.delete('/delete-roles', validateDeleteRoleByIds, deleteRoleByIds)

module.exports = router