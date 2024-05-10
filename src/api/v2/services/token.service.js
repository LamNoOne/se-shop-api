"use strict"

const { Token } = require("~/api/v2/models")
const ApiError = require("~/core/api.error")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const createToken = async ({ accessToken, refreshToken, userId }) => {
    try {
        return await Token.create({ accessToken, refreshToken, userId })
    } catch (error) {
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
        )
    }
}

const getTokenByAccessToken = async ({ accessToken }) => {
    return await Token.findOne({
        where: { accessToken },
    })
}

const getTokenByRefreshToken = async ({ refreshToken }) => {
    return await Token.findOne({
        where: { refreshToken },
    })
}

const findOneToken = async (query = {}) => {
    return await Token.findOne(query)
}

const deleteTokenByRefreshToken = async ({ refreshToken }) => {
    const token = await Token.findOne({
        where: { refreshToken },
    })
    if (!token) return null

    return await token.destroy()
}

const deleteAll = async () => {
    return await Token.destroy({ where: {} })
}

const deleteByUserId = async (userId) => {
    return await Token.destroy({
        where: {
            userId,
        },
    })
}

const deleteByUsersIds = async (userIds) => {
    return await Token.destroy({
        where: {
            userId: userIds,
        },
    })
}

module.exports = {
    createToken,
    getTokenByAccessToken,
    getTokenByRefreshToken,
    findOneToken,
    deleteTokenByRefreshToken,
    deleteAll,
    deleteByUserId,
    deleteByUsersIds,
}
