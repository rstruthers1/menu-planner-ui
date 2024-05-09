import {apiSlice} from './apiSlice';

const RECIPES_REST_URL = '/api/recipes'

const api = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addRecipe: builder.mutation({
            query: (recipe) => ({
                url: RECIPES_REST_URL,
                method: 'POST',
                body: recipe,
            }),
        }),
        getAllRecipes: builder.query({
            query: () => RECIPES_REST_URL,
        }),
    }),
});

export const { useAddRecipeMutation, useGetAllRecipesQuery } = api;