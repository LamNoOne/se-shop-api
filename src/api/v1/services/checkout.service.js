'use strict'

const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const ApiError = require('~/core/api.error')
const cartService = require('~/api/v1/services/cart.service')
const productRepo = require('~/api/v1/repositories/product.repo')
const checkoutRepo = require('~/api/v1/repositories/checkout.repo')
const orderStatusRepo = require('~/api/v1/repositories/order.status.repo')
const orderRepo = require('~/api/v1/repositories/order.repo')
const cartRepo = require('~/api/v1/repositories/cart.repo')
const orderDetailRepo = require('~/api/v1/repositories/order.detail.repo')
const {
  OrderStatus,
  OrderDetail,
  Product,
  PaymentForm
} = require('~/api/v1/models')
const vnpayProvider = require('~/api/v1/providers/vnpay.provider')
// const { app: { paySuccessUrl, payFailUrl } } = require('~/config/environment.config')

const review = async ({ orderProducts = [] }) => {
  const checkedProducts = await checkoutRepo.checkProductsAvailable(
    orderProducts
  )
  if (checkedProducts.includes(null))
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order wrong')

  const newOrderProducts = await Promise.all(
    orderProducts.map(async (orderProduct) => {
      const { quantity, productId } = orderProduct
      // to get product price in db
      const foundProduct = await productRepo.getProductById(productId)
      if (!foundProduct) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order failed')

      const { price, id, name, description, imageUrl } = foundProduct

      return {
        quantity,
        product: { id, name, description, imageUrl, price },
        totalAmount: quantity * price
      }
    })
  )

  const totalAmount = newOrderProducts.reduce((acc, orderProduct) => {
    return acc + orderProduct.totalAmount
  }, 0)
  return {
    orderProducts: newOrderProducts,
    totalAmount
  }
}

const order = async ({
  userId,
  shipAddress,
  phoneNumber,
  paymentFormId,
  orderProduct = {}
}) => {
  const checkedProducts = await checkoutRepo.checkProductsAvailable([orderProduct])
  if (checkedProducts.includes(null)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order failed')
  }

  try {
    const newOrder = await orderRepo.createOrder({
      shipAddress,
      phoneNumber,
      userId,
      paymentFormId,
      orderStatusId: 1
    })

    // to get price of product in db
    const foundProduct = await productRepo.getProductById(orderProduct.productId)
    if (!foundProduct) {
      await newOrder.destroy()
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Order failed')
    }

    const newOrderDetail = await orderDetailRepo.createOrderDetail({
      orderId: newOrder.id,
      productId: orderProduct.productId,
      quantity: orderProduct.quantity,
      price: foundProduct.price
    })

    // reduce stock quantity when ordering
    foundProduct.update({
      stockQuantity: foundProduct.stockQuantity - orderProduct.quantity
    })

    const { quantity } = newOrderDetail
    const { price, id: productId, name, description, imageUrl } = foundProduct
    const newOrderProduct = {
      quantity,
      product: { id: productId, name, description, imageUrl, price },
      totalAmount: quantity * price
    }
    const foundOrderStatus = await orderStatusRepo.getOrderStatusById(newOrder.orderStatusId)

    return {
      orderId: newOrder.id,
      shipAddress: newOrder.shipAddress,
      phoneNumber: newOrder.phoneNumber,
      orderStatus: foundOrderStatus.name,
      orderProducts: [newOrderProduct],
      totalAmount: newOrderProduct.totalAmount
    }
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order failed')
  }
}

