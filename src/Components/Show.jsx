import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { IoSearch } from "react-icons/io5";


<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"></link>

function Show() {
    // const cookies = new Cookies();
    // if (cookies.get('user') === undefined)
    // window.location.href = '/'

    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const cookies = new Cookies();
    const user = cookies.get('user');
    const contact = cookies.get('user');
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        handleShow();
    }, [])


    const handleClick = () => {
        navigate('/add')
    }

    async function deleteContact(id) {
        if (window.confirm('ARE YOU SURE YOU WANT TO DELETE YOUR CONTACT❓')) {
            let result = await fetch(`http://localhost:5000/api/get/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },

            })
            if (result.status === 200) {
                console.log("SUCCESSFULL");
            }
            else if (result.status === 400) {
                result = await result.json();
                setError(result.error)
            }

        }
        // handleShow()
    }


    async function handleShow() {
        let result = await fetch(`http://localhost:5000/api/get/${user._id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })

        if (result.status === 200) {
            result = await result.json();
            console.log(result.data);
            setData(result.data);
        }
        else if (result.status === 400) {
            result = await result.json();
            setError(result.error)
            setInterval(() => {
                setError('')
            }, 5000)
        }
    }


    // async function getContactList(value){
    //     let user = cookies.get('user')
    //     if(user!==undefined)
    //         {
    //             let result = await fetch(`http://localhost:5000/api/get/`+user[0]._id)
    //             if(result.status==200)
    //                 {
    //                     result = await result.json();
    //                     result = result.data;
    //                     if(value!==""){
    //                         result = result.filter((user)=>{
    //                             return user.name.toLowerCase().includes(value.toLowerCase()) ||
    //                         })
    //                     }
    //                 }
    //         }
    // }



    // async function searchContact(value) {
    //     if (value === "") {
    //         getContactList();
    //     }
    //     else {
    //         let result = await fetch(`http://localhost:5000/api/search/` + value)
    //         if (result.status === 200) {
    //             result = await result.json();
    //             console.log(result);
    //         }
    //     }
    // }


    // filter data based on search input
    useEffect(() => {
        const filteredData = data.filter((item) => {
            return (

                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.mobile.toString().includes(search) ||
                item.address.toLowerCase().includes(search.toLowerCase())
            );
        });
        setFilteredData(filteredData);
    }, [search, data]);


    return (
        <div >
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">
                            <div className="table-responsive" style={{ marginTop: '8%' }}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3 style={{ fontSize: '200%', fontFamily: 'cursive' }}>~ Welcome<span style={{ marginLeft: '1%', fontSize: '100%' }}> {user.name}</span></h3>
                                    </div>
                                    <div className='col-sm-3'>
                                        <div class="search-box">
                                            <button class="btn-search"><IoSearch /></button>
                                            <input type="text" className="input-search" placeholder="Type to Search..." onChange={(e) => setSearch(e.target.value)} />
                                        </div>


                                        {/* <input style={{ marginTop: '2%', marginLeft: '-10%', borderRadius: '15%', padding: '2%', backgroundColor: 'lightcyan' }} onChange={(e) => setSearch(e.target.value)} type='text' placeholder="🔍 Search Users"></input> */}
                                    </div>
                                    <div className="col-sm-3">
                                        <button style={{ marginLeft: '50%', borderRadius: '40%', borderColor: 'white', height: '80%', width: '40%', backgroundColor: 'black', color: 'white', marginTop: '2%' }} onClick={(handleClick)}>Add Contact</button >

                                    </div>
                                </div>
                                <table className="table user-list">
                                    <thead >
                                        <tr className='table-dark'>
                                            <th className="text-center" ><span >NAME 👤</span></th>
                                            <th className="text-center"><span>EMAIL  📧</span></th>
                                            <th className="text-center"><span>MOBILE 📲</span></th>
                                            <th className="text-center"><span>ADDRESS 🏘️</span></th>
                                            <th className="text-center"><span>GROUP 👩‍❤️‍💋‍👨</span></th>
                                            {/* <th className="text-center"><span>CITY 🌇</span></th> */}
                                            <th className="text-center">ACTIONS☢️</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredData.length === 0 ? (
                                                <tr>
                                                    <td colSpan="8" className="text-center">No Data Found</td>
                                                </tr>
                                            ) : (
                                                filteredData.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <h3>
                                                                    {/* <FaUserAlt style={{ margin: '3%' }} /> */}
                                                                    {item.name}</h3>
                                                            </td>
                                                            <td>
                                                                <a href="#">
                                                                    {/* <MdEmail style={{ margin: '5%', color: 'black' }} /> */}
                                                                    {item.email}</a>
                                                            </td>
                                                            <td className="text-center">
                                                                <span className="label label-success">
                                                                    {/* <FaMobileRetro style={{ margin: '5%' }} /> */}
                                                                    {item.mobile}</span>
                                                            </td>
                                                            <td>
                                                                {/* <FaAddressCard style={{ margin: '5%' }} /> */}
                                                                {item.address}
                                                            </td>
                                                            <td>
                                                                {/* <FaAddressCard style={{ margin: '5%' }} /> */}
                                                                {item.group}
                                                            </td>
                                                            {/* <td>
                                                                <FaLocationDot style={{ margin: '5%' }} />
                                                                {item.city}
                                                            </td> */}
                                                            <td style={{ marginLeft: '15%', width: "15%" }}>
                                                                {/* <a href="#" className="table-link">
                                                                <span className="fa-stack">
                                                                    <i className="fa fa-square fa-stack-2x"></i>
                                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                                                </span>
                                                            </a> */}
                                                                <Link to={'/edit/' + item._id} className="table-link" >
                                                                    <span className="fa-stack">
                                                                        <i className="fa fa-square fa-stack-2x"></i>
                                                                        <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                                    </span>
                                                                </Link>
                                                                <a href="#" className="table-link danger" onClick={() => deleteContact(item._id)} >
                                                                    <span className="fa-stack">
                                                                        <i className="fa fa-square fa-stack-2x"></i>
                                                                        <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                                    </span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                            {/* <ul className="pagination pull-right">
				<li><a href="#"><i className="fa fa-chevron-left"></i></a></li>
				<li><a href="#">1</a></li>
				<li><a href="#">2</a></li>
				<li><a href="#">3</a></li>
				<li><a href="#">4</a></li>
				<li><a href="#">5</a></li>
				<li><a href="#"><i className="fa fa-chevron-right"></i></a></li>
			</ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Show