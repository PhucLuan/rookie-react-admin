import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryObj: {
        name : '',
        order: 0,
        description : '',
        categoryId : 0,//category parent
        categoryParentName:'',
    }
}

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        onEditcategory(state, action) {
            
            state.categoryObj = action.payload
        }
    }
});

const { reducer, actions } = categorySlice;
export const { onEditcategory } = actions;
export default reducer;