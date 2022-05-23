import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorNotif, setErrorNotif] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const hangleLogin = async (e) => {
    e.preventDefault()
    console.log('Logged in: ', username, password)

    try {
      const response = await loginService.login({
        username, password
      })
      blogService.setToken(response.data.token)
      setUser(response)
      setUsername("")
      setPassword("")
      console.log(response.data.token)

    } catch(error){
      setErrorNotif('Wrong credentials')
      setTimeout(() => {
        setErrorNotif(null)
      }, 5000)
      console.log(error)
    }
  }

  function loginForm() {
    return <form onSubmit={hangleLogin}>
    <div>
      username
        <input 
          type="text"
          name="userName"
          value={username}
          onChange={(e) => setUsername(e.target.value) }
          placeholder="Enter username"
        />
    </div>
    <div>
      password
        <input 
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
    </div>
    <button type="submit">Submit</button>
  </form>

  }

  const userInfo = () => {
    return <div>
      {user.data.name} is Logged in
    </div>
  }


  return (
    <div>
      <h1>Blog Application</h1>
      
      {errorNotif}

      <h2>Login</h2>
      {user === null? loginForm() : userInfo()}

     
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App

// Tasks
// Login Form