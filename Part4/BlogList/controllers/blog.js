const blogRouter = require('express').Router();
const blogModel = require('../models/blog');
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

// Initial endpoint is '/api/blogs'

const getTokenFrom = req => {

    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null

}

blogRouter.get('/', async (req, res) => {
    const blogs = await blogModel.find({}).populate('user', {username: 1, name: 1})
    res.json(blogs)

})

blogRouter.post('/', async (req, res) => {

    // When we're sending the req, the 'userID' needs to be known (An unknown user cannot possibly post a blog)
    const body = req.body;
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await userModel.findById(decodedToken.id) // the returned JSON version of the "._id" as "id"

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

