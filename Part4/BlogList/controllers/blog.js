const blogRouter = require('express').Router();
const blogModel = require('../models/blog');
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config');
const loggerv = require('../utils/logger')
const middleware = require('../utils/middleware')
// Initial endpoint is '/api/blogs'

blogRouter.get('/', async (req, res) => {
    const blogs = await blogModel.find({}).populate('user', {username: 1, name: 1})
    res.json(blogs)

})

// Can only create a new blog with a registered user's token
blogRouter.post('/', middleware.userExtractor, async (req, res) => {

    const body = req.body;
    const user = req.user // from the middleware

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

blogRouter.delete('/:id', middleware.userExtractor, async (req, res) => {

    const blogDeleteId = req.params.id;
    const user = req.user // from tokenID
    
    // Check to see if the blog (to be deleted)'s user property has the same userID as the token's .id
    const blog = await blogModel.findById(blogDeleteId);
    if (blog.user.toString() === user._id.toString()){
        await blogModel.findOneAndDelete(blogDeleteId)
        return res.status(204).end()
    }
    return res.status(401).json({ error: 'Not your blog! Cannot delete this' })

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

// The server's protected routes will check for a valid JWT in the Authorization header (Comes in the request header), and if it's present,
// the user will be allowed to access protected resources

