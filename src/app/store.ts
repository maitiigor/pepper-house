import { configureStore } from '@reduxjs/toolkit'
import {apiUserSlice} from '../features/users/apiUserSlice'

import { apiLoginSlice } from '../features/authentication/apiLoginSlice'
import { apiMenuSlice } from '../features/menu/apiMenuSlice'
import { apiOrderSlice } from '../features/orders/apiOrderSlice'
import { apiMenuCategorySlice } from '../features/menuCategorySlice'
import modalReducer  from '../features/modalSlice'
import validationErrorReducer  from '../features/validationErrorSlice'
import menuFormReducer  from '../features/menu/menuFormSlice'

//console.log(apiUserSlice.middleware);
//console.log(apiLoginSlice.middleware)

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    validationError: validationErrorReducer,
    menuForm: menuFormReducer,
    [apiUserSlice.reducerPath] : apiUserSlice.reducer ,
    [apiLoginSlice.reducerPath] : apiLoginSlice.reducer,
    [apiMenuSlice.reducerPath] : apiMenuSlice.reducer,
    [apiOrderSlice.reducerPath] : apiOrderSlice.reducer,
    [apiMenuCategorySlice.reducerPath] : apiMenuCategorySlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    
    return getDefaultMiddleware().concat([apiUserSlice.middleware,apiLoginSlice.middleware,apiMenuSlice.middleware,apiMenuCategorySlice.middleware,apiOrderSlice.middleware])
  }
})

//setupListeners(store.dispatch)
//Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
