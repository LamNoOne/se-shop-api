'use strict'

const Joi = require('joi')
const { StatusCodes } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const asyncHandling = require('~/core/async.handling')
const cloudinaryProvider = require('~/api/v1/providers/cloudinary.provider')

const productSchema = Joi.object({
  name: Joi.string().max(200).required(),
  description: Joi.string().max(1000),
  image: Joi.binary().required(),
  screen: Joi.string().max(200),
  operatingSystem: Joi.string().max(50),
  processor: Joi.string().max(50),
  ram: Joi.string(),
  storageCapacity: Joi.string(),
  dimensions: Joi.string().max(50),
  weight: Joi.string(),
  batteryCapacity: Joi.string(),
  frontCameraResolution: Joi.string().max(50),
  rearCameraResolution: Joi.string().max(50),
  connectivity: Joi.string().max(200),
  color: Joi.string().max(50),
  price: Joi.string().required(),
  stockQuantity: Joi.string().min(0).required(),
  categoryId: Joi.string().required()
})

const validateCreateProduct = asyncHandling(async (req, res, next) => {
  const file = req?.file

  try {
    await productSchema.validateAsync({ ...req.body, image: file?.path }, { abortEarly: false })
    next()
  } catch (error) {
    await cloudinaryProvider.destroyFile(file?.path)
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

module.exports = {
  validateCreateProduct
}