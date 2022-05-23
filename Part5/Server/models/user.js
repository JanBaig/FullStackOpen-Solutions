const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger')

// No need to mongoose.connect here? Assuming it will be done automatically when blog.js is run

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
      }
    ],
})
  
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
})

const user = mongoose.model('user', userSchema)

module.exports = user