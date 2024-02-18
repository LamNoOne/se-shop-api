'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')
const { REQUEST_HEADER_KEYS } = require('~/config/constants.config')
const tokenRepo = require('~/api/v1/services/token.service')
const userRepo = require('~/api/v1/repositories/user.repo')
const rolePermissionRepo = require('~/api/v1/repositories/role.permission.repo')
const permissionRepo = require('~/api/v1/repositories/permission.repo')
const { verifyToken } = require('~/api/v1/utils/auth.util')

const authenticate = asyncHandling(async (req, res, next) => {
  const reqApi = req.baseUrl + req.path
  const reqMethod = req.method
  const reqVersion = req.headers[REQUEST_HEADER_KEYS.apiVersion]

  try {
    // check public or private api
    const foundPermission = await permissionRepo.getPermissionByApiMethodVersion({
      api: reqApi,
      method: reqMethod,
      version: reqVersion
    })
    if (!foundPermission?.isPrivate) {
      req.isPrivateApi = false
      return next()
    }

    // authenticate access token
    const userId = req.headers[REQUEST_HEADER_KEYS.userId]
    if (!userId) new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    const { accessToken } = req.cookies
    if (!accessToken) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    const foundToken = await tokenRepo.getTokenByAccessToken({ accessToken })
    if (!foundToken) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    const foundUser = await userRepo.getUserById(userId)
    if (!foundUser) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    const decoded = verifyToken({ token: accessToken, publicKey: foundUser.publicKey })
    if (decoded.userId != userId) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
    req.user = foundUser
    req.isPrivateApi = true
    req.reqApi = reqApi
    req.reqMethod = reqMethod
    next()
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new ApiError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
    }
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Access token expired')
    }
    throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  }
})

const authorize = asyncHandling(async (req, res, next) => {
  if (!req.isPrivateApi) return next()

  const { roleId } = req.user
  const { reqApi, reqMethod } = req

  // check permission
  const accessControlList = await rolePermissionRepo.getAllRolePermissionsByRoleId(roleId, {})
  const hasPermission = accessControlList.some(({ permission }) => {
    return reqApi === permission.api && reqMethod === permission.method
  })
  if (hasPermission) return next()
  next(new ApiError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN))
})

module.exports = {
  authenticate,
  authorize
}