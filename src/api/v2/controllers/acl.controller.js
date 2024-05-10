"use strict"

const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const aclService = require("~/api/v2/services/acl.service")
const SuccessResponse = require("~/core/success.response")
const asyncHandling = require("~/core/async.handling")
const ApiError = require("~/core/api.error")

const assignPermission = asyncHandling(async (req, res) => {
    if (!req.user)
        throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

    const { id: assignerId } = req.user
    const { roleId, permissionId } = req.body

    const accessControl = await aclService.assignPermission({
        roleId,
        permissionId,
        assignerId,
    })

    new SuccessResponse({
        statusCode: StatusCodes.CREATED,
        message: "Asign permission successfully",
        metadata: { accessControl },
    }).send(res)
})

const getAccessControlList = asyncHandling(async (req, res) => {
    const { filter, selector, pagination, sorter } = req

    const accessControlList = await aclService.getAccessControlList({
        filter,
        selector,
        pagination,
        sorter,
    })

    new SuccessResponse({
        message: "Get access control list successfully",
        metadata: { accessControlList },
    }).send(res)
})

const getAccessControlByRoleIdPermissionId = asyncHandling(async (req, res) => {
    const { roleId, permissionId } = req.query

    const accessControl = await aclService.getAccessControlByRoleIdPermissionId(
        { roleId, permissionId }
    )

    new SuccessResponse({
        message: "Get access control successfully",
        metadata: { accessControl },
    }).send(res)
})

const getAccessControlListByRoleId = asyncHandling(async (req, res) => {
    let { roleId } = req.query
    const { filter, selector, pagination, sorter } = req
    roleId = Number(roleId)

    const accessControlList = await aclService.getAccessControlListByRoleId(
        roleId,
        {
            filter,
            selector,
            pagination,
            sorter,
        }
    )

    new SuccessResponse({
        message: "Get access control list by role ID successfully",
        metadata: { accessControlList },
    }).send(res)
})

const getAccessControlListByPermissionId = asyncHandling(async (req, res) => {
    let { permissionId } = req.query
    const { filter, selector, pagination, sorter } = req
    permissionId = Number(permissionId)

    const accessControlList =
        await aclService.getAccessControlListByPermissionId(permissionId, {
            filter,
            selector,
            pagination,
            sorter,
        })

    new SuccessResponse({
        message: "Get access control list by permission ID successfully",
        metadata: { accessControlList },
    }).send(res)
})

const getAccessControlListByAssignerId = asyncHandling(async (req, res) => {
    let { assignerId } = req.query
    const { filter, selector, pagination, sorter } = req
    assignerId = Number(assignerId)

    const accessControlList = await aclService.getAccessControlListByAssignerId(
        assignerId,
        {
            filter,
            selector,
            pagination,
            sorter,
        }
    )

    new SuccessResponse({
        message: "Get access control list by assigner ID successfully",
        metadata: { accessControlList },
    }).send(res)
})

const updateAccessControl = asyncHandling(async (req, res) => {
    if (!req.user)
        throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

    const { id: assignerId } = req.user
    const { roleId, permissionId } = req.query
    const accessControl = await aclService.updateAccessControl(
        { roleId, permissionId },
        { ...req.body, assignerId }
    )

    new SuccessResponse({
        message: "Update access control successfully",
        metadata: { accessControl },
    }).send(res)
})

const unassignPermission = asyncHandling(async (req, res) => {
    const { roleId, permissionId } = req.query

    await aclService.unassignPermission({ roleId, permissionId })

    new SuccessResponse({
        message: "Unassign permission successfully",
        metadata: {},
    }).send(res)
})

const unassignPermissions = asyncHandling(async (req, res) => {
    const { ids } = req.body

    await aclService.unassignPermissions(ids)

    new SuccessResponse({
        message: "Delete some permissions successfully",
        metadata: {},
    }).send(res)
})

module.exports = {
    assignPermission,
    getAccessControlList,
    getAccessControlByRoleIdPermissionId,
    getAccessControlListByRoleId,
    getAccessControlListByPermissionId,
    getAccessControlListByAssignerId,
    updateAccessControl,
    unassignPermission,
    unassignPermissions,
}
