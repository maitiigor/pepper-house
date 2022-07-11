import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ValidationErrorState {
    message: Array<string>
    isSuccess: boolean
    isVisibile: boolean
}
interface IValidationProp {
    message: Array<string>
    isSuccess: boolean
}
const initialState: ValidationErrorState = {
    message: [],
    isSuccess: false,
    isVisibile: false,
}

export const validationErrorSlice = createSlice({
  name: 'validationError',
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<IValidationProp>) => {
        state.isSuccess = action.payload.isSuccess
        state.message = action.payload.message
        state.isVisibile = true
      },
      closeError: (state) => {
       state.isVisibile = false
       state.message = []
      },
  
  },
})

// Action creators are generated for each case reducer function
export const { showMessage, closeError } = validationErrorSlice.actions

export default validationErrorSlice.reducer