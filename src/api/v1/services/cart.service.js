'use strict'

const lodash = require('lodash')
const { Cart, CartDetail, Product } = require('~/api/v1/models')
const { getProductById } = require('~/api/v1/repositories/product.repo')
const { getCartByCartIdProductId, deleteCartDetail, deleteCartDetailsByCartIdProductIds } = require('~/api/v1/repositories/cart.detail.repo')
const ApiError = require('~/core/api.error')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const createCart = async ({ userId }) => {
  try {
    return await Cart.create({ userId })
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)
  }
}

const getAllFullCarts = async () => {
  const fullCarts = await Cart.findAll({
    attributes: ['id', 'userId'],
    include: [
      {
        model: CartDetail,
        as: 'products',
        attributes: ['quantity'],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['name', 'description', 'imageUrl', 'price']
        }]
      }
    ]
  })

  return fullCarts
}

const getFullCartByUserId = async (userId, { filter, selector, pagination, sorter }) => {
  const gettedFields = ['id', 'name', 'description', 'imageUrl', 'price']
  lodash.remove(selector, (field) => {
    return !gettedFields.includes(field)
  })

  try {
    const fullCart = await Cart.findOne({
      where: { userId },
      attributes: ['id'],
      include: [
        {
          model: CartDetail,
          as: 'products',
          attributes: ['quantity'],
          include: [{
            model: Product,
            as: 'product',
            where: filter,
            attributes: selector?.length > 0 ? selector : gettedFields
          }],
          offset: pagination?.skip,
          limit: pagination?.limit,
          order: sorter
        }
      ]
    })
    if (!fullCart) throw new ApiError(StatusCodes.NOT_FOUND, 'No carts found')
    return fullCart
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const getFullCartById = async (id) => {
  const fullCart = await Cart.findOne({
    where: { id },
    attributes: ['id', 'userId'],
    include: [
      {
        model: CartDetail,
        as: 'products',
        attributes: ['quantity'],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'description', 'imageUrl', 'price']
        }]
      }
    ]
  })
  if (!fullCart) throw new ApiError(StatusCodes.NOT_FOUND, 'Not found cart')
  return fullCart
}

const getCart = async ({ cartId, userId }) => {
  return await Cart.findOne({
    where: { userId, id: cartId }
  })
}

const addProductToCart = async ({ userId, cartId, productId, quantity }) => {
  const foundCart = await getCart({ cartId, userId })
  if (!foundCart) throw new ApiError(StatusCodes.NOT_FOUND, 'Cart not found')

  const foundProduct = await getProductById(productId)
  if (!foundProduct) throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found')

  const foundCartDetail = await getCartByCartIdProductId({ cartId, productId })

  if (foundCartDetail) {
    const isExceedStockQuantity = foundProduct.stockQuantity < (quantity + foundCartDetail.quantity)
    if (isExceedStockQuantity) throw new ApiError(StatusCodes.BAD_REQUEST, 'Quantity in stock is not enough')
    await foundCartDetail.update({ quantity: foundCartDetail.quantity + quantity })
  } else {
    const isExceedStockQuantity = foundProduct.stockQuantity < quantity
    if (isExceedStockQuantity) throw new ApiError(StatusCodes.BAD_REQUEST, 'Quantity in stock is not enough')
    await CartDetail.create({ cartId, productId, quantity })
  }

  const fullCart = await getFullCartById(cartId)
  return {
    id: fullCart.id,
    products: fullCart.products
  }
}

const updateQuantityProduct = async({ userId, cartId, productId, quantity }) => {
  if (quantity < 0) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

  const foundCart = await getCart({ cartId, userId })
  if (!foundCart) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

  const foundProduct = await getProductById(productId)
  if (!foundProduct) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

  const foundCartDetail = await getCartByCartIdProductId({ cartId, productId })
  if (!foundCartDetail) throw new ApiError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)

  await foundCartDetail.update({ quantity })
}

const deleteProductFromCart = async ({ cartId, userId, productId }) => {
  const foundCart = await getCart({ cartId, userId })
  if (!foundCart) throw new ApiError(StatusCodes.NOT_FOUND, 'Delete product from cart failed')

  try {
    const deletedCartDetail = await deleteCartDetail({ cartId, productId })
    if (!deletedCartDetail) throw new Error('Cart not found')

    const fullCart = await getFullCartById(cartId)
    return {
      id: fullCart.id,
      products: fullCart.products
    }
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No products found in cart')
  }
}

const deleteProductsFromCart = async ({ cartId, userId, productIds }) => {
  const foundCart = await getCart({ cartId, userId })
  if (!foundCart) throw new ApiError(StatusCodes.NOT_FOUND, 'Delete product from cart failed')

  const hasDeletedCartDetail = await deleteCartDetailsByCartIdProductIds({ cartId, productIds })
  if (!hasDeletedCartDetail) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'No products found in cart')
  }

  const fullCart = await getFullCartById(cartId)
  return {
    id: fullCart.id,
    products: fullCart.products
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
  deleteProductsFromCart
}