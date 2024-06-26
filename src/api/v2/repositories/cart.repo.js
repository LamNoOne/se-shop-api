"use strict"

const { Cart, CartDetail, Product } = require("~/api/v2/models")
const cartDetailRepo = require("~/api/v2/repositories/cart.detail.repo")
const cartService = require("~/api/v2/services/cart.service")

const getFullCartByProductIds = async ({ cartId, userId, productIds = [] }) => {
    return await Cart.findOne({
        where: { userId, id: cartId },
        attributes: ["id"],
        include: [
            {
                model: CartDetail,
                as: "products",
                attributes: ["quantity"],
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: [
                            "id",
                            "name",
                            "description",
                            "imageUrl",
                            "price",
                        ],
                        where: { id: productIds },
                    },
                ],
            },
        ],
    })
}

const getFullCart = async ({ cartId, userId }) => {
    return await Cart.findOne({
        where: { userId, id: cartId },
        attributes: ["id"],
        include: [
            {
                model: CartDetail,
                as: "products",
                attributes: ["quantity"],
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: [
                            "id",
                            "name",
                            "description",
                            "imageUrl",
                            "price",
                        ],
                    },
                ],
            },
        ],
    })
}

const deleteCartByUserId = async (userId) => {
    const foundCart = await Cart.findOne({
        where: { userId },
    })
    if (!foundCart) return null
    await foundCart.destroy({ force: true })
}

const getCartByUserId = async ({ userId = "" }) => {
    return await Cart.findOne({
        where: { userId: userId },
    })
}

module.exports = {
    getFullCartByProductIds,
    getFullCart,
    deleteCartByUserId,
    getCartByUserId,
}
