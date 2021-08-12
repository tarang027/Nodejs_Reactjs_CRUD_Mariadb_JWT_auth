import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function SignUp(props) {

    const classes = useStyles();

    const [profilePic, setProfilePic] = useState(null)

    const validationSchema = Yup.object().shape({
        user_email: Yup.string().email('*invalid email').required('*email is required'),
        user_name: Yup.string().required('*name is required'),
        user_password: Yup.string().required('*password is required'),
    });

    useEffect(() => {
        return () => {
            setProfilePic(null)
        }
    }, [])

    return (

        <>
                <div className="antialiased bg-gray-200 text-gray-900 font-sans" >
                    <div className="flex items-center h-screen w-full">
                        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                            <span className="block w-full text-xl uppercase font-bold mb-4">SignUp</span>
                            <Formik
                                initialValues={{
                                    user_email: '',
                                    user_password: '',
                                    user_name: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={values => {
                                    if (profilePic && profilePic[0]) {
                                        let formData = new FormData();
                                        formData.append('profile_pic', profilePic[0])
                                        formData.append('user_email', values.user_email)
                                        formData.append('user_password', values.user_password)
                                        formData.append('user_name', values.user_name)

                                        axios.post('registerUser', formData)
                                            .then(res => {
                                                let { status, access_token } = res.data;
                                                if (status) {
                                                    console.log("SignUp success");
                                                    window.location = "/login";
                                                }
                                                else {
                                                    console.log("SignUp failed");
                                                }
                                            })
                                    }
                                }}
                            >
                                {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, validateForm, getFieldProps }) => (
                                    <Form onSubmit={handleSubmit} >
                                        <div className="mt-4" >
                                            <TextField
                                                name='user_name'
                                                {...getFieldProps('user_name')}
                                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                                label="Name"
                                                type='text'
                                                variant="outlined"
                                                error={touched.user_name && errors.user_name}
                                            />
                                            <ErrorMessage className=" text-red-400 " name='user_name' />
                                        </div>

                                        <div className="mt-4" >
                                            <TextField
                                                name='user_email'
                                                {...getFieldProps('user_email')}
                                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                                label="Email"
                                                type='text'
                                                variant="outlined"
                                                error={touched.user_email && errors.user_email}
                                            />
                                            <ErrorMessage className=" text-red-400 " name='user_email' />
                                        </div>

                                        <div className="mt-4" >
                                            <TextField
                                                name='user_password'
                                                {...getFieldProps('user_password')}
                                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                                label="Password"
                                                type='password'
                                                variant="outlined"
                                                error={touched.user_password && errors.user_password}
                                            />
                                            <ErrorMessage className=" text-red-400 " name='user_password' />
                                        </div>

                                        <input type='file' name='profile_pic' onChange={e => setProfilePic(e.target.files)} className=" my-3 " />

                                        <div className=" mt-4 " >
                                            <button disabled={!isValid} className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">SignUp</button>
                                        </div>
                                        {/* <Button disabled={!isValid} variant="contained" color="primary" type="submit">Login</Button> */}
                                    </Form>
                                )}
                            </Formik>
                            <div className=" mt-4 " >
                                 Already have an account?{' '}<a className="text-blue-700 text-center text-sm" href="/login">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default SignUp;