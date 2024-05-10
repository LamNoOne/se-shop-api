"use strict"

const lodash = require("lodash")
const { Product, Category } = require("~/api/v2/models")
const productRepo = require("~/api/v2/repositories/product.repo")
const ApiError = require("~/core/api.error")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const createProduct = async (reqBody = {}) => {
    try {
        const keys = Object.keys(reqBody)
        keys.forEach((key) => {
            if (reqBody[key] === "undefined") {
                reqBody[key] = null
            }
        })
        return await Product.create(reqBody)
    } catch (error) {
        console.log(error)
        throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
    }
}

const getAllProducts = async ({ filter, selector, pagination, sorter }) => {
    const bannedFields = ["categoryId"]
    lodash.remove(selector, (field) => {
        return bannedFields.includes(field)
    })

    try {
        return await Product.findAll({
            where: filter,
            attributes: selector?.length > 0 ? selector : {},
            offset: pagination?.skip,
            limit: pagination?.limit,
            order: sorter,
        })
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
    }
}

const getProductById = async (id = "") => {
    const product = await Product.findByPk(id)
    if (!product) throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
    return product
}

const updateProductById = async (id = "", reqBody = {}) => {
    const numberUpdated = await productRepo.updateProductById(id, reqBody)
    if (numberUpdated === 0)
        throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
}

const increaseStockQuantiy = async (id = "", reqBody = {}) => {
    const { quantity } = reqBody
    if (quantity < 0)
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Increase stock quantity of product failed"
        )
    const numberUpdated = await productRepo.increaseStockQuantiy(id, quantity)
    if (numberUpdated === 0)
        throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
}

const decreaseStockQuantiy = async (id = "", reqBody = {}) => {
    const { quantity } = reqBody
    if (quantity < 0)
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Increase stock quantity of product failed"
        )
    const numberUpdated = await productRepo.decreaseStockQuantiy(id, quantity)
    if (numberUpdated === 0)
        throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
}

const deleteProductById = async (id) => {
    const product = await Product.findByPk(id)
    if (!product) throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
    const { dataValues } = await product.destroy()
    if (!dataValues)
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
        )
}

const deleteProductByIds = async (ids = []) => {
    const numberDeletedItems = await Product.destroy({
        where: { id: ids },
    })
    const NO_ITEMS_DELETEDS = 0
    if (numberDeletedItems === NO_ITEMS_DELETEDS)
        throw new ApiError(StatusCodes.BAD_REQUEST, "No products are deleted")
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    increaseStockQuantiy,
    decreaseStockQuantiy,
    deleteProductById,
    deleteProductByIds,
}
