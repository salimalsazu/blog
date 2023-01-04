
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }),
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => ({
                url: "allblogs",
                method: 'GET'
            })
        })
    })

})



export const { useGetAllBlogsQuery } = postApi;