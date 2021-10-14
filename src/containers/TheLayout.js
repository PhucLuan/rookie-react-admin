import React from 'react'
import { Route } from 'react-router'
import Product from 'src/views/product/product/Product'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
          <Route path="/demo">
            <Product></Product>
             {/* <Route path="#/demo/a">Hahaha</Route> */}
          </Route>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
