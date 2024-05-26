"use strict"

const express = require("express")
const { createTransaction, getTransaction } = require("~/api/v2/controllers/transaction.controller")

const router = express.Router()

router.post("/", createTransaction)
router.get("/", getTransaction)

module.exports = router
