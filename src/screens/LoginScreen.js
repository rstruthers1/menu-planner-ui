import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import {Form, Button, Row, Col, Alert} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading, isSuccess, isError, error}] = useLoginMutation();
    const {userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo])

   const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredentials({...res})) 
        } catch (err) {
           console.error(err?.data?.message || err?.error);
        }
    };  

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        dis
                        />
                    
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        />
                </Form.Group>
                <Button type='submit' 
                    variant='primary' 
                    className='mt-3' 
                    onClick={submitHandler}
                    disabled={isLoading}>Sign In</Button>
                <Row className='py-3'>
                    <Col>
                        New to Home Menu Planner? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
                {isError && <Alert variant='warning'>{error?.data?.message || error?.error || 'Unknown error'}</Alert>}
                {isLoading && <Loader/>}
            </Form>
        </FormContainer>
    );
};

export default LoginScreen;