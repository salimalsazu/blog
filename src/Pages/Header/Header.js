// import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../ContextProvider/ContextProvider';

import { FaFacebookF } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';

const Header = () => {

    // const { firstname, lastname } = u;

    // const { data: userAll = [] } = useQuery({
    //     queryKey: ['userAll'],
    //     queryFn: async () => {
    //         const res = await fetch('http://localhost:5000/user');
    //         const data = await res.json();
    //         return data;
    //     }
    // })

    const { user, logOut } = useContext(authContext);
    const [userAll, setUserAll] = useState([]);



    useEffect(() => {
        // console.log(user.email);

        if (user?.email) {
            fetch(`http://localhost:5000/users?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('profile-token')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        console.log("Ashey Nai")
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    setUserAll(data);
                });
        }

    }, [user?.email]);


    // console.log(userAll);


    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch((err) => console.error(err))
    }


    const navBar = <React.Fragment>
        {user?.uid || user?.email ?
            <div className='flex flex-col lg:flex-row items-center '>

                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-sm" >Profile</label>
                    <ul tabIndex={0} className="dropdown-content menu text-xs shadow bg-base-100 rounded-box w-28">
                        {
                            userAll?.map(u => <>

                                <li> <Link to={`/profile/${u.email}`} key={u._id} > {u.firstname} {u.lastname} </Link></li>

                            </>)
                        }
                        <li><Link to="/" ><button onClick={handleSignOut}>Signout</button></Link></li>
                    </ul>
                </div>

            </div>
            :
            <>
                <li><Link to="/login" >Login</Link></li>
                <li><Link to="/reg" >Register</Link></li>
            </>


        }

    </React.Fragment >



    return (
        <div className='text-{{#4b4870}} text-md font-semibold'>
            <div className="navbar flex flex-col justify-center items-center ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow w-full  rounded-box  bg-slate-50 text-gray-600">
                            {navBar}
                        </ul>
                    </div>
                </div>
                <div className='flex justify-between px-10 items-center w-full lg:mb-10 lg:mt-10 '>
                    <div className='flex justify-center items-center gap-4' >
                        <FaFacebookF className='text-2xl' ></FaFacebookF>
                        <BsTwitter className='text-2xl' ></BsTwitter>
                        <BsInstagram className='text-2xl' ></BsInstagram>
                    </div>
                    <div>
                        <Link to="/" className=" text-6xl lg:mb-5"><button><span className=' text-gray-300'>dev</span>Blog </button></Link>
                    </div>
                    <div>
                        <ImSearch className='text-3xl'></ImSearch>
                    </div>
                </div>
                <div className="navbar-end w-full mr-20 hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 ">
                        {navBar}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Header;