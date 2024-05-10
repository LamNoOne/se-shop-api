"use strict"

require("dotenv").config()

const {
    NODE_ENV_DEV,
    DEV_APP_HOST_DEFAULT,
    DEV_APP_PORT_DEFAULT,
    DEV_SALT_ROUNDS_DEFAULT,
    DEV_ACCESS_TOKEN_EXPIRES_DEFAULT,
    DEV_REFRESH_TOKEN_EXPIRES_DEFAULT,
    DEV_DB_HOST_DEFAULT,
    DEV_DB_PORT_DEFAULT,
    DEV_DB_NAME_DEFAULT,
    DEV_DB_USERNAME_DEFAULT,
    DEV_DB_PASSWORD_DEFAULT,
    DEV_COOKIE_AT_MAX_AGE_DEFAULT,
    DEV_COOKIE_RT_MAX_AGE_DEFAULT,
    PROD_APP_HOST_DEFAULT,
    PROD_APP_PORT_DEFAULT,
    PROD_SALT_ROUNDS_DEFAULT,
    PROD_ACCESS_TOKEN_EXPIRES_DEFAULT,
    PROD_REFRESH_TOKEN_EXPIRES_DEFAULT,
    PROD_COOKIE_AT_MAX_AGE_DEFAULT,
    PROD_COOKIE_RT_MAX_AGE_DEFAULT,
    PROD_DB_HOST_DEFAULT,
    PROD_DB_PORT_DEFAULT,
    PROD_DB_NAME_DEFAULT,
    PROD_DB_USERNAME_DEFAULT,
    PROD_DB_PASSWORD_DEFAULT,
} = require("./constants.config")

const {
    NODE_ENV,
    APP_PROTOCOL,
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE_NAME,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    SALT_ROUNDS,
    ACCESS_TOKEN_EXPIRES,
    REFRESH_TOKEN_EXPIRES,
    COOKIE_AT_MAX_AGE,
    COOKIE_RT_MAX_AGE,
    EMAIL_NAME,
    EMAIL_APP_PASSWORD,
    RESET_TOKEN_EXPIRES,
    VNP_TMNCODE,
    VNP_HASHSECRET,
    VNP_URL,
    VNP_API,
    VNP_RETURNURL,
    PAY_SUCCESS_URL,
    PAY_FAIL_URL,
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    SECRET_KEY_ADMIN,
} = process.env

const development = {
    nodeEnv: NODE_ENV,
    app: {
        protocol: APP_PROTOCOL || "http",
        host: APP_HOST || DEV_APP_HOST_DEFAULT,
        port: APP_PORT || DEV_APP_PORT_DEFAULT,
        saltRounds: Number(SALT_ROUNDS) || DEV_SALT_ROUNDS_DEFAULT,
        accessTokenExpires:
            ACCESS_TOKEN_EXPIRES || DEV_ACCESS_TOKEN_EXPIRES_DEFAULT,
        refreshTokenExpires:
            REFRESH_TOKEN_EXPIRES || DEV_REFRESH_TOKEN_EXPIRES_DEFAULT,
        cookieATMaxAge: COOKIE_AT_MAX_AGE || DEV_COOKIE_AT_MAX_AGE_DEFAULT,
        cookieRTMaxAge: COOKIE_RT_MAX_AGE || DEV_COOKIE_RT_MAX_AGE_DEFAULT,
        emailName: EMAIL_NAME || "",
        emailAppPassword: EMAIL_APP_PASSWORD || "",
        resetTokenExpires: RESET_TOKEN_EXPIRES || "10m",
        paySuccessUrl: PAY_SUCCESS_URL || "",
        payFailUrl: PAY_FAIL_URL || "",
        secretKeyAdmin: SECRET_KEY_ADMIN,
    },
    mysql: {
        host: MYSQL_HOST || DEV_DB_HOST_DEFAULT,
        port: MYSQL_PORT || DEV_DB_PORT_DEFAULT,
        databaseName: MYSQL_DATABASE_NAME || DEV_DB_NAME_DEFAULT,
        username: MYSQL_USERNAME || DEV_DB_USERNAME_DEFAULT,
        password: MYSQL_PASSWORD || DEV_DB_PASSWORD_DEFAULT,
    },
    payments: {
        vnpay: {
            tmnCode: VNP_TMNCODE,
            hashSecret: VNP_HASHSECRET,
            url: VNP_URL,
            api: VNP_API,
            returnUrl: VNP_RETURNURL,
        },
    },
    clouds: {
        cloudinary: {
            name: CLOUDINARY_NAME || "",
            apiKey: CLOUDINARY_API_KEY || "",
            apiSecret: CLOUDINARY_API_SECRET || "",
        },
    },
}

const production = {
    nodeEnv: NODE_ENV,
    app: {
        protocol: APP_PROTOCOL || "http",
        host: APP_HOST || PROD_APP_HOST_DEFAULT,
        port: APP_PORT || PROD_APP_PORT_DEFAULT,
        saltRounds: Number(SALT_ROUNDS) || PROD_SALT_ROUNDS_DEFAULT,
        accessTokenExpires:
            ACCESS_TOKEN_EXPIRES || PROD_ACCESS_TOKEN_EXPIRES_DEFAULT,
        refreshTokenExpires:
            REFRESH_TOKEN_EXPIRES || PROD_REFRESH_TOKEN_EXPIRES_DEFAULT,
        cookieATMaxAge: COOKIE_AT_MAX_AGE || PROD_COOKIE_AT_MAX_AGE_DEFAULT,
        cookieRTMaxAge: COOKIE_RT_MAX_AGE || PROD_COOKIE_RT_MAX_AGE_DEFAULT,
        emailName: EMAIL_NAME || "",
        emailAppPassword: EMAIL_APP_PASSWORD || "",
        resetTokenExpires: RESET_TOKEN_EXPIRES || "10m",
        paySuccessUrl: PAY_SUCCESS_URL || "",
        payFailUrl: PAY_FAIL_URL || "",
        secretKeyAdmin: SECRET_KEY_ADMIN,
    },
    mysql: {
        host: MYSQL_HOST || PROD_DB_HOST_DEFAULT,
        port: MYSQL_PORT || PROD_DB_PORT_DEFAULT,
        databaseName: MYSQL_DATABASE_NAME || PROD_DB_NAME_DEFAULT,
        username: MYSQL_USERNAME || PROD_DB_USERNAME_DEFAULT,
        password: MYSQL_PASSWORD || PROD_DB_PASSWORD_DEFAULT,
    },
    payments: {
        vnpay: {
            tmnCode: VNP_TMNCODE,
            hashSecret: VNP_HASHSECRET,
            url: VNP_URL,
            api: VNP_API,
            returnUrl: VNP_RETURNURL,
        },
    },
    clouds: {
        cloudinary: {
            name: CLOUDINARY_NAME || "",
            apiKey: CLOUDINARY_API_KEY || "",
            apiSecret: CLOUDINARY_API_SECRET || "",
        },
    },
}

const envConfigs = {
    development,
    production,
}

const envConfig = envConfigs[NODE_ENV] || envConfigs[NODE_ENV_DEV]

module.exports = envConfig
