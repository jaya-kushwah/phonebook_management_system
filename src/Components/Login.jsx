import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Cookies from 'universal-cookie';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const cookies = new Cookies();
    const navigate = useNavigate();

    setInterval(() => {
    }, 5000)

    async function handleLogin(e) {
        e.preventDefault();
        console.log(email, password)
        let result = await fetch('http://127.0.0.1:5000/user/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
        console.log(result);
        if (result.status === 200) {
            result = await result.json();
            cookies.set('user', JSON.stringify(result.data), { path: '/' })
            window.location.href = '/show'
            // console.log(result.data);
            // navigate('/dashbord');
        } else if (result.status === 400) {
            result = await result.json();
            setInterval(() => {
                setError("")
            }, 5000)
            setError(result.msg)
            console.log(error);
        }
        console.log(email, password);
    }

    return (
        <div>
            <div className="signup-container">
                {error === "" ? ("") : (
                    <div className='alert alert-danger' role='alert'>{error}</div>)}
                <div className="signup-form">
                    <header className='design' >Login Page</header>
                    <form onSubmit={handleLogin}>
                        <input className='input' name='email' type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required /><br />
                        <input className='input' name='password' type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required /><br />
                        <button type="submit" className="btn btn-outline-success ms-4 " style={{ width: "80%", padding: "10px", marginTop: '7%' }}>Login</button>
                    </form>
                    <br />
                    <div className="signup">
                        <br /><span className="login">Forget password
                            <br /><br />User don't have an account? <Link to="/signup" >Signup</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login