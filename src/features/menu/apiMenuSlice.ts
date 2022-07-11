import {BaseQueryFn, createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { axiosBaseQuery } from '../../config/axiosBaseQuery'
import { Menu } from '../../pages'

//axios
export interface IMenu{
    id: string,
    name: string,
    menu_category_id: string,
    description: string,
    price: string,
    image_url: string,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date

}

/* export interface UserState {
  user: IUser[]
}

const initialState: UserState = {
  user: [],
} */


//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

 

export const apiMenuSlice = createApi({
  reducerPath: 'apiMenus',
  baseQuery: axiosBaseQuery({
      baseUrl: 'http://localhost:8000/api/',   
    }),
    tagTypes: ['Menu'],
    endpoints(builder){
      return {
        fetchAllMenu :builder.query<IMenu[], number|void>({
          query: () => ({ url: 'menus', method: 'get' })
        }),
        postMenu: builder.mutation<IMenu,FormData>({
          query: (formData) => ({ url: 'menus', method: 'post', body: formData }),
          invalidatesTags: ['Menu']
        }),
        deleteMenu: builder.mutation<IMenu,string>({
          query: (id) => ({ url: `menus/${id}`, method: 'delete'}),
          invalidatesTags: ['Menu']
        }),
        updateMenu: builder.mutation<IMenu, FormData>({
          query(formData) {
           const id = formData.get('id');
            return {
              url: `menus/${id}`,
              method: 'POST',
              body: formData,
            }
          },
          invalidatesTags: ['Menu']
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





export const {useFetchAllMenuQuery, usePostMenuMutation, useUpdateMenuMutation} = apiMenuSlice
