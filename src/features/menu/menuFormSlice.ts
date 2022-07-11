import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IMenuForm {
  id: string
  name: string;
  menu_category_id: string;
  description: string;
  price: string;
  image_url: string;
}
const initialState: IMenuForm = {
  id: '',
  name: "",
  image_url: "",
  description: "",
  menu_category_id: "",
  price: "",
};

export const menuFormSlice = createSlice({
  name: "menuForm",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    setMenuCategoryId: (state, action: PayloadAction<string>) => {
      state.menu_category_id = action.payload
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload
    },
    resetForm:(state) =>{
      state.price = ''
      state.name = ''
      state.id = ''
      state.description = ''
      state.menu_category_id = ''
      state.image_url = ''
    }
  },
});

// Action creators are generated for each case reducer function
export const { resetForm, setName,setId, setMenuCategoryId, setDescription, setPrice } =
menuFormSlice.actions;

export default menuFormSlice.reducer;
