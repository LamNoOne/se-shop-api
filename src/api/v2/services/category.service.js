'use strict'

const _ = require('lodash')
const { Category, Product } = require('~/api/v2/models')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createCategory = async ({ name, description }) => {
  try {
    return await Category.create({ name, description })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
  }
}

const getAllCategories = async ({ filter, selector, pagination, sorter }) => {
  try {
    return await Category.findAll({
      where: filter,
      attributes: selector,
      offset: pagination.skip,
      limit: pagination.limit,
      order: sorter
    })
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const getProductsByCategoryId = async ({ categoryId, filter, selector, pagination, sorter }) => {
  const unselectItems = ['createdAt', 'updatedAt', 'categoryId']
  _.remove(selector, (select) => {
    return unselectItems.includes(select)
  })

  const products = await Category.findOne({
    where: {
      id: categoryId,
      ...filter
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        model: Product,
        as: 'products',
        attributes: selector || ['id', 'name', 'description', 'imageUrl', 'price', 'stockQuantity'],
        offset: pagination?.skip,
        limit: pagination?.limit,
        order: sorter
      }
    ]
  })
  if (!products) throw new ApiError(StatusCodes.NOT_FOUND, 'Not found products')

  return products
}

const getCategoryById = async ({ id }) => {
  const category = await Category.findByPk(id)
  if (!category) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return category
}

const updateCategoryById = async ({ id, name, description }) => {
  const category = await Category.findOne({
    where: { id }
  })
  if (!category) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
  return await category.update({ name, description })
}

const deleteCategoryById = async ({ id }) => {
  try {
    const category = await Category.findOne({
      where: { id }
    })
    if (!category) throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found')
    return await category.destroy()
  } catch (error) {
    console.log(error);
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Delete category failed')
  }
}

const deleteCategoryByIds = async ({ ids }) => {
  const numberDeletedItems = await Category.destroy({
    where: { id: ids }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) throw new ApiError(StatusCodes.BAD_REQUEST, 'No items are deleted')
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  deleteCategoryByIds,
  getProductsByCategoryId
}