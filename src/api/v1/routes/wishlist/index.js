'use strict'

const express = require('express')
const {
  addProductToWishList,
  getMyWishList,
  deleteProductFromWishList
} = require('~/api/v1/controllers/wish.list.controller')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')

const router = express.Router()

router.get('/get-my-wishlist', queryStringMiddleware, getMyWishList)
router.post('/add-product', addProductToWishList)
router.delete('/delete-product', deleteProductFromWishList)

module.exports = router