const orderFromCart = async ({
  cartId,
  userId,
  shipAddress,
  phoneNumber,
  paymentFormId,
  orderProducts = []
}) => {
  const foundCart = cartRepo.getCartByCartIdUserId({ cartId, userId })
  if (!foundCart) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order failed')

  const [checkedOrderProductsWithCart, checkedProducts] = await Promise.all([
    checkoutRepo.checkOrderProductsWithCart(cartId, userId, orderProducts),
    checkoutRepo.checkProductsAvailable(orderProducts)
  ])

  if (checkedOrderProductsWithCart.includes(null) || checkedProducts.includes(null)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order failed')
  }

  try {
    const newOrder = await orderRepo.createOrder({
      shipAddress,
      phoneNumber,
      userId,
      paymentFormId,
      orderStatusId: 1
    })

    const newOrderProducts = await Promise.all(
      orderProducts.map(async (orderProduct) => {
        // to get product price in db
        const foundProduct = await productRepo.getProductById(
          orderProduct.productId
        )
        if (!foundProduct) {
          await newOrder.destroy()
          throw new ApiError(StatusCodes.BAD_REQUEST, 'Order failed')
        }

        const newOrderDetail = await orderDetailRepo.createOrderDetail({
          orderId: newOrder.id,
          productId: orderProduct.productId,
          quantity: orderProduct.quantity,
          price: foundProduct.price
        })

        // reduce stock quantity when ordering
        foundProduct.update({
          stockQuantity: foundProduct.stockQuantity - orderProduct.quantity
        })

        const { quantity } = newOrderDetail
        const { price, id, name, description, imageUrl } = foundProduct

        return {
          quantity,
          product: { id, name, description, imageUrl, price },
          totalAmount: quantity * price
        }
      })
    )

    // delete ordered products in cart
    const deleteProductFromCartPromises = orderProducts.map(async (orderProduct) => {
      return cartService.deleteProductFromCart({
        cartId,
        productId: orderProduct.productId,
        userId
      })
    })
    await Promise.all(deleteProductFromCartPromises)

    const foundOrderStatus = await orderStatusRepo.getOrderStatusById(newOrder.orderStatusId)
    const totalOrderAmount = newOrderProducts.reduce((acc, orderProduct) => {
      return acc + orderProduct.totalAmount
    }, 0)

    return {
      orderId: newOrder.id,
      shipAddress: newOrder.shipAddress,
      phoneNumber: newOrder.phoneNumber,
      orderStatus: foundOrderStatus.name,
      orderProducts: newOrderProducts,
      totalAmount: totalOrderAmount
    }
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Order failed')
  }
}

const getAllOrder = async (userId, { filter, selector, pagination, sorter }) => {
  return await orderRepo.getAllOrdersForCustomer(userId, { filter, selector, pagination, sorter })
}

const cancelOrder = async ({ userId, orderId }) => {
  const fullOrder = await orderRepo.getOrderWithQuery({
    where: { userId, id: orderId },
    include: [
      {
        model: OrderStatus,
        as: 'orderStatus',
        attributes: ['name']
      }
    ]
  })
  if (!fullOrder) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found')
  const isCancelled = fullOrder.orderStatus.name === 'Pending'
  if (!isCancelled) throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot cancel order')

  const deletedOrderDetails = await orderDetailRepo.deleteOrderDetailByOrderId(fullOrder.id)
  await orderRepo.deleteOrder({ userId, orderId })

  // undo stock quantity
  const updateProductByIdPromises = deletedOrderDetails.map(async (deletedOrderDetail) => {
    const { productId, quantity } = deletedOrderDetail
    return await productRepo.increaseStockQuantiy(productId, quantity)
  })
  await Promise.all(updateProductByIdPromises)
}

const getOrder = async ({ userId, orderId }) => {
  const fullOrder = await orderRepo.getOrderWithQuery({
    where: { userId, id: orderId },
    attributes: {
      exclude: ['orderStatusId', 'paymentFormId', 'userId']
    },
    include: [
      {
        model: PaymentForm,
        as: 'paymentForm',
        attributes: ['id', 'name']
      },
      {
        model: OrderStatus,
        as: 'orderStatus',
        attributes: ['id', 'name']
      },
      {
        model: OrderDetail,
        as: 'products',
        attributes: {
          exclude: ['orderId', 'productId', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'description', 'imageUrl']
          }
        ]
      }
    ]
  })
  if (!fullOrder) throw new ApiError(StatusCodes.BAD_REQUEST, 'Order not found')
  return fullOrder
}

const createPaymentUrl = async ({ userId, ipAddr, bankCode, orderId }) => {
  const fullOrder = await getOrder({ userId, orderId })

  const isPayable =
    fullOrder.orderStatus.name === 'Pending' &&
    fullOrder.paymentForm.name === 'Online'
  if (!isPayable)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'The order cannot be paid')

  const amount = fullOrder.products.reduce((acc, product) => {
    return acc + product.quantity * product.price
  }, 0)

  const paymentUrl = vnpayProvider.createPaymentUrl({
    ipAddr,
    bankCode,
    orderId,
    amount,
    orderInfo: `Thanh toan cho::: Ma DH: ${orderId} - Ma KH: ${userId}`,
  })
  return paymentUrl
}

const checkPay = async (paramsObject) => {
  const isSuccess = vnpayProvider.checkPay(paramsObject)
  if (!isSuccess) return false

  const orderId = paramsObject['vnp_TxnRef']

  const foundOrder = await orderRepo.getOrderWithQuery({
    where: { id: orderId }
  })
  if (!foundOrder) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

  const foundOrderStatus = await orderStatusRepo.getOrderStatusByName('Paid')
  if (!foundOrderStatus) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR)

  await foundOrder.update({ orderStatusId: foundOrderStatus.id })

  return true
}

module.exports = {
  review,
  order,
  orderFromCart,
  getAllOrder,
  cancelOrder,
  getOrder,
  createPaymentUrl,
  checkPay
}
