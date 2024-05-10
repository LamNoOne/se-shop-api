"use strict"

const { StatusCodes, ReasonPhrases } = require("http-status-codes")

class ApiError extends Error {
    constructor(
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
        message = ReasonPhrases.INTERNAL_SERVER_ERROR
    ) {
        super(message)
        this.name = "ApiError"
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ApiError
