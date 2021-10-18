import {configureStore} from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import brandReducer from './brandSlice';
import categoryReducer from './categorySlice';
import unitReducer from './unitSlice';
import productimageReducer from './productimageSlide';

const rootReducer = {
    sidebar: sidebarReducer,
    brand: brandReducer,
    category: categoryReducer,
    unit : unitReducer,
    productImage : productimageReducer
}

const store = configureStore({
    reducer: rootReducer
})
export default store;