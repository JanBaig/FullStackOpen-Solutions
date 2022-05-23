import React, { useState } from "react"
import blogService from '../services/blogs'

const CreateNew = ({ setBlogs, setNotif }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        
        const newBlog = {
            "title": title,
            "author": author,
            "url": url
        }

        try {
            const response = await blogService.create(newBlog)
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

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Title:
                    <input 
                        type="text"
                        name="userName"
                        value={title}
                        onChange={(e) => setTitle(e.target.value) }
                        placeholder="Enter title"
                    />
                </div>
                <div>
                    Author:
                    <input 
                        type="text"
                        name="password"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author"
                    />
                 </div>
                <div>
                    Url:
                    <input 
                        type="text"
                        name="password"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter url"
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateNew