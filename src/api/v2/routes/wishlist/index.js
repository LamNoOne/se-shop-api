"use strict"

const express = require("express")
const {
    addProductToWishList,
    getMyWishList,
    deleteProductFromWishList,
} = require("~/api/v2/controllers/wish.list.controller")
const queryStringMiddleware = require("~/api/v2/middlewares/query.string.middleware")

const router = express.Router()

router.get("/get-my-wishlist", queryStringMiddleware, getMyWishList)
router.post("/add-product", addProductToWishList)
router.delete("/delete-product", deleteProductFromWishList)

module.exports = router
