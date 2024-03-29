'use strict'

const {
  getDataInfo,
  convertToQueryLikeObject
} = require('~/api/v1/utils')

const getFilterKeysFromQueryObject = (queryObject = {}) => {
  const keys = Object.keys(queryObject)
  return keys.filter((key) => key[0] !== '_')
}

const createFilter = (queryObject = {}) => {
  const filterKeys = getFilterKeysFromQueryObject(queryObject)
  const filterObject = getDataInfo(queryObject, filterKeys)

  convertToQueryLikeObject(filterObject)

  return filterObject
}

const createPagination = (queryObject = {}) => {
  const { _page, _limit } = queryObject
  const skip = (Number(_page) - 1) * Number(_limit)
  return {
    skip: skip || null,
    limit: Number(_limit) || null
  }
}

const createSorter = (queryObject = {}) => {
  const orders = {
    asc: 'asc',
    desc: 'desc'
  }

  let { _sortBy, _order } = queryObject

  const isValidOrder = orders[_order] ? true : false
  if (!isValidOrder) _order = orders.asc

  const fields = _sortBy ? _sortBy.split('.') : null

  if (fields) {
    return [
      [...fields, _order]
    ]
  }
  return null
}

module.exports = {
  createFilter,
  createPagination,
  createSorter
}