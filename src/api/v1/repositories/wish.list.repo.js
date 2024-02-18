'use strict'

const { StatusCodes } = require('http-status-codes')
const { WishList, WishListDetail, Product } = require('~/api/v1/models')
const ApiError = require('~/core/api.error')

const createWishList = async (userId) => {
  try {
    return await WishList.create({ userId })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Create wishlist failed')
  }
}

const getWishList = async ({ userId = null }) => {
  try {
    const foundWishList = await WishList.findOne({
      where: { userId }
    })
    if (!foundWishList) throw new ApiError(StatusCodes.NOT_FOUND, 'Wish list not found')
    return foundWishList
  } catch (error) {
    if (!error.statusCode) throw new ApiError(StatusCodes.BAD_REQUEST, 'Get wish list failed')
    throw error
  }
}

module.exports = {
  createWishList,
  getWishList
}