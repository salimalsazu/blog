import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';

const Profiles = () => {

    const p = useLoaderData();

    return (
        <div>
            <ProfileDetails p={p} ></ProfileDetails>
        </div>
    );
};

export default Profiles;