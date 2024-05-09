'use strict'

const express = require('express')
const {
  validateCreateGender,
  validateUpdateGenderById,
  validateDeleteGenderByIds
} = require('~/api/v2/validations/gender.validation')
const {
  createGender,
  getAllGenders,
  getGenderById,
  updateGenderById,
  deleteGenderById,
  deleteGenderByIds
} = require('~/api/v2/controllers/gender.controller')
const queryStringMiddleware = require('~/api/v2/middlewares/query.string.middleware')
const router = express.Router()

router.get('/', queryStringMiddleware, getAllGenders)
router.get('/get-gender', getGenderById)
router.post('/create', validateCreateGender, createGender)
router.patch('/update-gender', validateUpdateGenderById, updateGenderById)
router.delete('/delete-gender', deleteGenderById)
router.delete('/delete-genders', validateDeleteGenderByIds, deleteGenderByIds)

module.exports = router