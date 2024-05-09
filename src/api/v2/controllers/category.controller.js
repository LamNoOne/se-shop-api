'use strict'

const { StatusCodes } = require('http-status-codes')
const categoryService = require('~/api/v2/services/category.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createCategory = asyncHandling(async (req, res) => {
  const { name, description } = req.body

  const category = await categoryService.createCategory({ name, description })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create category successfully',
    metadata: { category }
  }).send(res)
})

const getAllCategories = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const categories = await categoryService.getAllCategories({ filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get all categories successfully',
    metadata: { categories }
  }).send(res)
})

const getProductsByCategoryId = asyncHandling(async (req, res) => {
  const { id } = req.query
  const { filter, selector, pagination, sorter } = req

  const allProductPromise = categoryService.getProductsByCategoryId({ categoryId: id, filter })
  const productsPromise = categoryService.getProductsByCategoryId({ categoryId: id, filter, selector, pagination, sorter })
  const [allProducts, products] = await Promise.all([allProductPromise, productsPromise])
  const total = allProducts?.products.length
  const limit = pagination?.limit
  const totalPage = limit <= total ? Math.ceil(total / limit) : 1

  new SuccessResponse({
    message: 'Get products by category id successfully',
    metadata: { page: pagination.skip / pagination.limit + 1, total, totalPage, products }
  }).send(res)
})

const getCategoryById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const category = await categoryService.getCategoryById({ id })

  new SuccessResponse({
    message: 'Get category successfully',
    metadata: { category }
  }).send(res)
})

const updateCategoryById = asyncHandling( async (req, res) => {
  const { id } = req.query
  const { name, description } = req.body

  const category = await categoryService.updateCategoryById({ id, name, description })

  new SuccessResponse({
    message: 'Update category successfully',
    metadata: { category }
  }).send(res)
})

const deleteCategoryById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const categories = await categoryService.deleteCategoryById({ id })

  new SuccessResponse({
    message: 'Delete category successfully',
    metadata: { categories }
  }).send(res)
})

const deleteCategoryByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  const categories = await categoryService.deleteCategoryByIds({ ids })

  new SuccessResponse({
    message: 'Delete some categories successfully',
    metadata: { categories }
  }).send(res)
})

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  deleteCategoryByIds,
  getProductsByCategoryId
}