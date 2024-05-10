"use strict"

const productRepo = require("~/api/v2/repositories/product.repo")
const cartDetailRepo = require("~/api/v2/repositories/cart.detail.repo")

const checkProductsAvailable = async (orderProducts = []) => {
    return await Promise.all(
        orderProducts.map(async (orderProduct) => {
            const foundProduct = await productRepo.getProductById(
                orderProduct.productId
            )
            if (!foundProduct) return null
            const isEnough = orderProduct.quantity <= foundProduct.stockQuantity
            if (isEnough) {
                return {
                    price: foundProduct.price,
                    quantity: orderProduct.quantity,
                    productId: foundProduct.id,
                }
            }
        })
    )
}

const checkOrderProductsWithCart = async (
    cartId,
    userId,
    orderProducts = []
) => {
    return await Promise.all(
        orderProducts.map(async (orderProduct) => {
            const foundCartDetail =
                await cartDetailRepo.getCartByCartIdProductId({
                    productId: orderProduct.productId,
                    cartId,
                })
            if (!foundCartDetail) {
                return null
            }

            const isMathQuantity =
                orderProduct.quantity === foundCartDetail.quantity

            if (!isMathQuantity) return null

            return {
                quantity: orderProduct.quantity,
                productId: foundCartDetail.productId,
            }
        })
    )
}

module.exports = {
    checkProductsAvailable,
    checkOrderProductsWithCart,
}
