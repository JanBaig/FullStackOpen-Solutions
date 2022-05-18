const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger')

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('Connected to MongoDB')
})
.catch((error) => {
    logger.error('Error connecting to MongoDB: ', error.message)
})

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = mongoose.model('blog', blogSchema) 