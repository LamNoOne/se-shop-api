"use strict"

const express = require("express")
const {
    assignPermission,
    getAccessControlList,
    getAccessControlByRoleIdPermissionId,
    getAccessControlListByRoleId,
    getAccessControlListByPermissionId,
    getAccessControlListByAssignerId,
    updateAccessControl,
    unassignPermission,
    unassignPermissions,
} = require("~/api/v2/controllers/acl.controller")
const queryStringMiddleware = require("~/api/v2/middlewares/query.string.middleware")

const router = express.Router()

router.get("/", queryStringMiddleware, getAccessControlList)
router.get(
    "/get-by-role-id",
    queryStringMiddleware,
    getAccessControlListByRoleId
)
router.get(
    "/get-by-permission-id",
    queryStringMiddleware,
    getAccessControlListByPermissionId
)
router.get(
    "/get-by-assigner-id",
    queryStringMiddleware,
    getAccessControlListByAssignerId
)
router.get(
    "/get-by-role-id-permission-id",
    getAccessControlByRoleIdPermissionId
)
router.post("/assign-permission", assignPermission)
router.patch("/update-by-role-id-permission-id", updateAccessControl)
router.delete("/unassign-permission", unassignPermission)
router.delete("/unassign-permissions", unassignPermissions)

module.exports = router
