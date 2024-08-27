import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import a CSS file for styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username && password) {
            navigate('/dashboard');
        } else {
            alert('Please enter both username and password');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div className="register-link">
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </div>
        </div>
    );
};

export default Login;
