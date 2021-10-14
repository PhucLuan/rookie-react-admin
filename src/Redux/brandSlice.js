import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brandObj: {
        name : '',
        description : '',
    }
}

const brandSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {
        // onAddbrand(state) {
        //     state.isAddMode = false;
        //     //action = action.payload
        // },
        onEditbrand(state, action) {
            
            state.brandObj = action.payload
        }
    }
});

const { reducer, actions } = brandSlice;
export const { onEditbrand } = actions;
export default reducer;