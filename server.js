'use strict'

const exitHook = require('async-exit-hook')
const environmentConfig = require('./src/config/environment.config')
const app = require('./src/app')

const { port } = environmentConfig.app

let server = null
if (environmentConfig.nodeEnv === 'production') {
  server = app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at: ${process.env.PORT}`)
  })
} else {
  server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at: ${port}`)
  })
}

exitHook(() => {
  server.close()
})