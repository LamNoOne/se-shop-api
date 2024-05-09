'use strict'

const express = require('express')
const {
  addProductToCart,
  getFullCartForCustomer,
  updateQuantityProduct,
  deleteProductFromCart,
  deleteProductsFromCart
} = require('~/api/v2/controllers/cart.controller')
const queryStringMiddleware = require('~/api/v2/middlewares/query.string.middleware')

const router = express.Router()

router.get('/get-my-cart', queryStringMiddleware, getFullCartForCustomer)
router.post('/add-to-cart', addProductToCart)
router.patch('/update-quantity-product', updateQuantityProduct)
router.delete('/delete-product-from-cart', deleteProductFromCart)
router.delete('/delete-products-from-cart', deleteProductsFromCart)

module.exports = router