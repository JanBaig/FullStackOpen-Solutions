const testHelper = require('./test_helper')

// Test Arrays

// Tests
describe('totalLikes', () => {

    test('of an empty array', () => {
        const array = []
        const result = testHelper.totalLikes(array)
        expect(result).toBe(0)
    })


    test('of list of length 1', () => {
        const likesList = testHelper.listWithOneBlog.map((blog) => blog.likes);
        const result = testHelper.totalLikes(likesList)
        expect(result).toBe(5)
        
    })

    test('of a larger list', () => {
        const likesList = testHelper.blogs.map(blog => blog.likes)
        const result = testHelper.totalLikes(likesList)
        expect(result).toBe(36)
    })

})

describe('mostLikes', () => {

    test('of array length 1', () => {
        const result = testHelper.favBlog(testHelper.listWithOneBlog)
        expect(result).toEqual(
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5,
                __v: 0
            }
        )
    })

    test('of bigger array', () => {
        const result = testHelper.favBlog(testHelper.blogs)
        console.log(result)
        expect(result).toEqual(
            {
                _id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
              }
        )
    })

    test('of empty array', () => {
        const result = testHelper.favBlog([])
        expect(result).toBe("no blogs")
    })

})