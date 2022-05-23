
// Main file - runs server

const http = require('http')
const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')
const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}...`)
})



// Last exercise
// After adding token based authentication the tests for adding a new blog broke down. Fix the tests.
// Also write a new test to ensure adding a blog fails with the proper status code 401 Unauthorized if a token is not provided.
