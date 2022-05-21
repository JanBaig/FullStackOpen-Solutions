
// Main file - runs server

const http = require('http')
const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')
const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}...`)
})


// Something I would like to better understand
// 1. Read the encryption docs
// 2. Read the jwt docs
// 3. Throughly fix the tests after going through a round of high level testing 
// 4. Populate?
// 5. High level view of the project. How does this relate to that? What could have been done differently?
// 6. FSO Excercises
