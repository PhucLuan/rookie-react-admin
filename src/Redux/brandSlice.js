import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brandObj: {
        name : '',
        description : '',
    },
    brands : undefined
}

const brandSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {
        onLoadbrand(state, action) {
            state.brands = action.payload;
            //action = action.payload
        },
        onEditbrand(state, action) {
            
            state.brandObj = action.payload
        }
    }
});

const { reducer, actions } = brandSlice;
export const { onEditbrand,onLoadbrand } = actions;
export default reducer;