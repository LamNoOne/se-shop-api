'use strict'

const express = require('express')
const {
  validateSignUp,
  validateSignIn,
  validateForgotPassword,
  validateResetPassword
} = require('~/api/v2/validations/auth.validation')
const {
  signUp,
  signUpAdmin,
  signIn,
  refreshToken,
  signOut,
  forgotPassword,
  resetPassword
}= require('~/api/v2/controllers/auth.controller')

const router = express.Router()

router.get('/refresh-token', refreshToken)
router.post('/sign-up', validateSignUp, signUp)
router.post('/sign-up-admin', validateSignUp, signUpAdmin)
router.post('/sign-in', validateSignIn, signIn)
router.post('/sign-out', signOut)
router.post('/forgot-password', validateForgotPassword, forgotPassword)
router.post('/reset-password', validateResetPassword, resetPassword)

module.exports = router