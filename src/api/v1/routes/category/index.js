'use strict'

const express = require('express')
const {
  validateCreateCategory,
  validateUpdateCategoryById,
  validateDeleteCategoryByIds
} = require('~/api/v1/validations/category.validation')
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  deleteCategoryByIds,
  getProductsByCategoryId
}= require('~/api/v1/controllers/category.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllCategories)
router.get('/get-category', getCategoryById)
router.get('/get-products', queryStringMiddleware, getProductsByCategoryId)
router.post('/create', validateCreateCategory, createCategory)
router.patch('/update-category', validateUpdateCategoryById, updateCategoryById)
router.delete('/delete-category', deleteCategoryById)
router.delete('/delete-categories', validateDeleteCategoryByIds, deleteCategoryByIds)

module.exports = router