import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_URL;

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL,
   credentials: 'include',
   withCredentials: true
});

export const  apiSlice = createApi({
   baseQuery,
   endpoints: (builder) => ({  })
});



