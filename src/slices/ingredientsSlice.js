import { apiSlice } from './apiSlice';

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllIngredients: builder.query({
            query: () => '/api/ingredients',
        }),
        getIngredientById: builder.query({
            query: (id) => `/api/ingredients/${id}`,
        }),
        createIngredient: builder.mutation({
            query: (newIngredient) => ({
                url: '/api/ingredients',
                method: 'POST',
                body: newIngredient,
            }),
        }),
        updateIngredient: builder.mutation({
            query: ({ id, ...updatedIngredient }) => ({
                url: `/api/ingredients/${id}`,
                method: 'PUT',
                body: updatedIngredient,
            }),
        }),
        deleteIngredient: builder.mutation({
            query: (id) => ({
                url: `/api/ingredients/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetAllIngredientsQuery,
    useGetIngredientByIdQuery,
    useCreateIngredientMutation,
    useUpdateIngredientMutation,
    useDeleteIngredientMutation,
} = extendedApi;
