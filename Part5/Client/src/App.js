import { useState, useEffect, useRef, createElement } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNew from './components/CreateNew'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorNotif, setErrorNotif] = useState("")
  const [notif, setNotif] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null) 
  const createNewFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedBlogUser){
      const result = JSON.parse(loggedBlogUser)
      setUser(result)
      blogService.setToken(result.data.token)
    }

  }, [])

  const handleFormLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(response))

      blogService.setToken(response.data.token)
      console.log(response.data.token)
      setUser(response)
      setUsername("")
      setPassword("")

    } catch(error){
      setErrorNotif('Wrong credentials')
      setTimeout(() => {
        setErrorNotif(null)
      }, 5000)
      console.log(error)
    }
  }

  const addBlog = async (newObj) => {
    try {
      createNewFormRef.current.toggleVisibility()
      const response = await blogService.create(newObj)
      console.log(response)
      setBlogs(blogs => blogs.concat(response))
      setNotif(`${response.title} by ${response.author} added`)
      setTimeout(() => {
        setNotif(null)
      }, 5000)

    } catch(error){
      console.log(error.message)
    }

  }

  const userInfo = () => { 
    return (
      <div>
        {user.data.name} is logged in
        <button onClick={() => window.localStorage.removeItem('loggedBlogUser')}>Log out</button>

        <Toggleable buttonLabel="Create new" ref={createNewFormRef}>
          <CreateNew setBlogs={setBlogs} setNotif={setNotif} addBlog={addBlog}/>
        </Toggleable>

      </div>
    )
  }

  const showDelete = (blog) => {
    // Janat's ID = 628bf4d5b8303db45e1ebbf2
    
    if (JSON.parse(window.localStorage.getItem('loggedBlogUser'))) {
      const local = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
      if (local.data.username === blog.user.username){
        return true
      }
      return false
    }
  }

  return (
    <div>
      <h1>Blog Application</h1>
      
      {errorNotif}
      {notif}

      {user === null? 
      <Toggleable buttonLabel="Login">
        <LoginForm 
          username={username}  
          password={password} 
          setUsername={setUsername} 
          setPassword={setPassword} 
          handleFormLogin={handleFormLogin}
        />
      </Toggleable>
      : 
       userInfo()
      }

      <h2>Blogs</h2> 
      {blogs.sort((a, b) => b.likes-a.likes).map(blog =>{
          return <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} showDelete={showDelete}/>
        })
      }

    </div>
  )
}

export default App