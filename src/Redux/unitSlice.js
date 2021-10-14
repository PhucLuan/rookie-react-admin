import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    unitObj: {
        name : '',
        description : '',
    }
}

const unitSlice = createSlice({
    name: 'unitSlice',
    initialState,
    reducers: {
        onEditunit(state, action) {
            
            state.unitObj = action.payload
        }
    }
});

const { reducer, actions } = unitSlice;
export const { onEditunit } = actions;
export default reducer;