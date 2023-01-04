import React from 'react';
// import Lottie from 'lottie-react';
// import reader from '../../Lottite/cominsoon.json'
// import Marquee from "react-fast-marquee";

import { useGetAllBlogsQuery } from '../../DataFetch.js/DataFetch';
import HomeDetails from './HomeDetails/HomeDetails';
import RecentPost from './RecentPost/RecentPost';



const Home = () => {

    const allBlogs = useGetAllBlogsQuery();

    console.log(allBlogs);

    return (
        <div className='flex flex-col lg:flex-row'>


            <div className=' m-4 lg:m-0 lg:w-4/5 lg:p-10' >

                <div className='flex flex-col justify-center gap-10' >
                    {
                        allBlogs?.data?.map(blog => <HomeDetails blog={blog} key={blog._id} ></HomeDetails>)
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
                    <div className='flex flex-col gap-5'>

                    </div>

                </div>

            </div>




            {/* <div>
                <Marquee>
                    <h1>Happ New Year 2023 !!!</h1>
                </Marquee>
            </div>
            <div className='w-fit' >
                <Lottie animationData={reader} loop={true} />
            </div> */}
        </div>
    );
};

export default Home;