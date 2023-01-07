import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../ContextProvider/ContextProvider';
// import Lottie from 'lottie-react';
// import reader from '../../Lottite/cominsoon.json'
// import Marquee from "react-fast-marquee";

import { useGetAllBlogsQuery, useGetAllCategoryQuery } from '../../DataFetch.js/DataFetch';
import HomeDetails from './HomeDetails/HomeDetails';
import RecentPost from './RecentPost/RecentPost';



const Home = () => {

    const { search } = useContext(authContext);
    const [gridBlogs, setGridBlogs] = useState([])

    const [page, setPage] = useState(0)
    const [size, setSize] = useState(2)
    const [count, setCount] = useState(0)

    const pages = Math.ceil(count / size);


    useEffect(() => {
        const url = `https://server-salimalsazu.vercel.app/allblogs?search=${search}&page=${page}&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setGridBlogs(data.result);
            })
    }, [page, size, search])

    console.log(gridBlogs);
    const allBlogs = useGetAllBlogsQuery();
    const allCategory = useGetAllCategoryQuery();

    console.log(allCategory);
    // console.log(allBlogs);

    return (
        <div className='flex flex-col lg:flex-row'>


            <div className=' m-4 lg:m-0 lg:w-4/5 lg:p-10' >

                <div className='flex justify-end mt-5 mb-5'>
                    <h1 className='mr-3 text-gray-500 font-bold' >Select Size</h1>
                    <select onChange={event => setSize(event.target.value)}><option value="2" selected >2</option>
                        <option value="4" >4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>

                    </select>
                </div>

                <div className='flex flex-col justify-center gap-10' >
                    {
                        gridBlogs?.map(blog => <HomeDetails blog={blog} key={blog._id} ></HomeDetails>)
                    }
                </div>

                <div className='mt-10 flex justify-center items-center'>
                    {
                        [...Array(pages).keys()].map(number => <button key={number}

                            className={page === number && "bg-gray-800 text-white p-2 rounded-md m-2" || "bg-gray-200 text-gray-700 p-2 rounded-md m-2"}
                            onClick={() => setPage(number)} >
                            {number + 1}
                        </button>)
                    }
                </div>
            </div>
            <div className=' m-4 lg:m-0 lg:w-2/5 lg:p-10 flex flex-col items-start' >
                <div className='flex flex-col items-start'>
                    <h1 className='text-xl font-extrabold mb-8 ' >Recent Post  </h1>
                    <div className='flex flex-col gap-5'>
                        {
                            allBlogs?.data?.slice(0, 3).map(rpost => <RecentPost rpost={rpost} key={rpost._id} ></RecentPost>)
                        }
                    </div>
                </div>


                <div className='flex flex-col items-start mt-44' >
                    <h1 className='text-xl font-extrabold mb-8' >Tag Catagories</h1>

                    <div className='grid grid-cols-3 gap-1'>
                        {
                            allCategory.data?.map(c => <div key={c._id}>
                                <button button className='border border-gray-500 px-2 py-1 rounded-xl hover:bg-gray-500 hover:text-white' > {c.category}</button>
                            </div>)
                        }
                    </div>


                </div>

            </div >




            {/* <div>
                <Marquee>
                    <h1>Happ New Year 2023 !!!</h1>
                </Marquee>
            </div>
            <div className='w-fit' >
                <Lottie animationData={reader} loop={true} />
            </div> */}
        </div >
    );
};

export default Home;