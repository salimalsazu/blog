import React from 'react';

const RecentPost = ({ rpost }) => {

    const { blogtitle, posttime } = rpost;
    return (
        <div>
            <div className='text-start'>
                <h1 className='text-md font-semibold' >{blogtitle}</h1>
                <p className='text-gray-400 font-extralight text-sm' >{posttime}</p>
            </div>


        </div>
    );
};

export default RecentPost;