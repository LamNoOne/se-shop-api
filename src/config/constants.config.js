const v1Router = require('~/api/v1/routes')

module.exports = {
  NODE_ENV_PROD: 'production',
  NODE_ENV_DEV: 'development',
  DEV_APP_HOST_DEFAULT: 'localhost',
  DEV_APP_PORT_DEFAULT: 3055,
  DEV_ACCESS_TOKEN_EXPIRES_DEFAULT: '1d',
  DEV_REFRESH_TOKEN_EXPIRES_DEFAULT: '90d',
  DEV_DB_HOST_DEFAULT: 'localhost',
  DEV_DB_PORT_DEFAULT: '3306',
  DEV_DB_NAME_DEFAULT: 'DEVELOPMENT_DATABASE',
  DEV_DB_USERNAME_DEFAULT: 'root',
  DEV_DB_PASSWORD_DEFAULT: '123456',
  PROD_APP_HOST_DEFAULT: 'localhost',
  PROD_APP_PORT_DEFAULT: 3055,
  PROD_ACCESS_TOKEN_EXPIRES_DEFAULT: '1h',
  PROD_REFRESH_TOKEN_EXPIRES_DEFAULT: '90d',
  PROD_DB_HOST_DEFAULT: 'localhost',
  PROD_DB_PORT_DEFAULT: '3306',
  PROD_DB_NAME_DEFAULT: 'PRODUCTION_DATABASE',
  PROD_DB_USERNAME_DEFAULT: 'root',
  PROD_DB_PASSWORD_DEFAULT: '123456',
  API_VERSIONS: {
    '1': v1Router
  },
  REQUEST_HEADER_KEYS: {
    apiVersion: 'x-api-version'
  },
  WHITELIST_DOMAINS: []
}