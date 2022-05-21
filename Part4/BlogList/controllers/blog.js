const blogRouter = require('express').Router();
const blogModel = require('../models/blog');
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config');
const loggerv = require('../utils/logger')
// Initial endpoint is '/api/blogs'

const getTokenFrom = req => {

    // req.get() function returns the specified HTTP request header field
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7) // excludes the 'bearer' part with the substring
    }
    return null

}

blogRouter.get('/', async (req, res) => {
    const blogs = await blogModel.find({}).populate('user', {username: 1, name: 1})
    res.json(blogs)

})

// Can only create a new blog with a registered user's token
blogRouter.post('/', async (req, res) => {

    const body = req.body;
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, config.SECRET)
    
    // .id is the ID of the user who owns that token
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await userModel.findById(decodedToken.id) // finding user who created blog

    const blog = new blogModel({

        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id

    })

    const savedNote = await blog.save()

    //Updating the user's 'blogs' array property
    user.blogs = user.blogs.concat(savedNote._id)
    await user.save()
    
    res.status(201).json(savedNote)
    
})

blogRouter.delete('/:id', async (req, res) => {

    const id = req.params.id;
    await blogModel.findOneAndDelete(id)
    res.status(204).end()

})

blogRouter.put('/:id', async (req, res) => {

    const body = req.body; // the altered body to be updated

    const newBlog = {
        title: body.title,
        author: body.author, 
        url: body.url,
        likes: body.likes,
    }

    await blogModel.findByIdAndUpdate(req.params.id, newBlog, { new: true })
    res.status(200).end()

})

module.exports = blogRouter 


// The server's protected routes will check for a valid JWT in the Authorization header (Comes in the request header), and if it's present, the user will be allowed to access protected resources

