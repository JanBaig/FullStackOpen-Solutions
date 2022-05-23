const logger = require('./logger');
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('./config')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } 
  else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({error: 'invalid token'})
  } 
  else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({error: 'token expired'})
  }

  // Anything else passed to default express error handler
  next(error)

}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7) // excludes the 'bearer' part with the substring
  }
  
  next()

}

const userExtractor = async (req, res, next) => {
  // userExtractor is for decoding token into user
  const decodedToken = jwt.verify(req.token, config.SECRET)
  
  // .id is the ID of the user who owns that token
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await userModel.findById(decodedToken.id) // finding user who created blog
  req.user = user

  next()

}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}