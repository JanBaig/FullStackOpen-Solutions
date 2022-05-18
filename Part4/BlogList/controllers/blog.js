const blogRouter = require('express').Router();
const blogModel = require('../models/blog');

// default is './api/blogs' + / whatever more

blogRouter.get('/', (req, res) => {
    blogModel
        .find({})
        .then(blogs => {
        res.json(blogs)
        })
    }
)

blogRouter.post('/', (req, res) => {
    const blog = new blogModel(req.body)

    blog
        .save()
        .then(result => {
        res.status(201).json(result)
        })
    } 
)

module.exports = blogRouter