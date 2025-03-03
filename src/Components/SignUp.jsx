import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    setInterval(() => {
    }, 5000)

    async function handleSignup(e) {
        e.preventDefault();
        console.log(name, email, password, confirmPassword)
        let result = await fetch('http://127.0.0.1:5000/user/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, password: password, confirmPassword: confirmPassword })
        })
        console.log(result);
        if (result.status === 201) {
            result = await result.json();
            console.log(result.data);
            navigate('/login');
            setInterval(() => {
            }, 5000)
        } else if (result.status === 400) {
            result = await result.json();
            setInterval(() => {
                setError("")
            }, 5000)
            setError(result.msg)
            console.log(error);
        }
        console.log(name, email, password, confirmPassword);
    }

    return (
        <div>
            <div className="signup-container">
                {error === "" ? ("") : (
                    <div className='alert alert-danger' role='alert'>{error}</div>)}
                <div className="signup-form">
                    <header className='design' >Signup Page</header>
                    <form onSubmit={handleSignup}>
                        <input className='input' type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required /><br />
                        <input className='input' type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required /><br />
                        <input className='input' type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required /><br />
                        <input className='input' type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required /><br />
                        <button type="submit" className="btn btn-outline-success ms-4 " style={{ width: "80%", padding: "10px", marginTop: '7%' }}>Signup</button>
                    </form>
                    <div className="signup">
                        <br /><span className="signup">User already have an account?
                            <Link to="/login" >Login</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default SignUp