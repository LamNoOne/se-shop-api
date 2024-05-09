'use strict'

const { CartDetail } = require('~/api/v2/models')

const getCartByCartIdProductId = async ({ cartId, productId }) => {
  return await CartDetail.findOne({
    where: { cartId, productId }
  })
}

const deleteCartDetail = async ({ cartId, productId }) => {
  const foundCartDetail = await CartDetail.findOne({
    where: { cartId, productId }
  })
  if (!foundCartDetail) return null
  return await foundCartDetail.destroy()
}

const deleteCartDetailsByCartIdProductIds= async ({ cartId, productIds }) => {
  const numberDeletedItems = await CartDetail.destroy({
    where: { cartId, productId: productIds }
  })
  const NO_ITEMS_DELETEDS = 0
  if (numberDeletedItems === NO_ITEMS_DELETEDS) return false
  return true
}

module.exports = {
  getCartByCartIdProductId,
  deleteCartDetail,
  deleteCartDetailsByCartIdProductIds
}