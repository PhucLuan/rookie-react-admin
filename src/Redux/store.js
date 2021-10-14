import {configureStore} from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import brandReducer from './brandSlice';
import categoryReducer from './categorySlice';
import unitReducer from './unitSlice';

const rootReducer = {
    sidebar: sidebarReducer,
    brand: brandReducer,
    category: categoryReducer,
    unit : unitReducer
}

const store = configureStore({
    reducer: rootReducer
})
export default store;