import {apiSlice} from './apiSlice';
const USERS_URL = '/rest/auth/'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: USERS_URL + 'login',
                method: 'POST',
                body: user,
                config: {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },
            }),
        }), 
        logout: builder.mutation({
            query: () => ({
                url: USERS_URL + 'logout',
                method: 'POST',
            }),
        }),

        register: builder.mutation({
            query: (user) => ({
                url: USERS_URL + 'register',
                method: 'POST',
                body: user,
                config: {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },
            }),
        }),
    }),
    overrideExisting: false
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation} = usersApiSlice;
