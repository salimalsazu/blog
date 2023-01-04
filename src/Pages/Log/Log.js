import React, { useContext } from 'react';
import Lottie from 'lottie-react';
import reader from '../../Lottite/login.json'
import { useForm } from 'react-hook-form';
import { Button, makeStyles, TextField } from '@mui/material';
import { authContext } from '../../ContextProvider/ContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Log = () => {
    const { signIn } = useContext(authContext);
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();



    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                const currentUser = {
                    email: user.email
                }

                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('profile-token', data.token)
                        toast("Login Succeefully ")
                        navigate(from, { replace: true });
                    })


            })
            .catch(err => console.error(err))
    }



    return (
        <div className='flex flex-col lg:flex-row justify-center items-center  h-60' >
            <div className='w-1/3' >
                <Lottie animationData={reader} loop={true} />
            </div>
            <div className='flex flex-col justify-center items-center w-2/3 color'>
                <form action="" onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-8 color lg:mt-52">
                    <TextField

                        label="Type Your Email"
                        type="email"
                        {...register('email')}
                        required
                    />
                    <TextField
                        label="Password"
                        {...register('password')}
                        type="password"
                        required
                    />
                    <Button sx={{ color: "white" }} type='submit' variant="contained">Login</Button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Log;