"use strict"
const { v4: uuidv4 } = require("uuid");
const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const ApiError = require("~/core/api.error")
const { getOrder } = require("~/api/v2/services/checkout.service")
const gateway = require("~/config/braintree.config")
const { Order } = require("~/api/v2/models");
const { ORDER_STATUS, TRANSACTION } = require("../utils/constants");

const createTransaction = async ({ userId, orderId, nonce }) => {
    const orderCheckout = await getOrder({ userId, orderId })
    if (!orderCheckout) {
        throw new ApiError({
            status: StatusCodes.NOT_FOUND,
            message: ReasonPhrases.NOT_FOUND,
        })
    }

    if (orderCheckout.orderStatus != ORDER_STATUS.PENDING) {
        throw new ApiError({
            status: StatusCodes.BAD_REQUEST,
            message: "Order can not be paid",
        })
    }

    const {
        firstName,
        lastName,
        phoneNumber,
        email,
        shipAddress,
        postalCode,
        region,
        countryName,
        totalAmount,
    } = orderCheckout

    const { success, transaction, message } = await gateway.transaction.sale({
        amount: totalAmount,
        paymentMethodNonce: nonce,
        orderId: uuidv4(),
        options: {
            submitForSettlement: true,
        },
        customer: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phoneNumber,
        },
        billing: {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            postalCode: postalCode || TRANSACTION.POSTAL_CODE_DEFAULT,
            region: region || TRANSACTION.REGION_DEFAULT,
            countryName: countryName || TRANSACTION.COUNTRY_DEFAULT,
            streetAddress: shipAddress,
        },
        shipping: {
            countryName: countryName || TRANSACTION.COUNTRY_DEFAULT,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            postalCode: postalCode || TRANSACTION.POSTAL_CODE_DEFAULT,
            region: region || TRANSACTION.REGION_DEFAULT,
            streetAddress: shipAddress,
        },
    })

    if (success) {
        const foundOrder = await Order.findOne({
            where: { id: orderId },
        })
        await foundOrder.update({
            orderStatusId: 2,
            transactionId: transaction.id,
        })

        return {
            success,
            transaction: {
                id: transaction.id,
                status: transaction.status,
                orderId: transaction.orderId,
            },
        }
    }

    return {
        success,
        message,
    }
}

const getTransaction = async ({ transactionId }) => {}

module.exports = {
    createTransaction,
    getTransaction,
}
