import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brandObj: {
        name : '',
        description : '',
    },
    brands : [],
    isRefresh : false
}

const brandSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {
        onFetchdata(){},
        onLoadbrand(state, action) {
            state.brands = action.payload;
        },
        onEditbrand(state, action) {
            state.brandObj = action.payload;
        },

        onUpdatebrand(state, action){},
        onCreatebrand(state, action){},
        onDeletebrand(state, action){},
        onRefresh(state){
            state.isRefresh = !state.isRefresh;
        }
    }
});

const { reducer, actions } = brandSlice;
export const { onFetchdata,onEditbrand,onLoadbrand,onRefresh,onUpdatebrand,onCreatebrand,onDeletebrand } = actions;
export default reducer;