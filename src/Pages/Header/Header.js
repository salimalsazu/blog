// import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../ContextProvider/ContextProvider';

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

    const logo = "devBlog"



    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch((err) => console.error(err))
    }


    const navBar = <React.Fragment>
        {user?.uid || user?.email ?
            <>

                <div className="dropdown">
                    <label tabIndex={0} className="btn m-1">Profile</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            userAll?.map(u => <>

                                <li> <Link to={`/profile/${u.email}`} key={u._id} > {u.firstname} {u.lastname} </Link></li>

                            </>)
                        }
                    </ul>
                </div>
                <li><Link to="/" ><button onClick={handleSignOut}>Signout</button></Link></li>
            </>
            :
            <>
                <li><Link to="/login" >Login</Link></li>
                <li><Link to="/reg" >Register</Link></li>
            </>


        }

    </React.Fragment >



    return (
        <div className='text-yellow-400'>
            <div className="navbar flex justify-center items-center mx-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52 bg-slate-50 text-gray-600">
                            {navBar}
                        </ul>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Link to="/" className="w-20"><button>{logo}</button></Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 ">
                        {navBar}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Header;