'use strict'

const exitHook = require('async-exit-hook')
const environmentConfig = require('./src/config/environment.config')
const app = require('./src/app')

const { port } = environmentConfig.app

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at: ${port}`)
})

exitHook(() => {
  server.close()
})