'use strict'

const { StatusCodes } = require('http-status-codes')
const cartService = require('~/api/v2/services/cart.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')

const getFullCartForCustomer = asyncHandling(async (req, res) => {
  const id = req?.user?.id || null
  const { filter, selector, pagination, sorter } = req

  const cart = await cartService.getFullCartByUserId(id, { filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get cart successfully',
    metadata: { cart }
  }).send(res)
})

const addProductToCart = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null

  const cart = await cartService.addProductToCart({ ...req.body, userId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Add product to cart successfully',
    metadata: { cart }
  }).send(res)
})

const updateQuantityProduct = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null

  const cart = await cartService.updateQuantityProduct({ ...req.body, userId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Increase quantity of product successfully',
    metadata: { cart }
  }).send(res)
})

const deleteProductFromCart = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null

  const { cartId, productId } = req.query

  const cart = await cartService.deleteProductFromCart({ cartId, userId, productId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Delete product from cart successfully',
    metadata: { cart }
  }).send(res)
})

const deleteProductsFromCart = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null

  const { cartId, productIds } = req.body

  const cart = await cartService.deleteProductsFromCart({ cartId, userId, productIds })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Delete product from cart successfully',
    metadata: { cart }
  }).send(res)
})

module.exports = {
  getFullCartForCustomer,
  addProductToCart,
  updateQuantityProduct,
  deleteProductFromCart,
  deleteProductsFromCart
}