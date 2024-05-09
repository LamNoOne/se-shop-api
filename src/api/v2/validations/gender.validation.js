'use strict'

const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')

const genderSchema = Joi.object({
  name: Joi.string().max(20).required()
})

const validateCreateGender = asyncHandling(async (req, res, next) => {
  const { name } = req.body

  try {
    await genderSchema.validateAsync({ name }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateUpdateGenderById = asyncHandling(async (req, res, next) => {
  const { name } = req.body

  try {
    await genderSchema.validateAsync({ name }, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const validateDeleteGenderByIds = asyncHandling(async (req, res, next) => {
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
  validateCreateGender,
  validateUpdateGenderById,
  validateDeleteGenderByIds
}