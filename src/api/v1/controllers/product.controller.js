'use strict'

const { StatusCodes } = require('http-status-codes')
const productService = require('~/api/v1/services/product.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const createProduct = asyncHandling(async (req, res) => {
  const product = await productService.createProduct({ ...req.body, imageUrl: req?.file?.path })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Create product successfully',
    metadata: { product }
  }).send(res)
})

const getAllProducts = asyncHandling(async (req, res) => {
  const { filter, selector, pagination, sorter } = req

  const allProductPromise = productService.getAllProducts({ filter })
  const productsPromise = productService.getAllProducts({ filter, selector, pagination, sorter })
  const [allProducts, products] = await Promise.all([allProductPromise, productsPromise])
  const total = allProducts.length
  const limit = pagination?.limit
  const totalPage = limit <= total ? Math.ceil(total / limit) : 1

  new SuccessResponse({
    message: 'Get all products successfully',
    metadata: { page: pagination.skip / pagination.limit + 1, total, totalPage, products }
  }).send(res)
})

const getProductById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const product = await productService.getProductById(id)

  new SuccessResponse({
    message: 'Get product successfully',
    metadata: { product }
  }).send(res)
})

const updateProductById = asyncHandling( async (req, res) => {
  const { id } = req.query

  const product = await productService.updateProductById(id, req.body)

  new SuccessResponse({
    message: 'Update product successfully',
    metadata: { product }
  }).send(res)
})

const increaseStockQuantiy = asyncHandling(async (req, res) => {
  const { id } = req.query

  const product = await productService.increaseStockQuantiy(id, req.body)

  new SuccessResponse({
    message: 'Increase stock quantity of product successfully',
    metadata: { product }
  }).send(res)
})

const decreaseStockQuantiy = asyncHandling(async (req, res) => {
  const { id } = req.query

  const product = await productService.decreaseStockQuantiy(id, req.body)

  new SuccessResponse({
    message: 'Decrease stock quantity of product successfully',
    metadata: { product }
  }).send(res)
})

const deleteProductById = asyncHandling(async (req, res) => {
  const { id } = req.query

  const products = await productService.deleteProductById(id)

  new SuccessResponse({
    message: 'Delete product successfully',
    metadata: { products }
  }).send(res)
})

const deleteProductByIds = asyncHandling(async (req, res) => {
  const { ids } = req.body

  const products = await productService.deleteProductByIds(ids)

  new SuccessResponse({
    message: 'Delete some products successfully',
    metadata: { products }
  }).send(res)
})

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  increaseStockQuantiy,
  decreaseStockQuantiy,
  deleteProductById,
  deleteProductByIds
}