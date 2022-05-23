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
    title: {type: String, required: true},
    author: String,
    url: {type: String, required: true},
    likes: {type: Number, default: 0},
    // UserID of documents of type 'user'
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

// The format of the blog when we send it out as a response
// Doesn't alter the actual blog stored in the DB (Just the returned JSON version of it)
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('blog', blogSchema) 