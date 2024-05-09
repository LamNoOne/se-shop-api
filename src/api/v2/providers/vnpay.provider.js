'use strict'

const crypto = require('crypto')
const querystring = require('qs')
const moment = require('moment')
const { payments } = require('~/config/environment.config')
const { sortObject } = require('~/api/v2/utils')

const createPaymentUrl = ({ ipAddr, bankCode, orderId, amount, orderInfo }) => {
  let vnp_Params = {}
  vnp_Params['vnp_CreateDate'] = moment(new Date()).format('YYYYMMDDHHmmss')
  vnp_Params['vnp_TmnCode'] = payments.vnpay.tmnCode
  vnp_Params['vnp_TxnRef'] = orderId
  vnp_Params['vnp_OrderInfo'] = orderInfo
  vnp_Params['vnp_Amount'] = amount * 100,
  vnp_Params['vnp_ReturnUrl'] = payments.vnpay.returnUrl
  vnp_Params['vnp_IpAddr'] = ipAddr
  vnp_Params['vnp_BankCode'] = bankCode
  vnp_Params['vnp_Locale'] = 'vn'
  vnp_Params['vnp_CurrCode'] = 'VND'
  vnp_Params['vnp_Command'] = 'pay'
  vnp_Params['vnp_Version'] = '2.1.0'
  vnp_Params['vnp_OrderType'] = 'other'

  vnp_Params = sortObject(vnp_Params)

  const rawString = querystring.stringify(vnp_Params, { encode: false })

  vnp_Params['vnp_SecureHash'] = generateVnPaySignature(rawString, payments.vnpay.hashSecret)
  const vnpUrl = payments.vnpay.url + '?' + querystring.stringify(vnp_Params, { encode: false })

  return vnpUrl
}

const generateVnPaySignature = (data, secretKey) => {
  const secretKeyBuffer = Buffer.from(secretKey, 'utf8')
  const hmac = crypto.createHmac('SHA512', secretKeyBuffer)
  const signature = hmac.update(data).digest('hex')

  return signature
}

const checkPay = (vnpParams) => {
  const isValidSignature = validateVnPaySignature({ vnpParams, expectedHash: vnpParams.vnp_SecureHash })
  if (!isValidSignature) return 0

  const responseCode = vnpParams['vnp_ResponseCode']
  if (responseCode === '00') return 1
  return 0
}

const validateVnPaySignature = ({ vnpParams, expectedHash }) => {
  delete vnpParams['vnp_SecureHash']
  delete vnpParams['vnp_SecureHashType']
  const sortedVnpParams = sortObject(vnpParams)

  const queryString = querystring.stringify(sortedVnpParams, { encode: false })

  const calculatedHash = generateVnPaySignature(queryString, payments.vnpay.hashSecret)

  return calculatedHash === expectedHash
}

module.exports = {
  createPaymentUrl,
  checkPay
}
