import React, { useState, useRef, useEffect, createRef } from 'react';
import { Form, Button, Modal, InputGroup, FormControl, Alert } from 'react-bootstrap';
import Select, { components } from 'react-select';
import animatedComponents from 'react-select/animated';
import FormContainer from '../components/FormContainer';
import { useAddRecipeMutation } from '../slices/recipeApiSlice';
import { FaExclamationCircle } from 'react-icons/fa';
import { RiDeleteBin5Line } from "react-icons/ri";
import { CgInsertAfter, CgInsertBefore} from "react-icons/cg";
import { useGetAllIngredientsQuery } from '../slices/ingredientsSlice';



function AddRecipeScreen() {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [options, setOptions] = useState([
    ]);
    const [instructions, setInstructions] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newIngredientName, setNewIngredientName] = useState('');
    const [currentSelectIndex, setCurrentSelectIndex] = useState(null);
    const inputRef = useRef(null);
    const [addRecipe, { isLoading, isError, isSuccess, error }] = useAddRecipeMutation();
    const { data: allIngredients, isLoading: isIngredientsLoading, isError: isIngredientsError, isSuccess: isIngredientsSuccess,
        isFetching: isIngredientsFetching, error: ingredientsError
    } = useGetAllIngredientsQuery();
    const selectRefs = useRef([]); // Array of refs for each select component

    useEffect(() => {
        if (isIngredientsSuccess) {
            setOptions(allIngredients.map(ing => ({ value: ing.id, label: ing.name })));
        }
    }, [isIngredientsSuccess, allIngredients]);

    useEffect(() => {
        if (showModal && inputRef.current) {
            inputRef.current.focus();
            const length = newIngredientName.length;
            inputRef.current.setSelectionRange(length, length);
        }
    }, [showModal, newIngredientName]);

    const handleAddIngredientField = (index) => {
        // If index is null, add to the end
        if (index === null || index === undefined) {
            const newIndex = ingredients.length;
            setIngredients([...ingredients, { value: '', label: '', isNew: false }]);
            selectRefs.current[newIndex] = createRef();
        } else {
            // Insert a new ingredient right after the current index
            const newIngredients = [
                ...ingredients.slice(0, index + 1),
                { value: '', label: '', isNew: false },
                ...ingredients.slice(index + 1),
            ];
            setIngredients(newIngredients);
            selectRefs.current.splice(index + 1, 0, createRef());
        }
    };

    const focusNewIngredientSelect = (index) => {
        setTimeout(() => {
            if (selectRefs.current[index]?.current) {
                selectRefs.current[index].current.focus();
            }
        }, 100);
    };

    const handleIngredientSelect = (selectedOption, index) => {
        if (selectedOption.value === 'add-new') {
            setCurrentSelectIndex(index);
            setShowModal(true);
        } else {
            const newIngredients = ingredients.slice();
            newIngredients[index] = selectedOption;
            setIngredients(newIngredients);
        }
    };

    const handleDeleteIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        selectRefs.current.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleAddNewIngredient = () => {
        const newOption = { value: newIngredientName.toLowerCase(), label: newIngredientName };
        setOptions(currentOptions => [...currentOptions, newOption]);
        const newIngredients = ingredients.slice();
        newIngredients[currentSelectIndex] = newOption;
        setIngredients(newIngredients);
        handleCloseModal();
    };

    const handleAddNewIngredientSubmit = (event) => {
        event.preventDefault(); // Prevent the form from actually submitting
        handleAddNewIngredient(); // Call the same function that's called on button click
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const allIngredientsSelected = ingredients.every(ing => ing.value !== '');
        if (!allIngredientsSelected) {
            alert('Please select an ingredient for all fields before adding the recipe.');
            return;
        }
        console.log('Recipe Name:', recipeName);
        console.log('Ingredients:', ingredients.map(ing => ing.label));
        console.log('Instructions:', instructions);
        const recipe = {
            name: recipeName,
            instructions: instructions,
            ingredients: ingredients.map(ing => { return { ingredientId: ing.value }})
        };
        try {
            await addRecipe(recipe).unwrap();
            setRecipeName('');
            setIngredients([]);
            setInstructions('');
            selectRefs.current = []; // Reset refs
        } catch (err) {
            console.error(err?.data?.message || err?.error);
        }
    };

    const handleCreateNewIngredient = (inputValue, index) => {
        setCurrentSelectIndex(index);
        setNewIngredientName(inputValue || '');
        setShowModal(true);
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            minWidth: 240,
        })
    };

    const formatOptionLabel = ({ label, value }) => value === 'add-new' ? <div>Add food...</div> : <div>{label}</div>;

    return (
        <FormContainer>
            <h1>Add Recipe</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formRecipeName">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter recipe name"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={() => {
                        handleAddIngredientField(null);
                        focusNewIngredientSelect(ingredients.length);
                    }}
                    className="mb-3"
                    disabled={isLoading}
                >
                    Add Ingredient
                </Button>

                {ingredients.length === 0 ? (
                    <Alert variant="info" className="mb-3">
                        <FaExclamationCircle style={{ marginRight: '8px', color: '#007bff' }} />
                        No ingredients have been added yet. Click the "Add Ingredient" button to start.
                    </Alert>
                ) :
                    (ingredients.map((ingredient, index) => (
                        <InputGroup className="mb-3" key={index}>
                            <Select
                                disabled={isLoading || !isIngredientsSuccess}
                                ref={selectRefs.current[index] || createRef()}
                                components={animatedComponents}
                                options={[...options, { value: 'add-new', label: 'Add new ingredient...' }]}
                                onChange={(selectedOption) => handleIngredientSelect(selectedOption, index)}
                                value={ingredient}
                                placeholder="Select or create ingredient..."
                                styles={customStyles}
                                formatOptionLabel={formatOptionLabel}
                                noOptionsMessage={({ inputValue }) => (
                                    <div style={{ padding: '10px', textAlign: 'center' }}>
                                        <button onClick={() => handleCreateNewIngredient(inputValue, index)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
                                            Add Food...
                                        </button>
                                    </div>
                                )}
                            />
                            <Button
                                variant="outline-primary"
                                onClick={() => {
                                    handleAddIngredientField(index);
                                    focusNewIngredientSelect(index + 1);
                                }}
                                style={{ marginLeft: '10px' }}
                                disabled={isLoading || !isIngredientsSuccess}
                            >
                                <CgInsertAfter />
                            </Button>
                            <Button
                                variant="outline-danger"
                                onClick={() => handleDeleteIngredient(index)}
                                style={{ marginLeft: '10px' }}
                                disabled={isLoading}
                            >
                                <RiDeleteBin5Line />
                            </Button>
                        </InputGroup>)
                    ))}

                <Form.Group className="mb-3" controlId="formInstructions">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Describe the preparation steps"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        disabled={isLoading}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    Add Recipe
                </Button>
                {isError && <Alert variant='warning'>{error?.data?.message || error?.error || 'Unknown error'}</Alert>}
            </Form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddNewIngredientSubmit}>
                        <InputGroup>
                            <FormControl
                                ref={inputRef}
                                value={newIngredientName}
                                onChange={(e) => setNewIngredientName(e.target.value)}
                                placeholder="Enter new ingredient name"
                            />
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddNewIngredient}>
                        Save Ingredient
                    </Button>
                </Modal.Footer>
            </Modal>
        </FormContainer>
    );
}

export default AddRecipeScreen;
