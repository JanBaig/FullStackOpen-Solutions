const blogRouter = require('express').Router();
const blogModel = require('../models/blog');
const userModel = require('../models/user')

// default is './api/blogs' + '/' whatever more

blogRouter.get('/', async (req, res) => {
    const blogs = await blogModel.find({}).populate('user', {username: 1, name: 1})
    res.json(blogs)

})

blogRouter.post('/', async (req, res) => {
    // When we're senidng the req, the userID needs to be know (An unknown user cannot possibly post a blog)

    const body = req.body;

    const user = await userModel.findById(body.userId)

    const blog = new blogModel({

        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id

    })

    const savedNote = await blog.save()

    //Updating the user
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

    const body = req.body;

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