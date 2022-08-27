import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {BaseQueryFn, createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type { PayloadAction } from '@reduxjs/toolkit'
import UserDataService from '../services/userservice'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export interface IUser{
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

/* export interface UserState {
  user: IUser[]
}

const initialState: UserState = {
  user: [],
} */

export const TestSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/api/',
    }),
    tagTypes: ['Users'],
    endpoints(builder){
      return {
        fetchUsers :builder.query<IUser[], number|void>({
          query: () => ({ url: 'users', method: 'get' })
        }),
        addUser: builder.mutation<string, number|void>({
          query: () => ({ url: '/users', method: 'post' }),
        }),
        getUser: builder.mutation({
          query: () => ({ url: '/users', method: 'get' }),
        }),
        updateUser: builder.mutation({
          query: () => ({ url: '/users', method: 'patch' }),
        }),
        deleteUser: builder.mutation({
          query: () => ({ url: '/users', method: 'get' }),
        }),
      }
    }
})




const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params'],
      
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })
      return { data: result.data.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      console.log(err);
      
      return {
        error: {

          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }




export const apiUserSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
      baseUrl: 'http://localhost:8000/api/',
    }),
    tagTypes: ['Users'],
    endpoints(builder){
      return {
        fetchUsers :builder.query<IUser[], number|void>({
          query: () => ({ url: 'users', method: 'get' })
        }),
        addUser: builder.mutation<string, number|void>({
          query: () => ({ url: '/users', method: 'post' }),
        }),
        getUser: builder.mutation({
          query: () => ({ url: '/users', method: 'get' }),
        }),
        updateUser: builder.mutation({
          query: () => ({ url: '/users', method: 'patch' }),
        }),
        deleteUser: builder.mutation({
          query: () => ({ url: '/users', method: 'get' }),
        }),
      }
    }
})

export const {useFetchUsersQuery} = apiUserSlice
/* export const createUser = createAsyncThunk(
  "tutorials/create",
  async ({ title, description }: any) => {
    const res = await UserDataService.create({ title, description });
    return res.data;
  }
);
export const retrieveTutorials = createAsyncThunk(
  "tutorials/retrieve",
  async () => {
    const res = await UserDataService.getAll();
    return res.data;
  }
);

export const updateTutorial = createAsyncThunk(
  "tutorials/update",
  async ( id : string, data: any ) => {
    const res = await UserDataService.update(id, data);
    return res.data;
  }
);
export const deleteTutorial = createAsyncThunk(
  "tutorials/delete",
  async (id  : string ) => {
    await UserDataService.delete(id);
    return { id };
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user.push(...state.user,{id: "sdsds", first_name :"jsjsjd"})
    },
    decrement: (state) => {
     
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
     // state.value += action.payload
    },
  },
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer */