'use strict'

const wishListRepo = require('~/api/v1/repositories/wish.list.repo')
const wishListDetailService = require('~/api/v1/services/wish.list.detail.service')
const { StatusCodes } = require('http-status-codes')
const { getProductById } = require('~/api/v1/repositories/product.repo')
const ApiError = require('~/core/api.error')

const createWishList = async (userId) => {
  return await wishListRepo.createWishList(userId)
}

const addProductToWishList = async ({ userId = null, productId = null }) => { 
  try {
    const foundWishList = await wishListRepo.getWishList({ userId })
    const foundProduct = await getProductById(productId)
    await wishListDetailService.createWishListDetail({
      wishListId: foundWishList.id,
      productId: foundProduct.id
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Add product to wish list failed')
  }
}

const getMyWishList = async ({ userId }, { filter, selector, pagination, sorter }) => {
  try {
    const foundWishList = await wishListRepo.getWishList({ userId })
    return await wishListDetailService.getWishListDetails({ wishListId: foundWishList.id }, { filter, selector, pagination, sorter })
  } catch (error) {
    if (error?.statusCode === StatusCodes.NOT_FOUND) throw error
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Get my wish failed')
  }
}

const deleteProductFromWishList = async ({ userId, productId }) => {
  const foundWishList = await wishListRepo.getWishList({ userId })
  return await wishListDetailService.deleteProductFromWishList({ wishListId: foundWishList.id, productId })
}

module.exports = {
  createWishList,
  addProductToWishList,
  getMyWishList,
  deleteProductFromWishList
}