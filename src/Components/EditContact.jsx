import React, { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditContact() {
    const cookies = new Cookies();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [group, setGroup] = useState("");
    const [groupData, setGroupData] = useState([]);
    const user = cookies.get('user');
    const [_id, setId] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getContact();
    }, [])

    async function getContact() {
        let result = await fetch(`http://localhost:5000/api/getById/${id}`)
        if (result.status === 200) {
            result = await result.json();
            console.log("result", result);
            setName(result.data.name)
            setEmail(result.data.email)
            setMobile(result.data.mobile)
            setAddress(result.data.address)
            setGroup(result.data.group)
            setId(result.data._id)
        }
    }

    // if (cookies.get('user') === undefined)
    //     window.location.href = '/'
    async function EditContact(e) {
        e.preventDefault();
        try {
            let result = await axios.patch(`http://localhost:5000/api/getById/${_id}`, {
                name, email, mobile, address, group
            });
            if (result.status === 200) {
                navigate('/show');
            }
            else {
                setError("Somethimg went wrong.....")
            }
        } catch (error) {
            setError("Somethimg went wrong.....")
        }
    }

    useEffect(() => {

        handleShow();
    }, [])


    async function handleShow() {
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
                    <div className="signup-form">
                        <header className='design' >UPDATE CONTACT</header>
                        <form onSubmit={EditContact} >
                            <input className='input' value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required /><br />
                            <input className='input' value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required /><br />
                            <input className='input' value={mobile} type="mobile" onChange={(e) => setMobile(e.target.value)} placeholder="Enter a mobile" required /><br />
                            <input className='input' value={address} type="address" onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" required /><br />
                            <select className='input' onChange={(e) => setGroup(e.target.value)}>
                                <option>Select Contact Category</option>

                                {groupData.map((group, index) => (
                                    <option key={index} >{group.name}</option>
                                ))}
                            </select>
                            <button type="submit" className="btn btn-outline-success ms-4 " style={{ width: "80%", padding: "9px", marginTop: '7%' }}>UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditContact