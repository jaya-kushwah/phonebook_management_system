import React, { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Add() {
    const cookies = new Cookies();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    const [group, setGroup] = useState("");
    const [groupData, setGroupData] = useState([]);
    const user = cookies.get('user');
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const data = cookies.get('user')
    const userId = data._id;
    setInterval(() => {
    }, 5000)

    useEffect(() => {

        if (cookies.get('user') === undefined)
            window.location.href = '/'
    }, [])

    async function handelContact(e) {
        e.preventDefault();
        console.log(userId)
        let result = await fetch('http://127.0.0.1:5000/api/contact', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, email: email, mobile: mobile, address: address, group: group, user_id: userId })
        })
        console.log(result);
        if (result.status === 201) {
            result = await result.json();
            console.log(result.data);
            navigate('/show');
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
        // console.log(name: name, email: email, mobile: mobile, address: address, city: city, user_id: userId );
    }


    useEffect(() => {

        getGroup();
    }, [])


    async function getGroup() {
        if (user !== undefined) {

            let result = await fetch(`http://localhost:5000/group/get/${user._id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })

            if (result.status === 200) {
                result = await result.json();
                console.log(result.data);
                setGroupData(result.data);
            }
            else if (result.status === 400) {
                result = await result.json();
                //  setError(result.error)
                setInterval(() => {
                    //  setError('')
                }, 5000)
            }
        }
    }

    return (
        <div>
            <div>
                <div className="signup-container">
                    {error === "" ? ("") : (
                        <div className='alert alert-danger' role='alert'>{error}</div>)}
                    <div className="signup-form">
                        <header className='design' >ADD CONTACT</header>
                        <form onSubmit={handelContact}>
                            <input className='input' type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required /><br />
                            <input className='input' type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required /><br />
                            <input className='input' type="mobile" onChange={(e) => setMobile(e.target.value)} placeholder="Enter a mobile" required /><br />
                            <input className='input' type="address" onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" required /><br />
                            <select className='input' onChange={(e) => setGroup(e.target.value)}>
                                <option>Select Contact Category😜</option>
                                {
                                    groupData.map((group, index) => (
                                        <option key={index}>{group.name}</option>
                                    ))}
                            </select>
                            <button type="submit" className="btn btn-outline-success ms-4 " style={{ width: "80%", padding: "9px", marginTop: '7%' }}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Add