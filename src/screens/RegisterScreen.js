import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigate = useNavigate();

    const [register, { isLoading, isError, isSuccess, error }] = useRegisterMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
       
        if (firstName === '') {
            setValidationError('First Name is required');
            return;
        }
        if (lastName === '') {
            setValidationError('Last Name is required');
            return;
        }
        if (email === '') {
            setValidationError('Email is required');
            return;
        }
        if (password.length < 8) {
            setValidationError('Password must be at least 6 characters');
            return;
        }
        if (password !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }
        setValidationError('');

        try {
            const res = await register({firstName, lastName, email, password}).unwrap();
            console.log(res);
            navigate('/login');

        } catch (err) {
            console.error(err?.data?.message || err?.error);
        }
    };

    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='username'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3' onClick={submitHandler}>Sign Up</Button>
                <Row className='py-3'>
                    <Col>Already have an account? <Link to='/login'>Sign In</Link></Col>
                </Row>
                {validationError && <Alert variant='warning'>{validationError}</Alert>}
                {isLoading && <Loader />}
                {isError && <Alert variant='warning'>{error?.data?.message || error?.error || 'Unknown error'}</Alert>}
            </Form>

        </FormContainer>
    );
};

export default RegisterScreen;