"use strict"

const { StatusCodes } = require("http-status-codes")
const ErrorResponse = require("~/core/error.response")
const { nodeEnv } = require("~/config/environment.config")
const { NODE_ENV_DEV } = require("~/config/constants.config")

// eslint-disable-next-line no-unused-vars
const errorHandling = (error, req, res, next) => {
    if (!error.statusCode) error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

    const errorResponse = new ErrorResponse({
        statusCode: error.statusCode,
        message: error.message,
        stack: error.stack,
    })

    if (nodeEnv !== NODE_ENV_DEV) delete errorResponse.stack

    // write error Log to file,
    // shoot error message to Slack group, Telegram, Email...

    errorResponse.send(res)
}

module.exports = errorHandling
