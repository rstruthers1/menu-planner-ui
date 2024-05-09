import React, { useState } from 'react';
import { Form, Button, Container, Modal, Tab, Tabs, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const RecordMealScreen = () => {
    const [show, setShow] = useState(false);
    const [temperatureUnit, setTemperatureUnit] = useState('Fahrenheit');

    const [showRecipeForm, setShowRecipeForm] = useState(false);  // State to control the new recipe form modal
    const [showFoodForm, setShowFoodForm] = useState(false);  // State to control the new food form modal

    const [recipeName, setRecipeName] = useState('');
    const [recipeDetails, setRecipeDetails] = useState('');
    
    const [foodName, setFoodName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRecipeFormClose = () => {
        setShowRecipeForm(false);
        setRecipeName('');
        setRecipeDetails('');
    };
    const handleRecipeFormShow = () => setShowRecipeForm(true);

    const submitRecipe = () => {
        console.log("Submitting new recipe: ", recipeName, recipeDetails);
        handleRecipeFormClose();
    };

    const handleFoodFormClose = () => {
        setShowFoodForm(false);
        setFoodName('');
    };
    const handleFoodFormShow = () => setShowFoodForm(true);

    const submitFood = () => {
        console.log("Submitting new food: ", foodName);
        handleFoodFormClose();
    };


    return (
        <FormContainer>
            <h1>Record Meal</h1>
            <Form>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>
                {/* <div className="mt-3 p-3 border">
                    <Form.Group controlId="weather">
                        <Form.Label>Weather</Form.Label>
                        <Form.Control type="text" placeholder="Enter weather condition" />
                    </Form.Group>
                </div>
                <div className="mt-3 p-3 border">
                    <Button variant="primary" onClick={handleShow}>Add Food</Button>
                </div> */}

                <Row className="mt-3">
                    <Col xs={12}>
                        <div className="section p-3 border">
                            <h2>Food Items</h2>
                            <Button variant="primary" onClick={handleShow}>Add Food</Button>
                        </div>
                    </Col>
                </Row>

                {/* Weather Section */}
                <Row className="mt-3">
                    <Col xs={12}>
                        <div className="section p-3 border">
                            <h2>Weather</h2>
                            <Form.Group as={Row} controlId="temperature" className="align-items-center">
                                <Col sm={8}>
                                    <Form.Label>Temperature</Form.Label>
                                    <Form.Control type="number" placeholder="Enter temperature" />
                                </Col>
                                <Col sm={4}>
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Control as="select" value={temperatureUnit} onChange={e => setTemperatureUnit(e.target.value)}>
                                        <option>Celsius</option>
                                        <option>Fahrenheit</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group controlId="weatherCondition">
                                <Form.Label>Condition</Form.Label>
                                <Form.Control as="select">
                                    <option>Sunny</option>
                                    <option>Rainy</option>
                                    <option>Partly Cloudy</option>
                                    <option>Cloudy</option>
                                    <option>Windy</option>
                                    <option>Snowy</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Food Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="recipe" id="food-item-tabs">
                        <Tab eventKey="recipe" title="Recipe">
                            <Button variant="secondary" onClick={handleRecipeFormShow} className="mt-3">Add New Recipe</Button>
                            {/* Placeholder for recipe list or search */}
                        </Tab>
                        <Tab eventKey="food" title="Food">
                            <Button variant="secondary" onClick={handleFoodFormShow} className="mt-3">Add New Food</Button>
                            {/* Placeholder for food list or search */}
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Additional modals for adding recipes or food */}
            <Modal show={showRecipeForm} onHide={handleRecipeFormClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="recipeName">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter recipe name"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="recipeDetails">
                            <Form.Label>Ingredients and Instructions</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Describe the ingredients and instructions"
                                value={recipeDetails}
                                onChange={(e) => setRecipeDetails(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRecipeFormClose}>Cancel</Button>
                    <Button variant="primary" onClick={submitRecipe}>Save Recipe</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFoodForm} onHide={handleFoodFormClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Food</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group controlId="foodName">
                            <Form.Label>Food Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter food name" 
                                value={foodName} 
                                onChange={(e) => setFoodName(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleFoodFormClose}>Cancel</Button>
                    <Button variant="primary" onClick={submitFood}>Save Food</Button>
   
                </Modal.Footer>
            </Modal>
        </FormContainer>
    );
};

export default RecordMealScreen;
