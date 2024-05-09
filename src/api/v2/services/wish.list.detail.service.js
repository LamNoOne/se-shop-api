'use strict'

const wishListDetailRepo = require('~/api/v2/repositories/wish.list.detail.repo')

const createWishListDetail = async ({ wishListId, productId }) => {
  return await wishListDetailRepo.createWishListDetail({ wishListId, productId })
}

const getWishListDetails = async ({ wishListId }, { filter, selector, pagination, sorter }) => {
  return await wishListDetailRepo.getWishListDetails({ wishListId }, { filter, selector, pagination, sorter })
}

const deleteProductFromWishList = async ({ wishListId, productId }) => {
  return await wishListDetailRepo.deleteWishListDetail({ wishListId, productId })
}

module.exports = {
  createWishListDetail,
  getWishListDetails,
  deleteProductFromWishList
}