// Helper Module for Testing

const blogModel = require('../models/blog')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const totalLikes = (array) => {
    // Array of likes
    let value = array.reduce((sum, current) => {
        return sum + current
    }, 0)

    return value

}

const favBlog = (array) => {
    // Returns the most liked BLOG (Object)
    if (array.length == 0) return "no blogs"

    let mostLikes = array.reduce((mostLikes, item)=> {
        return item.likes > mostLikes ? item.likes : mostLikes
    }, 0)

    let mostLikedBlog = array.filter(blog => blog.likes == mostLikes)
    return mostLikedBlog[0]

}

const blogsInDB = async () => {
  const blogs = await blogModel.find({})
  // * Check note below
  return blogs.map(note => note.toJSON())
}

const idExists = async () => {
  const blogsContainId = await blogModel.find({ _id: {$exists: true} })
  return blogsContainId.map(blog => blog.toJSON())
}


module.exports = {
  totalLikes,
  favBlog,
  blogs,
  listWithOneBlog,
  blogsInDB,
  idExists
}

// * It is IMPORTANT to convert the given blogs in the DB with .toJSON() because the properties of the blogs in the DB we CANNOT change.
// We can only change the JSON version of them