import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { showMessage } from '../../App';
import { notification, Space } from 'antd';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));




function Login(props) {

    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        user_email: Yup.string().email('*invalid email').required('*email is equired'),
        user_password: Yup.string().required('*password is required'),
    });

    return (
        <>
            <div className="antialiased bg-gray-200 text-gray-900 font-sans" >
                <div className="flex items-center h-screen w-full">
                    <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                        <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                        <Formik
                            initialValues={{
                                user_email: '',
                                user_password: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={values => {
                                axios.post('loginUser', { ...values })
                                    .then(res => {
                                        let { status, access_token, message } = res.data;
                                        if (status) {
                                            notification.success({ message });
                                            localStorage.setItem('jwt_access_token', access_token)
                                            window.location.reload();
                                        }
                                        else {
                                            notification.error({ message });
                                            console.log("login failed");
                                        }
                                    })
                            }}
                        >
                            {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, validateForm, getFieldProps }) => (
                                <Form onSubmit={handleSubmit} >
                                    <div className="mt-4" >
                                        <TextField
                                            name='user_email'
                                            {...getFieldProps('user_email')}
                                            className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                            label="Email"
                                            variant="outlined"
                                            error={touched.user_email && errors.user_email}
                                        />
                                        <ErrorMessage className="error_msg" name='user_email' />
                                    </div>

                                    <div className="mt-4" >
                                        <TextField
                                            name='user_password'
                                            {...getFieldProps('user_password')}
                                            className="w-full border rounded p-2  outline-none focus:shadow-outline"
                                            label="Password"
                                            type='password'
                                            variant="outlined"
                                            error={touched.user_password && errors.user_password}
                                        />
                                        <ErrorMessage className="error_msg" name='user_password' />
                                    </div>

                                    <div className=" mt-4 " >
                                        <button disabled={!isValid} className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Login</button>
                                    </div>
                                    {/* <Button disabled={!isValid} variant="contained" color="primary" type="submit">Login</Button> */}
                                </Form>
                            )}
                        </Formik>
                        <div className=" mt-4 " >
                            <a className="text-blue-700 text-center text-sm" href="/signup">Forgot password?</a>
                        </div>
                        <div>
                            <a className="text-blue-700 text-center text-sm" href="/signup">Create an account?</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;