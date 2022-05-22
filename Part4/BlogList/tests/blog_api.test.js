const mongoose = require('mongoose')
const app = require('../app') 
const blogModel = require('../models/blog')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest') 
const testHelper = require('./test_helper')
const api = supertest(app)


describe('testing blogs', () => {

    // Before any blog tests are executed 
    beforeEach(async () => {
        let headers;
        let defaultBlogID;

        // First register a single user
        await userModel.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new userModel({ username: 'root', passwordHash })

        await user.save()

        // Login with the user's credentials
        const loginInfo = {
            username:'root',
            name: '',
            password: 'sekret'
        }

        const logInResult = await api
            .post('/api/login')
            .send(loginInfo)
        
        // Set the headers
        headers = {
            'Authorization': `bearer ${logInResult.body.token}`
        }

        // Delete all & add default blog
        await blogModel.deleteMany({})
        const defaultBlog = {
            title: "default Blog",
            author: "Jan",
            url: "URL",
            likes: 20
        } 
        
        const submitDefaultBlog = await api
            .post('/api/blogs')
            .send(defaultBlog)
            .set(headers)

        defaultBlogID = submitDefaultBlog.body.id

        

    })

    test('successfully added a blog', async () => {

        const newBlog = {
            title: "Test #1",
            author: "Jan",
            url: "URL#1",
            likes: 20
        } 

        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        // // Testing that the lengths are the same (No need just check the DB)

    })

    test('missing likes property but still added', async () => {

        const newBlog = {
            title: "Ozyy",
            author: "Unknown",
            url: "some URL"
        } 

        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        console.log(res.body)

    })

    test('missing URL and title', async () => {

        const newBlog = {
            author: "Jan Jan",
            likes: 10
        }

        const res = await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(400)

        //console.log(res.body)
    })

    test('succeds with status code 204 if ID is valid', async () => {
        //const id = testHelper.blogs[0].id


        // Find a way to get the defaultBlog's ID and use it here!
        const res = await api  
            .delete(`/api/blogs/${defaultBlogID}`)
            .set(headers)
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

    test('blog is returned as json and has the correct length', async () => {
        const res = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body).toHaveLength(testHelper.blogs.length)

    })

    test('The blog has an id property', async () => {
        const testing = await testHelper.blogsInDB()
        expect(testing.map(blog => blog.id)).toBeDefined() // map would through an error if every item didn't have the property

    })


})

describe('testing users', () => {

    // Before any user tests are executed
    beforeEach(async () => {

        await userModel.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new userModel({ username: 'root', passwordHash })

        await user.save()

    })

    test('new user added successfully', async () => {

        const usersAtStart = await testHelper.usersInDB()

        const newUser = {
            username: 'testing#1',
            name: 'Matti Luukkainen',
            password: 'password',
        }
      
        const result = await api
            .post('/api/user')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await testHelper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('new user logged in successfully with token returned', async () => {

        const loginInfo = {
            username:'root',
            name: '',
            password: 'sekret'
        }

        const result = await api
            .post('/api/login')
            .send(loginInfo)
            .expect(200)
        
        expect(result.body.username).toBe(loginInfo.username)

        // // Check the exsistence of a token
        expect(result.body.hasOwnProperty('token')).toBe(true)


    })

    test('creation fails if username is already taken', async () => {
        const usersAtStart = await testHelper.usersInDB()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/user')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAtEnd = await testHelper.usersInDB()
        expect(usersAtEnd).toEqual(usersAtStart)

    })

    test('creation fails if username or password is not given', async () => {
        const usersAtStart = await testHelper.usersInDB()

        const newUser = {
            username: "",
            name: "Jan",
            password: "random"
        }

        const res = await api
            .post('/api/user')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('username or password not given.')
        const usersAtEnd = await testHelper.usersInDB()
        expect(usersAtEnd).toEqual(usersAtStart)

    })

    test('creation fails if username or password is less than 3 chars', async () => {

        const usersAtStart = await testHelper.usersInDB()

        const  newUser = {
            username: "J",
            name: "Jan", 
            password: "1234567"
        }

        const result = await api   
            .post('/api/user')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain( 'password and username need to be at least 3 characters long.');
        const usersAtEnd = await testHelper.usersInDB()
        expect(usersAtStart).toEqual(usersAtEnd)
            
    })

})

afterAll(() => {
    mongoose.connection.close()
})