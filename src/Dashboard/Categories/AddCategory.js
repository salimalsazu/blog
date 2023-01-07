import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useCreatePostMutation } from '../../DataFetch.js/DataFetch';

const AddCategory = () => {
    const { register, handleSubmit } = useForm();
    const [createCategory, response] = useCreatePostMutation();

    console.log(response);


    const handleCategory = (data) => {
        const category = {
            category: data.category
        }

        createCategory(category);

        toast("Added Successfully!")
    }


    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='bg-white w-96 p-10 rounded-lg' >
                <h1 className='mb-5 text-xl font-bold'>Add Category</h1>
                <form className='flex flex-col  justify-center items-center ' onSubmit={handleSubmit(handleCategory)} action="">
                    <TextField

                        label="category Name"
                        type="text"
                        {...register('category')}
                        required
                    />
                    <Button type='submit' sx={{ marginTop: "15px" }} variant="contained" size="small">Add</Button>
                </form>
            </div>
            <ToastContainer />
        </div >
    );
};

export default AddCategory;