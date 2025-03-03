import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const cookies = new Cookies();
    const user = cookies.get('user')
    const navigate = useNavigate();


    useEffect(() => {
        if (user === undefined)
            setIsLogin(false)
        else
            setIsLogin(true)
        // navigate('/')
        // console.log(isLogin);
    }, [])

    return (
        <div className="nav">
            {
                isLogin ?
                    <ul>
                        <div className='navbar-des'> NAVIGATION BAR</div>
                        {/* <li><Link to='/dasbord'>DASHBORD</Link></li> */}
                        <li><Link to='/add'>ADD CONTACT</Link></li>
                        <li><Link to='/show'>SHOW CONTACT</Link></li>
                        <li><Link to='/group'>ADD GROUP</Link></li>
                        <li><Link to='/logout' onClick={() => {
                            cookies.remove('user')
                            window.location.href = '/'
                        }}>LOGOUT</Link></li>
                    </ul>

                    :

                    <ul >
                        <div className='navbar-des'>NAVIGATION BAR</div>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/signup'>SIGNUP</Link></li>
                        <li><Link to='/login'>LOGIN</Link></li>
                        <li><Link to='/aboutus'>ABOUT US</Link></li>
                        <li><Link to='/contact'>CONTACT US</Link></li>
                    </ul>
            }
        </div>
    )
}

export default Navbar