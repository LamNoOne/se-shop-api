"use strict"

const { StatusCodes } = require("http-status-codes")
const { Product } = require("~/api/v2/models")
const ApiError = require("~/core/api.error")

const getProductById = async (id = null) => {
    try {
        const foundProduct = await Product.findOne({
            where: { id },
        })
        if (!foundProduct)
            throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")
        return foundProduct
    } catch (error) {
        if (!error.statusCode)
            throw new ApiError(StatusCodes.BAD_REQUEST, "Get product failed")
        throw error
    }
}

const getProductsByIds = async (ids = []) => {
    return await Product.findAll({
        where: { id: ids },
    })
}

const updateProductById = async (id, payload = {}) => {
    try {
        const [numberUpdated] = await Product.update(payload, {
            where: { id },
        })
        return numberUpdated
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Update product failed")
    }
}

const increaseStockQuantiy = async (id, quantity = 0) => {
    try {
        const [[, numberUpdated]] = await Product.increment(
            {
                stockQuantity: quantity,
            },
            {
                where: { id: id },
            }
        )
        return numberUpdated
    } catch (error) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Increase stock quantity of product failed"
        )
    }
}

const decreaseStockQuantiy = async (id, quantity = 0) => {
    try {
        const result = await Product.decrement(
            {
                stockQuantity: quantity,
            },
            {
                where: { id: id },
            }
        )
        const numberUpdated = result[0][1]
        return numberUpdated
    } catch (error) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Decrease stock quantity of product failed"
        )
    }
}

module.exports = {
    getProductById,
    getProductsByIds,
    updateProductById,
    increaseStockQuantiy,
    decreaseStockQuantiy,
}
