import {createApi} from '@reduxjs/toolkit/query/react'
import { IUser } from '../userSlice'
import {BaseQueryFn} from '@reduxjs/toolkit/query/react'

import axios, { AxiosError, AxiosRequestConfig } from 'axios'

let credential = sessionStorage.getItem('Auth Token')

axios.defaults.headers.common['Authorization'] = "Bearer "+credential;


export interface IOrder{
  id: string
  user_id: string
  user: IUser
  payment_reference: string
  total_amount: string
  is_payed: boolean
  order_details : Array<IOrderDetail>
  is_fufilled: boolean
  created_at: string
  updated_at: string
}

export interface IOrderDetail{
  menu_id: string
  price: string
  quantity: string
  total_amount: string
  order_id: string
  created_at: string
  update_at: string
}

interface IResultPagination{
  data: Array<IOrder>
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



 

export const apiOrderSlice = createApi({
  reducerPath: 'apiOrder',
  baseQuery: axiosBaseQuery({
      baseUrl: 'http://localhost:8000/api/',   
    }),
    tagTypes: ['Order'],
    endpoints(builder){
      return {
        fetchAllOrder :builder.query<IResultPagination, number | void>({
          query: (page) => ({ url: `orders?limit=10${page ? "&pg="+page :''}`, method: 'get' }),
        }),
        postOrder: builder.mutation<IOrder,FormData>({
          query: (formData) => ({ url: 'orders', method: 'post', body: formData }),
          invalidatesTags: ['Order']
        }),
        deleteOrder: builder.mutation<IOrder,string>({
          query: (id) => ({ url: `orders/${id}`, method: 'delete'}),
          invalidatesTags: ['Order']
        }),
        updateOrder: builder.mutation<IOrder, FormData>({
          query(formData) {
           const id = formData.get('id');
            return {
              url: `menus/${id}`,
              method: 'POST',
              body: formData,
            }
          },
          invalidatesTags: ['Order']
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





export const {useFetchAllOrderQuery, useDeleteOrderMutation, useUpdateOrderMutation, usePostOrderMutation } = apiOrderSlice
