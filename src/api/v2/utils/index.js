'use strict'

const _ = require('lodash')
const { Op } = require('sequelize')

const getDataInfo = (obj = {}, fields = []) => {
  return _.pick(obj, fields)
}

const convertValueToRegExOfKeyFromObject = (object = {}, flags = '') => {
  Object.keys(object).map((key) => {
    const regex = new RegExp(object[key], flags)
    object[key] = {
      [Op.regexp]: regex
    }
  })
}

const convertToQueryLikeObject = (object = {}) => {
  Object.keys(object).forEach((key) => {
    const tempNumber = Number(object[key])
    if (Number.isInteger(tempNumber)) {
      object[key] = tempNumber
      return
    }
    object[key] = {
      [Op.like]: `%${object[key]}%`
    }
  })
}

const sortObject = (obj) => {
  let sorted = {}
  let str = []
  let key
  for (key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}

module.exports = {
  getDataInfo,
  convertValueToRegExOfKeyFromObject,
  convertToQueryLikeObject,
  sortObject
}
