'use strict'

const { StatusCodes } = require('http-status-codes')
const wishListService = require('~/api/v1/services/wish.list.service')
const SuccessResponse = require('~/core/success.response')
const asyncHandling = require('~/core/async.handling')


const addProductToWishList = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null
  const { productId } = req.body

  await wishListService.addProductToWishList({ userId, productId })

  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message: 'Add product to cart successfully'
  }).send(res)
})

const getMyWishList = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null
  const { filter, selector, pagination, sorter } = req

  const wishList = await wishListService.getMyWishList({ userId }, { filter, selector, pagination, sorter })

  new SuccessResponse({
    message: 'Get wish list successfully',
    metadata: { wishList }
  }).send(res)
})

const deleteProductFromWishList = asyncHandling(async (req, res) => {
  const userId = req?.user?.id || null
  const { productId } = req.query

  await wishListService.deleteProductFromWishList({ userId, productId })

  new SuccessResponse({
    message: 'Delete product from wishlist successfully',
    metadata: {}
  }).send(res)
})

module.exports = {
  addProductToWishList,
  getMyWishList,
  deleteProductFromWishList
}