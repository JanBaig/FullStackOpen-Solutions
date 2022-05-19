const mongoose = require('mongoose')
const app = require('../app') 
const blogModel = require('../models/blog')
const supertest = require('supertest') 
const testHelper = require('./test_helper')
const api = supertest(app)

// Before any tests are executed 
beforeEach(async () => {
    await blogModel.deleteMany({})
    
    for (let blog of testHelper.blogs) {
      let blogObject = new blogModel(blog)
      await blogObject.save()
    }
})

describe('testing the blog API', () => {
    
    test('blogs returned as json and have correct length', async () => {
        const res = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body).toHaveLength(testHelper.blogs.length)

    })

    test('all blogs have id property', async () => {
        const testing = await testHelper.blogsInDB()
        expect(testing.map(blog => blog.id)).toBeDefined() // map would through an error if every item didn't have the property

    })

    test('successfully added a blog', async () => {
        const newBlog = {
            title: "Oz",
            author: "Unknown",
            url: "some URL",
            likes: 20
        } 

        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        // Testing that the lengths are the same
        const allBlogs = await testHelper.blogsInDB()
        expect(allBlogs).toHaveLength(testHelper.blogs.length + 1) 


    })

    test('missing likes property still added', async () => {

        const newBlog = {
            title: "Oz",
            author: "Unknown",
            url: "some URL"
        } 

        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        
        expect(res.body.likes).toBe(0)

    })

    // Write a test related to creating new blogs via the /api/blogs endpoint, 
    // that verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.
    test('missing URL and title', async () => {
        const newBlog = {
            author: "Jan Jan",
            likes: 10
        }

        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

})

afterAll(() => {
    mongoose.connection.close()
})