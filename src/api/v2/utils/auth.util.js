"use strict"

const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const {
    app: { accessTokenExpires, refreshTokenExpires, resetTokenExpires },
} = require("~/config/environment.config")
const ApiError = require("~/core/api.error")
const { StatusCodes, ReasonPhrases } = require("http-status-codes")

const createKeyPairRsa = () => {
    return crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    })
}

const createTokenPair = ({ payload, privateKey }) => {
    const accessToken = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: accessTokenExpires,
    })

    const refreshToken = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: refreshTokenExpires,
    })

    return { accessToken, refreshToken }
}

const verifyToken = ({ token, publicKey }) => {
    return jwt.verify(token, publicKey)
}

const createResetToken = ({ payload, privateKey }) => {
    return jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: resetTokenExpires,
    })
}

const getToken = (req) => {
    const authHeader = req.header("Authorization")
    if (!authHeader?.startsWith("Bearer "))
        throw new ApiError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)

    const tokenParts = authHeader.split(" ")
    const token = tokenParts[1]
    return token
}

module.exports = {
    createKeyPairRsa,
    createTokenPair,
    verifyToken,
    createResetToken,
    getToken
}
