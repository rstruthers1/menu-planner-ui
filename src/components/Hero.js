import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const Hero = () => {
  const { userInfo } = useSelector(state => state.auth);

  return (
    <section class="hero">
      <div class="hero-content">
        <h1>Plan Your Family Meals in Minutes</h1>
        <p>Easily organize weekly meals, save recipes, and generate shopping lists with just a few clicks.</p>
        {userInfo ? (
          <LinkContainer to='/dashboard'>
            <Button variant='primary'>Welcome Back to Planning Great Meals!</Button>
          </LinkContainer>
        ) : 
        (
          <>
        <LinkContainer to='/register'>
          <Button variant='primary'>Start Planning Today</Button>
        </LinkContainer>
        <p className="login-link">
          <LinkContainer to='/login'>
            <a>
              Already have an account? Log in
            </a>
          </LinkContainer>
        </p>
        </>
        )}
      
        <p class="testimonial">"This planner has changed our evenings! No more guessing, just great meals! – Rachel S."</p>
      </div>
    </section>
  );
};

export default Hero;