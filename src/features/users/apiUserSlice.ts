import {createApi} from '@reduxjs/toolkit/query/react'
import {BaseQueryFn} from '@reduxjs/toolkit/query/react'

import axios, { AxiosError, AxiosRequestConfig } from 'axios'

let credential = sessionStorage.getItem('Auth Token')

axios.defaults.headers.common['Authorization'] = "Bearer "+credential;


interface IUser{
    id: string
    email: string
    first_name: string
    last_name: string
    middle_name: string
    address: string
    phone_number: string
    profile_image_url: string
    is_disabled: boolean
    disabling_user_id: string
    created_at: string
    updated_at: string
}

interface IResultPagination{
  data: Array<IUser>
  total_pages: string,
  current_page: string,
  total_results: string,
}





 const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method'],
      body?:  AxiosRequestConfig['data'],
      params?: AxiosRequestConfig['params'],
      
    },
    unknown,
    unknown
  > =>
  async ({ url, method,body, params }) => {
    //console.log(body);
 
    try {
      if(method == "post" || "patch"){}
      const result = await axios({ url: baseUrl + url,method: method,data: body, params})
            console.log(result);
            
            if(result.data.success == false){ 
             
              return {
                error: {
                  status: result.status,
                  data: result.data
                }
              }
            }

      return { data: result.data  }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      console.log(err,"error");
      
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      }
    }
  }



 

export const apiUserSlice = createApi({
  reducerPath: 'apiUser',
  baseQuery: axiosBaseQuery({
      baseUrl: 'http://localhost:8000/api/',   
    }),
    tagTypes: ['User'],
    endpoints(builder){
      return {
        fetchAllUser :builder.query<IResultPagination, number | void>({
          query: (page) => ({ url: `users?limit=10${page ? "&pg="+page :''}`, method: 'get' }),
        }),
        postUser: builder.mutation<IUser,FormData>({
          query: (formData) => ({ url: 'orders', method: 'post', body: formData }),
          invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation<IUser,string>({
          query: (id) => ({ url: `users/${id}`, method: 'delete'}),
          invalidatesTags: ['User']
        }),
        updateUser: builder.mutation<IUser, FormData>({
          query(formData) {
           const id = formData.get('id');
            return {
              url: `users/${id}`,
              method: 'POST',
              body: formData,
            }
          },
          invalidatesTags: ['User']
          // Invalidates all queries that subscribe to this Post `id` only.
          // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
        //  invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
        }),
       /*  updateMenu: builder.mutation<IMenu, FormData & Pick<IMenu, 'id'>>({
          query: (formData) => ({ url: 'menus', method: 'put', body: formData }),
          invalidatesTags: ['Menu']
        }), */
        
        
      }
    }
})





export const {useFetchAllUserQuery, useDeleteUserMutation, useUpdateUserMutation, usePostUserMutation } = apiUserSlice
