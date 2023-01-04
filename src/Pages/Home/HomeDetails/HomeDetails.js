import React from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';


const HomeDetails = ({ blog }) => {

    const { posttime, blog: blogs, blogtitle, firstname, lastname, image } = blog;

    return (
        <div className='relative' >
            <div className='bg-white shadow-md p-10 rounded-lg '>
                <div className='flex flex-col justify-start items-start '>
                    <div>
                        <h1 className='text-3xl font-bold text-{{#454360}} mb-3'>{blogtitle}</h1>
                    </div>
                    <div className='flex items-center gap-5'>
                        <p>{posttime}</p>
                        <p><AiOutlineComment></AiOutlineComment></p>
                        <p><AiOutlineHeart></AiOutlineHeart></p>
                    </div>
                </div>

                <div className='flex flex-col justify-start items-start mt-5 text-start'>
                    <p>{blogs.slice(0, 500)}...</p>
                </div>

                <div className='flex justify-between items-center mt-5'>
                    <div>
                        <p>Tag</p>
                    </div>
                    <div className='flex items-center'>
                        <img className='w-10 h-10 bg-gray-100 rounded-full border ' src={image} alt="" />
                        <p className='ml-3 text-gray-400'>{firstname} {lastname}</p>
                    </div>
                </div>
            </div >
            <button className='px-4 py-2 bg-gray-600 text-white -mt-10 absolute -bottom-5 left-1/3 shadow-md shadow-white' >Continue Reading</button>
        </div >
    );
};

export default HomeDetails;