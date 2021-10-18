import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productImageObj: {
        imagePath : '',
        title : '',
        productName : ''
    }
}

const productImageSlice = createSlice({
    name: 'productImageSlice',
    initialState,
    reducers: {
        // onAddproductImage(state) {
        //     state.isAddMode = false;
        //     //action = action.payload
        // },
        onEditproductImage(state, action) {
            
            state.productImageObj = action.payload
        }
    }
});

const { reducer, actions } = productImageSlice;
export const { onEditproductImage } = actions;
export default reducer;