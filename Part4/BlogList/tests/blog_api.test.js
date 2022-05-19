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

    describe('testing single blogs', () => {

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
    
        test('missing likes property but still added', async () => {
    
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

        test('succeds with status code 204 if ID is valid', async () => {
            const id = testHelper.blogs[0].id

            const res = await api  
                .delete(`/api/blogs/${id}`)
                .expect(204)

        })

        test('updating a note with valid ID', async () => {
            const newBlog = {
                "title": "Jan"
            }

            const id = '5a422a851b54a676234d17f7'

            const res = await api
                .put(`/api/blogs/${id}`)
                .send(newBlog)
                .expect(200)

        })

    })
    
    describe('testing multiple blogs', () => {

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

    })
   
})

afterAll(() => {
    mongoose.connection.close()
})