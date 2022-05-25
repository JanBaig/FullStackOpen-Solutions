import React from "react";

const LoginForm = ({ username, password, setUsername, setPassword, handleFormLogin }) => {

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleFormLogin}>
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

        </div>
        
    )
    

}

export default LoginForm