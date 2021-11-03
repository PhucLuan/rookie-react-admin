import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import brandReducer from './brandSlice';
import categoryReducer from './categorySlice';
import unitReducer from './unitSlice';
import productimageReducer from './productimageSlide';
import createOidcMiddleware from 'redux-oidc';
import userManager from 'src/Helper/userManager';
import { reducer as oidc } from 'redux-oidc';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './Saga/rootSaga';

const rootReducer = {
    sidebar: sidebarReducer,
    brand: brandReducer,
    category: categoryReducer,
    unit: unitReducer,
    productImage: productimageReducer,
    oidc,
}
const oidcMiddleware = createOidcMiddleware(userManager);
const sagaMiddleware = createSagaMiddleware();
const middleware = [oidcMiddleware,sagaMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
})

sagaMiddleware.run(rootSaga);

export default store;