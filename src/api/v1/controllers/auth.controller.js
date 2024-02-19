'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const authService = require('~/api/v1/services/auth.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')
const {
  app: { cookieATMaxAge, cookieRTMaxAge }
} = require('~/config/environment.config')
const ApiError = require('~/core/api.error')
const { REQUEST_HEADER_KEYS } = require('~/config/constants.config')

const signUp = asyncHandling(async (req, res) => {
  const {
    genderId, lastName, firstName, phoneNumber,
    email, address, username, password
  } = req.body

  await authService.signUp({
    genderId, lastName, firstName, phoneNumber,
    email, address, username, password
  })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Sign up successfully'
  }).send(res)
})

const signUpAdmin = asyncHandling(async (req, res) => {
  const {
    genderId, lastName, firstName, phoneNumber,
    email, address, username, password, secretKey
  } = req.body

  await authService.signUpAdmin({
    genderId, lastName, firstName, phoneNumber,
    email, address, username, password, secretKey
  })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Sign up account for admin successfully'
  }).send(res)
})

const signIn = asyncHandling(async (req, res) => {
  const { username, password } = req.body

  const result = await authService.signIn({ username, password })

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite:'None',
    maxAge: cookieATMaxAge
  }).cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite:'None',
    maxAge: cookieRTMaxAge
  })

  new SuccessResponse({
    message: 'Signed in successfully',
    metadata: { user: result.user }
  }).send(res)
})

const refreshToken = asyncHandling(async (req, res) => {
  const { refreshToken } = req.cookies
  const userId = Number(req.headers[REQUEST_HEADER_KEYS.userId])
  if (!refreshToken || !userId) throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

  const tokenPair = await authService.refreshToken({ userId, refreshToken })

  res.cookie('accessToken', tokenPair.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: cookieATMaxAge
  }).cookie('refreshToken', tokenPair.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: cookieRTMaxAge
  })

  new SuccessResponse({
    message: 'Refreshed tokens successfully'
  }).send(res)
})

const signOut = asyncHandling(async (req, res) => {
  const { accessToken, refreshToken } = req.cookies
  if (!accessToken || !refreshToken) throw new ApiError(StatusCodes.BAD_REQUEST, 'Not signed in yet')

  await authService.signOut({ res, accessToken, refreshToken })

  new SuccessResponse({
    message: 'Signed out successfully'
  }).send(res)
})

const forgotPassword = asyncHandling(async (req, res) => {
  const { email } = req.body

  await authService.forgotPassword({ email })

  new SuccessResponse({
    message: `Sent mail to ${email}`
  }).send(res)
})

const resetPassword = asyncHandling(async (req, res) => {
  const { password, resetToken } = req.body

  const user = await authService.resetPassword({ password, resetToken })

  new SuccessResponse({
    message: 'Reset password successfully',
    metadata: { user }
  }).send(res)
})

module.exports = {
  signUp,
  signUpAdmin,
  signIn,
  refreshToken,
  signOut,
  forgotPassword,
  resetPassword
}