'use strict'

const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')

const roleSchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(100)
})

const validateCreateRole = asyncHandling(async (req, res, next) => {
  const { name, description } = req.body

  try {
    await roleSchema.validateAsync({ name, description }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateUpdateRoleById = asyncHandling(async (req, res, next) => {
  const { name, description } = req.body

  try {
    await roleSchema.validateAsync({ name, description }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateDeleteRoleByIds = asyncHandling(async (req, res, next) => {
  const { ids } = req.body

  const idsSchema = Joi.object({
    ids: Joi.array().items(Joi.number()).required()
  })

  try {
    await idsSchema.validateAsync({ ids }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

module.exports = {
  validateCreateRole,
  validateUpdateRoleById,
  validateDeleteRoleByIds
}