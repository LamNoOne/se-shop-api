"use strict"

const express = require("express")
const roleRouter = require("./role")
const permissionRouter = require("./permission")
const aclRouter = require("./acl")
const genderRouter = require("./gender")
const userStatusRouter = require("./user.status")
const userRouter = require("./user")
const authRouter = require("./auth")
const categoryRouter = require("./category")
const productRouter = require("./product")
const cartRouter = require("./cart")
const checkoutRouter = require("./checkout")
const paymentFormRouter = require("./payment.form")
const orderStatusRouter = require("./order.status")
const orderRouter = require("./order")
const wishlistRouter = require("./wishlist")
const transactionRouter = require("./transaction")
const {
    authenticate,
    authorize,
} = require("~/api/v2/middlewares/auth.middleware")

const router = express.Router()

router.use(authenticate)
router.use(authorize)

router.use("/auth", authRouter)
router.use("/roles", roleRouter)
router.use("/permissions", permissionRouter)
router.use("/acl", aclRouter)
router.use("/genders", genderRouter)
router.use("/user-statuses", userStatusRouter)
router.use("/users", userRouter)
router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.use("/carts", cartRouter)
router.use("/checkout", checkoutRouter)
router.use("/payment-forms", paymentFormRouter)
router.use("/order-statuses", orderStatusRouter)
router.use("/orders", orderRouter)
router.use("/wishlist", wishlistRouter)
router.use("/transaction", transactionRouter)

module.exports = router
