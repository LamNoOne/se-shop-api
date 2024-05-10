"use strict"

const { REQUEST_HEADER_KEYS } = require("../config/constants.config")
const API_VERSIONS = require("~/config/apiVersions")
const ApiError = require("~/core/api.error")
const { StatusCodes } = require("http-status-codes")

const redirectApiVersion = (req, res, next) => {
    if (!req.headers[REQUEST_HEADER_KEYS.apiVersion]) {
        req.headers[REQUEST_HEADER_KEYS.apiVersion] = 1
    }
    const apiVersion = req.headers[REQUEST_HEADER_KEYS.apiVersion]
    if (!API_VERSIONS[apiVersion]) {
        next(new ApiError(StatusCodes.NOT_FOUND, "API version mismatch"))
        return
    }
    API_VERSIONS[apiVersion](req, res, next)
}

module.exports = redirectApiVersion
