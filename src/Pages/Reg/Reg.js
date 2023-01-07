import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/lab/LoadingButton';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../../ContextProvider/ContextProvider';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import reader from '../../Lottite/reg.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Reg = () => {

    const { createUser } = useContext(authContext);
    const { register, handleSubmit } = useForm();
    const imageHostKey = "f04df4e1343869002a97bc435ec536f7";
    // const location = useLocation();
    const navigate = useNavigate();

    // const from = location.state?.from?.pathname || '/profile';


    const handleSignUp = (data) => {
        console.log(data);


        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.log(error)
            })


        const image = data.picture[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData)
                if (imgData.success) {
                    console.log(imgData.data.url);
                }

                const user = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    dateofbirth: data.dateofbirth,
                    home: data.home,
                    mailaddress: data.mailaddress,
                    mobile: data.mobile,
                    nationality: data.nationality,
                    picture: imgData.data.url,
                    email: data.email
                }

                fetch('https://server-salimalsazu.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('profile-token', data.token)

                    })

                // console.log(products);
                //save information to the database 

                fetch('https://server-salimalsazu.vercel.app/user', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        toast("Please Log in now ")
                        navigate('/regdone')
                    })

            })
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: 'auto' }}  >
            <Box sx={{ width: "60%" }}>
                <Lottie animationData={reader} loop={true} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "60%" }}>
                <Form onSubmit={handleSubmit(handleSignUp)}>
                    <Box sx={{ width: "500px", padding: "30px" }}>
                        <Typography variant="h4" sx={{ mb: 5 }} >
                            Register With Us !
                        </Typography>
                        <Box  >
                            <Box>
                                <Box style={{ textAlign: "start", marginBottom: "10px" }} >
                                    <Typography>
                                        Personal Information:
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "grid", gridTemplateColumns: " 1fr 1fr", justifyContent: "center", alignItems: "center", gap: "20px", width: "full", mb: 5 }}>
                                    <TextField
                                        label="Type Your First Name"
                                        type="text"
                                        {...register('firstname')}
                                        required
                                    />
                                    <TextField
                                        label="Type Your Last Name"
                                        {...register('lastname')}
                                        type="text"
                                        required
                                    />

                                    <TextField
                                        label="Date of Birth"
                                        {...register('dateofbirth')}
                                        type="date"
                                        required
                                    />
                                    <TextField
                                        label="Nationality"
                                        {...register('nationality')}
                                        type="text"
                                        required
                                    />
                                    <TextField
                                        label="Mobile"
                                        {...register('mobile')}
                                        type="text"
                                        required
                                    />
                                </Box>

                            </Box>
                            <Box >
                                <Box style={{ textAlign: "start", marginBottom: "10px" }}>
                                    <Typography>
                                        Address Information:
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "grid", gridTemplateColumns: " 1fr 1fr", justifyContent: "center", alignItems: "center", gap: "20px", width: "full", mb: 5 }}  >
                                    <TextField
                                        label="Home Address"
                                        {...register('home')}
                                        type="text"
                                        required
                                    />

                                    <TextField
                                        label="Mailing Address"
                                        {...register('mailaddress')}
                                        type="text"
                                        required
                                    />
                                </Box>
                            </Box>
                            <Box >
                                <Box style={{ textAlign: "start", marginBottom: "10px" }}>
                                    <Typography>
                                        Upload Your Image:
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "grid", gridTemplateColumns: " 1fr 1fr", justifyContent: "center", alignItems: "center", gap: "20px", width: "full", mb: 5 }}  >
                                    <TextField
                                        label="Picture"
                                        {...register('picture')}
                                        type="file"
                                        required
                                    />


                                </Box>
                            </Box>
                            <Box >
                                <Box style={{ textAlign: "start", marginBottom: "10px" }}>
                                    <Typography>
                                        Login Credentail:
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "grid", gridTemplateColumns: " 1fr 1fr", justifyContent: "center", alignItems: "center", gap: "20px", width: "full", mb: 5 }}  >
                                    <TextField
                                        label="Type Your Email"
                                        {...register('email')}
                                        type="email"
                                        required
                                    />
                                    <TextField
                                        id="outlined-password-input"
                                        {...register('password')}
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                    />
                                </Box>
                            </Box>

                        </Box>

                        <Button sx={{ color: "white" }} type="submit" variant="contained">Register</Button>

                    </Box>
                </Form>
            </Box >
            <ToastContainer />
        </Box >
    );
};

export default Reg;
