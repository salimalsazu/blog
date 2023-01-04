
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/'
    }),
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => ({
                url: "recentpost",
                method: 'GET'
            })
        })
    })

})



export const { useGetAllBlogsQuery } = postApi;