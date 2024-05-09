'use strict'

const { StatusCodes } = require('http-status-codes')
const genderService = require('~/api/v2/services/gender.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createGender = asyncHandling(async (req, res) => {
  const { name } = req.body
  const gender = await genderService.createGender({ name })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create gender successfully',
    metadata: { gender }
  }).send(res)
})

const getAllGenders = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req
  const genders = await genderService.getAllGenders({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get all genders successfully',
    metadata: { genders }
  }).send(res)
})

const getGenderById = asyncHandling(async (req, res) => {
  const { id } = req.query
  const gender = await genderService.getGenderById({ id })

  new SuccessResponse({
    message: 'Get gender successfully',
    metadata: { gender }
  }).send(res)
})

const updateGenderById = asyncHandling( async (req, res) => {
  const { id } = req.query
  const { name } = req.body
  const gender = await genderService.updateGenderById({ id, name })

  new SuccessResponse({
    message: 'Update gender successfully',
    metadata: { gender }
  }).send(res)
})

const deleteGenderById = asyncHandling(async (req, res) => {
  const { id } = req.query
  const genders = await genderService.deleteGenderById({ id })

  new SuccessResponse({
    message: 'Delete gender successfully',
    metadata: { genders }
  }).send(res)
})

const deleteGenderByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body
  const genders = await genderService.deleteGenderByIds({ ids })

  new SuccessResponse({
    message: 'Delete some genders successfully',
    metadata: { genders }
  }).send(res)
})

module.exports = {
  createGender,
  getAllGenders,
  getGenderById,
  updateGenderById,
  deleteGenderById,
  deleteGenderByIds
}