import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container } from 'react-bootstrap';

const Dashboard = ({ }) => {
    return (
        <Container>
            <h1>Welcome Back!</h1>
            <div>
                <h2>Quick Actions</h2>
                <Button className="me-2" onClick={() => console.log('Redirect to create meal plan')} >Create Meal Plan</Button>
                <LinkContainer to='/record-meal' className="me-2">
                    <Button>Record Meal</Button>
                </LinkContainer>
                <LinkContainer to='/add-recipe' className="me-2">
                    <Button>Add Recipe</Button>
                </LinkContainer>
                <LinkContainer to='/ingredients-list'>
                    <Button>Ingredients List</Button>
                </LinkContainer>
            </div>
            <div>
                <h2>This Week's Meal Plan</h2>
                <p>Overview of this week's meals...</p>
                {/* Here you might map over an array of meal plan objects */}
            </div>
            <div>
                <h2>Recently Added Menus</h2>
                <p>Overview of recently added menus...</p>
                {/* Here you might map over an array of menu objects */}
            </div>

        </Container>
    );
};

export default Dashboard;
