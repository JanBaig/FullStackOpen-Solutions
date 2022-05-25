import React, { useState } from "react"
import blogServices from '../services/blogs'

const Blog = ({ blog }) => {
  const [visable, setVisable] = useState(true);
  const [likes, setLikes] = useState(0)
  const showWhenVisible = { display: visable ? 'none': '' } // when view button is not displayed then this gets displayed
  let title = ''
  if (visable) title = 'view'
  else title = 'collapse'

  const toggleVisibility = () => {
    setVisable(!visable)
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = async () => {
    
    const newObj = {
      likes: 1
    }
    const response = await blogServices.update(blog.id, newObj)

  }
  const handleDelete = async () => {
    const test = window.localStorage.getItem('loggedBlogUser')
    blogServices.setToken(JSON.parse(test).data.token)
    const testAgain = await blogServices.remove(blog.id)
    console.log(blog)
    console.log(testAgain)


  }

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{title}</button></p>
      </div>

      <div style={showWhenVisible}>
        <p>{'Author: ' + blog.author}</p>
        <p>{'URL: ' + blog.url}</p>
        <p>{'User: ' + blog.user.name}</p>
        <p>{'Likes: ' + blog.likes} <button onClick={handleLikes}>Like</button></p>
        <button onClick={handleDelete}>Delete</button>
      </div>

    </div>
  )
}

export default Blog