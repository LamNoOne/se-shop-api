'use strict'

const express = require('express')
const {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
  deletePermissionByIds
}= require('~/api/v2/controllers/permission.controller')
const queryStringMiddleware = require('~/api/v2/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllPermissions)
router.get('/get-permission', getPermissionById)
router.post('/create', createPermission)
router.patch('/update-permission', updatePermissionById)
router.delete('/delete-permission', deletePermissionById)
router.delete('/delete-permissions', deletePermissionByIds)

module.exports = router