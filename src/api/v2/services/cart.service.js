"use strict"

const lodash = require("lodash")
const { Cart, CartDetail, Product } = require("~/api/v2/models")
const { getProductById } = require("~/api/v2/repositories/product.repo")
const {
    getCartByCartIdProductId,
    deleteCartDetail,
    deleteCartDetailsByCartIdProductIds,
} = require("~/api/v2/repositories/cart.detail.repo")
const ApiError = require("~/core/api.error")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const getSelectedProductsCart = async ({ userId, productIds }) => {
    // productIds is an array of product id
    const foundCart = await getCart({ userId })
    if (!foundCart) throw new ApiError(StatusCodes.NOT_FOUND, "Cart not found")
    const cartId = foundCart.id

    let selectedProducts = await Promise.all(
        productIds.map(async (productId) => {
            const foundProduct = await getProductById(productId)
            if (!foundProduct)
                throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")

            const foundCartDetail = await getCartByCartIdProductId({
                cartId,
                productId,
            })
            if (!foundCartDetail) return null

            return {
                quantity: foundCartDetail.quantity,
                product: {
                    id: foundProduct.id,
                    name: foundProduct.name,
                    description: foundProduct.description,
                    imageUrl: foundProduct.imageUrl,
                    price: foundProduct.price,
                },
            }
        })
    )
    selectedProducts = selectedProducts.filter((product) => product !== null)
    
    return {
        id: foundCart.id,
        total: selectedProducts.length,
        products: selectedProducts,
    }
}

const createCart = async ({ userId }) => {
    try {
        return await Cart.create({ userId })
    } catch (error) {
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR
        )
    }
}

const getAllFullCarts = async () => {
    const fullCarts = await Cart.findAll({
        attributes: ["id", "userId"],
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

    return fullCarts
}

const getFullCartByUserId = async (
    userId,
    { filter, selector, pagination, sorter }
) => {
    const gettedFields = ["id", "name", "description", "imageUrl", "price"]
    lodash.remove(selector, (field) => {
        return !gettedFields.includes(field)
    })

    try {
        const fullCart = await Cart.findOne({
            where: { userId },
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
                            where: filter,
                            attributes:
                                selector?.length > 0 ? selector : gettedFields,
                        },
                    ],
                    offset: pagination?.skip,
                    limit: pagination?.limit,
                    order: sorter,
                },
            ],
        })
        if (!fullCart)
            throw new ApiError(StatusCodes.NOT_FOUND, "No carts found")
        return {
            id: fullCart.id,
            total: fullCart.products.length,
            products: fullCart.products,
        }
    } catch (error) {
        throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
    }
}

const getFullCartById = async (id) => {
    const fullCart = await Cart.findOne({
        where: { id },
        attributes: ["id", "userId"],
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
    if (!fullCart) throw new ApiError(StatusCodes.NOT_FOUND, "Not found cart")
    return fullCart
}

const getCart = async ({ userId }) => {
    return await Cart.findOne({
        where: { userId },
    })
}

const addProductToCart = async ({ userId, productId, quantity }) => {
    const foundCart = await getCart({ userId })
    if (!foundCart) throw new ApiError(StatusCodes.NOT_FOUND, "Cart not found")

    const foundProduct = await getProductById(productId)
    if (!foundProduct)
        throw new ApiError(StatusCodes.NOT_FOUND, "Product not found")

    const cartId = foundCart.id
    const foundCartDetail = await getCartByCartIdProductId({
        cartId,
        productId,
    })

    if (foundCartDetail) {
        const isExceedStockQuantity =
            foundProduct.stockQuantity < quantity + foundCartDetail.quantity
        if (isExceedStockQuantity)
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Quantity in stock is not enough"
            )
        await foundCartDetail.update({
            quantity: foundCartDetail.quantity + quantity,
        })
    } else {
        const isExceedStockQuantity = foundProduct.stockQuantity < quantity
        if (isExceedStockQuantity)
            throw new ApiError(
                StatusCodes.BAD_REQUEST,
                "Quantity in stock is not enough"
            )
        await CartDetail.create({ cartId, productId, quantity })
    }

    const fullCart = await getFullCartById(cartId)
    return {
        id: fullCart.id,
        total: fullCart.products.length,
        products: fullCart.products,
    }
}

const updateQuantityProduct = async ({ userId, productId, quantity }) => {
    if (quantity < 0)
        throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

    const foundCart = await getCart({ userId })
    if (!foundCart)
        throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

    const cartId = foundCart.id
    const foundProduct = await getProductById(productId)
    if (!foundProduct)
        throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

    const foundCartDetail = await getCartByCartIdProductId({
        cartId,
        productId,
    })
    if (!foundCartDetail)
        throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

    await foundCartDetail.update({ quantity })

    const fullCart = await getFullCartById(cartId)
    return {
        id: fullCart.id,
        total: fullCart.products.length,
        products: fullCart.products,
    }
}

const deleteProductFromCart = async ({ userId, productId }) => {
    const foundCart = await getCart({ userId })
    if (!foundCart)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "Delete product from cart failed"
        )

    const cartId = foundCart.id
    try {
        const deletedCartDetail = await deleteCartDetail({ cartId, productId })
        if (!deletedCartDetail) throw new Error("Cart not found")

        const fullCart = await getFullCartById(cartId)
        return {
            id: fullCart.id,
            total: fullCart.products.length,
            products: fullCart.products,
        }
    } catch (error) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No products found in cart")
    }
}

const deleteProductsFromCart = async ({ userId, productIds }) => {
    const foundCart = await getCart({ userId })
    if (!foundCart)
        throw new ApiError(
            StatusCodes.NOT_FOUND,
            "Delete product from cart failed"
        )

    const cartId = foundCart.id
    const hasDeletedCartDetail = await deleteCartDetailsByCartIdProductIds({
        cartId,
        productIds,
    })
    if (!hasDeletedCartDetail) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No products found in cart")
    }

    const fullCart = await getFullCartById(cartId)
    return {
        id: fullCart.id,
        total: fullCart.products.length,
        products: fullCart.products,
    }
}

module.exports = {
    createCart,
    getFullCartById,
    getFullCartByUserId,
    getAllFullCarts,
    addProductToCart,
    updateQuantityProduct,
    deleteProductFromCart,
    deleteProductsFromCart,
    getSelectedProductsCart,
}
