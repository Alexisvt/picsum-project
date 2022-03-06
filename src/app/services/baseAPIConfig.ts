import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseAPIConfig = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://picsum.photos/',
  }),
  endpoints: () => ({}),
});
