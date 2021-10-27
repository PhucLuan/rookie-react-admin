import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

//const Users = React.lazy(() => import('./views/users/Users'));
//const User = React.lazy(() => import('./views/users/User'));

const Brand = React.lazy(() => import('./views/product/brand/Brand'));
const Category = React.lazy(() => import('./views/product/category/Category'));
const Unit = React.lazy(() => import('./views/product/unit/Unit'));
const Product = React.lazy(() => import('./views/product/product/Product'));
const ProductForm = React.lazy(() => import('./views/product/product/ProductForm'));
const ProductImage = React.lazy(() => import('./views/product/product/productimage/ProductImage'));
const ProductImageForm = React.lazy(() => import('./views/product/product/productimage/ProductImageForm'));

const User = React.lazy(() => import('./views/user/User'));

//import ProductForm from './views/product/product/ProductForm';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
  // { path: '/product', name: 'Product', component: Brand , exact: true},
  { path: '/product/brand', name: 'Brands', component: Brand },
  { path: '/product/category', name: 'Categories', component: Category },
  { path: '/product/unit', name: 'Units', component: Unit },
  
  { path: '/product/product/productimage/add', name: 'Product Images', component: ProductImageForm},
  { path: '/product/product/productimage/:productId', name: 'Product Images', component: ProductImage},
  { path: '/product/product/add', name: 'Addproduct', component: ProductForm, exact : true},
  { path: '/product/product/:productId', name: 'Editproduct', component: ProductForm},
  { path: '/product/product', name: 'Products', component: Product },
  { path: '/user', name: 'Products', component: User },

];

export default routes;
