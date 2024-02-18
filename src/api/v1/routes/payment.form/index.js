'use strict'

const express = require('express')
const queryStringMiddleware = require('~/api/v1/middlewares/query.string.middleware')
const {
  createPaymentForm,
  getAllPaymentForms,
  getPaymentFormById,
  updatePaymentFormById,
  deletePaymentFormById,
  deletePaymentFormByIds
} = require('~/api/v1/controllers/payment.form.controller')
const router = express.Router()

router.get('/', queryStringMiddleware, getAllPaymentForms)
router.get('/get-payment-form', getPaymentFormById)
router.post('/create', createPaymentForm)
router.patch('/update-payment-form', updatePaymentFormById)
router.delete('/delete-payment-form', deletePaymentFormById)
router.delete('/delete-payment-forms', deletePaymentFormByIds)

module.exports = router