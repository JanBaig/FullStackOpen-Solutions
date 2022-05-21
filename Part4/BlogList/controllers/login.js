const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const userModel = require('../models/user')
const config = require('../utils/config');

// Initial endpoint '/api/logi'

loginRouter.post('/', async (req, res) => {

    const { username, password } = req.body;
    const user = await userModel.findOne({ username })

    // Actual password is not saved into the DB. Only the hash version. Therefore, use bcrypt.compare
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: 'invalid username or password'
        })
    }

    // If the user if found and the password is correct (true)
    const userForToken = {
        username: user.username,
        id: user._id

    }

    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60*60 })
 
  res
  .status(200)
  .send({ token, username: user.username, name: user.name })



})

module.exports = loginRouter