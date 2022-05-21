const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const userModel = require('../models/user')

// '/api/user' is the route

userRouter.post('/', async (req, res) => {
  // Data sent by the user
  const { username, name, password } = req.body

  const existingUser = await userModel.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new userModel({ // what about the NOTES part?
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
  
})

userRouter.get('/', async (req, res) => {
  const users = await userModel.find({}).populate('blogs', { title: 1})
  res.json(users)
})

module.exports = userRouter

// From my understanding, first when the client req data the user information is sent in JSON and the password is the regular password. Using this regular password, 
// we then construct the actual user with the schema. The schema REQUIRES us to use the hash. Therefore, the password is hashed LATER during the processing of the req 
// and then at the end it is stored into the database