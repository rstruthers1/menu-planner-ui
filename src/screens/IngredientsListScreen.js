import React from 'react';
import { useGetAllIngredientsQuery } from '../slices/ingredientsSlice';

const IngredientsList = () => {
    const { data: ingredients, error, isLoading } = useGetAllIngredientsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Ingredients</h1>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name} ({ingredient.pluralForm || 'N/A'})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientsList;
