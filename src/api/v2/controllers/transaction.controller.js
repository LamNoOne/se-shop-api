const SuccessResponse = require("~/core/success.response")
const asyncHandling = require("~/core/async.handling")
const orderService = require("~/api/v2/services/order.service")
const transactionService = require("~/api/v2/services/transaction.service")
const gateway = require("~/config/braintree.config")

const getTransaction = asyncHandling(async (req, res) => {
    const { transactionId } = req.query
    const order = await orderService.getOrderByTransaction(transactionId)

    const stream = gateway.transaction.search(
        (search) => {
            search.id().is(transactionId)
        },
        (err, response) => {
            response.each((err, transaction) => {
                new SuccessResponse({
                    message: "Get transaction successfully",
                    metadata: {
                        transaction: {
                            id: transaction.id,
                            status: transaction.status,
                            type: transaction.type,
                            amount: transaction.amount,
                            amountRequested: transaction.amountRequested,
                            merchantAccountId: transaction.merchantAccountId,
                            orderId: transaction.orderId,
                            last4: transaction.androidPayCard.last4,
                            cardType: transaction.androidPayCard.cardType,
                            customer: transaction.customer,
                            billing: transaction.billing,
                            shipping: transaction.shipping,
                            createdAt: transaction.createdAt,
                            updatedAt: transaction.updatedAt,
                        },
                        order
                    },
                }).send(res)
            })
        }
    )
})

const createTransaction = asyncHandling(async (req, res) => {
    const userId = req?.user?.id || null
    const { orderId, nonce } = req.body
    const result = await transactionService.createTransaction({
        userId,
        orderId,
        nonce,
    })
    new SuccessResponse({
        message: "Pay with google completed",
        metadata: result,
    }).send(res)
})

module.exports = {
    getTransaction,
    createTransaction,
}
