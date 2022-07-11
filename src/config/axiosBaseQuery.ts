import {BaseQueryFn} from '@reduxjs/toolkit/query/react'

import axios, { AxiosError, AxiosRequestConfig } from 'axios'

let credential = sessionStorage.getItem('Auth Token')

axios.defaults.headers.common['Authorization'] = "Bearer "+credential;

export const axiosBaseQuery =
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
              console.log(result,"error2");
              return {
                error: {
                  status: result.status,
                  data: result.data
                }
              }
            }

      return { data: result.data.data }
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

