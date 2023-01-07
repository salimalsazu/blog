
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://server-salimalsazu.vercel.app/'
    }),
    endpoints: (builder) => ({
        getAllBlogs: builder.query({
            query: () => ({
                url: "recentpost",
                method: 'GET'
            })
        }),

        createPost: builder.mutation({
            query: (newPost) => {
                console.log("Cerate IPost", newPost)
                return {
                    url: `category`,
                    method: 'POST',
                    body: newPost,
                    header: {
                        'content-type': 'application/json',
                    }
                }
            }
        }),

        getAllCategory: builder.query({
            query: () => ({
                url: `category`,
                method: 'GET'
            })
        })

    })
})



export const { useGetAllBlogsQuery, useCreatePostMutation, useGetAllCategoryQuery } = postApi;