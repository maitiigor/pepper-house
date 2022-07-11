import {createApi} from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../config/axiosBaseQuery'

//axios
export interface IMenuCategory{
    id: string,
    name: string,

}

/* export interface UserState {
  user: IUser[]
}

const initialState: UserState = {
  user: [],
} */


//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

 

export const apiMenuCategorySlice = createApi({
  reducerPath: 'apiMenuCategories',
  baseQuery: axiosBaseQuery({
      baseUrl: 'http://localhost:8000/api/',   
    }),
    tagTypes: ['MenuCategory'],
    endpoints(builder){
      return {
        fetchAllMenuCategory :builder.query<IMenuCategory[], number|void>({
          query: () => ({ url: 'menu_categories', method: 'get' })
        }),
        postMenuCategory: builder.mutation<IMenuCategory, FormData>({
          query: (formData) => ({ url: 'menu_categories', method: 'post', body: formData }),
          invalidatesTags: ['MenuCategory']
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

export const {useFetchAllMenuCategoryQuery, usePostMenuCategoryMutation} = apiMenuCategorySlice
