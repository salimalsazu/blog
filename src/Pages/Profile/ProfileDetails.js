import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import cover from '../../image/blog.jpg'
import { CiLocationOn } from 'react-icons/ci';
import { authContext } from '../../ContextProvider/ContextProvider';
import UserBlogs from '../../Blogs/UserBlogs';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';




const ProfileDetails = ({ p }) => {

    const { user } = useContext(authContext);
    const [userBlog, setUserBlog] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`https://server-salimalsazu.vercel.app/blogs?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('profile-token')}`
                }
            })
                .then(res => {
                    // if (res.status === 401 || res.status === 403) {
                    //     return logOut();
                    // }
                    return res.json()
                })
                .then(data => setUserBlog(data));
        }
    }, [user?.email]);


    console.log(userBlog);




    const { register, handleSubmit } = useForm();

    const posttime = new Date().toLocaleString();

    const handleBlog = (data) => {

        const blogPost = {
            blogtitle: data.blogtitle,
            blog: data.blog,
            firstname: p.firstname,
            lastname: p.lastname,
            image: p.picture,
            email: p.email,
            posttime
        }

        console.log(blogPost)
        fetch('https://server-salimalsazu.vercel.app/blogs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(blogPost)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                Swal.fire('Your blog is Posted')
            })
    }


    return (
        <div className='flex flex-col mx-10'>
            <div className='w-full h-60 ' >
                <img className='w-full h-60 object-cover' src={cover} alt="" />
            </div>
            <div className='flex items-center -mt-12'>
                <img src={p.picture} alt="Profile pic" className='border border-gray-500 w-20 h-20 rounded-full ' />
                <h1 className='text-white ml-2 pb-2 font-extrabold' >{p.firstname} {p.lastname}</h1>
            </div>
            <div className='flex'>


                <div className='px-5 w-1/5 h-auto rounded-lg  mt-5 hidden lg:block'>
                    <div className=' bg-white shadow-sm text-start  p-5 mt-5 rounded-md'>
                        <div className='p-3'>
                            <h1 className='text-xl  font-bold mb-1' >Intro</h1>
                            <p className='text-xs font-extralight' >{p.intro}</p>
                        </div>

                        <div className='flex items-center mt-3 text-xl ' >
                            <span className=' font-bold' > <CiLocationOn></CiLocationOn> </span>
                            <p className=' font-extralight ml-2'>From {p.home}</p>
                        </div>
                    </div>
                    <div className='mt-5' >
                        <h1 className='font-extrabold shadow-sm p-2' >DASHBOARD</h1>
                        <Link to="/profile/addcategory" >Add Category</Link>
                    </div>
                </div>


                <div className=' lg:mt-0 mt-10 w-full lg:w-3/5 '>
                    <div >
                        <form onSubmit={handleSubmit(handleBlog)} action="" className='flex flex-col  items-end mx-5 bg-white p-5'>
                            {/* <input {...register('blogstitle')} type="text" name="blogtitle" id="" placeholder='Title' className='p-5 w-full h-5 mb-5 shadow-sm rounded-lg' /> */}

                            <input {...register('blogtitle', { required: 'Field is required' })} placeholder='Title' className='p-5 w-full h-5 mb-5 shadow-sm bg-gray-100 rounded-lg' />

                            <textarea {...register('blog')} name="blog" id="" cols="30" rows="10" className='p-5 w-full  h-16  mb-5 shadow-sm bg-gray-100 rounded-lg' placeholder='Write Your Blog...'></textarea>
                            <Button type='submit' variant="outlined" className='w-10 h-5 text-right text-yellow-400'>
                                Post
                            </Button>
                        </form>
                    </div>

                    <div className='mt-5 ' >
                        <div className='grid grid-cols-1 p-5 gap-5' >
                            {
                                userBlog?.map(b => <UserBlogs b={b} key={b._id} ></UserBlogs>)
                            }
                        </div>
                    </div>

                </div>


                <div className='  px-5 w-1/5 hidden lg:block'>
                    <div className=' bg-white rounded-sm p-5 mt-5 shadow-sm'>
                        <h1 className='mb-5 font-extrabold' >Your Latest Blog</h1>
                        <ul className='text-left'>
                            {
                                userBlog.length === 0 && "No Blog Posted "
                            }
                            {
                                userBlog?.map((b, i) => <h1 key={b._id} ><span>{i + 1}. </span>{b.blogtitle.slice(0, 25)}...</h1>)
                            }
                        </ul>
                    </div>

                    <div className=' bg-white rounded-md mt-5 p-5 shadow-sm'>
                        <h1 className='mb-5 font-extrabold' >Your Favourite Blog </h1>
                        <ul className='text-left'>
                            <li> No Favourite Blog</li>

                        </ul>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default ProfileDetails;