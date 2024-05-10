"use strict"

const { StatusCodes } = require("http-status-codes")
const { WishListDetail, Product } = require("~/api/v2/models")
const ApiError = require("~/core/api.error")

const createWishListDetail = async ({ wishListId, productId }) => {
    try {
        return await WishListDetail.create({ wishListId, productId })
    } catch (error) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Create wish list detail failed"
        )
    }
}

const getWishListDetails = async (
    { wishListId },
    { filter, selector, pagination, sorter }
) => {
    try {
        const allowedFields = ["id", "name", "description", "imageUrl", "price"]

        const wishListDetails = await WishListDetail.findAll({
            include: [
                {
                    model: Product,
                    as: "product",
                    attributes: allowedFields,
                    where: filter,
                },
            ],
            offset: pagination.skip,
            limit: pagination.limit,
            where: { wishListId },
            raw: true,
            nest: true,
        })
        return wishListDetails.map((wishListDetail) => {
            return { ...wishListDetail.product }
        })
    } catch (error) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            "Get wish list details failed"
        )
    }
}

const deleteWishListDetail = async ({ wishListId = "", productId = "" }) => {
    try {
        const numberDeleted = await WishListDetail.destroy({
            where: { wishListId, productId },
        })
        if (numberDeleted === 0)
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                "Product in wishlist not found"
            )
        return numberDeleted
    } catch (error) {
        if (!error.statusCode) {
            error.message = "Delete product from wishlist failed"
        }
        throw error
    }
}

module.exports = {
    createWishListDetail,
    getWishListDetails,
    deleteWishListDetail,
}
