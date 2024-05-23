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
    orderProducts = []
) => {
    return await Promise.all(
        orderProducts.map(async (productId) => {
            const foundCartDetail =
                await cartDetailRepo.getCartByCartIdProductId({
                    productId,
                    cartId,
                })
            if (!foundCartDetail) {
                return null
            }

            return {
                quantity: foundCartDetail.quantity,
                productId: foundCartDetail.productId,
            }
        })
    )
}

module.exports = {
    checkProductsAvailable,
    checkOrderProductsWithCart,
}
