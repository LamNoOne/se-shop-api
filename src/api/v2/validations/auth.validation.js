'use strict'

const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')

const validateSignUp = asyncHandling(async (req, res, next) => {
  const {
    genderId, lastName, firstName, phoneNumber,
    email, address, username, password
  } = req.body

  const userSchema = Joi.object({
    genderId: Joi.number(),
    lastName: Joi.string().required().max(50),
    firstName: Joi.string().required().max(30),
    phoneNumber: Joi.string().required().min(10).max(11),
    email: Joi.string().max(50),
    address: Joi.string().max(100),
    username: Joi.string().required().min(6).max(40),
    password: Joi.string().required().min(6).max(40)
  })

  try {
    await userSchema.validateAsync({
      genderId, lastName, firstName, phoneNumber,
      email, address, username, password
    }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateSignIn = asyncHandling(async (req, res, next) => {
  const { username, password } = req.body

  const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })

  try {
    await userSchema.validateAsync({ username, password }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateForgotPassword = asyncHandling(async (req, res, next) => {
  const { email } = req.body

  const infoSchema = Joi.object({
    email: Joi.string().email().required()
  })

  try {
    await infoSchema.validateAsync({ email }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateResetPassword = asyncHandling(async (req, res, next) => {
  const { password, resetToken } = req.body

  const infoSchema = Joi.object({
    password: Joi.string().min(6).required(),
    resetToken: Joi.string().required()
  })

  try {
    await infoSchema.validateAsync({ password, resetToken }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

module.exports = {
  validateSignUp,
  validateSignIn,
  validateForgotPassword,
  validateResetPassword
}