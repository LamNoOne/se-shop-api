"use strict"

const userService = require("~/api/v2/services/user.service")
const SuccessResponse = require("~/core/success.response")
const asyncHandling = require("~/core/async.handling")
const { StatusCodes } = require("http-status-codes")

const getAllUsers = asyncHandling(async (req, res) => {
    const { filter, selector, pagination, sorter } = req

    const users = await userService.getAllUsers({
        filter,
        selector,
        pagination,
        sorter,
    })

    new SuccessResponse({
        message: "Get all users successfully",
        metadata: { users },
    }).send(res)
})

const getUserInfo = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null

    const user = await userService.getUserById(userId)

    new SuccessResponse({
        message: "Get user successfully",
        metadata: { user },
    }).send(res)
})

const getUserById = asyncHandling(async (req, res) => {
    const { id } = req.query

    const user = await userService.getUserById(id)

    new SuccessResponse({
        message: "Get user successfully",
        metadata: { user },
    }).send(res)
})

const createUser = asyncHandling(async (req, res) => {
    const {
        roleId,
        userStatusId,
        genderId,
        lastName,
        firstName,
        phoneNumber,
        email,
        address,
        username,
        password,
    } = req.body

    const user = await userService.createUser({
        roleId,
        userStatusId,
        genderId,
        lastName,
        firstName,
        phoneNumber,
        email,
        address,
        username,
        password,
    })

    new SuccessResponse({
        statusCode: StatusCodes.CREATED,
        message: "Create user successfully",
        metadata: { user },
    }).send(res)
})

const updateUserItseft = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null
    const imageUrl = req?.file?.path

    const user = await userService.updateUserById(userId, {
        ...req.body,
        imageUrl,
    })

    new SuccessResponse({
        message: "Update user successfully",
        metadata: { 
            id: user.id,
            lastName: user.lastName,
            firstName: user.firstName,
            username: user.username,
            image: user.imageUrl,
            phoneNumber: user.phoneNumber,
            email: user.email,
            address: user.address,
         },
    }).send(res)
})

const updateStatus = asyncHandling(async (req, res) => {
    const { id } = req.query
    const { userStatusId } = req.body

    const user = await userService.updateStatus({ id, userStatusId })

    new SuccessResponse({
        message: "Update user status successfully",
        metadata: { user },
    }).send(res)
})

const deleteUserById = asyncHandling(async (req, res) => {
    const { id } = req.query

    const users = await userService.deleteUserById(id)

    new SuccessResponse({
        message: "Delete user successfully",
        metadata: { users },
    }).send(res)
})

const deleteUsersbyIds = asyncHandling(async (req, res) => {
    const { ids } = req.body

    const users = await userService.deleteUsersbyIds(ids)

    new SuccessResponse({
        message: "Delete users successfully",
        metadata: { users },
    }).send(res)
})

module.exports = {
    getAllUsers,
    getUserInfo,
    getUserById,
    createUser,
    updateUserItseft,
    updateStatus,
    deleteUserById,
    deleteUsersbyIds,
}
