import {BaseQueryFn, createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { axiosBaseQuery } from '../../config/axiosBaseQuery'

//axios
export interface IAuthenticatedUser{
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    middle_name: string,
    address: string | null,
    phone_number: string |null,
    profile_image_url: string | null,
    is_disabled: boolean,
    email_verified_at: string | null,
    disabling_user_id: string | null,
    token: string,
    created_at: Date
    updated_at: Date
}

/* export interface UserState {
  user: IUser[]
}

const initialState: UserState = {
  user: [],
} */
export interface ILogin  {
  email : string,
  password: string,
  device_name: string
}

//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

 

export const apiLoginSlice = createApi({
  reducerPath: 'apiLogin',
  baseQuery: axiosBaseQuery({
      baseUrl: 'http://localhost:8000/api/',   
    }),
    endpoints(builder){
      return {
        fetchUsers :builder.query<IAuthenticatedUser, number|void>({
          query: () => ({ url: 'users', method: 'get' })
        }),
        login: builder.mutation<IAuthenticatedUser, FormData>({
          query: (formData) => ({ url: 'login', method: 'post', body: formData }),
        }),
        
      }
    }
})

/* const apitestSlice = createApi({
  reducerPath: 'apiLogin',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/'
  }),
  endpoints(builder){
    return {
      login: builder.mutation<ILogin,{formData:FormData}>({
        query:(formData) =>({url:'login',method: 'post' bo})
      })
    }
  }

}) */

export const {useFetchUsersQuery, useLoginMutation} = apiLoginSlice
