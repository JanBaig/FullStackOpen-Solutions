const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = `mongodb+srv://janatB:1181MongoDBjan!@cluster0.rqtkb.mongodb.net/BlogList?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(`Testing this`)
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`)
})