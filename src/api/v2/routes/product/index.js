'use strict'

const express = require('express')
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  increaseStockQuantiy,
  decreaseStockQuantiy,
  deleteProductById,
  deleteProductByIds
}= require('~/api/v2/controllers/product.controller')
const { validateCreateProduct } = require('~/api/v2/validations/product.validation')
const { uploadProductImageMiddleware } = require('~/api/v2/middlewares/upload.cloud.middleware')
const queryStringMiddleware = require('~/api/v2/middlewares/query.string.middleware')

const router = express.Router()

router.get('/', queryStringMiddleware, getAllProducts)
router.get('/get-product', getProductById)
router.post('/create', uploadProductImageMiddleware, validateCreateProduct, createProduct)
router.patch('/update-product', updateProductById)
router.patch('/increase-stock-quantity', increaseStockQuantiy)
router.patch('/decrease-stock-quantity', decreaseStockQuantiy)
router.delete('/delete-product', deleteProductById)
router.delete('/delete-products', deleteProductByIds)

module.exports = router