import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarShow: "responsive"
  }
  
const sidebarSlice = createSlice({
    name: 'sidebarname',
    initialState,
    reducers: {
        toggleSideBar(state, action) {
            state.sidebarShow = action.payload;
        }
    }
});

const { reducer, actions } = sidebarSlice;
export const { toggleSideBar } = actions;
export default reducer;